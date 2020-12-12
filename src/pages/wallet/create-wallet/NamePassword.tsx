import {
	IonContent,
	IonLabel,
	IonItem,
	IonInput,
	IonButton
} from '@ionic/react';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { doCreateWallet } from '../../../redux/actions/wallet';
import { useDispatch } from 'react-redux';
import { doAddNamePassPharse } from '../../../redux/actions/wallet';

interface NamePasswordProps {
	current: any;
}
interface WalletInfo {
	name: string;
	passphrase: string;
	confirmPassphrase: string,
	verified: boolean;
}

const NamePassword: React.FC<NamePasswordProps> = ({ current }) => {
	const dispatch = useDispatch();
	// const wallet = useSelector(
	// 	(state: {
	// 		wallet: {
	// 			wallets: [];
	// 			loading: boolean;
	// 			confirmedSeedPhrase: [];
	// 			creatingWallet: boolean;
	// 		};
	// 	}) => state.wallet
	// );
	// const { confirmedSeedPhrase, creatingWallet } = wallet;

	let walletInfo: WalletInfo = { name: '', passphrase: '', confirmPassphrase: '', verified: false };

	function nameChanged(e: any) {
		walletInfo.name = e.target.value;
		verifyInfo();
	}
	function passphraseChanged(e: any) {
		walletInfo.passphrase = e.target.value;
		verifyInfo();
	}
	function confirmPassphraseChanged(e: any) {
		walletInfo.confirmPassphrase = e.target.value;
		verifyInfo();
	}
	function verifyInfo() {
		if (walletInfo.name.length > 0 && 
			walletInfo.passphrase.length > 3 &&
			walletInfo.passphrase === walletInfo.confirmPassphrase) {
			walletInfo.verified = true;
		}
	}

	// const onSubmit = () => {
	// 	// e.preventDefault();
	// 	let mnemonic = confirmedSeedPhrase.join(' ');
	// 	dispatch(
	// 		doCreateWallet({
	// 			name: walletInfo.name,
	// 			password: walletInfo.passphrase,
	// 			mnemonic: mnemonic
	// 		})
	// 	);
	// 	// slideNext().then(() => {});
	// };

	const onContinue = async () => {
		if (walletInfo.verified) {
			const {name, passphrase} = walletInfo;
			await dispatch(
				doAddNamePassPharse(name, passphrase)
			);
			await current.lockSwipeToNext(false);
			current.slideNext();
			await current.lockSwipeToNext(true);
		}
	};

	return (
		<IonContent fullscreen class="phrase-content phrase-name-password">
			<form action="" className="name-password-form">
				<IonItem>
					<IonLabel position="stacked">Wallet Name</IonLabel>
					<IonInput
						title="Label"
						type="text"
						placeholder="Enter a name for this wallet"
						value={walletInfo.name}
						onInput={(e) => {
							nameChanged(e);
						}}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Passphrase</IonLabel>
					<IonInput
						title="passphrase"
						type="password"
						placeholder="Enter a passphrase for this wallet"
						value={walletInfo.passphrase}
						onInput={passphraseChanged}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Confirm Passphrase</IonLabel>
					<IonInput
						title="confirm passphrase"
						type="password"
						placeholder="Enter confirm passphrase"
						value={walletInfo.confirmPassphrase}
						onInput={confirmPassphraseChanged}
					/>
				</IonItem>
				<IonItem class="form-options">
					{/*
					<IonButton
						// routerLink="/phrase/instructions"
						onClick={() => {
							onSubmit();
						}}
						color="gradient"
						shape="round"
						disabled={creatingWallet}
					>
						{creatingWallet ? 'Loading..' : 'Confirm'}
					</IonButton>
					*/}
					<IonButton
						onClick={() => {
							onContinue();
						}}
						color="gradient"
						shape="round"
					>
						Continue
					</IonButton>
				</IonItem>
			</form>
		</IonContent>
	);
};

export default NamePassword;
