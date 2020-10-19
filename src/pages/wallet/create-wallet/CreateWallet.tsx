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
		initialSlide: 1,
		speed: 400
	};

	useEffect(() => {
		slidesRef.current?.lockSwipeToPrev(true);
		slidesRef.current?.lockSwipeToNext(true);
	}, [slidesRef]);

	return (
		<IonModal
			isOpen={show}
			cssClass="modal-page"
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
						<Instructions />
					</IonSlide>
					<IonSlide>
						<SeedPhrase />
					</IonSlide>
					<IonSlide>
						<ConfirmPhrase />
					</IonSlide>
					<IonSlide>
						<Completed />
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonModal>
	);
};

export default CreateWallet;
