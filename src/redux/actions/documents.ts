import { agreementsRef } from './firebase';
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
import { DocumentsActionTypes } from '../actionTypes/documents';
import { BigNumber as BN ,ethers, Wallet } from 'ethers';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { base64StringToBlob } from 'blob-util';
import { AlgorithmType, CEASigningService, WalletManager } from 'paid-universal-wallet';
import { eddsa } from "elliptic";

import { templateRender } from './template/template';

const uint8ArrayToString = require('uint8arrays/to-string');
const BigNumber = require('bignumber.js');
const ipfsClient = require('ipfs-http-client');

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

const getDocuments = (agreementsFrom: any[], agreementsTo: any[]) => {
	const payload = {
		from: agreementsFrom,
		to:agreementsTo
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
		// const onchainWalletAddress = window.ethereum.selectedAddress;

		const address = manager.getWalletAddress(rawWallet.mnemonic);
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs, rawWallet.mnemonic);
		const network = await BlockchainFactory.getNetwork(web3);

		if (!web3.utils.isAddress(agreementForm.counterpartyWallet)) {
			alert('Invalid Counter Party Address');
			throw new Error('Invalid Counter Party Address');
		}

		const today = new Date();
		const template = templateRender({
			party_name: agreementForm.name,
			party_wallet: address,
			party_address: agreementForm.address,
			counterparty_name: agreementForm.counterpartyName,
			counterparty_wallet: agreementForm.counterpartyWallet,
			counterparty_address: agreementForm.counterpartyAddress,
			create_date: today.toLocaleDateString()
		});
		let balance:string;
		await web3.eth.getBalance(address).then((balancewei) =>{
			balance = web3.utils.fromWei(balancewei);
			const parsedBalance = BigNumber(balance);
			console.log(parsedBalance);
			if ((parsedBalance.c[0] <= 0) && (parsedBalance.c[1] <= 9999999999)) {
				throw new Error('The wallet should has balance to send a transaction.');
			}
			console.log('Current_Wallet_Documents', address,'agreementForm', agreementForm);
		})

		console.log('Current_Wallet_Documents', address,'agreementForm', agreementForm);
		// ALICE SIDE
		const content = template();
		const blobContent = base64StringToBlob(btoa(unescape(encodeURIComponent(content))), 'application/pdf');
		const ceass = new CEASigningService();
		ceass.useKeyStorage(rawWallet);

		const arrayContent = btoa(unescape(encodeURIComponent(content)));
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
		const AgreementContract = ContractFactory.getAgreementContract(web3, network);
		const methodFn = AgreementContract.methods.partyCreate(
			validUntil,
			agreementForm.counterpartyWallet,
			ipfsHash.toString(),
			formId,
			form,
			'0x' + digest);

		const gas = await methodFn.estimateGas();

		Promise.resolve(gas).then(async (gas:any) => {
			console.log(gas+5e4);
			const agreementTransaction = await methodFn.send({ from: address, gas:gas+5e4, gasPrice: 50e9 })
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
		});
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
		const network = await BlockchainFactory.getNetwork(web3);

		const agreementContract = ContractFactory.getAgreementContract(web3, network);

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
			const agreementId = (id as BN).toString();

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
						validUntil: (validUntil as BN).toString(),
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
			const agreementId = (id as BN).toString();
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
						validUntil: (validUntil as BN).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});
		const agreementsSource = await Promise.all(promisesFrom);
		const agreementsDestination = await Promise.all(promisesTo);
		// const agreements = agreementsDestination.concat(agreementsSource);
		console.log('agreementsFrom', agreementsSource, 'agreementsTo', agreementsDestination);

		dispatch(getDocuments(agreementsSource, agreementsDestination));
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
