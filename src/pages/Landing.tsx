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
import { useHistory } from 'react-router';
import Terms from '../components/Terms';
import { doConnectWallet } from '../redux/actions/wallet';

declare global {
	interface Window { web3: any; ethereum: any;}
}

const Landing: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const wallet = useSelector(
		(state: { wallet: { connectedWallet: boolean ; currentWallet: any } }) =>
			state.wallet
	);
	const [showTermsModal, setShowTermsModal] = useState(false);
	const { connectedWallet, currentWallet } = wallet;
	
	// let metamask:boolean;
	// let loading = true;
	// Promise.resolve(mask).then(async (resp:boolean)=> {
	// 	metamask = resp;
	// 	loading = false;
	// 	console.log('dentro de promise',metamask, loading, window.ethereum);
	// 	if (metamask) {
	// 		const ethereumButton = document.querySelector('.enableEthereumButton');

	// 		const metaInstance = await BlockchainFactory.getWeb3Mask(window.ethereum);
	// 		window.web3 = metaInstance?.web3Instance;

	// 		const getAccount = async () =>  {
	// 			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	// 			const account = accounts[0];
	// 			if (account != null) {history.push('/documents');}
	// 			console.log(account);
	// 		}

	// 		ethereumButton?.addEventListener('click', async () => {
	// 			//Will Start the metamask extension
	// 			getAccount();
	// 			});
	// 		console.log('Metamask Installed');
	// 	} else {
	// 		dispatch(openSuccessDialog('Failed to Connect Metamask'));
	// 		history.push('/');
	// 	}
	// })

	// new logic
	// const ethereumButton = document.querySelector('.enableEthereumButton');
	// ethereumButton?.addEventListener('click', async () => {
	// 	//Will Start the metamask extension
	// 	console.log('captura evento');
	// 	dispatch(doConnectWallet(window.ethereum));
	// });

	// const enable = () =>{
	// 	console.log('active metamask')
	// 	window.ethereum.enable();
	// }




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

				{/* <IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}
				/> */}
						<IonButton
						onClick={() => {
							console.log('captura evento');
							dispatch(doConnectWallet(window.ethereum, history));
						}}
						className="enableEthereumButton"
						color="secondary"
						shape="round"
						>
							Connect to Wallet Metamask
						</IonButton>
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
