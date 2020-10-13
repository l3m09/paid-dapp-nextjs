import { WalletActionTypes } from '../actionTypes/wallet'

const words = ['glide', 'slim', 'edit', 'jacket', 'suit', 'stock', 'vast', 'gym',
    'index', 'square', 'people', 'glide', 'slim', 'jacket', 'model', 'suit', 'vast',
    'answer', 'increase', 'miss', 'people', 'edit', 'model', 'stock', 'answer',
    'increase', 'gym', 'index', 'miss', 'square', 'lorem', 'ipsum', 'dolor',
    'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'magnam',
    'nulla', 'quas', 'quos', 'unde', 'Ab', 'consectetur', 'cupiditate',
    'delectus', 'deleniti', 'dolorem', 'error', 'esse', 'libero', 'nobis',
    'placeat', 'quas', 'repellat', 'sit', 'tenetur', 'veniam'];

function selectWords () {
    let phrase = [];
    for (let i = 0; i < 12; i+=1) {
        phrase.push(words[Math.floor(Math.random() * Math.floor(words.length))])
    }
    return phrase
}

// CREATORS
const generatePhrase = (payload: any) => {
    return {
        type: WalletActionTypes.GENERATE_PHRASE,
        payload
    }
}
const addWord = (payload: any) => {
    return {
        type: WalletActionTypes.ADD_WORD,
        payload
    }
}
const removeWord = (payload: any) => {
    return {
        type: WalletActionTypes.REMOVE_WORD,
        payload
    }
}
const getWallets = () => {
    return {
        type: WalletActionTypes.GET_WALLETS_SUCCESS
    }
}
const createWallet = () => {
    return {
        type: WalletActionTypes.CREATE_WALLET_SUCCESS
    }
}
const importWallet = (payload: any) => {
    return {
        type: WalletActionTypes.IMPORT_WALLET_SUCCESS,
        payload
    }
}
const exportWallet = (payload: any) => {
    return {
        type: WalletActionTypes.EXPORT_WALLET_SUCCESS,
        payload
    }
}


// ACTIONS
export const doGeneratePhrase = () => async (dispatch: any) => {
    let words = selectWords()
    dispatch(generatePhrase(words));
};
export const doAddWord = (word: any, index: any) => (dispatch: any, payload: any) => {
    dispatch(addWord({word, index}));

};
export const doRemoveWord = (word: any, index: any) => async (dispatch: any, payload: any) => {
    dispatch(removeWord({word, index}));

};

export const doGetWallets = () => async (dispatch: any) => {
    dispatch({ type: WalletActionTypes.GET_WALLETS_LOADING });
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // };
    try {
        console.log('getting wallets');
        // const res = await axios.post(`${API_ENDPOINT}/wallet/create`, loginForm, config);
        // dispatch(login(res.data);
        setTimeout(function () {
            dispatch(getWallets())
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: WalletActionTypes.GET_WALLETS_FAILURE, payload: err.msg });
    }
};

export const doCreateWallet = () => async (dispatch: any) => {
    dispatch({ type: WalletActionTypes.CREATE_WALLET_LOADING });
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // };
    try {
        console.log('creating wallet');
        // const res = await axios.post(`${API_ENDPOINT}/wallet/create`, loginForm, config);
        // dispatch(login(res.data);
        setTimeout(function () {
            dispatch(createWallet())
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: WalletActionTypes.CREATE_WALLET_FAILURE, payload: err.msg });
    }
};

export const doImportWallet = (payload: any) => async (dispatch: any) => {
    dispatch({ type: WalletActionTypes.IMPORT_WALLET_LOADING });
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // };
    try {
        console.log('importing wallet');
        // const res = await axios.post(`${API_ENDPOINT}/wallet/import`, loginForm, config);
        // dispatch(login(res.data);
        setTimeout(function () {
            dispatch(importWallet(payload))
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: WalletActionTypes.IMPORT_WALLET_FAILURE, payload: err.msg });
    }
};

export const doExportWallet = (payload: any) => async (dispatch: any) => {
    dispatch({ type: WalletActionTypes.EXPORT_WALLET_LOADING });
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // };
    try {
        console.log('exporting wallet');
        // const res = await axios.post(`${API_ENDPOINT}/wallet/export`, loginForm, config);
        // dispatch(login(res.data);
        setTimeout(function () {
            dispatch(exportWallet(payload))
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: WalletActionTypes.EXPORT_WALLET_FAILURE, payload: err.msg });
    }
};
