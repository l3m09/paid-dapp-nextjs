import React, { useEffect, useRef } from 'react';
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
import NamePassword from './NamePassword';

interface CreateWalletProps {
	show: boolean;
	dismiss: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ show, dismiss }) => {
	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		slidesPerView: 1
	};

	useEffect(() => {
		const bootstrapAsync = async () => {
			await slidesRef.current?.update();
			await slidesRef.current?.slideTo(0);
			await slidesRef.current?.lockSwipeToPrev(true);
			await slidesRef.current?.lockSwipeToNext(true);	
		};

		bootstrapAsync();
	}, [show]);

	async function doDismiss() {
		dismiss();
		await slidesRef.current?.update();
		await slidesRef.current?.slideTo(0);
		await slidesRef.current?.lockSwipeToPrev(false);
		await slidesRef.current?.lockSwipeToNext(false);
	}

	return (
		<IonModal
			isOpen={show}
			cssClass="create-wallet-modal"
			onDidDismiss={() => doDismiss()}
		>
			<IonHeader translucent={false} mode="md">
				<IonToolbar>
					<IonTitle>Create a New Wallet</IonTitle>
					<IonButtons slot="end">
						<IonButton color="secondary" type="button" onClick={() => doDismiss()}>
							Cancel
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonSlides mode="md" pager={false} options={slideOpts} ref={slidesRef}>
					<IonSlide>
						<Instructions current={slidesRef.current} />
					</IonSlide>
					<IonSlide>
						<NamePassword current={slidesRef.current} />
					</IonSlide>
					<IonSlide>
						<SeedPhrase current={slidesRef.current} />
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonModal>
	);
};

export default CreateWallet;
