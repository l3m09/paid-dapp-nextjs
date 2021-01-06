import {
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonLoading,
	IonIcon,
	IonModal,
	IonCardContent,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader,
	IonCard,
	IonPopover,
	IonItemDivider,
	IonFabButton,
	IonFab
} from '@ionic/react';
import {
	add,
	documentsOutline as documentsIcon,
} from 'ionicons/icons';

import React, {useEffect, useRef, useState} from 'react';
import { useParams, useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument
} from '../../redux/actions/documents';

import MenuAlternate from '../../components/MenuAlternate';
import DocumentsList from './DocumentsList';
import { IonText } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { BlockchainFactory } from './../../utils/blockchainFactory'
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
import SuccessDialog from '../../components/SuccessDialog';

const { Storage } = Plugins;

function SelectedDocument(payload: {
	show: boolean;
	selectedDocument: any;
	closeShowDocument: () => void;
}) {
	const wallet = useSelector((state: any) => state.wallet);
	const { unlockedWallet } = wallet;

	const [networkText, setNetWorkText] = useState('...');
	const { show, selectedDocument, closeShowDocument } = payload;

	useEffect(() => {
		if (unlockedWallet !== null) {
			const manager = BlockchainFactory.getWalletManager();
			const storage = manager.getKeyStorage();
			const rawWallet = storage.find<KeyStorageModel>(unlockedWallet._id);
			rawWallet.then((rWallet) => {
				const web3 = BlockchainFactory.getWeb3Instance(rWallet.keypairs, rWallet.mnemonic);
				const network = BlockchainFactory.getNetwork(web3);
				network.then((networkText) => {
					setNetWorkText(networkText.toUpperCase());
				});
			});
		}
	}, [unlockedWallet]);

	if (!selectedDocument) {
		return null;
	}

	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="document-modal" onDidDismiss={() => {closeShowDocument()}}>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>
							Document Id: {selectedDocument.event.id}
						</IonCardTitle>
						<IonCardSubtitle>
							Valid until: {selectedDocument.data.validUntil}
						</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<h2>Details</h2>
						<div className="details-wrapper">
							<IonItem>
								<IonLabel position="stacked">Signatory A</IonLabel>
								<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.from}`} target="_blank">{selectedDocument.event.from}</a>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Signatory B</IonLabel>
								<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.to}`} target="_blank">{selectedDocument.event.to}</a>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Transaction Hash</IonLabel>
								<a href={`https://${networkText}.etherscan.io/tx/${selectedDocument.meta.transactionHash}`} target="_blank">{selectedDocument.meta.transactionHash}</a>
							</IonItem>
						</div>
					</IonCardContent>
				</IonCard>
				<hr />
				<IonItem className="modal-actions">
					<IonButton
						color="secondary"
						shape="round"
						onClick={() => {
							closeShowDocument();
						}}
					>
						<span>Close</span>
					</IonButton>
				</IonItem>
			</IonModal>
		</div>
	);
}

const Documents: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const documentsState = useSelector((state: any) => state.documents);
	const walletsState = useSelector((state: any) => state.wallet);
	const {
		documentsFrom,
		documentsTo,
		selectedDocument,
		loading,
		agreementTypes
	} = documentsState;
	const wallet = useSelector((state: any) => state.wallet);
	const { currentWallet } = wallet;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	useEffect(() => {
		dispatch(doGetDocuments(currentWallet));
		slidesRef.current?.lockSwipes(true)
	}, [dispatch]);
	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowModal(true);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
	}

	function trigger(id: string, name: string) {
		return (
			<button className="document-trigger">
				<IonIcon icon={documentsIcon} />
				<span className="document-id">{id}</span>
				<span>{name}</span>
			</button>
		);
	}

	function chooseOption(type: string) {
		setShowPopover(false);
		history.push('/agreements/' + type.toLowerCase());
	}

	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		height: 500,
		slidesPerView: 1,
		navigation: {
			nextEl: '.swipper-btn',
			prevEl: '.swipper-btn'
		}
	};

	async function slideTo(i: number) {
		await slidesRef.current?.lockSwipes(false)
		setCurrentIndex(i)
		await slidesRef.current?.slideTo(i)
		await slidesRef.current?.lockSwipes(true)

	}

	return (
		<IonPage className="documents-page content-page">
			<IonContent fullscreen>
				<IonHeader translucent={false} mode="md">
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton/>
						</IonButtons>
						<IonTitle>Documents | <IonText color="primary"> {currentWallet?.address.slice(0,10)}...</IonText></IonTitle>
						<MenuAlternate/>
					</IonToolbar>
				</IonHeader>
				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}

				/>
				<div>
				<DocumentsList 
					documentsTo={documentsTo} 
					documentsFrom={documentsFrom} 
					type="from" 
					counterType="to"
					agreementTypes={agreementTypes}
					onClickAgreementType={chooseOption}
				/>

					<IonPopover mode="md" translucent={false} isOpen={showPopOver} cssClass="agreements-popover" onDidDismiss={() => {
						setShowPopover(false)
					}}>
						<IonItemDivider>
							<IonItem>Select Agreement type</IonItem>
						</IonItemDivider>
						{agreementTypes.map((type: string, index: number) => {
							return (
								<IonItem
									onClick={() => {
										chooseOption(type);
									}}
									key={index}
								>
									{type}
								</IonItem>
							);
						})}
					</IonPopover>
					<SelectedDocument
						show={showModal}
						selectedDocument={selectedDocument}
						closeShowDocument={closeShowDocument}
					/>
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton color="gradient" onClick={() => {
							setShowPopover(true);
						}}>
							<IonIcon icon={add}/>
						</IonFabButton>
					</IonFab>
				</div>
				<SuccessDialog />
			</IonContent>
		</IonPage>
	);
};

export default Documents;
