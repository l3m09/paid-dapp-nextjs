import {
	IonButtons,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';

import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {
	documentSharp,
	globeSharp,
	walletSharp
} from 'ionicons/icons';
import { useDispatch, useSelector} from 'react-redux';
import { BlockchainFactory } from '../utils/blockchainFactory';
import { doSetCurrentToken} from '../redux/actions/wallet';
import { Sessions } from '../utils/sessions';
import { useHistory } from 'react-router';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const customAlertTokens = {
	header: 'Select Payment Method',
	cssClass: 'select-tokens-alert',
	translucent: true
}

const MenuAlternate:  React.FC = () =>{
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const { unlockedWallet, selectedToken } = wallet;

	const [disableMenu, setDisableMenu] = useState(true);
	const [networkText, setNetWorkText] = useState('...');
	const [selectToken, setSelectToken] = useState(selectedToken);

	const doSetSelectedToken = (token:string) => {
		setSelectToken(token);
		dispatch(doSetCurrentToken(token));
	}

	useEffect(() => {
		if (unlockedWallet !== null) {
			setDisableMenu(false)
			const web3 = BlockchainFactory.getWeb3Instance(unlockedWallet.address, unlockedWallet._id, unlockedWallet.password);
			if(!Sessions.getTimeoutBool()){
				Sessions.setTimeoutCall();
			}
			else{
				history.push('/wallets');
			}
			web3.then((result) => {
				const { network } = result!;
				const _network = BlockchainFactory.getNetwork(network);
				_network.then((networkText: string) => {
					setNetWorkText(networkText.toUpperCase());
				});
			});
		}
	}, [unlockedWallet]);

	const appPages: AppPage[] = [
		{
			title: 'Network: ' + networkText,
			url: '/wallets',
			iosIcon: globeSharp,
			mdIcon: globeSharp,
			disabled: false
		},
		{
			title: 'Wallets',
			url: '/wallets',
			iosIcon: walletSharp,
			mdIcon: walletSharp,
			disabled: false
		},
		{
			title: 'Smart Agreements Log',
			url: '/documents',
			iosIcon: documentSharp,
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
						<div className="icon-wrapper">
							<IonIcon
								ios={appPage.iosIcon}
								md={appPage.mdIcon}
								color="gradient"
							/>
						</div>
						<IonLabel color="gradient">{appPage.title}</IonLabel>
					</IonItem>
				);
			})}
			<IonItem
				disabled={disableMenu}
			>
				<div className="icon-wrapper">
					<IonImg
						src="/assets/icon/icon.png"
					/>
				</div>
				<IonLabel color="gradient">
					{
						selectToken === "paid" ?
						('PAID Tokens') :
						('DAI Tokens')
					}
				</IonLabel>
				<IonSelect
					interfaceOptions={customAlertTokens}
					interface="alert"
					value={selectToken}
					onIonChange={ (e) => doSetSelectedToken(e.detail.value) }
				>
					<IonSelectOption value="paid">
						PAID Tokens  {unlockedWallet?.balanceToken}
					</IonSelectOption>
					<IonSelectOption value="dai">
						DAI Tokens {unlockedWallet?.balanceDaiToken}
					</IonSelectOption>
				</IonSelect>
			</IonItem>
		</IonButtons>
	);
};

export default MenuAlternate;
