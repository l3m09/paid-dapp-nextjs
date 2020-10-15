import { WalletActionTypes } from '../actionTypes/wallet';

const initialState = {
	loading: false,
	confirmed: false,
	permanentSeedPhrase: [],
	seedPhrase: [],
	confirmedSeedPhrase: [],
	wallets: []
};

export const WalletReducer = function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case WalletActionTypes.GENERATE_PHRASE:
			return {
				...state,
				seedPhrase: payload,
				permanentSeedPhrase: payload,
				confirmedSeedPhrase: []
			};

		case WalletActionTypes.ADD_WORD: {
			let confirmedPhrase = state.confirmedSeedPhrase.slice();
			let seedPhrase = state.seedPhrase.slice();
			const index = state.confirmedSeedPhrase.length;
			// @ts-ignore
			confirmedPhrase.splice(index, 0, payload.word);
			seedPhrase.splice(payload.index, 1);
			for (let i = 0; i < state.permanentSeedPhrase.length; i += 1) {
				if (state.permanentSeedPhrase[i] === confirmedPhrase[i]) {
					if (i === 11) {
						return {
							...state,
							seedPhrase: seedPhrase,
							confirmedSeedPhrase: confirmedPhrase,
							confirmed: true
						};
					}
				}
			}
			return {
				...state,
				seedPhrase: seedPhrase,
				confirmedSeedPhrase: confirmedPhrase,
				confirmed: false
			};
		}

		case WalletActionTypes.REMOVE_WORD: {
			let confirmedPhrase = state.confirmedSeedPhrase.slice();
			let seedPhrase = state.seedPhrase.slice();
			const index = state.seedPhrase.length;

			confirmedPhrase.splice(payload.index, 1);
			// @ts-ignore
			seedPhrase.splice(index, 0, payload.word);

			return {
				...state,
				seedPhrase: seedPhrase,
				confirmedSeedPhrase: confirmedPhrase,
				confirmed: false
			};
		}
		case WalletActionTypes.GET_WALLETS_LOADING:
			return { ...state, loading: true };

		case WalletActionTypes.GET_WALLETS_SUCCESS:
			return { ...state, wallets: payload, loading: false };

		case WalletActionTypes.GET_WALLETS_FAILURE:
			return { ...state, wallets: [], error: payload, loading: false };

		case WalletActionTypes.CREATE_WALLET_LOADING:
			return { ...state, loading: true };

		case WalletActionTypes.CREATE_WALLET_SUCCESS:
			return { ...state, wallets: payload, loading: false };

		case WalletActionTypes.CREATE_WALLET_FAILURE:
			return { ...state, user: [], error: payload, loading: false };

		case WalletActionTypes.IMPORT_WALLET_LOADING:
			return { ...state, loading: true };

		case WalletActionTypes.IMPORT_WALLET_SUCCESS:
			return { ...state, wallets: payload, loading: false };

		case WalletActionTypes.IMPORT_WALLET_FAILURE:
			return { ...state, user: [], error: payload, loading: false };

		case WalletActionTypes.EXPORT_WALLET_LOADING:
			return { ...state, loading: true };

		case WalletActionTypes.EXPORT_WALLET_SUCCESS:
			return { ...state, wallets: payload, loading: false };

		case WalletActionTypes.EXPORT_WALLET_FAILURE:
			return { ...state, user: [], error: payload, loading: false };

		default:
			return state;
	}
};
