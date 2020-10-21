import {
	IonButton,
	IonContent,
	IonImg,
	IonLoading,
	IonPage
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Terms from '../components/Terms';
import { doGetWallets } from '../redux/actions/wallet';
import CreateWallet from './wallet/create-wallet/CreateWallet';

const Landing: React.FC = () => {
	const wallet = useSelector(
		(state: { wallet: { wallets: []; loadingWallets: boolean } }) =>
			state.wallet
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(doGetWallets());
	}, [dispatch]);
	const { wallets, loadingWallets } = wallet;
	const [showCreateModal, setShowCreateModal] = useState(false);
	const dismissModal = () => {
		setShowCreateModal(false);
	};

	return (
		<IonPage>
			<IonContent fullscreen class="landing-content">
				<div className="landing-logo">
					<IonImg src="/assets/images/logo-full.png" />
				</div>

				<IonLoading
					isOpen={loadingWallets}
					message={'Loading wallets...'}
					duration={5000}
				/>

				{wallets.length <= 0 ? (
					<div className="landing-actions">
						<IonButton
							onClick={() => setShowCreateModal(true)}
							class="red-button "
							color="FF4300"
						>
							Create New Wallet
						</IonButton>
						<IonButton
							routerLink="/wallet/import"
							class="purple-button "
							color="8500FF"
							disabled
						>
							Import a Wallet
						</IonButton>
						<CreateWallet show={showCreateModal} dismiss={dismissModal} />
					</div>
				) : (
					<div className="landing-actions">
						<IonButton routerLink="/login" class="red-button " color="FF4300">
							Login with your wallet
						</IonButton>
					</div>
				)}
				<Terms />
			</IonContent>
		</IonPage>
	);
};

export default Landing;
