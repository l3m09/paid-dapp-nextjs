import { WalletActionTypes } from '../actionTypes/wallet';
import { createWalletManager } from 'cea-crypto-wallet';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const walletManager = createWalletManager();

// CREATORS
const generatePhrase = (payload: string[]) => {
	return {
		type: WalletActionTypes.GENERATE_PHRASE,
		payload
	};
};
const addWord = (payload: any) => {
	return {
		type: WalletActionTypes.ADD_WORD,
		payload
	};
};
const removeWord = (payload: any) => {
	return {
		type: WalletActionTypes.REMOVE_WORD,
		payload
	};
};
const getWallets = (payload: any[]) => {
	return {
		type: WalletActionTypes.GET_WALLETS_SUCCESS,
		payload
	};
};
const createWallet = () => {
	return {
		type: WalletActionTypes.CREATE_WALLET_SUCCESS
	};
};
const importWallet = (payload: any) => {
	return {
		type: WalletActionTypes.IMPORT_WALLET_SUCCESS,
		payload
	};
};
const exportWallet = (payload: any) => {
	return {
		type: WalletActionTypes.EXPORT_WALLET_SUCCESS,
		payload
	};
};

// ACTIONS
export const doGeneratePhrase = () => async (dispatch: any) => {
	const mnemonic = walletManager.generateMnemonic();
	const words = mnemonic.split(' ');
	dispatch(generatePhrase(words));
};

export const doAddWord = (word: any, index: any) => (
	dispatch: any,
	payload: any
) => {
	dispatch(addWord({ word, index }));
};
export const doRemoveWord = (word: any, index: any) => async (
	dispatch: any,
	payload: any
) => {
	dispatch(removeWord({ word, index }));
};

export const doGetWallets = () => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.GET_WALLETS_LOADING });
	try {
		const stored = await Storage.get({ key: 'WALLETS' });
		if (!stored || !stored.value) {
			dispatch(getWallets([]));
		} else {
			dispatch(getWallets(JSON.parse(stored.value)));
		}
	} catch (err) {
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
			dispatch(createWallet());
		}, 3000);
	} catch (err) {
		console.log(err);
		dispatch({
			type: WalletActionTypes.CREATE_WALLET_FAILURE,
			payload: err.msg
		});
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
			dispatch(importWallet(payload));
		}, 3000);
	} catch (err) {
		console.log(err);
		dispatch({
			type: WalletActionTypes.IMPORT_WALLET_FAILURE,
			payload: err.msg
		});
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
			dispatch(exportWallet(payload));
		}, 3000);
	} catch (err) {
		console.log(err);
		dispatch({
			type: WalletActionTypes.EXPORT_WALLET_FAILURE,
			payload: err.msg
		});
	}
};
