import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
import { DocumentsActionTypes } from '../actionTypes/documents';
import { BigNumber, ethers, Wallet } from 'ethers';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { base64StringToBlob } from 'blob-util';
import { AlgorithmType, CEASigningService, WalletManager } from 'paid-universal-wallet';
import { eddsa } from "elliptic";
import { SolidoContract, SolidoProvider, SolidoModule, IMethodOrEventCall, Read, Write, EventFilterOptions, GetEvents } from '@decent-bet/solido';
import { Web3Plugin, Web3Settings, Web3SolidoTopic } from '@decent-bet/solido-provider-web3';
import { AgreementContract } from './../../contracts/agreement';
import Web3 from 'web3';


const uint8ArrayToString = require('uint8arrays/to-string')
const ipfsClient = require('ipfs-http-client');
const Web3 = require('web3');

// TODO: Fix
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });

//const { compile } = require('./compile');

const createAgreementFormPayload = (obj: any) => {
	const types: string[] = [];
	const values: any[] = [];
	const keys = Object.keys(obj);
	keys.forEach((k) => {
		if (typeof obj[k] === 'string') {
			types.push('string');
			values.push(obj[k]);
		}
		if (typeof obj[k] === 'number') {
			types.push('uint256');
			values.push(obj[k]);
		}
	});
	return ethers.utils.defaultAbiCoder.encode(types, values);
};

const getDocuments = (agreements: any[]) => {
	const payload = {
		from: agreements
	}
	return {
		type: DocumentsActionTypes.GET_DOCUMENTS_SUCCESS,
		payload
	};
};
const uploadDocuments = () => {
	return {
		type: DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS
	};
};
const getSelectedDocument = (document: any) => {
	return {
		type: DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS,
		payload: document
	};
};

const setAgreementFormInfo = (formInfo: any) => {
	return {
		type: DocumentsActionTypes.SET_AGREEMENT_FORM_INFO,
		payload: formInfo
	};
};

const createAgreement = () => {
	return {
		type: DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS
	};
};
declare global {
	interface Window { web3: any; ethereum: any; }
}

// ACTIONS

/*
get account
get the network
get smart contract
get meme hash
*/
export const setupSolido = (
	defaultAccount: string,
	network: string,
	web3: Web3,
) => {
	const module = new SolidoModule([
		{
			name: 'AgreementContract',
			import: AgreementContract,
			enableDynamicStubs: true,
			provider: Web3Plugin
		}
	]);

	// Bind contracts
	const contracts = module.bindContracts({
		'web3': {
			provider: web3,
			options: {
				web3,
				defaultAccount,
				network
			}
		}
	}).connect();


	return {
		...contracts
	};

}

