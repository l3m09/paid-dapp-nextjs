import {
	IonContent,
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	doCreateAgreement,
	doSetAgreementFormInfo
} from '../../../../redux/actions/documents';
import { useParams } from 'react-router';

interface AgreementFormProps {
	current: any;
}

const RentalFormCounterparty: React.FC<AgreementFormProps> = ({ current }) => {
	const dispatch = useDispatch();
	const [filled, setFilled] = useState(false);

	const { type } = useParams<{ type: string }>();
	const documentsState = useSelector((state: any) => state.documents);
	const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
	);
	const { currentWallet } = wallet;

	const { loading, agreementFormInfo } = documentsState;

	useEffect(() => {
		verifyInfo()
	}, [agreementFormInfo]);


	function nameChanged(e: any) {
		dispatch(doSetAgreementFormInfo({counterpartyName: e.target.value}))
	}
	function addressChanged(e: any) {
		dispatch(doSetAgreementFormInfo({counterpartyAddress: e.target.value}))
	}
	function phoneChanged(e: any) {
		dispatch(doSetAgreementFormInfo({counterpartyPhone: e.target.value}))
	}
	function walletChanged(e: any) {
		dispatch(doSetAgreementFormInfo({counterpartyWallet: e.target.value}))
	}
	function verifyInfo() {
		if (
			agreementFormInfo.counterpartyWallet.length > 8 &&
			agreementFormInfo.counterpartyName.length > 4 &&
			agreementFormInfo.counterpartyAddress.length > 10 &&
			agreementFormInfo.counterpartyPhone.length > 5
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
		// e.preventDefault();
		dispatch(doSetAgreementFormInfo({createdAt: new Date().toDateString()}))
		dispatch(
			doCreateAgreement({
				signatoryA: currentWallet,
				signatoryB: agreementFormInfo.counterpartyWallet,
				validUntil: 0,
				agreementFormTemplateId: type,
				agreementForm: agreementFormInfo
			})
		);
		slideNext().then(() => {});
	};

	return (
		<div className="agreement-content">
			<h5>
				<IonTitle>Counterparty Information</IonTitle>
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
				<IonItem>
					<IonLabel position="stacked">Destination Wallet Address</IonLabel>
					<IonInput
						title="Label"
						placeholder="Enter the destination wallet address"
						onInput={(e) => {
							walletChanged(e);
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

export default RentalFormCounterparty;
