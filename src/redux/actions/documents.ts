import { DocumentsActionTypes } from '../actionTypes/documents';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
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
	slideNext: () => Promise<void>
	slideBack: () => Promise<void>
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

		const ethersWallet = await BlockchainFactory.getWallet();
		if (!ethersWallet) {
			await slideBack()
			alert('Not unlocked wallet found')
			throw new Error('Not unlocked wallet found');
		}
		const contract = ContractFactory.getAgrementContract(ethersWallet);
		const balance = await ethersWallet.provider.getBalance(
			ethersWallet.address
		);
		console.log(`Balance of ${ethersWallet.address} is ${balance}`);
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

		new Promise(async (resolve) => {
			await agreementTransaction.wait().then((receipt) => {
				console.log('Transaction receipt', receipt);
				if (receipt.status === 1) {
					dispatch(createAgreement());
					slideNext()
					resolve();
				} else {
					slideBack()
					alert('Transaction failed')
					throw new Error('Transaction failed');
				}
			});

		});

	} catch (err) {
		await payload.slideBack()
		alert('Transaction failed')
		console.log(err);
		dispatch({
			type: DocumentsActionTypes.CREATE_AGREEMENT_FAILURE,
			payload: err.msg
		});
	}
};

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
