import { WalletActionTypes } from '../actionTypes/wallet';
import { Plugins } from '@capacitor/core';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ethers } from 'ethers';
const { Storage } = Plugins;

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

const setCurrentWallet = (payload: any) => {
	return {
		type: WalletActionTypes.SET_CURRENT_WALLET_SUCCESS,
		payload
	};
};

const getCurrentWallet = (payload: any) => {
	return {
		type: WalletActionTypes.GET_CURRENT_WALLET_SUCCESS,
		payload
	};
};

const setSelectedWallet = (payload: any) => {
	return {
		type: WalletActionTypes.SET_SELECTED_WALLET_SUCCESS,
		payload
	};
};

const createWallet = (payload: any) => {
	return {
		type: WalletActionTypes.CREATE_WALLET_SUCCESS,
		payload
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

const unlockWallet = (payload: any) => {
	return {
		type: WalletActionTypes.UNLOCK_WALLET_SUCCESS,
		payload
	};
};

// ACTIONS
export const doUnlockWallet = (payload: {
	walletId: string;
	password: string;
}) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.UNLOCK_WALLET_LOADING });
	try {
		const { walletId, password } = payload;
		const walletManager = BlockchainFactory.getWalletManager();
		const ks = await walletManager.unlockWallet(walletId, password);
		if (!ks) {
			dispatch({
				type: WalletActionTypes.UNLOCK_WALLET_FAILURE,
				payload: 'Unlock wallet failure, check password and wallet'
			});
		} else {
			const address = ethers.Wallet.fromMnemonic(ks.mnemonic).address;
			BlockchainFactory.setKeystore(ks);
			dispatch(unlockWallet(address));
		}
	} catch (err) {
		dispatch({
			type: WalletActionTypes.UNLOCK_WALLET_FAILURE,
			payload: err.msg
		});
	}
};

export const doGeneratePhrase = () => async (dispatch: any) => {
	const walletManager = BlockchainFactory.getWalletManager();
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

export const doGetCurrentWallet = () => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.GET_CURRENT_WALLET_LOADING });
	try {
		const stored = await Storage.get({ key: 'CURRENT_WALLET' });
		if (!stored || !stored.value) {
			dispatch(getCurrentWallet(null));
		} else {
			const wallet = JSON.parse(stored.value);
			dispatch(getCurrentWallet(wallet));
		}
	} catch (err) {
		dispatch({
			type: WalletActionTypes.GET_CURRENT_WALLET_FAILURE,
			payload: err.msg
		});
	}
};

export const doSetCurrentWallet = (wallet: any) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET_LOADING });
	try {
		const encoded = JSON.stringify(wallet);
		await Storage.set({ key: 'CURRENT_WALLET', value: encoded });
		dispatch(setCurrentWallet(wallet));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.SET_CURRENT_WALLET_FAILURE,
			payload: err.msg
		});
	}
};

export const doCreateWallet = (payload: {
	name: string;
	mnemonic: string;
	password: string;
}) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.CREATE_WALLET_LOADING });
	try {
		const { name, password, mnemonic } = payload;
		const walletManager = BlockchainFactory.getWalletManager();
		const ks = await walletManager.createWallet(password, mnemonic);
		BlockchainFactory.setKeystore(ks);
		const { _id, created } = ks;
		const address = ethers.Wallet.fromMnemonic(ks.mnemonic).address;

		const referenceWallet = {
			_id,
			address,
			name,
			created: created.toString()
		};

		const encoded = JSON.stringify(referenceWallet);
		await Storage.set({ key: 'CURRENT_WALLET', value: encoded });
		const stored = await Storage.get({ key: 'WALLETS' });
		const encodedList = stored.value ? stored.value : `[]`;
		const wallets: any[] = JSON.parse(encodedList);
		wallets.push(referenceWallet);
		const encodedWallets = JSON.stringify(wallets);
		await Storage.set({ key: 'WALLETS', value: encodedWallets });

		dispatch(createWallet(referenceWallet));
		dispatch(unlockWallet(address));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.CREATE_WALLET_FAILURE,
			payload: err.msg
		});
	}
};

export const doImportWallet = (payload: {
	name: string;
	mnemonic: string;
	password: string;
}) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.IMPORT_WALLET_LOADING });
	try {
		const { name, password, mnemonic } = payload;
		const walletManager = BlockchainFactory.getWalletManager();
		const ks = await walletManager.createWallet(password, mnemonic);
		const { _id, created } = ks;
		const address = ethers.Wallet.fromMnemonic(ks.mnemonic).address;
		dispatch(
			importWallet({
				_id,
				address,
				name,
				created: created.toString()
			})
		);
		const importedWallet = {
			_id,
			address,
			name
		};
		const stored = await Storage.get({ key: 'WALLETS' });
		const encodedList = stored.value ? stored.value : `[]`;
		const wallets: any[] = JSON.parse(encodedList);
		wallets.push(importedWallet);
		const encodedWallets = JSON.stringify(wallets);
		await Storage.set({ key: 'WALLETS', value: encodedWallets });

		dispatch(doSetCurrentWallet(importedWallet));
		dispatch(unlockWallet(address));
	} catch (err) {
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

export const doSetSelectedWallet = (wallet: any) => async (dispatch: any) => {
	dispatch(setSelectedWallet(wallet));
};
