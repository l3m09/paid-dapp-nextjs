import {
	IonIcon,
	IonTitle,
	IonItem,
	IonButton,
	IonRouterLink,
	IonText,
	IonContent
} from '@ionic/react';
import React, { useState } from 'react';
import { lockClosedOutline, warning } from 'ionicons/icons';
import Terms from '../../../components/Terms';

interface InstructionsProps {
	current: HTMLIonSlidesElement | null;
}

const Instructions: React.FC<InstructionsProps> = ({ current }) => {
	const [showModal, setShowModal] = useState(false);

	async function slideNext() {
		console.log(current);
		await current?.lockSwipeToNext(false);
		console.log('next');
		current?.slideNext();
		// await current.lockSwipeToNext(true);
	}

	return (
		<IonContent fullscreen class="phrase-content seed-phrase-instructions">
			<IonItem>
				<span className="phrase-lock-icon">
					<IonIcon
						color="secondary"
						ios={lockClosedOutline}
						md={lockClosedOutline}
					/>
				</span>
			</IonItem>
			<IonItem>
				<span className="some-text">
					Secure your wallet’s
					<IonText color="secondary" className="ion-color-secondary" onClick={() => setShowModal(true)}>
						{' '}
						seed phrase
					</IonText>
				</span>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text seed-phrase-instructions-sub-text">
					<span className="text-brand-primary">
						<IonIcon color="secondary" ios={warning} md={warning} />
						<IonRouterLink color="secondary" onClick={() => setShowModal(true)}>
							Why is it important?
						</IonRouterLink>
						<Terms
							show={showModal}
							dismiss={() => {
								setShowModal(false);
							}}
							title="Why is it important?"
						/>
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
						<li>
							<span>You lose it</span>
						</li>
						<li>
							<span>You forget where you put it</span>
						</li>
						<li>
							<span>Someone else finds it</span>
						</li>
					</ul>
					<IonText class="instructions-sub-text third">
						<strong>Other options: </strong> Doesn't have to be on paper
					</IonText>
					<IonTitle class="instructions-title third">Tips:</IonTitle>
					<ul className="instructions-list first">
						<li>
							<span>Store in bank vault</span>
						</li>
						<li>
							<span>Store in a safe</span>
						</li>
						<li>
							<span>Store in multiple secret places</span>
						</li>
					</ul>
					<IonButton
						onClick={() => {
							slideNext();
						}}
						class="start-button"
						color="gradient"
						shape="round"
					>
						Start
					</IonButton>
				</div>
			</IonItem>
		</IonContent>
	);
};

export default Instructions;
