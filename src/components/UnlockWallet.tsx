import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle,
	IonModal, IonToolbar, IonButtons, IonHeader, IonContent, IonIcon
} from '@ionic/react';
import { copy } from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';
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
	const spanRef = useRef<HTMLSpanElement | null>(null);
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
				unlockedWallet: string;
			};
		}) => state.wallet
	);
	const { unlockingWallet, error } = wallet;

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
		console.log(unlockForm, selectedWallet)
		if (unlockForm.filled) {
			dispatch(
				doUnlockWallet({
					wallet: selectedWallet,
					password: unlockForm.password
				})
			)
		};
	};

	const copyAddressToClipboard = () => {
		const textArea: HTMLTextAreaElement = document.createElement("textarea");
		textArea.value = spanRef.current?.textContent ?? '';
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
    	textArea.remove();
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
			<IonHeader  translucent={false} mode="md">
				<IonToolbar>
					<IonTitle>Unlock Wallet</IonTitle>
						<IonButtons slot="end">
							<IonButton color="secondary" shape="round" onClick={() => dismiss()}>
								Cancel
							</IonButton>
						</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonItem>
					<IonLabel position="stacked">Name:</IonLabel>
					<span>{selectedWallet.name}</span>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Address:</IonLabel>
					<div>
						<span ref={spanRef}>{selectedWallet.address}</span>
						<IonIcon icon={copy} onClick={() => copyAddressToClipboard()} className="copy-icon" />
					</div>
				</IonItem>
				<form onSubmit={onSubmit} className="name-password-form">
					<IonItem>
						<IonLabel position="stacked">Passphrase</IonLabel>
						<IonInput
							title="Label"
							type="password"
							placeholder="Enter your passphrase"
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
						{/* {unlockedWallet ? (*/}
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
						{/*) : null} */}
					</IonItem>
				</form>
			</IonContent>
		</IonModal>
	);
};

export default UnlockWallet;
