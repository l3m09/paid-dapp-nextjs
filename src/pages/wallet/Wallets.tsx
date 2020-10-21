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
	IonButton
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {doGetWallets, doSetCurrentWallet} from '../../redux/actions/wallet';
import CreateWallet from './create-wallet/CreateWallet';

const Wallets: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const dismissModal = () => {
		setShowCreateModal(false);
	};
	const { wallets } = wallet;
	useEffect(() => {
		dispatch(doGetWallets());
	}, [dispatch]);

	function toDocuments(wallet: any) {
		dispatch(doSetCurrentWallet(wallet))
		history.push('/documents/' + wallet.name)
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
					{wallets.map((wallet: any, index: any) => {
						return (
							<IonItem
								class="wallet-wrapper"
								key={index}
								onClick={() => toDocuments(wallet)}
							>
								<div className="wallet-container">
									<span className="label">{wallet.name}</span>
									<span className="address">{wallet.address}</span>
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
			</IonContent>
		</IonPage>
	);
};

export default Wallets;
