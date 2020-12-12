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
	documentsOutline as documentsIcon,
	documentOutline as documentIcon,
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { closeCircle, checkmarkCircle } from 'ionicons/icons';
import {
	doGetSelectedDocument,
	doSignCounterpartyDocument
} from '../../redux/actions/documents';

import { IonBadge } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { eddsa } from "elliptic";
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
	// if (!url) {
	// 	return null;
	// }
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
		showNotVerified
	} = payload;
	const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
	);
	const { currentWallet } = wallet;
	if (!selectedDocument) {
		return null;
	}
	console.log('status', selectedDocument.event.status);
	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="document-modal" onDidDismiss={() => {closeShowDocument()}}>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>
							<div className="float-left-wrapper">
								Document Id: {selectedDocument.event.id}
							</div>
						</IonCardTitle>
						<IonCardSubtitle>
						</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<div>
							Valid until: {selectedDocument.data.validUntil}
						</div>
						<div>
							<IonButton
								className="small-button"
								color="primary"
								onClick={async () => {
									verifyDocument(selectedDocument);
								}}
							>
								<span>{selectedDocument.event.to == currentWallet?.address && selectedDocument.event.status == 0 ? 'Sign Document' : 'Verify document'}</span>
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
						<h2>Details</h2>
						<div className="details-wrapper">
							<IonItem>
								<IonLabel position="stacked">Signatory A</IonLabel>
								<span>{selectedDocument.event.from}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Signatory B</IonLabel>
								<span>{selectedDocument.event.to}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Transaction Hash</IonLabel>
								<span>{selectedDocument.meta.transactionHash}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Signature</IonLabel>
								<span>{selectedDocument.signature}</span>
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
		loading
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [showVerified, setShowVerified] = useState(false);
	const [showNotVerified, setShowNotVerified] = useState(false);
	const [showPdfViewerModal, setPdfViewerModal] = useState(false);
	const [showAgreementsUrl, setAgreementUrl] = useState('');
	const [agreementContent, setAgreementContent] = useState('');
	const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
	);
	const { currentWallet } = wallet;
	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowModal(true);
		setShowNotVerified(false);
		setShowVerified(false);
	}

	async function verifyDocument(document: any) {
		if(document.event.status != 0){
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

		}
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
	}

	function trigger(id: string, name: string, status: string) {
		return (
			<button className="document-trigger">
				<IonIcon icon={documentsIcon} />
				<span className="document-id">{id}</span>
				<span>{name}</span>
				<span>{status == 'PARTY_INIT' ? 'Not signed' : 'Signed'}</span>
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
		setPdfViewerModal(true);
		//let pdfContent:HTMLElement = document.createElement('DIV');
		let pdfContent = '';
		for await (const chunk of ipfs.cat(contentRef.cid)) {
			pdfContent = uint8ArrayToString(chunk);
		}
		setAgreementContent(pdfContent);
		console.info(pdfContent);
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
					<div className="col"></div>
				</div>
				{documentsFrom.length
					? documentsFrom.map((document: any, index: number) => {
						const {data, meta, event} = document;
						return (
							<div className="table-body" onClick={async () => {showDocument({data, meta, event})}}>
								<div className="col">{meta.transactionHash.slice(0,15)}...</div>
								<div className="col">{data.validUntil}</div>
								<div className="col">{event.from.slice(0,15)}...</div>
								<div className="col">{event.to.slice(0,15)}...</div>
								<div className="col in"><IonBadge color="primary">IN</IonBadge></div>
							</div>
						);
					})
					: null
				}
				{documentsTo.length
				? documentsTo.map((document: any, index: number) => {
					const {data, meta, event} = document;
					return (
						<div className="table-body" onClick={async () => {showDocument({data, meta, event})}}>
							<div className="col">{meta.transactionHash.slice(0,15)}...</div>
							<div className="col">{data.validUntil}</div>
							<div className="col">{event.from.slice(0,15)}...</div>
							<div className="col">{event.to.slice(0,15)}...</div>
							<div className="col out"><IonBadge color="secondary">OUT</IonBadge></div>
							<div className="col in">
								{event.pending ?
								<IonBadge className="pending-container">
									PENDING
								</IonBadge>
								:
								event.from == currentWallet?.address ?
								<IonBadge color="secondary">
									OUT
								</IonBadge>
								:
								<IonBadge color="primary">
									IN
								</IonBadge>}
							</div>
						</div>
					);
				})
				: null
				}
				{(!documentsFrom.length && !documentsTo.length ? <IonTitle color="primary">No documents found</IonTitle> : null)}
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
			/>
		</div>
	);
};

// @ts-ignore
export default DocumentsList;
