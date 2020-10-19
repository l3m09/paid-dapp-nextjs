import {
	IonIcon,
	IonTitle,
	IonItem,
	IonButton,
	IonRouterLink,
	IonText,
	IonModal,
	IonContent
} from '@ionic/react';
import React, { useState } from 'react';
import { lockClosedOutline, warning } from 'ionicons/icons';


interface InstructionsProps {
	current: any
}

const Instructions: React.FC<InstructionsProps> = ({current}) => {
	const [showModal, setShowModal] = useState(false);

	async function slideNext() {
		console.log('Instructions', await current.getActiveIndex())
		await current.lockSwipeToNext(false);
		current.slideNext()
		await current.lockSwipeToNext(true);

	}

	return (
		<IonContent fullscreen class="phrase-content seed-phrase-instructions">
			<IonItem>
				<span className="phrase-lock-icon">
					<IonIcon ios={lockClosedOutline} md={lockClosedOutline} />
				</span>
			</IonItem>
			<IonItem>
				<span className="some-text">
					Secure your wallet’s
					<span className="text-brand-primary"> seed phrase</span>
				</span>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text seed-phrase-instructions-sub-text">
					<span className="text-brand-primary">
						<IonIcon ios={warning} md={warning} />
						<IonRouterLink
							class="text-brand-primary"
							onClick={() => setShowModal(true)}
						>
							Why is it important?
						</IonRouterLink>
					</span>
				</IonText>
			</IonItem>
			<IonItem>
				<div className="instructions">
					<IonTitle class="instructions-title first">Manual</IonTitle>
					<IonText class="instructions-sub-text first">
						Write down your seed phrase on a piece of paper and store in a safe
						place.
					</IonText>
					<div className="difficulty">
						<IonText class="instructions-sub-text second">
							Security level: Very strong
						</IonText>
						<div className="bars">
							<span className="bar"></span>
							<span className="bar"></span>
							<span className="bar"></span>
						</div>
					</div>
					<IonTitle class="instructions-title second">Risk are:</IonTitle>
					<ul className="instructions-list first">
						<li>You lose it</li>
						<li>You forget where you put it</li>
						<li>Someone else finds it</li>
					</ul>
					<IonText class="instructions-sub-text third">
						<strong>Other options: </strong> Doesn't have to be on paper
					</IonText>
					<IonTitle class="instructions-title third">Tips:</IonTitle>
					<ul className="instructions-list first">
						<li>Store in bank vault</li>
						<li>Store in a safe</li>
						<li>Store in multiple secret places</li>
					</ul>
					<IonButton
						onClick={() => {slideNext()}}
						class="purple-button start-button"
						color="8500FF"
					>
						Start
					</IonButton>
				</div>
			</IonItem>
			<IonModal isOpen={showModal} cssClass="instructions-info-modal">
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

export default Instructions;
