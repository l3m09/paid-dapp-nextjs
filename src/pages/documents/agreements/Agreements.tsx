import React, { useEffect, useRef, useState } from 'react';
import {
	IonButton,
	IonModal,
	IonTitle,
	IonContent,
	IonHeader,
	IonButtons,
	IonToolbar,
	IonSlide,
	IonSlides, IonPage
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';

import VehicleDescription from './vehicle/VehicleDescription';
import VehicleForm from './vehicle/VehicleForm';
import VehicleCompleted from './vehicle/VehicleCompleted';

import RentalDescription from './rental/RentalDescription';
import RentalForm from './rental/RentalForm';
import RentalCompleted from './rental/RentalCompleted';
import {useDispatch} from "react-redux";
import {doSetAgreementFormInfo} from "../../../redux/actions/documents";

interface AgreementsProps {
	show: boolean;
	dismiss: () => void;
}

const Agreements: React.FC<AgreementsProps> = ({ show, dismiss }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { type } = useParams<{ type: string; }>();

	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		slidesPerView: 1,
	};

	const vehicleTemplate: any = (
		<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
			<IonSlide>
				<VehicleDescription current={slidesRef.current}/>
			</IonSlide>
			<IonSlide>
				<VehicleForm current={slidesRef.current}/>
			</IonSlide>
			<IonSlide>
				<VehicleCompleted current={slidesRef.current}/>
			</IonSlide>
		</IonSlides>
	)
	const rentalTemplate: any = (
		<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
			<IonSlide>
				<RentalDescription current={slidesRef.current}/>
			</IonSlide>
			<IonSlide>
				<RentalForm current={slidesRef.current}/>
			</IonSlide>
			<IonSlide>
				<RentalCompleted current={slidesRef.current}/>
			</IonSlide>
		</IonSlides>
	)

	async function lockSwipes() {
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(true);
		await slidesRef.current?.lockSwipeToNext(true);
	}

	lockSwipes().then(r => {})

	async function toDocuments() {
		dispatch(doSetAgreementFormInfo({}));
		await slidesRef.current?.lockSwipeToPrev(false);
		await slidesRef.current?.lockSwipeToNext(false);
		await slidesRef.current?.slideTo(0).then(
			() => {
				history.push('/documents')
			}
		)
	}
	return (
		<IonPage className="agreements-page">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle>Agreement</IonTitle>
					<IonButtons slot="end">
						<IonButton buttonType="" fill="clear" onClick={() => {toDocuments()}}>
							Cancel
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{type === 'vehicle' ? vehicleTemplate : null}
				{type === 'rental' ? rentalTemplate : null}
			</IonContent>
		</IonPage>
	);
};

export default Agreements;
