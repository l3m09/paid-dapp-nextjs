import { DocumentsActionTypes } from '../actionTypes/documents'

// CREATORS

const getDocuments = () => {
    return {
        type: DocumentsActionTypes.GET_DOCUMENTS_SUCCESS
    }
}
const uploadDocuments = () => {
    return {
        type: DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS
    }
}
const getSelectedDocument = (document: any) => {
    return {
        type: DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS,
        payload: document
    }
}

// ACTIONS
export const doGetDocuments = (wallet: any) => async (dispatch: any) => {
    dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // };
    try {
        console.log('getting documents', wallet.id);
        // const res = await axios.get(`${API_ENDPOINT}/documents/`, wallet.id, config);
        // dispatch(login(res.data);
        setTimeout(function () {
            dispatch(getDocuments())
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_FAILURE, payload: err.msg });
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
            dispatch(uploadDocuments())
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE, payload: err.msg });
    }
};

export const doGetSelectedDocument = (document: any) => (dispatch: any, payload: any) => {
    dispatch(getSelectedDocument({document}));

};
