import {
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonItemDivider,
	IonItemGroup,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton, IonIcon
} from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {doGetWallets, doSetCurrentWallet} from '../../redux/actions/wallet';
import CreateWallet from './create-wallet/CreateWallet';
import UnlockWallet from '../../components/UnlockWallet';

const Wallets: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUnlockWalletModal, setShowUnlockWalletModal] = useState(false);

	const dismissModal = () => {
		setShowCreateModal(false);
	};
	const { wallets, currentWallet, unlockedWallet } = wallet;;

	function openUnlockWallet(wallet: any) {
		dispatch(doSetCurrentWallet(wallet))
		setShowUnlockWalletModal(true);
	}

	return (
		<IonPage className="wallets-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Wallets</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonItem className="wallets-title">
					<h5>Select default Wallet</h5>
				</IonItem>
				<IonItemGroup class="wallets-container">
					{wallets.map((item: any, index: any) => {
						return (
							<IonItem
								class="wallet-wrapper"
								className={unlockedWallet?._id === item._id ? 'selected-wallet' : ''}
								key={index}
								onClick={() => openUnlockWallet(item)}
							>
								<div className="wallet-container">
									{unlockedWallet?._id === item._id ? <IonIcon icon={checkmarkCircle} className="current-tag"/> : ''}
									<span className="label">{item.name}</span>
									<span className="address">{item.address}</span>
								</div>
							</IonItem>
						);
					})}
				</IonItemGroup>
				<IonItemGroup>
					<IonItem class="form-options">
						<IonButton
							onClick={() => setShowCreateModal(true)}
							class=""
							color="primary"
						>
							Add
						</IonButton>
						{/*<IonButton routerLink="/wallet/import" class="" color="secondary">*/}
						{/*	Import*/}
						{/*</IonButton>*/}
					</IonItem>
				</IonItemGroup>
				<CreateWallet show={showCreateModal} dismiss={dismissModal} />
				{ currentWallet !== null ? <UnlockWallet show={showUnlockWalletModal} dismissible={true}/> : null}
			</IonContent>
		</IonPage>
	);
};

export default Wallets;
