import {
	IonItem,
	IonIcon,
	IonLabel,
	IonButton,
	IonModal,
	IonCardContent,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader,
	IonCard, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent, IonLoading,
} from '@ionic/react';

import {
	documentsOutline as documentsIcon
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { closeCircle, checkmarkCircle } from 'ionicons/icons';
import {
	doGetSelectedDocument,
	doSignCounterpartyDocument,
	doGetDocuments
} from '../../redux/actions/documents';

import { IonBadge } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { eddsa } from "elliptic";
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';

const { Storage } = Plugins;

const uint8ArrayToString = require('uint8arrays/to-string');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });

function PdfViewerModal(payload: {
	show: boolean;
	closePdfViewer: () => void;
	url: string,
	pdfContent: string
}) {
	const { show, closePdfViewer, url, pdfContent } = payload;
	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="pdf-viewer-modal" onDidDismiss={() => {closePdfViewer()}}>
				<IonHeader translucent={false} mode="md">
					<IonToolbar>
						<IonTitle>Document</IonTitle>
						<IonButtons slot="end">
							<IonButton color="secondary" shape="round" onClick={() => closePdfViewer()}>
								Close
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent color="primary">
					<iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
				</IonContent>
			</IonModal>
		</div>
	);
}

  
function createMarkup(html: string) { 
    return {__html: html};
  }

function SelectedDocument(payload: {
	show: boolean;
	showPdfViewerModal: boolean;
	selectedDocument: any;
	closeShowDocument: () => void;
	verifyDocument: (document: any) => void; 
	openPdfViewerModal: (cid : string, transactionHash: string) => void;
	closePdfViewerModal: () => void;
	agreementsurl: string;
	agreementContent: string;
	showVerified: any;
	showNotVerified: any;
	verifyButtonDisable: boolean;
	showSignedText: boolean;
	showVerifyDocumentButton: boolean;
}) {
	const { 
		show, 
		agreementsurl, 
		agreementContent, 
		selectedDocument, 
		closeShowDocument, 
		showPdfViewerModal, 
		openPdfViewerModal, 
		closePdfViewerModal,
		verifyDocument,
		showVerified,
		showNotVerified,
		verifyButtonDisable,
		showSignedText,
		showVerifyDocumentButton
	} = payload;
	const wallet = useSelector(
		(state: { wallet: { unlockedWallet: any } }) => state.wallet
	);

	const { unlockedWallet } = wallet;
	const [networkText, setNetWorkText] = useState('...');

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

	const { event } = selectedDocument;
	const date = new Date(event.created_at * 1000);
	const update = new Date(event.updated_at * 1000);
	const date_values = [
		date.getUTCFullYear(),
		date.getUTCMonth()+1,
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds()];
	const update_values = [
			update.getUTCFullYear(),
			update.getUTCMonth()+1,
			update.getUTCDate(),
			update.getUTCHours(),
			update.getUTCMinutes(),
			update.getUTCSeconds()];
	const created_date = `${date_values[1]}/${date_values[2]}/${date_values[0]} ${date_values[3]}:${date_values[4]}:${date_values[5]}`;
	const updated_date = `${update_values[1]}/${update_values[2]}/${update_values[0]} ${update_values[3]}:${update_values[4]}:${update_values[5]}`;

	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="document-modal" onDidDismiss={() => {closeShowDocument()}}>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle className="document-title-modal">
							<div>
								Document Id: {selectedDocument.event.id}
							</div>
							<div>
								<IonButton
									className="small-button font-size-13"
									color="primary"
									onClick={async () => {
										verifyDocument(selectedDocument);
									}}
									disabled={verifyButtonDisable}
								>
									{showVerifyDocumentButton ? <span>Verify document</span> : null }
									{!showVerifyDocumentButton ? <span>Sign document</span> : null}
									{showSignedText ? <span>Signature succesfully created</span> : null }
								</IonButton>
								{ showVerified ? <span className="icon-wrapper">
									<IonIcon
										ios={checkmarkCircle}
										md={checkmarkCircle}
										color="primary"
										className="font-size-20"
									/>
								</span> : null }
								{ showNotVerified ? <span className="icon-wrapper">
									<IonIcon
										ios={closeCircle}
										md={closeCircle}
										color="secondary"
										className="font-size-20"
									/>
								</span> : null }
							</div>
						</IonCardTitle>
						<IonCardSubtitle>
						</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<div>
							Expires in {(selectedDocument.data.validUntil > 1) ?
							`${selectedDocument.data.validUntil} days` :
							`${selectedDocument.data.validUntil} day`}
						</div>
						<h2>Details</h2>
						<div className="details-wrapper">
							<IonItem>
								<IonLabel position="stacked">Signed By</IonLabel>
								<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.from}`} target="_blank" rel="noopener noreferrer" >{selectedDocument.event.from}</a>
							</IonItem>
							{/*
								<IonItem>
									<IonLabel position="stacked">Signatory B</IonLabel>
									<a href={`https://rinkeby.etherscan.io/address/${selectedDocument.event.to`}target="_blank">{selectedDocument.event.to}</a>
								</IonItem>
							*/}
							<IonItem>
								<IonLabel position="stacked">Transaction Hash</IonLabel>
								<a href={`https://${networkText}.etherscan.io/tx/${selectedDocument.meta.transactionHash}`} target="_blank" rel="noopener noreferrer" >{selectedDocument.meta.transactionHash}</a>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Document Signature</IonLabel>
								<span>{selectedDocument.signature}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Created on</IonLabel>
								<span>{created_date}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Updated</IonLabel>
								<span>{updated_date}</span>
							</IonItem>
						</div>
					</IonCardContent>
				</IonCard>
				<hr />
				<IonItem className="modal-actions">
					<IonButton
						color="gradient"
						shape="round"
						onClick={async () => {
							openPdfViewerModal(selectedDocument.event.cid, selectedDocument.meta.transactionHash);
						}}
					>
						<span>Open Pdf</span>
					</IonButton>
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
			<PdfViewerModal
				show={showPdfViewerModal}
				closePdfViewer={closePdfViewerModal}
				url={"https://ipfs.io/ipfs/"+agreementsurl}
				pdfContent = {agreementContent}
			/>
		</div>
	);
}


