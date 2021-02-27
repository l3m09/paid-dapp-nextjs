import React from 'react';
import {IonButton, IonModal} from "@ionic/react";

interface TermsModalProps {
	show: boolean;
	dismiss: () => void;
	title?: string;
}

const Terms: React.FC<TermsModalProps> = ({show, dismiss, title}) => {
	return (
			<IonModal isOpen={show} onDidDismiss={() => dismiss} cssClass='terms-modal'>
				<div>
					<h1>{title || 'Terms'}</h1>
					<p>
					The seed passphrase is provided to you when you sign up for a new Blockchain Wallet. When you recover your wallet with your mnemonic, your password and identifier will be displayed to you. Your main password cannot be changed once it is set, therefore your mnemonic will always remain the same for each wallet.
					</p>
					<p>
					Basically, a seed phrase is a way to reproduce something hard to remember, like a series of data, and by associating the data with things like random words, so humans can remember the original data by using the mnemonic as a deciphering tool. With private keys tied to cryptocurrencies, the list of words you write down as a backup is basically enough information to recover your funds to another wallet if something unfortunate were to happen.
					</p>
					<p>
					So whenever you write down a seed to a new wallet the set of words is your private key and anyone who learns the seed phrase has access to your funds. So always be very careful with your mnemonic recovery phrase. The longer the mnemonic, the more secure your assets will be as a 24-word seed is harder to crack compared to one that is just twelve.
					</p>	
					
				</div>
				<IonButton shape="round" color="secondary" onClick={dismiss}>Close</IonButton>
			</IonModal>
	);
};

export default Terms;
