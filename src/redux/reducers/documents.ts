import { Console } from 'console';
import { DocumentsActionTypes } from '../actionTypes/documents';

const initialState = {
	loading: false,
	error: null,
	creatingAgreement: false,
	documentsFrom: [{
		meta: {
			logIndex: 0,
			transactionIndex: 0,
			transactionHash: '',
			blockHash: '',
			blockNumber: 0,
			address: ''
		},
		event:{
			id: '',
			from: '',
			to: '',
			agreementFormTemplateId: '',
			cid: '',
			status: '',
			created_at: 0,
			updated_at: 0,
		},
		data: {
			documentName: '',
			partyAName:'',
			partyBName:'',
			agreementForm:'',
			escrowed:'',
			validUntil: '',
			toSigner: '',
			fromSigner: ''
		}
	}],
	documentsTo: [],
	selectedDocument: null,
	agreementTypes: [
		{
			code: 'nda',
			name: 'Mutual-NDA'
		},
		{
			code: 'advisorAgreement',
			name: 'Advisor'
		},
		{
			code: 'ciia',
			name: 'CIIA'
		},
		{
			code: 'consultingAgreement',
			name: 'Consulting'
		},
		{
			code: 'referalAgreement',
			name: 'Referral'
		},
		{
			code: 'saftAgreement',
			name: 'SAFT'
		}
	],
	agreementFormInfo: {
		email: '',
		confirmEmail: '',
		name: '',
		address: '',
		phone: '',
		counterpartyEmail: '',
		counterpartyConfirmEmail: '',
		counterpartyWallet: '',
		counterpartyName: '',
		counterpartyAddress: '',
		counterpartyPhone: '',
		createdAt: null
	},
	keepMyInfo: false,
	notification: []
};

export const DocumentsReducer = function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case DocumentsActionTypes.GET_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.GET_DOCUMENTS_SUCCESS: {
			let message:string[] = [];
			const { meta } = state.documentsFrom[0];
			console.log('meta:', meta.blockNumber, state.error, state.loading);
			if ((meta.blockNumber != 0) && (state.error == null)) {
				if (state.documentsFrom.length == payload.from.length) {
					console.log('arreglos iguales');
					// loop for found change status
					for (const array_old_status of state.documentsFrom) {
						for (const array_new_status of payload.from) {
							if ((array_new_status.event.status != array_old_status.event.status) && (array_new_status.event.id == array_old_status.event.id) && (array_new_status.event.from == array_old_status.event.from) && (array_new_status.event.to == array_old_status.event.to) && (array_new_status.event.created_at == array_old_status.event.created_at)) {
								message.push('Agreement : ', array_new_status.data.documentName,'id ', array_new_status.event.id,'status changed to status: ',array_new_status.event.status);
							}
						}
					}
				} else {
					console.log('arreglos distintos');
					// loop for found change status
					for (const array_old_status of state.documentsFrom) {
						for (const array_new_status of payload.from) {
							if ((array_new_status.event.status != array_old_status.event.status) && (array_new_status.event.id == array_old_status.event.id) && (array_new_status.event.from == array_old_status.event.from) && (array_new_status.event.to == array_old_status.event.to) && (array_new_status.event.created_at == array_old_status.event.created_at)) {
								message.push('Agreement ', array_new_status.data.documentName,'id ', array_new_status.event.id,'status changed to status: ',array_new_status.event.status);
							}
						}
					}
					// loop for found new agreements
					for (const array_new_status of payload.from) {
						let found:boolean = false;
						for (const array_old_status of state.documentsFrom) {
							if (array_new_status.event.id == array_old_status.event.id) {
								found = true;
							}
						}
						if (!found) {
							message.push(array_new_status.data.partyBName,' create a new ', array_new_status.data.documentName,' Smart Agreements ');
						}
					}
				}
				console.log(message);
				if (message != []) {return { ...state, documentsFrom: payload.from, documentsTo: payload.to, loading: false, notification: message }}
			} else {
				console.log(message);
				return { ...state, documentsFrom: payload.from, documentsTo: payload.to, loading: false };
			};
		}
		case DocumentsActionTypes.GET_DOCUMENTS_FAILURE:
			return { ...state,  documentsFrom: [], documentsTo: [], error: payload, loading: false };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS: {
			return { ...state, loading: false };
		}

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE:{
			return { ...state, documentsFrom: [], documentsTo: [], error: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_FAILURE: {
			return { ...state, error: payload, loading: false  };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_FAILURE: {
			return { ...state, error: payload, loading: false  };
		}

		case DocumentsActionTypes.GET_SELECTED_DOCUMENT_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.SET_AGREEMENT_FORM_INFO: {
			let info = {
				...state.agreementFormInfo,
				...payload
			};
			
			return { ...state, agreementFormInfo: info };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_LOADING: {
			return { ...state, loading: true, creatingAgreement: true };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS: {
			return { ...state, loading: false, creatingAgreement: false };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
				creatingAgreement: false
			};
		case DocumentsActionTypes.SET_KEEP_MY_INFO:
			return {
				...state,
				loading: true,
			};
		case DocumentsActionTypes.SET_KEEP_MY_INFO_SUCCESS:
			return {
				...state,
				keepMyInfo: payload,
				loading: false
			}
		case DocumentsActionTypes.SET_KEEP_MY_INFO_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
