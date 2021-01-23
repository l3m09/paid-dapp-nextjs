import {
	IonContent,
	IonIcon,
	// IonImg,
	IonItem, IonItemDivider,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonTitle
} from '@ionic/react';

import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {
	documentOutline,
	documentSharp,
	listCircleOutline
} from 'ionicons/icons';
import {useSelector, useDispatch } from 'react-redux';
import { openSuccessDialog } from '../redux/actions/documents';
import { BlockchainFactory } from '../utils/blockchainFactory';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const Menu: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	// const wallet = useSelector((state: any) => state.wallet);

	// const { unlockedWallet } = wallet;
	const [disableMenu, setDisableMenu] = useState(true);
	// window.ethereum.enable();

	useEffect( () => {
		console.log('Menu', window.ethereum, window.ethereum.isMetamask);
		if (window.ethereum != undefined) {
			setDisableMenu(false);
		} else {
			setDisableMenu(true);
		}

	}, []);

	const appPages: AppPage[] = [
		{
			title: 'Wallets',
			url: '/wallets',
			iosIcon: listCircleOutline,
			mdIcon: listCircleOutline,
			disabled: false
		},
		{
			title: 'Smart Agreements Log',
			url: '/documents',
			iosIcon: documentOutline,
			mdIcon: documentSharp,
			disabled: false
		},
	];

	return (
		<IonMenu contentId="main" type="push" swipeGesture={false} disabled={disableMenu}>
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>Menu</IonListHeader>
					<IonItemDivider/>
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									disabled={appPage.disabled}
									className={
										location.pathname === appPage.url ? 'selected' : ''
									}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<span className="icon-wrapper">
										<IonIcon
											ios={appPage.iosIcon}
											md={appPage.mdIcon}
											color="gradient"
										/>
									</span>

									<IonLabel color="gradient">{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>

				{/*<IonList id="labels-list">*/}
				{/*	{labels.map((appPage, index) => {*/}
				{/*		return (*/}
				{/*			<IonMenuToggle key={index} autoHide={false}>*/}
				{/*				<IonItem*/}
				{/*					disabled={appPage.disabled}*/}
				{/*					className={*/}
				{/*						location.pathname === appPage.url ? 'selected' : ''*/}
				{/*					}*/}
				{/*					routerLink={appPage.url}*/}
				{/*					routerDirection="none"*/}
				{/*					lines="none"*/}
				{/*					detail={false}*/}
				{/*				>*/}
				{/*					<IonIcon*/}
				{/*						slot="start"*/}
				{/*						ios={appPage.iosIcon}*/}
				{/*						md={appPage.mdIcon}*/}
				{/*					/>*/}
				{/*					<IonLabel>{appPage.title}</IonLabel>*/}
				{/*				</IonItem>*/}
				{/*			</IonMenuToggle>*/}
				{/*		);*/}
				{/*	})}*/}
				{/*</IonList>*/}
				<IonItem>
					{/*<IonImg class="avatar" src="/assets/images/avatar-placeholder.png" />*/}
					<IonItem>
						<IonTitle>
							{/*<span>John Doe</span>*/}
							{/*<small>XYC Community</small>*/}
						</IonTitle>
					</IonItem>
				</IonItem>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
