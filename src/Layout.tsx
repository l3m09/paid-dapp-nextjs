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
import './theme/variables.css';
import './theme/main.scss';

/* Pages */
// import LoginGmail from './pages/auth/LoginGmail';
// import Menu from './components/Menu';
import Wallets from './pages/wallet/Wallets';
import Documents from './pages/documents/Documents';
import Agreements from './pages/documents/agreements/Agreements';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doGetCurrentWallet, doGetWallets } from './redux/actions/wallet';

import UnlockWallet from './components/UnlockWallet';

const Layout: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const { wallets, currentWallet, unlockedWallet } = wallet;

	const [showUnlockWalletModal, setShowUnlockWalletModal] = useState(false);

	useEffect(() => {
		dispatch(doGetWallets());
		dispatch(doGetCurrentWallet());
	}, [dispatch]);

	useEffect(() => {
		if (unlockedWallet !== null) {
			history.push('/documents/' + unlockedWallet.name);
			setShowUnlockWalletModal(false);
		} else if (currentWallet !== null) {
			setShowUnlockWalletModal(true);
		} else if (wallets.length > 0) {
			history.push('/wallets');
			setShowUnlockWalletModal(false);
		} else {
			setShowUnlockWalletModal(false);
			history.push('/');
		}
	}, [currentWallet, wallets, unlockedWallet, history]);

	return (
		<IonContent>
			<Route path="/" component={Landing} exact />
			<Route path="/login" component={Login} exact />
			<Route path="/wallets" component={Wallets} exact />
			<Route path="/documents/:id?" component={Documents} exact />
			<Route path="/agreements/:type" component={Agreements} exact />
			{currentWallet !== null ? (
				<UnlockWallet show={showUnlockWalletModal} />
			) : null}
		</IonContent>
	);
};

export default Layout;
