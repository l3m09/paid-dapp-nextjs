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
	const PaidTokenContract = ContractFactory.getPaidTokenContract(web3, network);
	const methodFn = PaidTokenContract.methods.balanceOf(address);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

// export const getDaiBalance = async (web3: Web3, address: any, network: any) => {
// 	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
// 	const DaiTokenContract = ContractFactory.getDaiTokenContract(web3, network);
// 	const token = DaiTokenContract.options.address;
// 	const methodFn = AgreementContract.methods.getBalanceToken(token, address);
// 	const balanceverify = await methodFn.call({ from: address })
// 	.then(async function (receipt: any) {
// 		const resultado =  web3.utils.fromWei(receipt,'ether');
// 		return resultado;
// 	});
// 	return Promise.resolve(balanceverify).then((x:string) => {return x})
// }

//Utils
const getBalanceWallet = async (web3: Web3, address: any) => {
	try{
		const balancewei = await web3.eth.getBalance(address);
		const balance = web3.utils.fromWei(balancewei);
	
		return balance;
	}
	catch(ex){
		console.log(ex);
		return '0';
	}
}

export const doConnectWallet = (wallet_provider:any, history:any
) => async (dispatch: any) => {
	dispatch({ type: WalletActionTypes.CONNECT_WALLET_LOADING });
	try {
		if (wallet_provider === undefined) {
			dispatch(openSuccessDialog('Binance Smart Chain Wallet Not Detected','Click here to install it', 'https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp'))
			history.push('/');
		} else if ((window.ethereum === undefined) || (window.ethereum === null)) {
			dispatch(openSuccessDialog('Metamask Wallet Not Detected','Click here to install it', 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'))
			history.push('/');
		} else if ((wallet_provider.chainId != "0x61")&&(wallet_provider.chainId != "0x38")) {
			console.log('This MPV only work in Binance Smart Chain', wallet_provider.chainId);
			dispatch(openSuccessDialog('This MPV only work in Binance Smart Chain'));
			history.push('/');
		} else {
			const connected:boolean = await wallet_provider.isConnected();
			console.log('doConnectWallet', wallet_provider, connected);
			if (connected === true) {
				// Call Event for Changed Network
				window.ethereum.on('chainChanged', (_chainId:any) => window.location.reload());
				// MetaInstance of Ethereum
				const metaInstance_tkn = await BlockchainFactory.getWeb3Mask(window.ethereum);
				const network_tkn = await BlockchainFactory.getNetwork(metaInstance_tkn.network);
				window.web3 = metaInstance_tkn?.web3Instance;
				// Open Metamask
				let paidBalance:string = '', ethBalance:string = '', address_tkn:string = '';
				console.log(network_tkn, paidBalance, ethBalance);
				const paidtoken = await window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(async (addresses)=>{
					address_tkn = addresses[0];
					// Call Event for Changed Address
					window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
						if (addresses[0] != accounts[0]) {window.location.reload()};
					});
					if ((network_tkn === "rinkeby") || (network_tkn === "mainnet")) {
						paidBalance = await getPaidBalance(metaInstance_tkn?.web3Instance, address_tkn, network_tkn);
						ethBalance = await getBalanceWallet(metaInstance_tkn?.web3Instance, address_tkn);
					} else {
						paidBalance = '0';
					}
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
						console.log(error);
						dispatch(openSuccessDialog(error.message));
						throw new Error('Error code out to EIP-1193');
					}
				});
				// Call event
				wallet_provider.on('chainChanged', (_chainId:any) => window.location.reload());
				// build currentWallet / connectedWallet Element
				const metaInstance = await BlockchainFactory.getWeb3Binance(wallet_provider);
				const network = await BlockchainFactory.getNetwork(metaInstance.network);
				window.web3 = metaInstance?.web3Instance;
				const accounts = await wallet_provider.request({ method: 'eth_requestAccounts' })
				.then(async (addresses)=>{
					const address = addresses[0];
					// Call Event for Changed Address
					wallet_provider.on('accountsChanged', (accounts: Array<string>) => {
						if (addresses[0] != accounts[0]) {window.location.reload()};
					});
					const balance = await getBalanceWallet(metaInstance?.web3Instance, address);
					const referenceWallet = {
						web3: metaInstance?.web3Instance,
						web3_eth: metaInstance_tkn?.web3Instance,
						address,
						address_eth: address_tkn,
						balance: balance,
						balanceToken: paidBalance,
						balanceEth: ethBalance,
						network,
						network_eth: network_tkn,
					};
					dispatch(connectWallet(referenceWallet));
					console.log('connect Binance Chain Wallet successfully');
					history.push('/documents');
				})
				.catch((error:any) => {
					if ((error.code === 4001) || (error.code === 4100) || (error.code === 4200) || (error.code === 4900) || (error.code === 4901))  {
						// EIP-1193 userRejectedRequest error
						alert('Reject Unlocked Wallet in Binance Wallet');
						dispatch(openSuccessDialog('Reject Unlocked Wallet in Binance Wallet'));
						history.push('/');
					} else if (error.code === -32002) {
						alert('Pls Unlock Wallet in Binance Wallet');
						dispatch(openSuccessDialog('Pls Unlock Wallet in Binance Wallet'));
						history.push('/');
					} else {
						alert('Error code out to EIP-1193');
						console.log(error);
						dispatch(openSuccessDialog(error.message));
						throw new Error('Error code out to EIP-1193');
					}
				});
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
		dispatch(openErrorDialog('doConnectWallet: '+err.message));
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
