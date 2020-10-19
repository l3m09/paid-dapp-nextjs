import { DocumentsActionTypes } from '../actionTypes/documents';

const IPFS_ENDPOINT = 'https://api.pinata.cloud';
const PINATA_API_KEY = '934e8eeeaef5de746e02';
const PINATA_SECRET_API_KEY =
	'33db6417d1708b0e6abeb45a0a49435348e8304ca43036197e872b68c5f55d02';
// CREATORS

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

// ACTIONS
export const doGetDocuments = (wallet: any) => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
	const headers = {
		pinata_api_key: PINATA_API_KEY,
		pinata_secret_api_key: PINATA_SECRET_API_KEY
	};
	try {
		const response = await fetch(`${IPFS_ENDPOINT}/data/pinList`, {
			headers
		});
		const { rows } = await response.json();
		dispatch(getDocuments(rows));
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

export const doGetSelectedDocument = (document: any) => (
	dispatch: any,
	payload: any
) => {
	dispatch(getSelectedDocument({ document }));
};