export const doCreateAgreement = (payload: {
	signatoryA: string;
	signatoryB: string;
	validUntil: number;
	agreementFormTemplateId: string;
	agreementForm: any;
	slideNext: () => Promise<void>;
	slideBack: () => Promise<void>;
}) => async (dispatch: any, getState: () => { wallet: any }) => {
	dispatch({ type: DocumentsActionTypes.CREATE_AGREEMENT_LOADING });
	try {
		const {
			validUntil,
			agreementFormTemplateId,
			agreementForm,
			slideNext,
			slideBack
		} = payload;

		// form id
		const formId = ethers.utils.formatBytes32String(agreementFormTemplateId);
		// form
		const form = createAgreementFormPayload(agreementForm);

		const { wallet } = getState();
		const { unlockedWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);
		const onchainWalletAddress = window.ethereum.selectedAddress;


		// Solido Contract Bootstrap
		await window.ethereum.enable();
		const web3 = window.ethereum;
		const contracts = await setupSolido(
			window.ethereum.selectedAddress,
			window.ethereum.network,
			window.ethereum
		);
		const AgreementContract = contracts.AgreementContract as Web3Plugin | SolidoContract;

		// TODO: Encapsulate
		const balancewei = await web3.eth.getBalance(onchainWalletAddress);
		const balance = web3.utils.fromWei(balancewei);

		const parsedBalance = BigNumber.from(balance);
		if (parsedBalance.lte(0)) {
			throw new Error('The wallet should has balance to send a transaction.');
		}


		// TODO: Mejorar!!!
		const today = new Date();

		const content = '<div>' +
			'<div>Date: ' + today.toLocaleDateString() + ' ' + today.toLocaleTimeString() + ' </div>' +
			'Agreement creator:<br/>' +
			'<div style="margin-left: 20px;">Name:' + agreementForm.name + '</div>' +
			'<div style="margin-left: 20px;">Address:' + agreementForm.address + '</div>' +
			'<div style="margin-left: 20px;">Phone:' + agreementForm.phone + '</div>' +
			'<div style="margin-left: 20px;">Wallet:' + onchainWalletAddress + '</div>' +
			'<div>---------------------------------------</div>' +
			'Agreement counterparty:<br/>' +
			'<div style="margin-left: 20px;">Name:' + agreementForm.counterpartyName + '</div>' +
			'<div style="margin-left: 20px;">Address:' + agreementForm.counterpartyAddress + '</div>' +
			'<div style="margin-left: 20px;">Phone:' + agreementForm.counterpartyPhone + '</div>' +
			'<div style="margin-left: 20px;">Wallet:' + agreementForm.counterpartyWallet + '</div>' +
			'</div>';
		const blobContent = base64StringToBlob(btoa(content), 'application/pdf');

		// TODO: Encapsulate -------------------------------
		const ceass = new CEASigningService();
		ceass.useKeyStorage(rawWallet);
		const arrayContent = btoa(content);
		const bytesContent = ethers.utils.toUtf8Bytes(arrayContent);
		const digest = ethers.utils.sha256(bytesContent).replace('0x', '');
		const ec_alice = new eddsa('ed25519');
		const signer = ec_alice.keyFromSecret(rawWallet.keypairs.ED25519);
		const signature = signer
			.sign(digest)
			.toHex();
		const pubKey = signer.getPublic();
		const opts = { create: true, parents: true };
		let ipfsHash = await uploadsIPFS(ipfs, blobContent, opts, digest, signature, pubKey, formId, agreementForm.counterpartyWallet, null);
		// -----------------------------------------------------

		// Estimate gas,  TODO encapsulate 
		const methodFn = AgreementContract.instance.methods.partyCreate(
			validUntil,
			ipfsHash.toString(),
			formId,
			form,
			'0x' + digest);

		const gas = await
		    methodFn 
			.estimateGas();

		const agreementTransaction = await 
		     methodFn
			.send({  gas, gasPrice: 50e9 })
			.on('receipt', async function (receipt: any) {
				dispatch(createAgreement());
				slideNext();
			})
			.on('error', function (error: any, receipt: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.		
				slideBack();
				alert('Transaction failed');
				throw new Error('Transaction failed');
			});

		console.info('agreementTransaction:', agreementTransaction);
	} catch (err) {
		await payload.slideBack();
		alert(err.message);
		console.log('ln284', err);
		dispatch({
			type: DocumentsActionTypes.CREATE_AGREEMENT_FAILURE,
			payload: err.msg
		});
	}
};

export const uploadsIPFS = async (ipfs: any, blobContent: any, opts: any,
	_digest: string, sigArray: any, pubKey: any, _docId: any, counterpartyAddress: string, parent: any = null) => {
	const createCIDHash = (fileEntry: any) => {
		return { path: fileEntry.path, cid: fileEntry.cid.toString() }
	}

	const fileContent = await ipfs.add(blobContent);
	const fileSignature = await ipfs.add(sigArray);
	const index = {
		contentRef: createCIDHash(fileContent), sigRef: createCIDHash(fileSignature), digest: _digest,
		publicKey: pubKey, parent: parent, docId: _docId, cpartyAddress: counterpartyAddress
	};

	const fileIndex = await ipfs.add(JSON.stringify(index));
	return fileIndex.cid;
}

