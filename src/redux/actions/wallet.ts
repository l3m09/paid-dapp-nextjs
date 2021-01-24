import { WalletActionTypes } from '../actionTypes/wallet';
import { Plugins } from '@capacitor/core';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { Sessions } from '../../utils/sessions';
import { wallet } from 'ionicons/icons';
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

const addNamePassPhrase = (payload: any) => {
	return {
		type: WalletActionTypes.ADD_NAME_PASSPHRASE,
		payload,
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

const setCurrentToken = (payload: any) => {
	return {
		type: WalletActionTypes.SET_SELECTED_WALLET_TOKEN_SUCCESS,
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


export const getPaidBalance = async (ethereum: any) => {
	const addresses = await ethereum.request({ method: 'eth_requestAccounts' });
	const address = addresses[0];
	const _walletModel = await BlockchainFactory.getWeb3Mask(ethereum);
	const walletModel = _walletModel!;
	const web3 = walletModel.web3Instance;
	const network = await BlockchainFactory.getNetwork(walletModel.network);

	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
	const PaidTokenContract = ContractFactory.getPaidTokenContract(web3, network);
	const token = PaidTokenContract.options.address;
	console.log('address token', token);
	const methodFn = AgreementContract.methods.getBalanceToken(token, address);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

export const getDaiBalance = async (ethereum: any) => {
	const addresses = await ethereum.request({ method: 'eth_requestAccounts' });
	const address = addresses[0];
	const _walletModel = await BlockchainFactory.getWeb3Mask(ethereum);
	const walletModel = _walletModel;
	const web3 = walletModel.web3Instance;
	const network = await BlockchainFactory.getNetwork(walletModel.network);

	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
	const DaiTokenContract = ContractFactory.getDaiTokenContract(web3, network);
	const token = DaiTokenContract.options.address;
	console.log('address token', token);
	const methodFn = AgreementContract.methods.getBalanceToken(token, address);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

//Utils
const getBalanceWallet = async (walletId: string, password: string) => {
	try{
		const wallet = BlockchainFactory.getWalletManager();
		const address = await wallet.getWalletAddress(walletId);
		const _walletModel = await BlockchainFactory.getWeb3Instance(address, walletId, password);
		const web3 = _walletModel!.web3Instance;
		const balancewei = await web3.eth.getBalance(address);
		const balance = web3.utils.fromWei(balancewei);
	
		return balance;
	}
	catch(ex){
		console.log(ex);
	}
}

// ACTIONS
export const doUnlockWallet = (payload: {
	wallet: any;
	password: string;
}) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.UNLOCK_WALLET_LOADING });
	try {
		const { wallet, password } = payload;
		const walletManager = BlockchainFactory.getWalletManager();

		const ks = await walletManager.unlockWallet(wallet._id, password);
		
		if (!ks) {
			dispatch({
				type: WalletActionTypes.UNLOCK_WALLET_FAILURE,
				payload: 'Unlock wallet failure, check password and wallet'
			});
		} else {
			// const { address } = wallet;
			BlockchainFactory.setKeystore(ks);
			const balance = await getBalanceWallet(wallet._id, password);
			const paidBalance = await getPaidBalance(window.ethereum);
			const daiBalance = await getDaiBalance(window.ethereum);
			const walletWithBalance = {...wallet, balance: balance ?? '0', balanceToken: paidBalance ?? '0', balanceDaiToken: daiBalance ?? '0', password};
			const value = JSON.stringify(walletWithBalance);
			const stored: any = await Storage.get({ key: 'WALLETS' });
			console.log('CURRENT_WALLET_ACTIONS', value);
			await Storage.set({ key: 'CURRENT_WALLET', value });
			dispatch(unlockWallet(walletWithBalance));
			if (stored || stored.value) {
				const currentWallets = JSON.parse(stored.value);
				const currentWalletsWithBalance = currentWallets.map((currentWallet: any) => {
					if (currentWallet.address === walletWithBalance.address) {
						return {...currentWallet, balance: balance ?? '0',balanceToken: paidBalance ?? '0', balanceDaiToken: daiBalance ?? '0'}
					} else {
						return currentWallet;
					}
				});
				const walletsString = JSON.stringify(currentWalletsWithBalance);
				await Storage.set({ key: 'WALLETS', value: walletsString });
				Sessions.setTimeoutCall();
				dispatch(getWallets((currentWalletsWithBalance)));
			}
		}
	} catch (err) {
		dispatch({
			type: WalletActionTypes.UNLOCK_WALLET_FAILURE,
			payload: err.message
		});
	}
};

export const doGeneratePhrase = () => async (dispatch: any) => {
	const walletManager = BlockchainFactory.getWalletManager();
	const mnemonic = walletManager.generateMnemonic();
	const words = mnemonic.split(' ');
	dispatch(generatePhrase(words));
};

export const doAddWord = (word: any) => (
	dispatch: any,
	payload: any
) => {
	dispatch(addWord({ word }));
};
export const doRemoveWord = (word: any, index: any) => async (
	dispatch: any,
	payload: any
) => {
	dispatch(removeWord({ word, index }));
};

export const doAddNamePassPharse = (name: any, passphrase: any) => async (
	dispatch: any,
	payload: any
) => {
	dispatch(addNamePassPhrase({ name, passphrase }));
};

export const doGetWallets = () => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.GET_WALLETS_LOADING });
	try {
		const stored = await Storage.get({ key: 'WALLETS' });
		if (!stored || !stored.value) {
			dispatch(getWallets([]));
		} else {
			dispatch(getWallets((JSON.parse(stored.value))));
		}
	} catch (err) {
		dispatch({ 
			type: WalletActionTypes.GET_WALLETS_FAILURE, 
			payload: err.message 
		});
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
			dispatch(getCurrentWallet(wallet.address));
		}
	} catch (err) {
		dispatch({
			type: WalletActionTypes.GET_CURRENT_WALLET_FAILURE,
			payload: err.message
		});
	}
};

