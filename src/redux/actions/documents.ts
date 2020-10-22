import { DocumentsActionTypes } from '../actionTypes/documents';
import { ethers } from 'ethers';
import { KeyStorageModel } from 'cea-crypto-wallet/dist/key-storage/KeyStorageModel';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';

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
		payload: document || { metadata: {} }
	};
};

const setAgreementFormInfo = (formInfo: any) => {
	return {
		type: DocumentsActionTypes.SET_AGREEMENT_FORM_INFO,
		payload: formInfo
	};
};

const createAgreement = (agreementId: string) => {
	return {
		type: DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS,
		payload: agreementId
	};
};

// ACTIONS
export const doCreateAgreement = (payload: {
	signatoryA: string;
	signatoryB: string;
	validUntil: number;
	agreementFormTemplateId: string;
	agreementForm: any;
}) => async (dispatch: any, getState: () => { wallet: any }) => {
	dispatch({ type: DocumentsActionTypes.CREATE_AGREEMENT_LOADING });
	try {
		const {
			signatoryA,
			signatoryB,
			validUntil,
			agreementFormTemplateId,
			agreementForm
		} = payload;

		const formId = ethers.utils.formatBytes32String(agreementFormTemplateId);
		const form = createAgreementFormPayload(agreementForm);
		const { wallet } = getState();
		const { unlockedWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs);
		const contract = ContractFactory.getAgrementContract(web3);
		const agreement = await contract.methods
			.create(signatoryA, signatoryB, validUntil, formId, form)
			.send({ from: unlockedWallet.address });
		dispatch(createAgreement(agreement));
	} catch (err) {
		console.log(err);
		dispatch({
			type: DocumentsActionTypes.CREATE_AGREEMENT_FAILURE,
			payload: err.msg
		});
	}
};

export const doGetDocuments = () => async (
	dispatch: any,
	getState: () => { wallet: any }
) => {
	dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
	try {
		const { wallet } = getState();
		const { unlockedWallet, currentWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		if (!currentWallet) {
			throw new Error('Not current wallet found');
		}

		const { address } = currentWallet;

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs);

		const contract = ContractFactory.getAgrementContract(web3);
		const events = await contract.getPastEvents('AgreementCreated', {
			filter: { from: [address], to: [address] },
			fromBlock: 0,
			toBlock: 'latest'
		});

		const agreements = events.map((data) => {
			const {
				returnValues,
				signature,
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = data;

			return {
				...returnValues,
				signature,
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			};
		});

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
	dispatch(getSelectedDocument({ document }));
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
