import {
	IonContent,
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonNote
} from '@ionic/react';
import React, { useReducer } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { doCreateWallet } from '../../../redux/actions/wallet';
import { useDispatch } from 'react-redux';
import ActionModel from '../../../models/ActionModel';
import { doAddNamePassPharse } from '../../../redux/actions/wallet';

interface NamePasswordProps {
	current: any;
}

interface WalletInfo {
	name: string;
	passphrase: string;
	confirmPassphrase: string;
	verified: boolean;
	validName: boolean;
	validPassphrase: boolean;
	confirmedPassphrase: boolean;
}

const CHANGE_WALLET_NAME = 'CHANGE_WALLET_NAME';
const CHANGE_PASSPHRASE = 'CHANGE_PASSPHRASE';
const CHANGE_CONFIRM_PASSPHRASE = 'CHANGE_CONFIRM_PASSPHRASE';

const namePasswordReducer: React.Reducer<WalletInfo, ActionModel> = (state: WalletInfo, action: ActionModel) => {
	const { type, payload } = action;

	switch(type) {
		case CHANGE_WALLET_NAME:
			const name = payload;
			return {
				...state,
				name,
				verified: name.length > 0 && state.passphrase.length > 3 &&
				state.passphrase === state.confirmPassphrase,
				validName: name.length > 0
			};
		case CHANGE_PASSPHRASE:
			const passphrase = payload;
			return {
				...state,
				passphrase,
				verified: state.name.length > 0 && passphrase.length > 3 &&
				passphrase === state.confirmPassphrase,
				validPassphrase: passphrase.length > 3,
				confirmedPassphrase: passphrase === state.confirmPassphrase
			};
		case CHANGE_CONFIRM_PASSPHRASE:
			const confirmPassphrase = payload;
			return {
				...state,
				confirmPassphrase,
				verified: state.name.length > 0 && state.passphrase.length > 3 &&
				state.passphrase === confirmPassphrase,
				confirmedPassphrase: state.passphrase === confirmPassphrase,
			};
		default:
			return { ...state };
	}
}

const NamePassword: React.FC<NamePasswordProps> = ({ current }) => {
	const dispatch = useDispatch();

	let walletInfo: WalletInfo = { 
		name: '', 
		passphrase: '', 
		confirmPassphrase: '', 
		verified: false,
		validName: true,
		validPassphrase: true,
		confirmedPassphrase: true
	};

	const [state, commit] = useReducer(namePasswordReducer, walletInfo);

	const setter = (typeAction: string) => (e: any) => {
		const { target } = e;
		const { value } = target;
		commit({ type: typeAction, payload: value });
	};

	const onContinue = async () => {
		if (state.verified) {
			const {name, passphrase} = state;
			await dispatch(
				doAddNamePassPharse(name, passphrase)
			);
			await current.lockSwipeToNext(false);
			current.slideNext();
			await current.lockSwipeToNext(true);
		} else if (walletInfo.passphrase !== walletInfo.confirmPassphrase) {
			alert('Passphrase is different Confirm Passphrase');
		} else if (walletInfo.passphrase === '') {
			alert('Passphrase is Empty');
		} else if (walletInfo.confirmPassphrase === '') {
			alert('Passphrase is Empty');
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
						value={state.name}
						onInput={setter(CHANGE_WALLET_NAME)}
						onIonBlur={setter(CHANGE_WALLET_NAME)}
					/>
					{
						!state.validName &&
						<IonNote color="danger" className="ion-margin-top">
							You must enter a Wallet Name.
						</IonNote>
					}
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Passphrase</IonLabel>
					<IonInput
						title="passphrase"
						type="password"
						placeholder="Enter a passphrase for this wallet"
						value={state.passphrase}
						onInput={setter(CHANGE_PASSPHRASE)}
						onIonBlur={setter(CHANGE_PASSPHRASE)}
					/>
					{
						!state.validPassphrase &&
						<IonNote color="danger" className="ion-margin-top">
							Passphrase must be at least 3 characters.
						</IonNote>
					}
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Confirm Passphrase</IonLabel>
					<IonInput
						title="confirm passphrase"
						type="password"
						placeholder="Enter the passphrase for second time"
						value={state.confirmPassphrase}
						onInput={setter(CHANGE_CONFIRM_PASSPHRASE)}
						onIonBlur={setter(CHANGE_CONFIRM_PASSPHRASE)}
					/>
					{
						!state.confirmedPassphrase &&
						<IonNote color="danger" className="ion-margin-top">
							Passphrase and Confirm Passphrase do not match.
						</IonNote>
					}
				</IonItem>
				<IonItem class="form-options">
					<IonButton
						onClick={() => {
							onContinue();
						}}
						color="gradient"
						shape="round"
						disabled={!state.verified}
					>
						Continue
					</IonButton>
				</IonItem>
			</form>
		</IonContent>
	);
};

export default NamePassword;
