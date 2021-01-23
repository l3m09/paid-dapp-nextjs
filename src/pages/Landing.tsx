import {
	IonButton,
	IonContent,
	IonImg,
	IonLoading,
	IonPage,
	IonRouterLink
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Terms from '../components/Terms';
import { openSuccessDialog } from '../redux/actions/documents'
import { isMetamask } from '../utils/metamask'
import { doGetWallets } from '../redux/actions/wallet';
import CreateWallet from './wallet/create-wallet/CreateWallet';
import ImportWallet from "./wallet/ImportWallet";

const Landing: React.FC = () => {
	// const wallet = useSelector(
	// 	(state: { wallet: { wallets: []; loadingWallets: boolean } }) =>
	// 		state.wallet
	// );
	const dispatch = useDispatch();
	const mask = isMetamask();
	let metamask:boolean;
	let loading = true;
	Promise.resolve(mask).then((resp:boolean)=> {
		metamask = resp;
		loading = false;
		if (metamask) {
			const ethereumButton = document.querySelector('.enableEthereumButton');

			ethereumButton?.addEventListener('click', () => {
			//Will Start the metamask extension
			window.ethereum?.request({ method: 'eth_requestAccounts' });
			});
			console.log('Metamask Installed');
		} else {
			dispatch(openSuccessDialog('Failed to Connect Metamask'))
		}
	})

	const [showTermsModal, setShowTermsModal] = useState(false);


	// useEffect(async () => {
	// 	const provider = await detectEthereumProvider();
	// }, []);
	// const { wallets, loadingWallets } = wallet;
	// const [showCreateModal, setShowCreateModal] = useState(false);
	// const [showImportWalletModal, setShowImportWalletModal] = useState(false);

	// const dismissModal = () => {
	// 	setShowCreateModal(false);
	// 	setShowImportWalletModal(false);
	// };

	return (
		<IonPage>
			<IonContent fullscreen class="landing-content">
				<div className="landing-logo">
					<IonImg src="/assets/images/logo-full.png" />
				</div>

				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}
				/>

				{		<div>
						<IonButton
							onClick={}
							color="secondary"
							shape="round"
						>
							Connect to Wallet Metamask
						</IonButton>
						</div>}
				<div className="terms">
					By continuing you agree to our <IonRouterLink onClick={() => setShowTermsModal(true)}>T&Cs.</IonRouterLink>
					We use your data to offer you a personalized experience.
					<IonRouterLink onClick={() => setShowTermsModal(true)}>Find out more.</IonRouterLink>
					<Terms show={showTermsModal} dismiss={() => {setShowTermsModal(false)}} />

				</div>
			</IonContent>
		</IonPage>
	);
};

// @ts-ignore
export default Landing;
