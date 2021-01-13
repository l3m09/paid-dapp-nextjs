import {
	IonIcon,
	IonContent,
	IonTitle,
	IonItem,
	IonButton,
	IonText,
	IonCol,
	IonGrid,
	IonRow
} from '@ionic/react';
import React from 'react';
import { checkmarkCircle } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doAddWord, doRemoveWord } from '../../../redux/actions/wallet';

interface ConfirmPhraseProps {
	current: any;
}

const ConfirmPhrase: React.FC<ConfirmPhraseProps> = ({ current }) => {
	const dispatch = useDispatch();
	const wallet = useSelector((state: any) => state.wallet);
	const { seedPhrase, confirmedSeedPhrase, confirmed } = wallet;
	const randomSeedPhrase = randomSeedPhraseOrder(seedPhrase);

	async function slideNext() {
		console.log('ConfirmPhrase', await current.getActiveIndex());
		await current.lockSwipeToNext(false);
		current.slideNext();
		await current.lockSwipeToNext(true);
	}

	function randomSeedPhraseOrder(words: any){
		let response : [string] = [''];
		if(words.length > 0){
			let choosenNumbers : [number] = [0];
			for(let i = 0; i < words.length; i++){
				let number = (Math.floor(Math.random() * (words.length)) + 1) - 1;
				if(i === 0)
					choosenNumbers[0] = number;
				else{
					let found = false;
					while(!found){
						for(let index = 0; index < choosenNumbers.length; index++){
							if(choosenNumbers[index] === number){
								found = true;
								break;
							}
						}
						if(found){
							number = (Math.floor(Math.random() * (words.length)) + 1) - 1;
							found = false;
						}
						else{
							found = true;	
						}
					}
					choosenNumbers.push(number);
				}
			}

			for(let i = 0; i < choosenNumbers.length; i++){
				if(i === 0)
					response[0] = words[choosenNumbers[i]];
				else
					response.push(words[choosenNumbers[i]]);
			};
		}
		return response;
	}

	function selectWord(word: string) {
		dispatch(doAddWord(word));
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
			<IonItem className="phrase-content-title-wrapper">
				<IonTitle class="phrase-content-title confirm-phrase-title">
					Confirm your seed phrase
				</IonTitle>
			</IonItem>
			<IonItem className="phrase-content-sub-text-wrapper">
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
					{randomSeedPhrase.map((word: any, index: any) => {
						return (
							<span
								onClick={() => {
									selectWord(word);
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
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonButton
								onClick={() => {
									slideNext();
								}}
								disabled={!confirmed}
								class="complete-button"
								color="gradient"
								shape="round"
							>
								Complete Backup
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			) : (
				''
			)}
		</IonContent>
	);
};

export default ConfirmPhrase;
