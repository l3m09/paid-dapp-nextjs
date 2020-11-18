import {
	IonLabel,
	IonItem,
	IonInput,
	IonButton,
	IonTitle,
	IonLoading
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	doCreateAgreement,
	doSetAgreementFormInfo
} from '../../../redux/actions/documents';
import { useParams } from 'react-router';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

interface AgreementFormProps {
	current: any;
}

async function createPDF(){
	// Create styles
	const styles = StyleSheet.create({
		page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
		},
		section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
		}
	});
	
	// Create Document Component
	const MyDocument = () => (
		<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
			<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
			<Text>Section #2</Text>
			</View>
		</Page>
		</Document>
	);

	const App = () => (
		<div>
		  <PDFDownloadLink document={<MyDocument />} fileName="agreement.pdf">
			{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
		  </PDFDownloadLink>
		</div>
	  );
	return await ReactPDF.renderToStream(<App />);
}

const FormCounterparty: React.FC<AgreementFormProps> = ({ current }) => {
	const dispatch = useDispatch();
	const [filled, setFilled] = useState(false);

	const { type } = useParams<{ type: string }>();
	const documentsState = useSelector((state: any) => state.documents);
	const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
	);
	const { currentWallet } = wallet;

	const {
		loading,
		error,
		agreementFormInfo,
		creatingAgreement
	} = documentsState;

	function nameChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ counterpartyName: e.target.value }));
	}

	function addressChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ counterpartyAddress: e.target.value }));
	}

	function phoneChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ counterpartyPhone: e.target.value }));
	}

	function walletChanged(e: any) {
		dispatch(doSetAgreementFormInfo({ counterpartyWallet: e.target.value }));
	}

	function verifyInfo() {
		if (
			agreementFormInfo.counterpartyWallet.length > 3 &&
			agreementFormInfo.counterpartyName.length > 3 &&
			agreementFormInfo.counterpartyAddress.length > 3 &&
			agreementFormInfo.counterpartyPhone.length > 3
		) {
			setFilled(true);
		} else {
			setFilled(false);
		}
	}

	useEffect(() => {
		verifyInfo();
	});

	async function slideNext() {
		await current.lockSwipeToNext(false);
		await current.slideNext();
		await current.lockSwipeToNext(true);
	}

	async function slideBack() {
		await current.lockSwipeToPrev(false);
		await current.slidePrev();
		await current.lockSwipeToPrev(true);
	}

	const onSubmit = async () => {
		// e.preventDefault();
		dispatch(doSetAgreementFormInfo({ createdAt: new Date().toDateString() }));
		dispatch(
			doCreateAgreement({
				signatoryA: currentWallet.address,
				signatoryB: agreementFormInfo.counterpartyWallet,
				validUntil: 0,
				agreementFormTemplateId: type,
				agreementForm: agreementFormInfo,
				slideNext: slideNext,
				slideBack: slideBack,
				streamPDF: createPDF()
			})
		);
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
						disabled={!filled}
					>
						{loading ? 'Loading..' : 'Confirm'}
					</IonButton>
				</IonItem>
			</form>
			<IonLoading
				cssClass="my-custom-class"
				isOpen={creatingAgreement}
				message={'Please wait...'}
			/>
		</div>
	);
};

export default FormCounterparty;