export const doGetDocuments = (currentWallet: any) => async (
	dispatch: any,
	getState: () => { wallet: any }
) => {
	dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
	try {
		const { address } = currentWallet;
		const { wallet } = getState();
		const { unlockedWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs, rawWallet.mnemonic);

		const agreementContract = ContractFactory.getAgreementContract(web3);
		const address_Contract = agreementContract.options.address;
		console.log('Address Wallet Events:', address, 'web3 accounts wallet', web3.eth.accounts.wallet);

		const eventsSource = await agreementContract.getPastEvents('AgreementPartyCreated', {
			filter: { partySource: address.toString() },
			fromBlock: 7600000,
			toBlock: 'latest'
		});
		console.table(eventsSource);
		const eventsDestination = await agreementContract.getPastEvents('AgreementPartyCreated', {
			filter: { partyDestination: address.toString() },
			fromBlock: 7600000,
			toBlock: 'latest'
		});
		console.table(eventsDestination);
		const promisesFrom = eventsSource.map(async (event) => {
			const args = event.returnValues;
			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, partySource, partyDestination, formTemplateId, agreementStoredReference } = args;
			const agreementId = (id as BigNumber).toString();

			let fetchedContent = '';
			for await (const chunk of ipfs.cat(agreementStoredReference.toString())) {
				fetchedContent = uint8ArrayToString(chunk);
			}

			const jsonContent = JSON.parse(fetchedContent);

			return new Promise(async (resolve) => {
				const agreement = await agreementContract.methods.agreements(id).call();
				const {
					agreementForm,
					escrowed,
					validUntil,
					toSigner,
					fromSigner
				} = agreement;

				resolve({
					meta: {
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id: agreementId,
						from: partySource,
						to: jsonContent.cpartyAddress ?? '',
						agreementFormTemplateId: formTemplateId,
						cid: agreementStoredReference,
						pending: partyDestination.substring(0, 7) === '0x00000'
					},
					data: {
						agreementForm,
						escrowed,
						validUntil: (validUntil as BigNumber).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});
		const promisesTo = eventsDestination.map((event) => {
			const args = event.returnValues;
			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, partySource, partyDestination, formTemplateId, agreementStoredReference } = args;
			const agreementId = (id as BigNumber).toString();
			return new Promise(async (resolve) => {
				const agreement = await agreementContract.methods.agreements(id).call();
				const {
					agreementForm,
					escrowed,
					validUntil,
					toSigner,
					fromSigner
				} = agreement;
				resolve({
					meta: {
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id: agreementId,
						from: partySource,
						to: partyDestination,
						agreementFormTemplateId: formTemplateId,
						cid: agreementStoredReference
					},
					data: {
						agreementForm,
						escrowed,
						validUntil: (validUntil as BigNumber).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});
		const agreementsSource = await Promise.all(promisesFrom);
		const agreementsDestination = await Promise.all(promisesTo);
		const agreements = agreementsDestination.concat(agreementsSource);
		console.log('agreements', agreements);

		dispatch(getDocuments(agreements));
	} catch (err) {
		console.log('ln564', err);
		dispatch({
			type: DocumentsActionTypes.GET_DOCUMENTS_FAILURE,
			payload: err.msg
		});
	}
};

export const doUploadDocuments = (file: any) => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.UPLOAD_DOCUMENTS_LOADING });
	// const config = {
	//     headers: {
	//         'Content-type': 'application/json'
	//     }
	// };
	try {
		console.log('uploading documents', file);
		// const res = await axios.post(`${API_ENDPOINT}/documents/`, file, config);
		// dispatch(login(res.data);
		setTimeout(function () {
			dispatch(uploadDocuments());
		}, 3000);
	} catch (err) {
		console.log(err);
		dispatch({
			type: DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE,
			payload: err.msg
		});
	}
};

export const doGetSelectedDocument = (document: any) => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.GET_SELECTED_DOCUMENT_LOADING });
	let fetchedContent = '';
	if (document) {
		for await (const chunk of ipfs.cat(document.event.cid.toString())) {
			fetchedContent = uint8ArrayToString(chunk);
		}
		const jsonContent = JSON.parse(fetchedContent);

		let signatureContent = '';

		for await (const chunk of ipfs.cat(jsonContent.sigRef.cid)) {
			signatureContent = uint8ArrayToString(chunk);
		}

		document.signature = signatureContent.substr(0, 20) + '...' +
			signatureContent.substr(signatureContent.length - 20);

		// verify signature

		const fetchedPubKey = jsonContent.publicKey;

		const ec = new eddsa('ed25519');
		const key = ec.keyFromPublic(fetchedPubKey);
		const sigRef = jsonContent.sigRef;
		let sigDocument = '';
		for await (const chunk of ipfs.cat(sigRef.cid)) {
			sigDocument = uint8ArrayToString(chunk);
		}

		document.verified = key.verify(jsonContent.digest, sigDocument);
		console.log(document.signature);
	}
	dispatch(getSelectedDocument(document));
};

export const doSetAgreementFormInfo = (formInfo: any) => async (
	dispatch: any
) => {
	try {
		dispatch(setAgreementFormInfo(formInfo));
	} catch (err) {
		console.log(err);
	}
};
