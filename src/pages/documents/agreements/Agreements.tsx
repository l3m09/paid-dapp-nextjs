import React, { useEffect, useRef, useState } from 'react';
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

import NdaDescription from './nda/NdaDescription';

import { useDispatch } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../redux/actions/documents';
import PreviewAgreement from './PreviewAgreement';
import { getContractTemplate } from '../../../redux/actions/template/index';
import BannerMobileSoon from '../../../components/BannerMobileSoon';

interface AgreementsProps {
	show: boolean;
	dismiss: () => void;
}

const Agreements: React.FC<AgreementsProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [titleAgreement, setTitleAgreement] = useState('');
	const { type } = useParams<{ type: string }>();

	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		slidesPerView: 1,
		autoHeight: true,
		centeredSlides: true,
		centeredSlidesBounds: true
	};

	useEffect(() => {
		const templateData = getContractTemplate(type);
		setTitleAgreement(templateData.title);
	}, [type]);

	const documentSlides: any = (
		<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
			{/* <IonSlide>
				<NdaDescription title={titleAgreement} current={slidesRef.current} />
			</IonSlide> */}
			<IonSlide>
				<FormClient current={slidesRef?.current} />
			</IonSlide>
			<IonSlide>
				<FormCounterparty current={slidesRef?.current} />
			</IonSlide>
			<IonSlide>
				<PreviewAgreement current={slidesRef?.current} />
			</IonSlide>
		</IonSlides>
	);

	async function lockSwipes() {
		await slidesRef.current?.update();
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(true);
		await slidesRef.current?.lockSwipeToNext(true);
	}

	useEffect(() => {
		lockSwipes().then((r) => {});
	}, [slidesRef]);

	lockSwipes().then((r) => {});

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
		await slidesRef?.current?.lockSwipeToPrev(false);
		await slidesRef?.current?.lockSwipeToNext(false);
		await slidesRef?.current?.slideTo(0)?.then(() => {
			history.push('/documents');
		});
	}

	// const ndaTemplate: any = (
	// 	<IonSlides mode="md" pager={false} options={slideOpts} ref={slidesRef}> 
	// 		<IonSlide>
	// 			<NdaDescription current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide >
	// 			<FormClient current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide >
	// 			<FormCounterparty current={slidesRef.current} />
	// 		</IonSlide>
	// 		<IonSlide >
	// 			<NdaCompleted current={slidesRef.current} />
	// 		</IonSlide>
	// 	</IonSlides>
	// );

	return (
		<IonPage className="agreements-page content-page">
			<BannerMobileSoon />
			<IonContent fullscreen 
				scrollEvents={true}>
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
					{
						documentSlides
					}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Agreements;
