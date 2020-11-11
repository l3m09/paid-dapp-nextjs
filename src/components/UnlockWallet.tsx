import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle,
	IonModal,
	IonToolbar,
	IonButtons,
	IonHeader
} from '@ionic/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doUnlockWallet } from '../redux/actions/wallet';

interface Props {
	show: boolean;
	dismissible?: boolean;
	dismiss: () => void;
	selectedWallet: any;
}
interface UnlockForm {
	password: string;
	filled: boolean;
}

const UnlockWallet: React.FC<Props> = ({
	selectedWallet,
	show,
	dismissible,
	dismiss
}) => {
	const dispatch = useDispatch();

	const wallet = useSelector(
		(state: {
			wallet: {
				currentWallet: any;
				unlockingWallet: boolean;
				error: any;
				unlockedWallet: string;
			};
		}) => state.wallet
	);
	const { unlockingWallet, error, unlockedWallet } = wallet;

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

	const onSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			doUnlockWallet({
				wallet: selectedWallet,
				password: unlockForm.password
			})
		);
	};

	return (
		<IonModal
			onDidDismiss={() => {
				dismiss();
			}}
			backdropDismiss={dismissible}
			isOpen={show}
			cssClass="unlock-modal"
		>
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle>Unlock Wallet</IonTitle>
					{unlockedWallet ? (
						<IonButtons slot="end">
							<IonButton
								color="secondary"
								shape="round"
								onClick={() => dismiss()}
							>
								Cancel
							</IonButton>
						</IonButtons>
					) : null}
				</IonToolbar>
			</IonHeader>
			<IonItem>
				<IonLabel position="stacked">Name:</IonLabel>
				<span>{selectedWallet.name}</span>
			</IonItem>
			<IonItem>
				<IonLabel position="stacked">Address:</IonLabel>
				<span>{selectedWallet.address}</span>
			</IonItem>
			<form onSubmit={onSubmit} className="name-password-form">
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
						type="submit"
						color="gradient"
						shape="round"
						disabled={unlockingWallet}
					>
						{unlockingWallet ? 'Loading..' : 'Unlock'}
					</IonButton>
					{/*{unlockedWallet ? (*/}
					{/*	<IonButton*/}
					{/*		color="secondary"*/}
					{/*		shape="round"*/}
					{/*		// routerLink="/phrase/instructions"*/}
					{/*		onClick={() => {*/}
					{/*			dismiss();*/}
					{/*		}}*/}
					{/*	>*/}
					{/*		Cancel*/}
					{/*	</IonButton>*/}
					{/*) : null}*/}
				</IonItem>
			</form>
		</IonModal>
	);
};

export default UnlockWallet;
