import React, { useEffect, useState } from 'react';
import './ExploreContainer.css';
import {
	CEAWalletManager,
	CEAKeyService,
	PouchdbKeyStorage,
	KeyService,
	KeyStorage,
	WalletManager,
	Wallet
} from 'cea-crypto-wallet';
import Pouchdb from 'pouchdb';

interface ContainerProps {
	name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
	const [wallet, setWallet] = useState<Wallet>();
	const [mnemonic, setMnemonic] = useState('');
	useEffect(() => {
		if (!mnemonic) {
			createWallet();
		}
	}, [mnemonic]);

	const createWallet = async () => {
		const keyService: KeyService = new CEAKeyService();
		const storage: KeyStorage = new PouchdbKeyStorage(new Pouchdb('PAID'));
		const manager: WalletManager = new CEAWalletManager(keyService, storage);
		const mnemonic = manager.generateMnemonic();
		setMnemonic(mnemonic);
		const wallet = await manager.createWallet('12345678', mnemonic);
		setWallet(wallet);
	};
	return (
		<div className="container">
			<strong>{name}</strong>
			<p>
				<b>This is the Mnemonic:</b> {mnemonic}
			</p>
			<p>
				<b>Wallet Address:</b> {wallet?.address}
			</p>
		</div>
	);
};

export default ExploreContainer;
