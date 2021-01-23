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
import { openSuccessDialog } from '../redux/actions/documents'
import { isUnlock } from '../utils/metamask'
import { doGetWallets } from '../redux/actions/wallet';
import CreateWallet from './wallet/create-wallet/CreateWallet';
import ImportWallet from "./wallet/ImportWallet";
import { BlockchainFactory } from '../utils/blockchainFactory';

declare global {
	interface Window { web3: any; ethereum: any;}
}

const Landing: React.FC = () => {
	const history = useHistory();
	// const wallet = useSelector(
	// 	(state: { wallet: { wallets: []; loadingWallets: boolean } }) =>
	// 		state.wallet
	// );
	const dispatch = useDispatch();
	const mask = isUnlock();
	let metamask:boolean;
	let loading = true;
	Promise.resolve(mask).then(async (resp:boolean)=> {
		metamask = resp;
		loading = false;
		console.log('dentro de promise',metamask, loading, window.ethereum);
		if (metamask) {
			const ethereumButton = document.querySelector('.enableEthereumButton');

			const metaInstance = await BlockchainFactory.getWeb3Mask(window.ethereum);
			window.web3 = metaInstance?.web3Instance;

			const getAccount = async () =>  {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				const account = accounts[0];
				if (account != null) {history.push('/documents');}
				console.log(account);
			}

			ethereumButton?.addEventListener('click', async () => {
				//Will Start the metamask extension
				getAccount();
				});
			console.log('Metamask Installed');
		} else {
			dispatch(openSuccessDialog('Failed to Connect Metamask'));
			history.push('/');
		}
	})


	// const enable = () =>{
	// 	console.log('active metamask')
	// 	window.ethereum.enable();
	// }

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

				{/* <IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}
				/> */}
						<IonButton
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