export const doSetCurrentWallet = (wallet: any) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET_LOADING });
	try {
		const value = JSON.stringify(wallet);

		await Storage.set({ key: 'CURRENT_WALLET', value });
		console.log('CURRENT_WALLET', wallet.address);
		dispatch(setCurrentWallet(wallet));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.SET_CURRENT_WALLET_FAILURE,
			payload: err.message
		});
	}
};

export const doSetCurrentToken = (token: string) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.SET_SELECTED_WALLET_TOKEN_LOADING });
	try {
		const value = token;
		await Storage.set({ key: 'CURRENT_TOKEN', value });
		console.log('CURRENT_TOKEN', token);
		dispatch(setCurrentToken(token));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.SET_SELECTED_WALLET_TOKEN_FAILURE,
			payload: err.message
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
		const wallet = await walletManager.createWallet(password, mnemonic);
		const { _id, created } = wallet;
		const address = await walletManager.getWalletAddress(_id);

		const referenceWallet = {
			_id,
			address,
			name,
			balance: '0',
			balanceToken: '0',
			balanceDaiToken: '0',
			created: created.toString(),
			password
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
	} catch (err) {
		dispatch({
			type: WalletActionTypes.CREATE_WALLET_FAILURE,
			payload: err.message
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
		const wallet = await walletManager.createWallet(password, mnemonic);
		const { _id, created } = wallet;
		const address = await walletManager.getWalletAddress(_id);
		const balance = await getBalanceWallet(_id, password);
		const paidBalance = await getPaidBalance(window.ethereum);
		const daiBalance = await getDaiBalance(window.ethereum);

		const referenceWallet = {
			_id,
			address,
			name,
			balance: balance ?? '0',
			balanceToken: paidBalance ?? '0',
			balanceDaiToken: daiBalance ?? '0',
			created: created.toString(),
			password
		};

		const encoded = JSON.stringify(referenceWallet);
		await Storage.set({ key: 'CURRENT_WALLET', value: encoded });
		const stored = await Storage.get({ key: 'WALLETS' });
		const encodedList = stored.value ? stored.value : `[]`;
		const wallets: any[] = JSON.parse(encodedList);
		wallets.push(referenceWallet);
		const encodedWallets = JSON.stringify(wallets);
		await Storage.set({ key: 'WALLETS', value: encodedWallets });

		const createdWallet = {
			...referenceWallet
		};
		
		dispatch(
			importWallet(referenceWallet)
		);
		dispatch(unlockWallet(createdWallet));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.IMPORT_WALLET_FAILURE,
			payload: err.message
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
			payload: err.message
		});
	}
};

export const doSetSelectedWallet = (wallet: any) => async (dispatch: any) => {
	dispatch(setSelectedWallet(wallet));
};

export const doShowMyCurrentWallet = (show: boolean) => (dispatch: any) => {
	dispatch({ type: WalletActionTypes.SHOW_MY_CURRENT_WALLET, payload: show });
};
