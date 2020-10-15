import { DocumentsActionTypes } from '../actionTypes/documents';

const initialState = {
    loading: false,
    documents: [
        {
            id: '0x0E17',
            label: 'Content block #1',
            documents: [
                {
                    id: 1,
                    name: 'aSafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'bSafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
        {
            id: '0x0E18',
            label: 'Content block #2',
            documents: [
                {
                    id: 1,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
        {
            id: '0x0E19',
            label: 'Content block #3',
            documents: [
                {
                    id: 1,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
        {
            id: '0x0E20',
            label: 'Content block #4',
            documents: [
                {
                    id: 1,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
        {
            id: '0x0E21',
            label: 'Content block #5',
            documents: [
                {
                    id: 1,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
        {
            id: '0x0E22',
            label: 'Content block #6',
            documents: [
                {
                    id: 1,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                },
                {
                    id: 2,
                    name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
                    hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
                    signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
                    type: 'application/pdf',
                    size: '748.231 kb',
                    modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
                    created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
                }
            ]
        },
    ],
    selectedDocument: {
        id: 1,
        name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
        hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
        signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
        type: 'application/pdf',
        size: '748.231 kb',
        modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
        created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
    }
};

export const DocumentsReducer = function (state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {

        case DocumentsActionTypes.GET_DOCUMENTS_LOADING:
            return { ...state, loading: true }

        case DocumentsActionTypes.GET_DOCUMENTS_SUCCESS:
            return { ...state, documents: payload, loading: false };

        case DocumentsActionTypes.GET_DOCUMENTS_FAILURE:
            return { ...state, documents: [], error: payload, loading: false};

        case DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS: {
            return { ...state, selectedDocument: payload, loading: false };

        }

        default:
            return state;
    }
}
