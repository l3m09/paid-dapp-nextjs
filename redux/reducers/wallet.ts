import ActionModel from '../../models/actionModel';
import WalletStateModel from '../../models/walletStateModel';
import WalletActionTypes from '../actionTypes/wallet';

const initialState: WalletStateModel = {
  currentWallet: null,
  loading: false,
};

const walletReducer = (state: WalletStateModel = initialState, action: ActionModel) => {
  const { type, payload } = action;
  switch (type) {
    case WalletActionTypes.CONNECTING_WALLET: {
      return {
        ...state,
        loading: true,
      };
    }
    case WalletActionTypes.SET_CURRENT_WALLET: {
      return {
        ...state,
        currentWallet: payload,
        loading: false,
      };
    }
    default:
      return { ...state };
  }
};

export default walletReducer;
