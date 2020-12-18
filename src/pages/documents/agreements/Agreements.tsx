import React, { useRef,  useEffect } from 'react';
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
import NdaCompleted from './nda/NdaCompleted';

import { useDispatch } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../redux/actions/documents';

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
		slidesPerView: 1,
		autoHeight: true
	};

	useEffect(() => {
		lockSwipes().then((r) => {});
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [slidesRef]);

	async function lockSwipes() {
		slidesRef.current?.scroll(0,0);
		await slidesRef.current?.updateAutoHeight();
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(true);
		await slidesRef.current?.lockSwipeToNext(true);
	}

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
		slidesRef.current?.scroll(0,0);
		await slidesRef.current?.lockSwipeToPrev(false);
		await slidesRef.current?.lockSwipeToNext(false);
		await slidesRef.current?.slideTo(0).then(() => {
			history.push('/documents');
		});
	}

	const ndaTemplate: any = (
		<IonSlides mode="md" pager={false} options={slideOpts} ref={slidesRef}> 
			<IonSlide>
				<NdaDescription current={slidesRef.current} />
			</IonSlide>
			<IonSlide >
				<FormClient current={slidesRef.current} />
			</IonSlide>
			<IonSlide >
				<FormCounterparty current={slidesRef.current} />
			</IonSlide>
			<IonSlide >
				<NdaCompleted current={slidesRef.current} />
			</IonSlide>
		</IonSlides>
	);

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
