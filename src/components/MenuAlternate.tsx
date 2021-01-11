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
import { BlockchainFactory } from '../utils/blockchainFactory';
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const MenuAlternate:  React.FC = () =>{
	const location = useLocation();
	const wallet = useSelector((state: any) => state.wallet);
	const { unlockedWallet } = wallet;

	const [disableMenu, setDisableMenu] = useState(true);
	const [networkText, setNetWorkText] = useState('...');


	useEffect(() => {
		if (unlockedWallet !== null) {
			setDisableMenu(false)

			const manager = BlockchainFactory.getWalletManager();
			const storage = manager.getKeyStorage();
			const rawWallet = storage.find<KeyStorageModel>(unlockedWallet._id);
			rawWallet.then((rWallet) => {	
				debugger;	
				const web3 = BlockchainFactory.getWeb3Instance(rWallet.keypairs, rWallet.mnemonic);
				const network = BlockchainFactory.getNetwork(web3);
				network.then((networkText) => {
					setNetWorkText(networkText.toUpperCase());
				});
			});
		}
	}, [unlockedWallet]);

	const appPages: AppPage[] = [
		{
			title: 'Network: ' + networkText,
			url: '/wallets',
			iosIcon: listCircleOutline,
			mdIcon: listCircleOutline,
			disabled: false
		},
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
