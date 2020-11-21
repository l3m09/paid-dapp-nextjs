import { DocumentsActionTypes } from '../actionTypes/documents';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { base64StringToBlob } from 'blob-util';
import { AlgorithmType, CEASigningService } from 'paid-universal-wallet';
import { eddsa } from "elliptic";

const uint8ArrayToString = require('uint8arrays/to-string')

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });

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

const getDocuments = (payload: any[]) => {
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
			signatoryA,
			signatoryB,
			validUntil,
			agreementFormTemplateId,
			agreementForm,
			slideNext,
			slideBack
		} = payload;


		const formId = ethers.utils.formatBytes32String(agreementFormTemplateId);
		const form = createAgreementFormPayload(agreementForm);

		const ethersWallet = await BlockchainFactory.getWallet2();
		
		if (!ethersWallet) {
			await slideBack();
			alert('Not unlocked wallet found');
			throw new Error('Not unlocked wallet found');
		}
		const contract = ContractFactory.getAgrementContract(ethersWallet.wallet);
		const balance = await ethersWallet.wallet.provider.getBalance(
			ethersWallet.wallet.address
		);

		const parsedBalance = BigNumber.from(balance);
		if (parsedBalance.lte(0)) {
			throw new Error('The wallet should has balance to send a transaction.');
		}

		const gasPrice = await contract.estimateGas.create(
			signatoryA,
			signatoryB,
			validUntil,
			formId,
			form
		);

		const agreementTransaction: ContractTransaction = await contract.create(
			signatoryA,
			signatoryB,
			validUntil,
			formId,
			form
		);

		agreementTransaction.gasPrice = gasPrice;
		
		// ALICE SIDE
		const content = '<html>THIS IS A TEST</html>';
		const blobContent = base64StringToBlob(btoa(content), 'application/pdf');
		const ceass = new CEASigningService();
		ceass.useKeyStorage(ethersWallet.keystore);
		
		const arrayContent = btoa(content);
		const bytesContent = ethers.utils.toUtf8Bytes(arrayContent);
		const digest = ethers.utils.sha256(bytesContent).replace('0x', '');
		
		const ec_alice = new eddsa('ed25519');

		const signer = ec_alice.keyFromSecret(ethersWallet.keystore.keypairs.ED25519);
		const signature = signer
			.sign(digest)
			.toHex();

		const pubKey = signer.getPublic();
		
		const opts = { create: true, parents: true };

		let ipfsHash = await uploadsIPFS(ipfs, blobContent, opts, digest, signature, pubKey, null);
		
		console.log(ipfsHash.toString());
		//const tx = await simpleContract.set(ipfsHash);
		
		///---------------------------------------------------------------------------------------------------
		// BOB SIDE

		let fetchedContent = '';
		for await (const chunk of ipfs.cat(ipfsHash.toString())) {
			fetchedContent = uint8ArrayToString(chunk);
		}
		const jsonContent = JSON.parse(fetchedContent);
		const fetchedPubKey = jsonContent.publicKey;

		const ec_bob = new eddsa('ed25519');
		
		const key = ec_bob.keyFromPublic(fetchedPubKey);


		new Promise(async (resolve) => {
			await agreementTransaction.wait().then((receipt) => {
				console.log('Transaction receipt', receipt);
				if (receipt.status === 1) {
					dispatch(createAgreement());
					slideNext();
					resolve();
				} else {
					slideBack();
					alert('Transaction failed');
					throw new Error('Transaction failed');
				}
			});
		});
	} catch (err) {
		await payload.slideBack();
		alert(err.message);
		console.log(err);
		dispatch({
			type: DocumentsActionTypes.CREATE_AGREEMENT_FAILURE,
			payload: err.msg
		});
	}
};

export const uploadsIPFS = async (ipfs: any, blobContent: any, opts: any, 
	_digest: string, sigArray: any, pubKey: any, parent: any = null) => {
	const createCIDHash = (fileEntry: any) => {
		return { path: fileEntry.path, cid: fileEntry.cid.toString() }
	}

	const fileContent = await ipfs.add(blobContent);
	const fileSignature = await ipfs.add(sigArray);
	const index = { contentRef: createCIDHash(fileContent), sigRef: createCIDHash(fileSignature), digest: _digest, 
		publicKey: pubKey, parent: parent };

	const fileIndex = await ipfs.add(JSON.stringify(index));
	return fileIndex.cid;
}

export const doGetDocuments = () => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
	try {
		const ethersWallet = await BlockchainFactory.getWallet();
		if (!ethersWallet) {
			throw new Error('Not unlocked wallet found');
		}
		const contract = ContractFactory.getAgrementContract(ethersWallet);
		const filter = contract.filters.AgreementCreated(
			null,
			null,
			ethersWallet.address
		);

		const events = await contract.queryFilter(filter);
		const promises = events.map((event) => {
			const { args } = contract.interface.parseLog(event);

			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, from, to, agreementFormTemplateId } = args;
			const agreementId = (id as BigNumber).toString();
			return new Promise(async (resolve) => {
				const agreement = await contract.agreements(id);
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
						from,
						to,
						agreementFormTemplateId
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
		const agreements = await Promise.all(promises);
		console.log('agreements', agreements);
		dispatch(getDocuments(agreements));
	} catch (err) {
		console.log(err);
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

export const doGetSelectedDocument = (document: any) => (dispatch: any) => {
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
