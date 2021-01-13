import {
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonItemGroup,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonIcon,
	IonItemDivider,
	IonToast,
} from '@ionic/react';
import { checkmarkCircle, copy } from 'ionicons/icons';

import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSetSelectedWallet } from '../../redux/actions/wallet';
import CreateWallet from './create-wallet/CreateWallet';
import UnlockWallet from '../../components/UnlockWallet';
import ImportWallet from './ImportWallet';
import MenuAlternate from '../../components/MenuAlternate';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { KeyStorageModel } from 'universal-crypto-wallet/dist/key-storage/KeyStorageModel';
// import { bold } from '../../redux/actions/template/agreement.html';
// import { promises } from 'fs';

const metodofn = async (addrtoken:string, unlockedWallet:any) => {
	const manager = BlockchainFactory.getWalletManager();
	const storage = manager.getKeyStorage();
	const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);

	const address = unlockedWallet.address
	const _walletModel = await BlockchainFactory.getWeb3Instance(unlockedWallet._id, unlockedWallet.password)!;
	const walletModel = _walletModel!;
	const web3 = walletModel.web3Instance;
	const network = await BlockchainFactory.getNetwork(walletModel.provider.chainId);

	const AgreementContract = ContractFactory.getAgreementContract(web3, network);
	const PaidTokenContract = ContractFactory.getPaidTokenContract(web3, network);
	const token = PaidTokenContract.options.address;
	console.log('address token', token);
	const methodFn = AgreementContract.methods.getBalanceToken(token, addrtoken);
	const balanceverify = await methodFn.call({ from: address })
	.then(async function (receipt: any) {
		const resultado =  web3.utils.fromWei(receipt,'ether');
		return resultado;
	});
	return Promise.resolve(balanceverify).then((x:string) => {return x})
}

const Wallets: React.FC = () => {
	const dispatch = useDispatch();
	const spanRef = useRef<HTMLSpanElement | null>(null);
	const wallet = useSelector((state: any) => state.wallet);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUnlockWalletModal, setShowUnlockWalletModal] = useState(false);
	const [showImportWalletModal, setShowImportWalletModal] = useState(false);
	const [showToastCopy, setShowToastCopy] = useState(false);
	const [balance, setBalance] = useState('');

	const { wallets, unlockedWallet, selectedWallet } = wallet;

	const openCreateModal = () => {
		setShowCreateModal(true);
	}

	const dismissCreateModal = () => {
		setShowCreateModal(false);
	};
	const dismissUnlockWalletModal = () => {
		setShowUnlockWalletModal(false);
		dispatch(doSetSelectedWallet(null));
	};

	const dismissImportModal = () => {
		setShowImportWalletModal(false);
	};

	const copyAddressToClipboard = () => {
		const textArea: HTMLTextAreaElement = document.createElement("textarea");
		textArea.value = spanRef.current?.textContent ?? '';
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();
		setShowToastCopy(true);
	};

	const getBalance = useCallback ( async (addr:string, ulckwallet:any) => {
			const resultado =  await metodofn(addr, ulckwallet);
			setBalance(resultado);
	}, [unlockedWallet])

	const showbalancetoken = (addrtoken:string) => {
		if (unlockedWallet) {
			getBalance(addrtoken, unlockedWallet)
				.then( () => console.log('shwbalancetkn', balance))
				.catch( (e) => console.log('shwbalanceerr', e.message))
			return balance;
		}
		return '0';
	}


	function openUnlockWallet(wallet: any) {
		dispatch(doSetSelectedWallet(wallet));
		setShowUnlockWalletModal(true);
	}

	return (
		<IonPage className="wallets-page content-page">
			<IonContent fullscreen>
				<IonHeader translucent={false} mode="md">
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>Wallets</IonTitle>
						<MenuAlternate/>
					</IonToolbar>
				</IonHeader>

				<div>
					<IonItem className="wallets-title">
						<h5>Select default Wallet</h5>
					</IonItem>
					<div className="wallets-list-wrapper">
						<IonItemGroup class="wallets-container">
							{unlockedWallet == null ?
								<IonTitle color="primary" className="ion-text-center no-wallet-selected">
									No wallet Selected
								</IonTitle>
								: ''
							}
							{wallets.map( (item: any, index: any, flag:boolean) => {
								let balancetoken:string = '';
								if (unlockedWallet?.address === item.address) {
									balancetoken = showbalancetoken(item.address);
									return (
										<IonItem class="wallet-wrapper selected-wallet" key={index}>
											<div className="wallet-container">
												{/* <IonIcon icon={checkmarkCircle} className="current-tag" aria-label="Active wallet" /> */}
												<strong className="current-tag">Active</strong>
												<span className="label">{item.name}</span>
												<span className="address" ref={spanRef}>{item.address}</span>
												<IonIcon className="icon-copy" icon={copy} onClick={() => copyAddressToClipboard()}/>
												{
													(typeof item.balance !== 'undefined') &&
													<div className="balanceContainer">
														<span className="labelCoin">ETH</span>
														<span className="amountCoin">{item.balance?.match(/^-?\d+(?:\.\d{0,4})?/)[0]}</span>
														<br/>
														<span className="labelCoin">PAID</span>
														<span className="amountCoin">{balancetoken}</span>
													</div>
												}
											</div>
										</IonItem>
									);
								} else {
									balancetoken = '0';
									return (
										<IonItem
											class="wallet-wrapper"
											key={index}
											onClick={() => openUnlockWallet(item)}
										>
											<div className="wallet-container">
												<span className="label">{item.name}</span>
												<span className="address">{item.address}</span>
												{
													(typeof item.balance !== 'undefined') &&
													<div className="balanceContainer">
														<span className="labelCoin">ETH</span>
														<span className="amountCoin">{item.balance?.match(/^-?\d+(?:\.\d{0,4})?/)[0]}</span>
														<br/>
														<span className="labelCoin">PAID</span>
														<span className="amountCoin">{balancetoken}</span>
													</div>
												}
											</div>
										</IonItem>
									);
								}
							})}
						</IonItemGroup>
						<IonItemDivider />
						<IonItemGroup>
							<IonItem class="form-options">
								<IonButton
									onClick={() => openCreateModal()}
									class=""
									color="secondary"
									shape="round"
								>
									Create Wallet
								</IonButton>
							</IonItem>
							<IonItem class="form-options">
								<IonButton
									onClick={() => setShowImportWalletModal(true)}
									class=""
									color="gradient"
									shape="round"
								>
									Import Wallet
								</IonButton>
							</IonItem>
						</IonItemGroup>
					</div>
					<CreateWallet show={showCreateModal} dismiss={dismissCreateModal} />
					<ImportWallet
						show={showImportWalletModal}
						dismiss={dismissImportModal}
					/>
					{selectedWallet !== null ? (
						<UnlockWallet
							show={showUnlockWalletModal}
							dismissible={true}
							dismiss={dismissUnlockWalletModal}
							selectedWallet={selectedWallet}
						/>
					) : null}
				</div>
				<IonToast
					isOpen={showToastCopy}
					color="primary"
					onDidDismiss={() => setShowToastCopy(false)}
					message="Wallet address has been copied to clipboard"
					duration={300}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Wallets;
