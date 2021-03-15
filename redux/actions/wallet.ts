import { NextRouter } from 'next/router';
import ProfileActionTypes from '../actionTypes/profile';
import WalletActionTypes from '../actionTypes/wallet';

const retrieveDID = () => {
  const currentProfiles = [
    {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
    },
    {
      firstName: 'Dan',
      lastName: 'Smith',
      email: 'dan.smith@paidnetwork.com',
      address: 'Suite 5A-1204\n799 E Dragram\nTucson AZ 85705\nUSA',
      phone: '+1 500 7080 7788',
    },
  ];

  const randomIndex = (Math.floor(Math.random() * 2) + 1) - 1;

  return currentProfiles[randomIndex];
};

const doConnectToWallet = (router: NextRouter) => (dispatch: any) => {
  dispatch({ type: WalletActionTypes.CONNECTING_WALLET });
  const currentWallet = '0x3442C44B4Bbf87144Ad0e4a2C60e4bE801d30FA8';
  const currentProfile = retrieveDID();
  const {
    firstName,
    lastName,
    email,
  } = currentProfile;

  if (!(firstName && lastName && email)) {
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    router.push('/profile');
  } else {
    dispatch({ type: ProfileActionTypes.SET_PROFILE_DATA, payload: currentProfile });
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    router.push('/agreements');
  }
};

export default doConnectToWallet;
