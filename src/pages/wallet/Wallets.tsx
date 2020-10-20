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
import { useDispatch, useSelector } from 'react-redux';
import { doGetWallets } from '../../redux/actions/wallet';
import CreateWallet from './create-wallet/CreateWallet';
const Wallets: React.FC = () => {
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
				<IonItemGroup class="wallets-container">
					{wallets.map((wallet: any, index: any) => {
						return (
							<IonItem
								class="wallet-wrapper"
								key={index}
								routerLink={'/documents/' + wallet.id}
								// onClick={() => setShowPopover(true)}
							>
								<div className="wallet-container">
									<span className="label">{wallet.name}</span>
									<span className="address">{wallet.address}</span>
								</div>
								{/*<IonPopover*/}
								{/*    isOpen={showPopover}*/}
								{/*    cssClass='my-custom-class'*/}
								{/*    onDidDismiss={e => setShowPopover(false)}*/}
								{/*>*/}
								{/*    <IonList>*/}
								{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Send</IonItem>*/}
								{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Transfer</IonItem>*/}
								{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Export</IonItem>*/}
								{/*        <IonItemDivider/>*/}
								{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Edit</IonItem>*/}
								{/*    </IonList>*/}
								{/*</IonPopover>*/}
							</IonItem>
						);
					})}
				</IonItemGroup>
				<IonItemGroup>
					<IonItem class="form-options">
						<IonButton
							onClick={() => setShowCreateModal(true)}
							class=""
							color="secondary"
						>
							Create
						</IonButton>
						<IonButton routerLink="/wallet/import" class="" color="secondary">
							Import
						</IonButton>
					</IonItem>
				</IonItemGroup>
				<CreateWallet show={showCreateModal} dismiss={dismissModal} />
			</IonContent>
		</IonPage>
	);
};

export default Wallets;
