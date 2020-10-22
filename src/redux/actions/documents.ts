import { DocumentsActionTypes } from '../actionTypes/documents';
import { ContractTransaction, ethers } from 'ethers';
import { BlockchainFactory, GETH_URL } from '../../utils/blockchainFactory';
import {
	AGREEMENT_ADDRESS,
	ContractFactory
} from '../../utils/contractFactory';
import Web3 from 'web3';
import Agreement from '../../contracts/Agreement.json';

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

const createAgreement = () => {
	return {
		type: DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS
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

		const ethersWallet = await BlockchainFactory.getWallet(unlockedWallet._id);
		const contract = ContractFactory.getAgrementContract(ethersWallet);
		const balance = await ethersWallet.provider.getBalance(
			unlockedWallet.address
		);
		console.log(`Balance of ${unlockedWallet.address} is ${balance}`);
		const agreementTransaction: ContractTransaction = await contract.create(
			signatoryA,
			signatoryB,
			validUntil,
			formId,
			form
		);
		const receipt = await agreementTransaction.wait();
		console.log('Transaction receipt', receipt);
		if (receipt.status === 1) {
			dispatch(createAgreement());
		} else {
			throw new Error('Transaction failed');
		}
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
			// throw new Error('Not unlocked wallet found');
		}

		if (!currentWallet) {
			// throw new Error('Not current wallet found');
		}

		// const { address } = currentWallet;
		const web3 = new Web3(GETH_URL);

		const contract = new web3.eth.Contract(
			Agreement.abi as any,
			AGREEMENT_ADDRESS
		);
		const events = await contract.getPastEvents('AgreementCreated');
		console.log('events', events);
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
