import { WalletActionTypes } from '../actionTypes/wallet';
import { Plugins } from '@capacitor/core';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { openSuccessDialog, openErrorDialog } from './documents';
import Web3 from 'web3';

const { Storage } = Plugins;

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

const unlockWallet = (payload: any) => {
	return {
		type: WalletActionTypes.UNLOCK_WALLET_SUCCESS,
		payload
	};
};

const connectWallet = (payload: any) => {
	return {
		type: WalletActionTypes.CONNECT_WALLET_SUCCESS,
		payload
	};
};

export const getPaidBalance = async (web3: Web3, address: any, network: any) => {
	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
	const PaidTokenContract = ContractFactory.getPaidTokenContract(web3, network);
	const token = PaidTokenContract.options.address;
	const methodFn = AgreementContract.methods.getBalanceToken(token, address);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

export const getDaiBalance = async (web3: Web3, address: any, network: any) => {
	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
	const DaiTokenContract = ContractFactory.getDaiTokenContract(web3, network);
	const token = DaiTokenContract.options.address;
	const methodFn = AgreementContract.methods.getBalanceToken(token, address);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

//Utils
const getBalanceWallet = async (web3: Web3, address: any) => {
	try{
		const balancewei = await web3.eth.getBalance(address);
		const balance = web3.utils.fromWei(balancewei);
	
		return balance;
	}
	catch(ex){
		console.log(ex);
	}
}

export const doConnectWallet = (ethereum:any, history:any
) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.CONNECT_WALLET_LOADING });
	try {
		if (ethereum === undefined) {
			dispatch(openErrorDialog('Failure to detect your Wallet, pls check is Installed'))
			history.push('/');
		} else {
			const connected = ethereum.isConnected();
			const metamask = true;
			if ((connected === true) && (metamask === true)) {
				// build currentWallet / connectedWallet Element
				const metaInstance = await BlockchainFactory.getWeb3Mask(ethereum);
				const network = await BlockchainFactory.getNetwork(metaInstance.network);
				if ((network != 'testnet') && (network != 'bsc-mainnet')) {
					alert('This MPV only work in Binance Smart Chain');
					history.push('/');
					dispatch(openSuccessDialog('This MPV only work in Binance Smart Chain'));
				}
				console.log('doConnect Wallet', network);
				window.web3 = metaInstance?.web3Instance;
				const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
				.then(async (addresses)=>{
					const address = addresses[0];
					const balance = await getBalanceWallet(metaInstance?.web3Instance, address);
					let paidBalance:string, daiBalance: string;
					if (network === "rinkeby") {
						paidBalance = await getPaidBalance(metaInstance?.web3Instance, address, network);
					    daiBalance = await getDaiBalance(metaInstance?.web3Instance, address, network);
					} else {
						paidBalance = '0';
						daiBalance = '0';
					}
					const referenceWallet = {
						web3: metaInstance?.web3Instance,
						address,
						balance: balance,
						balanceToken: paidBalance,
						balanceDaiToken: daiBalance,
						network,
					};
					dispatch(connectWallet(referenceWallet));
					console.log('connect metamask successfully');
					history.push('/documents');
				})
				.catch((error:any) => {
					if ((error.code === 4001) || (error.code === 4100) || (error.code === 4200) || (error.code === 4900) || (error.code === 4901))  {
						// EIP-1193 userRejectedRequest error
						alert('Reject Unlocked Wallet in Metamask');
						dispatch(openSuccessDialog('Reject Unlocked Wallet in Metamask'));
						history.push('/');
					} else if (error.code === -32002) {
						alert('Pls Unlock Wallet in Metamask');
						dispatch(openSuccessDialog('Pls Unlock Wallet in Metamask'));
						history.push('/');
					} else {
						alert('Error code out to EIP-1193');
						dispatch(openSuccessDialog(error.message));
						throw new Error('Error code out to EIP-1193');
					}
				});
			// } else if ((connected == true) && (metamask == false)) {
			// 	// build currentWallet / connectedWallet Element
			// 	const metaInstance = await BlockchainFactory.getWeb3Mask(ethereum);
			// 	const network = await BlockchainFactory.getNetwork(metaInstance.network);
			// 	window.web3 = metaInstance?.web3Instance;
			// 	const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
			// 	.then(async (addresses)=>{
			// 		// Get Address
			// 		const address = addresses[0];
			// 		// Get Balance of Wallet and Token
			// 		const balance = await getBalanceWallet(metaInstance?.web3Instance, address);
			// 		let paidBalance:string, daiBalance: string;
			// 		if (network === "rinkeby")  {
			// 			paidBalance = await getPaidBalance(metaInstance?.web3Instance, address, network);
			// 		    daiBalance = await getDaiBalance(metaInstance?.web3Instance, address, network);
			// 		} else {
			// 			paidBalance = '0';
			// 			daiBalance = '0';
			// 		}
			// 		const referenceWallet = {
			// 			address,
			// 			balance: balance,
			// 			balanceToken: paidBalance,
			// 			balanceDaiToken: daiBalance,
			// 			network,
			// 		};
			// 		dispatch(connectWallet(referenceWallet));
			// 		console.log('connect with wallet successfully');
			// 		history.push('/documents');
			// 	})
			// 	.catch((error:any) => {
			// 		if ((error.code === 4001) || (error.code === 4100) || (error.code === 4200) || (error.code === 4900) || (error.code === 4901))  {
			// 			// EIP-1193 userRejectedRequest error
			// 			console.log('Reject Unlocked Wallet');
			// 			dispatch(openErrorDialog('Reject Unlocked Wallet'));
			// 			history.push('/');
			// 		} else {
			// 			console.error('Error code out to EIP-1193',error);
			// 			dispatch(openErrorDialog(error.message));
			// 			throw new Error('Error code out to EIP-1193');
			// 		}
			// 	});
			} else {
				let err:any
				err.message = 'Failure to Connect Provider Wallet';
				console.log(err.message);
				dispatch(openErrorDialog(err.message));
				dispatch({
					type: WalletActionTypes.CONNECT_WALLET_FAILURE,
					payload: err.message
				});
			}
		}
	} catch (err) {
		// alert(err.message);
		dispatch(openErrorDialog(err.message));
		dispatch({
			type: WalletActionTypes.CONNECT_WALLET_FAILURE,
			payload: err.message
		});
	}
}



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
		dispatch(setCurrentToken(token));
	} catch (err) {
		dispatch({
			type: WalletActionTypes.SET_SELECTED_WALLET_TOKEN_FAILURE,
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
