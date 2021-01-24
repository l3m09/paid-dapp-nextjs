import Login from './pages/auth/Login';
// import SignUp from './pages/auth/SignUp';
import Landing from './pages/Landing';
import React, { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';

import { Route } from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */

import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';

import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';

import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/main.scss';

import Wallets from './pages/wallet/Wallets';
import Documents from './pages/documents/Documents';
import Agreements from './pages/documents/agreements/Agreements';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doGetWallets } from './redux/actions/wallet';
import { openSuccessDialog } from '../src/redux/actions/documents'
import UnlockWallet from './components/UnlockWallet';

const Layout: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	// const wallet = useSelector((state: any) => state.wallet);
	// const { wallets, currentWallet, unlockedWallet } = wallet;

	const [showUnlockWalletModal, setShowUnlockWalletModal] = useState(false);

	// useEffect(() => {
	// 	dispatch(doGetWallets());
	// 	// dispatch(doGetCurrentWallet());
	// }, [dispatch]);

	const dismissModal = () => {
		setShowUnlockWalletModal(false);
	};

	// useEffect(() => {
	// 	if (window.ethereum != undefined) {
	// 		const connected:boolean = window.ethereum.isConnected();
	// 		if (connected == true) {
	// 			history.push('/documents');
	// 			dismissModal()
	// 		} else {
	// 			dispatch(openSuccessDialog('Failed to Connect Metamask'));
	// 		}
	// 	// } else if (currentWallet !== null) {
	// 	// 	setShowUnlockWalletModal(false);
	// 	// } else if (wallets.length > 0) {
	// 	// 	history.push('/wallets')
	// 	// 	dismissModal();
	// 	} else {
	// 		dismissModal();
	// 		history.push('/')
	// 	}
	// }, [history]);

	return (
		<IonContent className="main-content">
			<Route path="/" component={Landing} exact />
			<Route path="/login" component={Login} exact />
			<Route path="/wallets" component={Wallets} exact />
			<Route path="/documents/:id?" component={Documents} exact />
			<Route path="/agreements/:type" component={Agreements} exact />
			{/* currentWallet !== null ? <UnlockWallet selectedWallet={currentWallet} show={showUnlockWalletModal} dismiss={dismissModal}/> : null */}
		</IonContent>
	);
};

export default Layout;
