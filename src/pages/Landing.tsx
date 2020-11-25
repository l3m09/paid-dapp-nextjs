import {
	IonButton,
	IonContent,
	IonImg,
	IonLoading,
	IonPage,
	IonRouterLink
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Terms from '../components/Terms';
import { doGetWallets } from '../redux/actions/wallet';
import CreateWallet from './wallet/create-wallet/CreateWallet';
import ImportWallet from "./wallet/ImportWallet";

const Landing: React.FC = () => {
	const wallet = useSelector(
		(state: { wallet: { wallets: []; loadingWallets: boolean } }) =>
			state.wallet
	);
	const dispatch = useDispatch();
	const [showTermsModal, setShowTermsModal] = useState(false);

	useEffect(() => {
		dispatch(doGetWallets());
	}, [dispatch]);
	const { wallets, loadingWallets } = wallet;
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showImportWalletModal, setShowImportWalletModal] = useState(false);

	const dismissModal = () => {
		setShowCreateModal(false);
		setShowImportWalletModal(false);
	};

	return (
		<IonPage>
			<IonContent fullscreen class="landing-content">
				<div className="landing-logo">
					<IonImg src="/assets/images/logo-full.png" />
				</div>

				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loadingWallets}
				/>

				{wallets.length <= 0 ? (
					<div className="landing-actions">
						<IonButton
							onClick={() => setShowCreateModal(true)}
							color="secondary"
							shape="round"
						>
							Create New Wallet
						</IonButton>
						<IonButton
							onClick={() => setShowImportWalletModal(true)}
							color="gradient"
							shape="round"

						>
							Import a Wallet
						</IonButton>
						<CreateWallet show={showCreateModal} dismiss={dismissModal} />
						<ImportWallet show={showImportWalletModal} dismiss={dismissModal} />

					</div>
				) : (
					<div className="landing-actions">
						<IonButton color="gradient" shape="round" routerLink="/wallets" class="red-button ">
							Login with your wallet
						</IonButton>
					</div>
				)}
				<div className="terms">
					By continuing you agree to our <IonRouterLink onClick={() => setShowTermsModal(true)}>T&Cs.</IonRouterLink>
					We use your data to offer you a personalized experience.
					<IonRouterLink onClick={() => setShowTermsModal(true)}>Find out more.</IonRouterLink>
					<Terms show={showTermsModal} dismiss={() => {setShowTermsModal(false)}} />

				</div>
			</IonContent>
		</IonPage>
	);
};

// @ts-ignore
export default Landing;
