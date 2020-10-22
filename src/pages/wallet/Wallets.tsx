import {
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonItemGroup,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonIcon, IonItemDivider
} from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {doSetSelectedWallet} from '../../redux/actions/wallet';
import CreateWallet from './create-wallet/CreateWallet';
import UnlockWallet from '../../components/UnlockWallet';
import ImportWallet from "./ImportWallet";

const Wallets: React.FC = () => {
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUnlockWalletModal, setShowUnlockWalletModal] = useState(false);
	const [showImportWalletModal, setShowImportWalletModal] = useState(false);

	const { wallets, unlockedWallet, selectedWallet } = wallet;

	const dismissCreateModal = () => {
		setShowCreateModal(false);
	};
	const dismissUnlockWalletModal = () => {
		setShowUnlockWalletModal(false);
		dispatch(doSetSelectedWallet(null))
	};
	const dismissImportModal = () => {
		setShowImportWalletModal(false)
	}

	function openUnlockWallet(wallet: any) {
		dispatch(doSetSelectedWallet(wallet))
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
						if (unlockedWallet?._id === item._id) {
							return (
								<IonItem
									class="wallet-wrapper selected-wallet"
									key={index}
								>
									<div className="wallet-container">
										{unlockedWallet?._id === item._id ? <IonIcon icon={checkmarkCircle} className="current-tag"/> : ''}
										<span className="label">{item.name}</span>
										<span className="address">{item.address}</span>
									</div>
								</IonItem>
							)

						} else {
							return (
								<IonItem
									class="wallet-wrapper"
									key={index}
									onClick={() => openUnlockWallet(item)}
								>
									<div className="wallet-container">
										<span className="label">{item.name}</span>
										<span className="address">{item.address}</span>
									</div>
								</IonItem>
							)
						}
					})}
				</IonItemGroup>
				<IonItemDivider/>
				<IonItemGroup>
					<IonItem class="form-options">
						<IonButton
							onClick={() => setShowCreateModal(true)}
							class=""
							color="primary"
						>
							Create Wallet
						</IonButton>
					</IonItem>
					<IonItem class="form-options">
						<IonButton
							onClick={() => setShowImportWalletModal(true)}
							class=""
							color="primary"
						>
							Import Wallet
						</IonButton>
					</IonItem>
				</IonItemGroup>
				<CreateWallet show={showCreateModal} dismiss={dismissCreateModal} />
				<ImportWallet show={showImportWalletModal} dismiss={dismissImportModal} />
				{ selectedWallet !== null ? <UnlockWallet show={showUnlockWalletModal} dismissible={true} dismiss={dismissUnlockWalletModal} selectedWallet={selectedWallet}/> : null}
			</IonContent>
		</IonPage>
	);
};

export default Wallets;
