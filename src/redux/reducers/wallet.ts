import { WalletActionTypes } from '../actionTypes/wallet';

const initialState = {
	currentWallet: null,
	selectedWallet: null,
	settingCurrentWallet: false,
	gettingCurrentWallet: false,
	selectedToken: 'paid',
	settingCurrentToken: false,
	gettingCurrentToken: false,
	unlockingWallet: false,
	unlockedWallet: null,
	connectingWallet: false,
	connectedWallet: null,
	timeout: null
};

export const WalletReducer = function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {

		case WalletActionTypes.SET_CURRENT_WALLET_LOADING:
			return { ...state, settingCurrentWallet: true };

		case WalletActionTypes.SET_CURRENT_WALLET_SUCCESS:
			return {
				...state,
				currentWallet: payload,
				settingCurrentWallet: false
			};

		case WalletActionTypes.SET_CURRENT_WALLET_FAILURE:
			return { ...state, error: payload, gettingCurrentWallet: false };

		case WalletActionTypes.GET_CURRENT_WALLET_LOADING:
			return { ...state, settingCurrentWallet: true };

		case WalletActionTypes.GET_CURRENT_WALLET_SUCCESS:
			return { ...state, currentWallet: payload, gettingCurrentWallet: false };

		case WalletActionTypes.GET_CURRENT_WALLET_FAILURE:
			return { ...state, error: payload, gettingCurrentWallet: false };

		case WalletActionTypes.SET_SELECTED_WALLET_TOKEN_LOADING:
			return { ...state, settingCurrentToken: true };

		case WalletActionTypes.SET_SELECTED_WALLET_TOKEN_SUCCESS:
			return {
				...state,
				selectedToken: payload,
				settingCurrentToken: false
			};

		case WalletActionTypes.SET_SELECTED_WALLET_TOKEN_FAILURE:
			return { ...state, error: payload, gettingCurrentToken: false };

		case WalletActionTypes.CONNECT_WALLET_LOADING:
			return { ...state, connectingWallet: true };

		case WalletActionTypes.CONNECT_WALLET_SUCCESS:
			return {
				...state,
				connectedWallet: true,
				currentWallet: payload,
				connectingWallet: false,
				error: null,
			};

		case WalletActionTypes.CONNECT_WALLET_FAILURE:
			return { ...state, error: payload, connectedWallet: false };

		case WalletActionTypes.SET_SELECTED_WALLET_SUCCESS:
			return { ...state, selectedWallet: payload, error: null };
		default:
			return state;
	}
};
