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
import { doSetCurrentToken, doShowMyCurrentWallet} from '../redux/actions/wallet';
import { Sessions } from '../utils/sessions';
import { useHistory } from 'react-router';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
	selected: boolean;
	click: any;
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
	const { currentWallet, selectedToken } = wallet;

	const [disableMenu, setDisableMenu] = useState(false);
	const [networkText, setNetWorkText] = useState(currentWallet?.network);
	const [selectToken, setSelectToken] = useState('bnb');

	const doSetSelectedToken = (token:string) => {
		setSelectToken(token);
		dispatch(doSetCurrentToken(token));
	}
	const paidBalance = currentWallet?.balanceToken;
	const daiBalance = currentWallet?.balanceDaiToken;
	let unlocked:boolean;
	if ((currentWallet == null) && (currentWallet == undefined)) {
		unlocked = false;
	} else {
		unlocked = true;
	}

	useEffect(() => {
		if (unlocked == true) {
			setDisableMenu(false);
			setNetWorkText(currentWallet?.network);
			if(!Sessions.getTimeoutBool()){
				Sessions.setTimeoutCall();
			}
			else{
				history.push('/');
			}
		} else {
			history.push('/');
		}
	}, [unlocked]);

	const appPages: AppPage[] = [
		{
			title: 'Network: ' + networkText,
			url: '',
			iosIcon: globeSharp,
			mdIcon: globeSharp,
			disabled: false,
			selected: true,
			click: null
		},
		{
			title: 'Wallet',
			url: '/wallets',
			iosIcon: walletSharp,
			mdIcon: walletSharp,
			disabled: false,
			selected: false,
			click: () => dispatch(doShowMyCurrentWallet(true))
		},
		{
			title: 'Smart Agreements Log',
			url: '/documents',
			iosIcon: documentSharp,
			mdIcon: documentSharp,
			disabled: false,
			selected: false,
			click: null
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
							location.pathname === appPage.url ?
							('selected') :
							appPage.selected ?
							('selected') :
							('')
						}
						lines="none"
						detail={false}
						button={appPage.click != null}
						onClick={appPage.click}
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
						src={selectToken === "bnb" ?
						('/assets/icon/bnblogo.svg') : ''
						// ('/assets/icon/dailogo.svg')
					}
					/>
				</div>
				<IonLabel color="gradient">
					{
						selectToken === "bnb" ?
						('BNB Tokens') : null
						// ('DAI Tokens')
					}
				</IonLabel>
				<IonSelect
					interfaceOptions={customAlertTokens}
					interface="alert"
					value={selectToken}
					onIonChange={ (e) => doSetSelectedToken(e.detail.value) }
				>
					{/* <IonSelectOption value="paid">
						PAID Tokens  {paidBalance}
					</IonSelectOption> */}
					<IonSelectOption value="bnb">
						{/* TODO: this amount must be dynamic */}
						BNB Tokens  {currentWallet?.balance}
					</IonSelectOption>
					{/* <IonSelectOption value="dai">
						DAI Tokens {daiBalance}
					</IonSelectOption> */}
				</IonSelect>
			</IonItem>
		</IonButtons>
	);
};

export default MenuAlternate;
