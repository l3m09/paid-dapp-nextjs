import {
	IonIcon,
	IonContent,
	IonTitle,
	IonItem,
	IonButton,
	IonText
} from '@ionic/react';
import React from 'react';
import { checkmarkCircle } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doAddWord, doRemoveWord } from '../../../redux/actions/wallet';

interface ConfirmPhraseProps {
	current: any
}

const ConfirmPhrase: React.FC<ConfirmPhraseProps> = ({current}) => {
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const { seedPhrase, confirmedSeedPhrase, confirmed } = wallet;

	async function slideNext() {
		console.log('ConfirmPhrase', await current.getActiveIndex())
		await current.lockSwipeToNext(false);
		current.slideNext()
		await current.lockSwipeToNext(true);

	}

	function selectWord(word: string, index: number) {
		dispatch(doAddWord(word, index));
	}
	function deSelectWord(word: string, index: number) {
		dispatch(doRemoveWord(word, index));
	}

	let confirmedItems: any = [];
	for (let index = 0; index < 12; index += 1) {
		if (confirmedSeedPhrase[index]) {
			confirmedItems.push(
				<span
					onClick={() => {
						deSelectWord(confirmedSeedPhrase[index], index);
					}}
					className="word-wrapper"
					key={index}
				>
					<span className="index">{index + 1}.</span>
					<span className="word">{confirmedSeedPhrase[index]} </span>
				</span>
			);
		} else {
			confirmedItems.push(
				<span className="word-wrapper" key={index}>
					<span className="index">{index + 1}.</span>
					<span className="word"> </span>
				</span>
			);
		}
	}

	let confirmedState: any = '';
	if (confirmed) {
		confirmedState = (
			<span className="text-success">
				<IonIcon icon={checkmarkCircle} />
				<strong>Success</strong>
			</span>
		);
	}

	return (
		<IonContent fullscreen class="phrase-content confirm-phrase">
			<IonItem>
				<IonTitle class="phrase-content-title confirm-phrase-title">
					Confirm your seed phrase
				</IonTitle>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text confirm-phrase-sub-text">
					Select each word in the order it was presented to you.
				</IonText>
			</IonItem>
			<IonItem>
				<div
					className={
						confirmed
							? 'confirm-phrase-words phrase-words confirmed'
							: 'confirm-phrase-words phrase-words'
					}
				>
					{confirmedItems}
				</div>
			</IonItem>
			<IonText class="confirmed-text">{confirmedState}</IonText>
			<IonItem className={confirmed ? 'ion-hide' : ''}>
				<div className="confirm-phrase-words phrase-words">
					{seedPhrase.map((word: any, index: any) => {
						return (
							<span
								onClick={() => {
									selectWord(word, index);
								}}
								className="word"
								key={index}
							>
								{word}
							</span>
						);
					})}
				</div>
			</IonItem>
			{confirmed ? (
				<IonItem class="button-wrapper">
					<IonButton
						onClick={() => {slideNext()}}
						disabled={!confirmed}
						class="purple-button complete-button"
						color="8500FF"
					>
						Next
					</IonButton>
				</IonItem>
			) : (
				''
			)}
		</IonContent>
	);
};

export default ConfirmPhrase;
