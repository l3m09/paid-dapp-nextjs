import React, { useRef } from 'react';
import {
	IonButton,
	IonTitle,
	IonContent,
	IonHeader,
	IonButtons,
	IonToolbar,
	IonSlide,
	IonSlides,
	IonPage
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';

import FormClient from './FormClient';
import FormCounterparty from './FormCounterparty';

// import VehicleDescription from './vehicle/VehicleDescription';
// import VehicleCompleted from './vehicle/VehicleCompleted';

// import RentalDescription from './rental/RentalDescription';
// import RentalCompleted from './rental/RentalCompleted';

import NdaDescription from './nda/NdaDescription';
import NdaCompleted from './nda/NdaCompleted';

import { useDispatch } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../redux/actions/documents';
import PreviewAgreement from './PreviewAgreement';

interface AgreementsProps {
	show: boolean;
	dismiss: () => void;
}

const Agreements: React.FC<AgreementsProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { type } = useParams<{ type: string }>();

	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		slidesPerView: 1
	};

	// const vehicleTemplate: any = (
	// 	<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
	// 		<IonSlide>
	// 			<VehicleDescription current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<FormClient current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<FormCounterparty current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<VehicleCompleted current={slidesRef.current} />
	// 		</IonSlide>
	// 	</IonSlides>
	// );
	// const rentalTemplate: any = (
	// 	<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
	// 		<IonSlide>
	// 			<RentalDescription current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<FormClient current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<FormCounterparty current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide>
	// 			<RentalCompleted current={slidesRef.current} />
	// 		</IonSlide>
	// 	</IonSlides>
	// );
	const ndaTemplate: any = (
		<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
			<IonSlide>
				<NdaDescription current={slidesRef.current} />
			</IonSlide>
			<IonSlide>
				<FormClient current={slidesRef.current} />
			</IonSlide>
			<IonSlide>
				<FormCounterparty current={slidesRef.current} />
			</IonSlide>
			<IonSlide>
				<PreviewAgreement current={slidesRef.current} />
			</IonSlide>
		</IonSlides>
	);

	async function lockSwipes() {
		await slidesRef.current?.update();
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(true);
		await slidesRef.current?.lockSwipeToNext(true);
	}

	lockSwipes().then(() => {});

	async function toDocuments() {
		dispatch(doSetAgreementFormInfo({
			name: '',
			address: '',
			phone: '',
			counterpartyWallet: '',
			counterpartyName: '',
			counterpartyAddress: '',
			counterpartyPhone: '',
			createdAt: null
		}));
		await slidesRef.current?.lockSwipeToPrev(false);
		await slidesRef.current?.lockSwipeToNext(false);
		await slidesRef.current?.slideTo(0).then(() => {
			history.push('/documents');
		});
	}
	return (
		<IonPage className="agreements-page content-page">
			<IonContent fullscreen>

				<IonHeader translucent={false} mode="md">
					<IonToolbar>
						<IonTitle>Agreement</IonTitle>
						<IonButtons slot="end">
							<IonButton
								color="secondary"
								shape="round"
								onClick={() => {
									toDocuments();
								}}
							>
								Cancel
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<div>
					{type === 'mutual-nda' ? ndaTemplate : null}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Agreements;
