import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle,
	IonModal, IonToolbar, IonButtons, IonHeader, IonContent, IonIcon, IonNote, IonToast
} from '@ionic/react';
import { stat } from 'fs';
import { copy } from 'ionicons/icons';
import React, { Reducer, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionModel from '../models/ActionModel';
import { doUnlockWallet } from '../redux/actions/wallet';
import { TOAST_DURATION_WALLET_ADDRESS_COPY } from '../utils/constants';

interface Props {
	show: boolean;
	dismissible?: boolean;
	dismiss: () => void;
	selectedWallet: any;
}
interface UnlockForm {
	password: string;
	filled: boolean;
	validPassphrase: boolean;
}

const CHANGE_PASSPHRASE = 'CHANGE_PASSPHRASE';

const unlockWalletReducer: Reducer<UnlockForm, ActionModel> = (state: UnlockForm, action: ActionModel) => {
	const { type, payload } = action;

	switch(type) {
		case CHANGE_PASSPHRASE:
			return {
				...state,
				password: payload,
				filled: payload.length > 0,
				validPassphrase: payload.length > 0,
			}
		default:
			return { ...state };
	}
}

const UnlockWallet: React.FC<Props> = ({
	selectedWallet,
	show,
	dismissible,
	dismiss
}) => {
	const spanRef = useRef<HTMLSpanElement | null>(null);
	const passphraseRef = useRef<HTMLIonInputElement | null>(null);
	const dispatch = useDispatch();
	const [showToastCopy, setShowToastCopy] = useState(false);

	useEffect(() => {
		const bootstrapAsync = async () => {
			const element = await passphraseRef.current?.getInputElement();
			element?.focus();
		};

		setTimeout(() => bootstrapAsync(), 500);
	}, []);

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

	const unlockForm: UnlockForm = {
		filled: false,
		password: '',
		validPassphrase: true
	};

	const [state, commit] = useReducer(unlockWalletReducer, unlockForm);

	const { unlockingWallet, error } = wallet;

	const setter = (type: string) => (e: any) => {
		const { target } = e;
		const { value } = target;

		commit({ type, payload: value });
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			doUnlockWallet({
				wallet: selectedWallet,
				password: state.password
			})
		);
	};

	const copyAddressToClipboard = () => {
		const textArea: HTMLTextAreaElement = document.createElement("textarea");
		textArea.value = spanRef.current?.textContent ?? '';
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();
		setShowToastCopy(true);
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
							value={state.password}
							onInput={setter(CHANGE_PASSPHRASE)}
							onIonBlur={setter(CHANGE_PASSPHRASE)}
							ref={passphraseRef}
						/>
						{
							!state.validPassphrase &&
							<IonNote color="danger" className="ion-margin-top">
								You must enter a Passphrase.
							</IonNote>
						}
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
							disabled={unlockingWallet || !state.filled}
						>
							{unlockingWallet ? 'Loading..' : 'Unlock'}
						</IonButton>
					</IonItem>
				</form>
				<IonToast
					isOpen={showToastCopy}
					color="primary"
					onDidDismiss={() => setShowToastCopy(false)}
					message="Wallet address has been copied to clipboard"
					duration={TOAST_DURATION_WALLET_ADDRESS_COPY}
				/>
			</IonContent>
		</IonModal>
	);
};

export default UnlockWallet;
