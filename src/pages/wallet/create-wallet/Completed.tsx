import {
	IonContent,
	IonTitle,
	IonItem,
	IonButton,
	IonRouterLink,
	IonText,
	IonModal,
	IonImg
} from '@ionic/react';
import React, { useState } from 'react';

const Completed: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<IonContent fullscreen class="phrase-content phrase-completed">
			<IonItem>
				<span className="phrase-completed-image">
					<IonImg src="/assets/images/shield.svg" />
				</span>
			</IonItem>
			<IonItem>
				<IonTitle class="phrase-content-title phrase-completed-title">
					Congratulations
				</IonTitle>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					You’ve successfully protected your wallet. Remember to keep your seed
					phrase safe, it’s your responsibility!
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					<span className="text-brand-primary">
						<IonRouterLink
							class="text-brand-primary"
							onClick={() => setShowModal(true)}
						>
							Leave yourself a hint?
						</IonRouterLink>
					</span>
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					Paid cannot recover your wallet should you lose it. You can find your
					seed phrase in Settings.
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					<span className="text-brand-primary">
						<IonRouterLink
							class="text-brand-primary"
							onClick={() => setShowModal(true)}
						>
							Learn more
						</IonRouterLink>
					</span>
				</IonText>
			</IonItem>
			<IonItem class="">
				<IonButton
					routerLink="/wallets"
					class="purple-button done-button"
					color="8500FF"
				>
					Done
				</IonButton>
			</IonItem>

			<IonModal isOpen={showModal} cssClass="terms-modal">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
					impedit minima nesciunt nihil quos sapiente sequi temporibus.
					Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam?
					Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci
					architecto atque cupiditate, expedita officia quis tempore. Adipisci
					commodi eligendi enim illo quibusdam temporibus unde voluptate
					voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed.
					Ab accusantium architecto at cumque distinctio dolorem eos, eum
					exercitationem, explicabo facere fugiat impedit incidunt itaque iure
					libero, nobis odit officiis quam quis quisquam ratione repellendus
					saepe sit tempora voluptatem. Consequuntur, dicta distinctio dolorum
					eveniet incidunt itaque nisi recusandae.
				</p>
				<IonButton onClick={() => setShowModal(false)}>Close</IonButton>
			</IonModal>
		</IonContent>
	);
};

export default Completed;
