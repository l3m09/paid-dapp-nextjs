import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle,
	IonModal
} from '@ionic/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doUnlockWallet } from '../redux/actions/wallet';

interface Props {
	show: boolean;
	dismissible?: boolean;
	dismiss?: any;
}
interface UnlockForm {
	password: string;
	filled: boolean;
}

const UnlockWallet: React.FC<Props> = ({ show, dismissible, dismiss }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('dismissible', dismissible);
	}, [dismissible]);

	const wallet = useSelector(
		(state: {
			wallet: {
				currentWallet: any;
				unlockingWallet: boolean;
				error: any;
				unlockedWallet: any;
			};
		}) => state.wallet
	);
	const { currentWallet, unlockingWallet, error, unlockedWallet } = wallet;

	let unlockForm: UnlockForm = {
		filled: false,
		password: ''
	};
	function passwordChanged(e: any) {
		unlockForm.password = e.target.value;
		verifyInfo();
	}
	function verifyInfo() {
		if (unlockForm.password.length > 0) {
			unlockForm.filled = true;
		}
	}

	const onSubmit = () => {
		// e.preventDefault();
		dispatch(
			doUnlockWallet({
				walletId: currentWallet._id,
				password: unlockForm.password
			})
		);
	};

	return (
		<IonModal
			backdropDismiss={dismissible}
			isOpen={show}
			cssClass="agreement-content phrase-name-password unlock-modal"
		>
			<h5>
				<IonTitle>Unlock Wallet</IonTitle>
			</h5>
			<IonItem>
				<IonLabel position="stacked">Name:</IonLabel>
				<span>{currentWallet.name}</span>
			</IonItem>
			<IonItem>
				<IonLabel position="stacked">Address:</IonLabel>
				<span>{currentWallet.address}</span>
			</IonItem>
			<form action="" className="name-password-form">
				<IonItem>
					<IonLabel position="stacked">Password</IonLabel>
					<IonInput
						title="Label"
						type="password"
						placeholder="Enter your password"
						value={unlockForm.password}
						onInput={(e) => {
							passwordChanged(e);
						}}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked" className="text-error">
						{error}
					</IonLabel>
				</IonItem>
				<IonItem class="form-options">
					<IonButton
						// routerLink="/phrase/instructions"
						onClick={() => {
							onSubmit();
						}}
						class="purple-button "
						color="8500FF"
						disabled={unlockingWallet}
					>
						{unlockingWallet ? 'Loading..' : 'Unlock'}
					</IonButton>
					{unlockedWallet ? (
						<IonButton
							// routerLink="/phrase/instructions"
							onClick={() => {
								dismiss();
							}}
						>
							Cancel
						</IonButton>
					) : null}
				</IonItem>
			</form>
		</IonModal>
	);
};

export default UnlockWallet;
