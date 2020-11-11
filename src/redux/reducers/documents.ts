import { DocumentsActionTypes } from '../actionTypes/documents';

const initialState = {
	loading: false,
	documents: [],
	selectedDocument: null,
	agreementTypes: ['Vehicle', 'Rental'],
	agreementFormInfo: {
		name: '',
		address: '',
		phone: '',
		counterpartyWallet: '',
		counterpartyName: '',
		counterpartyAddress: '',
		counterpartyPhone: '',
		createdAt: null
	}
};

export const DocumentsReducer = function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case DocumentsActionTypes.GET_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.GET_DOCUMENTS_SUCCESS:
			return { ...state, documents: payload, loading: false };

		case DocumentsActionTypes.GET_DOCUMENTS_FAILURE:
			return { ...state, documents: [], error: payload, loading: false };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS: {
			console.log('UPLOAD_DOCUMENTS_SUCCESS', payload);

			return { ...state, loading: false };
		}

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE:
			return { ...state, documents: [], error: payload, loading: false };

		case DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS: {
			return { ...state, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.SET_AGREEMENT_FORM_INFO: {
			let info = {
				...state.agreementFormInfo,
				...payload
			}
			return { ...state, agreementFormInfo: info };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS: {
			return { ...state, loading: false };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_FAILURE:
			return { ...state, error: payload, loading: false };

		default:
			return state;
	}
};
