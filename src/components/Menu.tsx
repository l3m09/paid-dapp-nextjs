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

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
	// archiveOutline,
	// archiveSharp,
	// heartOutline,
	// heartSharp,
	mailOutline,
	mailSharp,
	paperPlaneOutline,
	paperPlaneSharp,
	// personAddSharp,
	// personAddOutline,
	// bookSharp,
	// bookOutline,
	// giftSharp,
	// giftOutline
} from 'ionicons/icons';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const appPages: AppPage[] = [
	{
		title: 'Wallets',
		url: '/wallets',
		iosIcon: mailOutline,
		mdIcon: mailSharp,
		disabled: false
	},
	{
		title: 'Agreements',
		url: '/documents',
		iosIcon: paperPlaneOutline,
		mdIcon: paperPlaneSharp,
		disabled: false
	},
	// {
	// 	title: 'Settings',
	// 	url: '/page/settings',
	// 	iosIcon: heartOutline,
	// 	mdIcon: heartSharp,
	// 	disabled: true
	// },
	// {
	// 	title: 'Help',
	// 	url: '/page/help',
	// 	iosIcon: archiveOutline,
	// 	mdIcon: archiveSharp,
	// 	disabled: true
	// }
];
const labels: AppPage[] = [
	// {
	// 	title: 'Contacts',
	// 	url: '/page/contacts',
	// 	iosIcon: personAddSharp,
	// 	mdIcon: personAddOutline,
	// 	disabled: true
	// },
	// {
	// 	title: 'View signing phrase',
	// 	url: '/page/phrase',
	// 	iosIcon: bookOutline,
	// 	mdIcon: bookSharp,
	// 	disabled: true
	// },
	// {
	// 	title: 'Account',
	// 	url: '/page/account',
	// 	iosIcon: giftOutline,
	// 	mdIcon: giftSharp,
	// 	disabled: true
	// }
];

const Menu: React.FC = () => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="push">
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
									<IonIcon
										slot="start"
										ios={appPage.iosIcon}
										md={appPage.mdIcon}
									/>
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>

				<IonList id="labels-list">
					{labels.map((appPage, index) => {
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
									<IonIcon
										slot="start"
										ios={appPage.iosIcon}
										md={appPage.mdIcon}
									/>
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>
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
