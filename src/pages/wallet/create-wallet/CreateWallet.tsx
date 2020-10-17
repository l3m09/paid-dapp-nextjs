import React, { useRef, useState } from 'react';
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

interface CreateWalletProps {
	show: boolean;
	dismiss: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ show, dismiss }) => {
	const slidesRef = useRef<HTMLIonSlideElement | null>(null);
	const slideOpts = {
		initialSlide: 1,
		speed: 400
	};

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
				<IonSlides pager={false} options={slideOpts}>
					<IonSlide>
						<Instructions />
					</IonSlide>
					<IonSlide>
						<SeedPhrase />
					</IonSlide>
					<IonSlide>
						<h1>Slide 3</h1>
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonModal>
	);
};

export default CreateWallet;
