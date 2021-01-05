import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonNote
} from '@ionic/react';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../redux/actions/documents';

interface AgreementFormProps {
	current: any;
}


const FormClient: React.FC<AgreementFormProps> = ({ current }) => {
	const [filled, setFilled] = useState(false);
	const [validName, setValidName] = useState(true);
	const [validAddress, setValidAddress] = useState(true);
	const [validPhone, setValidPhone] = useState(true);
	const [startValidation, setStartValidation] = useState(false);
	const documentsState = useSelector((state: any) => state.documents);
	const dispatch = useDispatch();

	const { loading, agreementFormInfo } = documentsState;

	useEffect(() => {
		verifyInfo();
	}, [agreementFormInfo]);

	function nameChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ name: e.target.value }));
	}
	function addressChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ address: e.target.value }));
	}
	function phoneChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ phone: e.target.value }));
	}

	function verifyInfo() {
		const { name, address, phone } = agreementFormInfo;
		setFilled(name.length > 3 && address.length > 3 && phone.length > 3);
		if (startValidation) {
			setValidName(name.length > 3);
			setValidAddress(address.length > 3);
			setValidPhone(phone.length > 3);
		}
		setStartValidation(true);
	}

	async function slideNext() {
		current.scroll(0,0);
		await current.lockSwipeToNext(false);
		current.slideNext();
		await current.updateAutoHeight();
		await current.lockSwipeToNext(true);
	}

	const onSubmit = () => {
		slideNext().then(() => { });
	};

	return (
		<div className="agreement-content">
			<h5 className="agreement-form-title">
				My Information
			</h5>
			<form action="" className="name-password-form">
				<IonItem>
					<IonLabel position="stacked">Full Name</IonLabel>
					<IonInput
						title="Label"
						type="text"
						placeholder="Enter your name"
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
				<IonItem>
					<IonLabel position="stacked">Address</IonLabel>
					<IonInput
						title="Label"
						type="text"
						placeholder="Enter your billing address"
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
				<IonItem>
					<IonLabel position="stacked">Phone</IonLabel>
					<IonInput
						title="Label"
						type="tel"
						placeholder="Enter your phone number"
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
			</form>
		</div>
	);
};

export default FormClient;
