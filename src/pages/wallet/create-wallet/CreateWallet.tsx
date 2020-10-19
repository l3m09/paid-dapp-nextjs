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
	IonSlides
} from '@ionic/react';
import Instructions from './Instructions';
import SeedPhrase from './SeedPhrase';
import Completed from './Completed';
import ConfirmPhrase from './ConfirmPhrase';

interface CreateWalletProps {
	show: boolean;
	dismiss: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ show, dismiss }) => {
	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		slidesPerView: 1,
	};

	useEffect(() => {
		lockSwipes().then(r => {})
	}, [slidesRef]);

	async function lockSwipes() {
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(true);
		await slidesRef.current?.lockSwipeToNext(true);
	}

	lockSwipes().then(r => {})

	async function doDismiss() {
		await slidesRef.current?.lockSwipeToPrev(false);
		await slidesRef.current?.lockSwipeToNext(false);
		await lockSwipes()
		dismiss()
	}
	return (
		<IonModal
			isOpen={show}
			cssClass="create-wallet-modal"
			onDidDismiss={() => dismiss()}
		>
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle>Create a New Wallet</IonTitle>
					<IonButtons slot="end">
						<IonButton buttonType="" fill="clear" onClick={() => dismiss()}>
							Cancel
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonSlides pager={false} options={slideOpts} ref={slidesRef}>
					<IonSlide>
						<Instructions current={slidesRef.current} />
					</IonSlide>
					<IonSlide>
						<SeedPhrase current={slidesRef.current} />
					</IonSlide>
					<IonSlide>
						<ConfirmPhrase current={slidesRef.current} />
					</IonSlide>
					<IonSlide>
						<Completed current={slidesRef.current} dismiss={doDismiss}/>
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonModal>
	);
};

export default CreateWallet;
