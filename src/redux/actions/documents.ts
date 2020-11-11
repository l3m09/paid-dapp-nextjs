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

		const ethersWallet = await BlockchainFactory.getWallet();
		if (!ethersWallet) {
			throw new Error('Not unlocked wallet found');
		}
		const contract = ContractFactory.getAgrementContract(ethersWallet);
		const balance = await ethersWallet.provider.getBalance(
			ethersWallet.address
		);
		console.log(`Balance of ${ethersWallet.address} is ${balance}`);
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
		const web3 = new Web3(GETH_URL);
		const { wallet } = getState();
		const { currentWallet } = wallet;
		if (!currentWallet) {
			return;
		}
		const { address } = currentWallet;
		console.log('currentWallet', currentWallet);
		const contract = new web3.eth.Contract(
			Agreement.abi as any,
			AGREEMENT_ADDRESS
		);
		const events = await contract.getPastEvents('AgreementCreated', {
			filter: { from: address },
			fromBlock: 0,
			toBlock: 'latest'
		});
		console.log('events', events);
		const promises = events.map((event) => {
			const {
				returnValues,
				signature,
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;

			const { id, from, to, agreementFormTemplateId } = returnValues;

			return new Promise(async (resolve) => {
				const agreement = await contract.methods.agreements(id).call();
				resolve({
					meta: {
						signature,
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id,
						from,
						to,
						agreementFormTemplateId
					},
					data: {
						...agreement
					}
				});
			});
		});
		const agreements = await Promise.all(promises);

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
