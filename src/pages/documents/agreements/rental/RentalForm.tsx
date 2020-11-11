import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../../redux/actions/documents';

interface AgreementFormProps {
	current: any;
}


const RentalForm: React.FC<AgreementFormProps> = ({ current }) => {
	const [filled, setFilled] = useState(false);
	const documentsState = useSelector((state: any) => state.documents);
	const dispatch = useDispatch();

	const { loading, agreementFormInfo } = documentsState;

	useEffect(() => {
		verifyInfo()
	}, [agreementFormInfo]);

	function nameChanged(e: any) {
		dispatch(doSetAgreementFormInfo({name: e.target.value}));
	}
	function addressChanged(e: any) {
		dispatch(doSetAgreementFormInfo({address: e.target.value}));
	}
	function phoneChanged(e: any) {
		dispatch(doSetAgreementFormInfo({phone: e.target.value}));
	}

	function verifyInfo() {
		if (
			agreementFormInfo.name.length > 4 &&
			agreementFormInfo.address.length > 10 &&
			agreementFormInfo.phone.length > 5
		) {
			setFilled(true)
		} else {
			setFilled(false)
		}
	}

	async function slideNext() {
		await current.lockSwipeToNext(false);
		current.slideNext();
		await current.lockSwipeToNext(true);
	}

	const onSubmit = () => {
		slideNext().then(() => {});
	};

	return (
		<div className="agreement-content">
			<h5>
				<IonTitle>My Information</IonTitle>
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
					/>
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
					/>
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
					/>
				</IonItem>
				<IonItem class="form-options">
					<IonButton
						// routerLink="/phrase/instructions"
						onClick={() => {
							onSubmit();
						}}
						color="gradient"
						shape="round"
						disabled={loading || !filled}
					>
						{loading ? 'Loading..' : 'Confirm'}
					</IonButton>
				</IonItem>
			</form>
		</div>
	);
};

export default RentalForm;
