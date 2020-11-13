import {
	IonButtons,
	IonIcon,
	IonItem,
	IonLabel,
} from '@ionic/react';

import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {
	documentOutline,
	documentSharp,
	listCircleOutline
} from 'ionicons/icons';
import {useSelector} from 'react-redux';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const MenuAlternate: React.FC = () => {
	const location = useLocation();
	const wallet = useSelector((state: any) => state.wallet);

	const { unlockedWallet } = wallet;

	const [disableMenu, setDisableMenu] = useState(true);


	useEffect(() => {
		if (unlockedWallet !== null) {
			setDisableMenu(false)
		}
	}, [unlockedWallet]);

	const appPages: AppPage[] = [
		{
			title: 'Wallets',
			url: '/wallets',
			iosIcon: listCircleOutline,
			mdIcon: listCircleOutline,
			disabled: false
		},
		{
			title: 'Agreements',
			url: '/documents',
			iosIcon: documentOutline,
			mdIcon: documentSharp,
			disabled: false
		},
	];

	return (
		<IonButtons className="alternate-menu" slot="end">
			{appPages.map((appPage, index) => {
				return (
					<IonItem
						key={index}
						disabled={appPage.disabled || disableMenu}
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
				);
			})}
		</IonButtons>
	);
};

export default MenuAlternate;
