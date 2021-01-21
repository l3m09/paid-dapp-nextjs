import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonNote,
	IonCheckbox,
	IonContent,
	IonLoading
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSetAgreementFormInfo, doSetKeepMyInfo, doLoadMyInfoKept } from '../../../redux/actions/documents';

interface AgreementFormProps {
	current: any;
}


const FormClient: React.FC<AgreementFormProps> = ({ current }) => {
	const [filled, setFilled] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [validConfirmEmail, setValidConfirmEmail] = useState(true);
	const [validName, setValidName] = useState(true);
	const [validAddress, setValidAddress] = useState(true);
	const [validPhone, setValidPhone] = useState(true);
	const [startValidation, setStartValidation] = useState(false);
	const documentsState = useSelector((state: any) => state.documents);
	const dispatch = useDispatch();

	const { loading, agreementFormInfo, keepMyInfo } = documentsState;

	const { email, confirmEmail, name, address, phone } = agreementFormInfo;

	function emailChanged(e: any) {
		setStartValidation(true);
		dispatch(doSetAgreementFormInfo({email: e.target.value}));
	}

	function confirmEmailChanged(e: any) {
		setStartValidation(true);
		dispatch(doSetAgreementFormInfo({confirmEmail: e.target.value}));
	}

	function nameChanged(e: any) {
		setStartValidation(true);
		dispatch(doSetAgreementFormInfo({ name: e.target.value }));
	}

	function addressChanged(e: any) {
		setStartValidation(true);
		dispatch(doSetAgreementFormInfo({ address: e.target.value }));
	}

	function phoneChanged(e: any) {
		setStartValidation(true);
		dispatch(doSetAgreementFormInfo({ phone: e.target.value }));
	}

	function verifyInfo() {
		setFilled(
			/.+@.+\..+/.test(email) &&
			email === confirmEmail &&
			name.length > 3 && 
			address.length > 3 && 
			phone.length > 3
		);
		if (startValidation) {
			setValidEmail(/.+@.+\..+/.test(email));
			setValidConfirmEmail(email === confirmEmail);
			setValidName(name.length > 3);
			setValidAddress(address.length > 3);
			setValidPhone(phone.length > 3);
		}
	}

	useEffect(() => {
		dispatch(doLoadMyInfoKept());
	}, []);

	useEffect(() => {
		verifyInfo();
	}, [agreementFormInfo]);

	async function slideNext() {
		await current.lockSwipeToNext(false);
		current.slideNext();
		await current.updateAutoHeight();
		await current.lockSwipeToNext(true);
	}

	const onSubmit = () => {
		slideNext().then(() => { });
	};

	const onSetKeepInfo = useCallback(() => {
		dispatch(doSetKeepMyInfo(!keepMyInfo ? agreementFormInfo : null));
	}, [dispatch, agreementFormInfo, keepMyInfo]);

	return (
		<div className="agreement-content">
			<h5 className="agreement-form-title">
				My Information
			</h5>
			<form action="" className="name-password-form">
				<IonContent className="content-form-client" scrollY>
					<IonItem disabled={keepMyInfo}>
						<IonLabel position="stacked">Full Name</IonLabel>
						<IonInput
							title="Label"
							type="text"
							placeholder="Enter your name"
							value={name}
							onInput={(e) => {
								nameChanged(e);
							}}
							onIonBlur={(e) => {
								nameChanged(e);
							}}
						/>
						{
							!validName &&
							<IonNote color="danger" className="ion-margin-top">
								Full name must be at least 3 characters.
							</IonNote>
						}
					</IonItem>
					<IonItem disabled={keepMyInfo}>
						<IonLabel position="stacked">Email</IonLabel>
						<IonInput
							title="Label"
							type="text"
							placeholder="Enter an email"
							value={email}
							onInput={(e) => {
								emailChanged(e);
							}}
							onIonBlur={(e) => {
								emailChanged(e);
							}}
						/>
						{
							!validEmail &&
							<IonNote color="danger" className="ion-margin-top">
								You must enter a valid email.
							</IonNote>
						}
					</IonItem>
					<IonItem disabled={keepMyInfo}>
						<IonLabel position="stacked">Confirm Email</IonLabel>
						<IonInput
							title="Label"
							type="text"
							placeholder="Confirm email"
							value={confirmEmail}
							onInput={(e) => {
								confirmEmailChanged(e);
							}}
							onIonBlur={(e) => {
								confirmEmailChanged(e);
							}}
						/>
						{
							!validConfirmEmail &&
							<IonNote color="danger" className="ion-margin-top">
								Email and confirm email do not match.
							</IonNote>
						}
					</IonItem>
					<IonItem disabled={keepMyInfo}>
						<IonLabel position="stacked">Address</IonLabel>
						<IonInput
							title="Label"
							type="text"
							placeholder="Enter your address"
							value={address}
							onInput={(e) => {
								addressChanged(e);
							}}
							onIonBlur={(e) => {
								addressChanged(e);
							}}
						/>
						{
							!validAddress &&
							<IonNote color="danger" className="ion-margin-top">
								Address must be at least 3 characters.
							</IonNote>
						}
					</IonItem>
					<IonItem disabled={keepMyInfo}>
						<IonLabel position="stacked">Phone</IonLabel>
						<IonInput
							title="Label"
							type="tel"
							placeholder="Enter your phone number"
							value={phone}
							onInput={(e) => {
								phoneChanged(e);
							}}
							onIonBlur={(e) => {
								phoneChanged(e);
							}}
						/>
						{
							!validPhone &&
							<IonNote color="danger" className="ion-margin-top">
								Phone must be at least 3 numbers.
							</IonNote>
						}
					</IonItem>
					<IonItem 
						className="item-checkbox"
						disabled={!filled}
					>
						<IonLabel className="checkbox-label">Keep this information</IonLabel>
						<IonCheckbox 
							color="primary"
							checked={keepMyInfo}
							slot="start"
							onClick={() => onSetKeepInfo()}
						>
						</IonCheckbox>
					</IonItem>
					<IonItem class="form-options">
						<IonButton
							// routerLink="/phrase/instructions"
							onClick={() => {
								onSubmit();
							}}
							color="gradient"
							shape="round"
							disabled={!filled}
						>
							{loading ? 'Loading..' : 'Confirm'}
						</IonButton>
					</IonItem>
				</IonContent>
			</form>
			<IonLoading
				cssClass="loader-spinner"
				mode="md"
				isOpen={loading}
			/>
		</div>
	);
};

export default FormClient;
