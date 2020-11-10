import {
	IonIcon,
	IonContent,
	IonTitle,
	IonItem,
	IonButton,
	IonText
} from '@ionic/react';
import React, { useEffect } from 'react';
import { lockClosedOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doGeneratePhrase } from '../../../redux/actions/wallet';

interface SeedPhraseProps {
	current: any;
}

const SeedPhrase: React.FC<SeedPhraseProps> = ({ current }) => {
	const dispatch = useDispatch();
	const wallet = useSelector(
		(state: { wallet: { seedPhrase: string[] } }) => state.wallet
	);
	const { seedPhrase } = wallet;

	async function slideNext() {
		console.log('SeedPhrase', await current.getActiveIndex());
		await current.lockSwipeToNext(false);
		current.slideNext();
		await current.lockSwipeToNext(true);
	}

	useEffect(() => {
		dispatch(doGeneratePhrase());
	}, [dispatch]);

	return (
		<IonContent fullscreen class="phrase-content seed-phrase">
			<IonItem>
				<span className="phrase-lock-icon">
					<IonIcon color="secondary" ios={lockClosedOutline} md={lockClosedOutline} />
				</span>
			</IonItem>
			<IonItem>
				<IonTitle class="phrase-content-title seed-phrase-title">
					Write down your seed phrase
				</IonTitle>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text seed-phrase-sub-text">
					This is your seed phrase. Write it down on a paper and keep it in a
					safe place. You’ll be asked to re-enter this phrase (in order) on the
					next step.
				</IonText>
			</IonItem>
			<IonItem>
				<div className="seed-phrase-words phrase-words">
					{seedPhrase.map((word, index) => {
						return (
							<span className="word" key={index}>
								{index + 1}. {word}
							</span>
						);
					})}
				</div>
			</IonItem>
			<IonItem class="">
				<IonButton
					onClick={() => {
						slideNext();
					}}
					class="purple-button create-button"
					color="gradient"
					shape="round"
				>
					Continue
				</IonButton>
			</IonItem>
		</IonContent>
	);
};

export default SeedPhrase;