interface Props {
	documentsTo: [];
	documentsFrom: [];
	type: string;
	counterType: string
}

const DocumentsList: React.FC<Props> = ({documentsTo, documentsFrom, type, counterType}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const documentsState = useSelector((state: any) => state.documents);
	const {
		selectedDocument,
		loading,
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [showVerified, setShowVerified] = useState(false);
	const [showNotVerified, setShowNotVerified] = useState(false);
	const [verifyButtonDisable, setVerifyButtonDisable] = useState(false);
	const [showPdfViewerModal, setPdfViewerModal] = useState(false);
	const [showAgreementsUrl, setAgreementUrl] = useState('');
	const [agreementContent, setAgreementContent] = useState('');
	const [showSignedText, setShowSignedText ] = useState(false);
	const [reloadDocuments, setReloadDocument] = useState(false);
	const [showVerifyDocumentButton, setShowVerifyDocumentButton] = useState(false);
	const [forceVerifyDocument, setForceVerifyDocument] = useState(false);
 	const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
	);
	const { currentWallet } = wallet;
	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowVerifyDocumentButton(!(item.event.to === currentWallet?.address && item.event.status === 0));
		setShowModal(true);
		setShowNotVerified(false);
		setShowVerified(false);
	}

	async function verifyDocument(document: any) {
		setVerifyButtonDisable(true);
		if(document.event.status != 0 || document.event.from === currentWallet?.address || forceVerifyDocument){
			let fetchedContent	 = '';
			for await (const chunk of ipfs.cat(document.event.cid)) {
				fetchedContent = uint8ArrayToString(chunk);
			}
			const jsonContent = JSON.parse(fetchedContent);

			const fetchedPubKey = jsonContent.publicKey;

			const ec = new eddsa('ed25519');
			const key = ec.keyFromPublic(fetchedPubKey);
			const sigRef = jsonContent.sigRef;
			let sigDocument = '';
			for await (const chunk of ipfs.cat(sigRef.cid)) {
				sigDocument = uint8ArrayToString(chunk);
			}
			const verified = key.verify(jsonContent.digest, sigDocument);
			setShowVerified(verified);
			setShowNotVerified(!verified);
		}
		else{
			dispatch(doSignCounterpartyDocument(document));
			setForceVerifyDocument(true);
			setReloadDocument(true);
			setShowVerifyDocumentButton(true);
		}
		setVerifyButtonDisable(false);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
		if(reloadDocuments){
			dispatch(doGetDocuments(currentWallet));
			setReloadDocument(false);
		}
	}

	function trigger(id: string, name: string, status: string) {
		return (
			<button className="document-trigger">
				<IonIcon icon={documentsIcon} />
				<span className="document-id">{id}</span>
				<span>{name}</span>
				<span>{status === 'PARTY_INIT' ? 'Not signed' : 'Signed'}</span>
			</button>
		);
	}

	function chooseOption(type: string) {
		setShowPopover(false);
		history.push('/agreements/' + type.toLowerCase());
	}

	function closePdfViewer() {
		setPdfViewerModal(false)
	}
	async function openPdfViewer(cid:string, transactionHash: string) {
		let fetchedContent = '';

		for await (const chunk of ipfs.cat(cid.toString())) {
			fetchedContent = uint8ArrayToString(chunk);
		}
		const jsonContent = JSON.parse(fetchedContent);
		const contentRef = jsonContent.contentRef;
		setAgreementUrl(contentRef.cid);
		console.log(contentRef.cid)
		setPdfViewerModal(true);
		let pdfContent = '';
		for await (const chunk of ipfs.cat(contentRef.cid)) {
			pdfContent = uint8ArrayToString(chunk);
		}
		setAgreementContent(pdfContent);

		console.log(pdfContent);
		console.log('showPdfViewerModal', showPdfViewerModal);
	}

	return (
		<div>
				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}

				/>
			<div className="documents-container">
				<div className="table-header">
					<div className="col">Transaction Hash</div>
					<div className="col">Valid</div>
					<div className="col">Wallet From</div>
					<div className="col">Wallet To</div>
					<div className="col">Created</div>
					<div className="col">Updated</div>
					<div className="col">  State</div>
				</div>
				{documentsFrom.length
					? documentsFrom.map((document: any, index: number) => {
						const {data, meta, event} = document;
						const date = new Date(event.created_at * 1000);
						const update = new Date(event.updated_at * 1000);
						const date_values = [
							date.getUTCFullYear(),
							date.getUTCMonth()+1,
							date.getUTCDate(),
							date.getUTCHours(),
							date.getUTCMinutes(),
							date.getUTCSeconds()];
						const update_values = [
								update.getUTCFullYear(),
								update.getUTCMonth()+1,
								update.getUTCDate(),
								update.getUTCHours(),
								update.getUTCMinutes(),
								update.getUTCSeconds()];
						const created_date = `${date_values[1]}/${date_values[2]}/${date_values[0]} ${date_values[3]}:${date_values[4]}:${date_values[5]}`;
						const updated_date = `${update_values[1]}/${update_values[2]}/${update_values[0]} ${update_values[3]}:${update_values[4]}:${update_values[5]}`;
						const statusClass = event.status == 0 ? (currentWallet?.address == event.from ? 'PENDING' :
						'SIGN...') : (currentWallet?.address == event.from ? 'OUT' :
						'IN');
						return (
							<div className="table-body" onClick={async () => {showDocument({data, meta, event})}} key={index}>
								<div className="col">{meta.transactionHash.slice(0,15)}...</div>
								<div className="col">{data.validUntil}</div>
								<div className="col">{event.from.slice(0,15)}...</div>
								<div className="col">{event.to.slice(0,15)}...</div>
								<div className="col">{created_date}</div>
								<div className="col">{updated_date}</div>
								<div className="col">
									{event.status == 0 && currentWallet?.address == event.from ? <IonBadge color="success">PENDING</IonBadge> :
									(event.status == 0 && currentWallet?.address == event.to ? <IonBadge color="secondary">SIGN...</IonBadge> : 
									(event.status == 1 && currentWallet?.address == event.from ? <IonBadge color="warning">OUT</IonBadge> : 
									event.status == 1 && currentWallet?.address == event.to ? <IonBadge color="primary">IN</IonBadge> : null))}
								</div>
							</div>
						);
					})
					: null
				}
				{(!documentsFrom.length ? <IonTitle color="primary">No documents found</IonTitle> : null)}
			</div>

			<SelectedDocument
				show={showModal}
				selectedDocument={selectedDocument}
				closeShowDocument={closeShowDocument}
				showPdfViewerModal={showPdfViewerModal}
				closePdfViewerModal={closePdfViewer}
				openPdfViewerModal={openPdfViewer}
				agreementsurl={showAgreementsUrl}
				agreementContent = {agreementContent}
				verifyDocument = {verifyDocument}
				showVerified = {showVerified}
				showNotVerified = {showNotVerified}
				verifyButtonDisable={verifyButtonDisable}
				showSignedText = {showSignedText}
				showVerifyDocumentButton = {showVerifyDocumentButton}
			/>
		</div>
	);
};

// @ts-ignore
export default DocumentsList;
