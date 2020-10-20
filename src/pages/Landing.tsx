import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Terms from '../components/Terms';
import CreateWallet from './wallet/create-wallet/CreateWallet';

const Landing: React.FC = () => {
	const wallet = useSelector(
		(state: { wallet: { wallets: []; loading: boolean } }) => state.wallet
	);
	const { wallets, loading } = wallet;
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
					</div>
				) : (
					<div className="landing-actions">
						<IonButton
							routerLink="/login-gmail"
							class="red-button "
							color="FF4300"
						>
							Create New Wallet
						</IonButton>
						<IonButton
							routerLink="/login"
							class="purple-button "
							color="8500FF"
						>
							Import a Wallet
						</IonButton>
					</div>
				)}
				<CreateWallet show={showCreateModal} dismiss={dismissModal} />
				<Terms />
			</IonContent>
		</IonPage>
	);
};

export default Landing;
