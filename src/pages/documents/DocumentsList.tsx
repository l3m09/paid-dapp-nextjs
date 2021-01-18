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
	IonCard, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent, IonLoading, IonList, IonTextarea, IonNote,
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCircle, checkmarkCircle } from 'ionicons/icons';
import {
	doGetSelectedDocument,
	doSignCounterpartyDocument,
	doGetDocuments,
	doRejectCounterpartyDocument
} from '../../redux/actions/documents';

import { IonBadge } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { eddsa } from "elliptic";
import { format } from 'date-fns';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { KeyStorageModel } from 'universal-crypto-wallet/dist/key-storage/KeyStorageModel';
import AgreementType from '../../models/AgreementType';

const { Storage } = Plugins;

const uint8ArrayToString = require('uint8arrays/to-string');
const ipfsClient = require('ipfs-http-client');
// TODO: Get ipfs IP Public of Kubernets Enviroment Variable
const ipfsnode = `${process.env.REACT_APP_IPFS_PAID_HOST}`;

const ipfs = ipfsClient({ host: ipfsnode, port: '5001', protocol: 'https', apiPath: '/api/v0' });

function PdfViewerModal(payload: {
	show: boolean;
	closePdfViewer: () => void;
	url: string,
	pdfContent: string
}) {
	const { show, closePdfViewer, url } = payload;
	
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
				<IonContent color="primary" scrollY={false}>
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
	rejectDocument: (document: any, comments: string) => void;
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
		rejectDocument,
		showVerified,
		showNotVerified,
		verifyButtonDisable,
		showSignedText,
		showVerifyDocumentButton
	} = payload;
	const wallet = useSelector((state: any) => state.wallet);

	const { unlockedWallet } = wallet;
	const [networkText, setNetWorkText] = useState('...');
	const [comments, setComments] = useState('');
	const [validReject, setValidReject] = useState(true);

	useEffect(() => {
		if (unlockedWallet) {
			const web3 = BlockchainFactory.getWeb3Instance(unlockedWallet._id, unlockedWallet.password);
			web3.then((result) => {
				const { network } = result!;
				const _network = BlockchainFactory.getNetwork(network);
				_network.then((networkText) => {
					setNetWorkText(networkText.toUpperCase());
				});
			});
		}
	}, [unlockedWallet]);


	if (!selectedDocument) {
		return null;
	}

	const setter = (set: Function) => (e: any) => {
		const { target } = e;
		const { value } = target;

		set(value);
	}

	const reject = (document: any) => {
		if (comments.length <= 0 || comments === ' ') {
			setValidReject(false);
			return;
		} else {
			rejectDocument(document, comments);
			return;
		}
	}

	const { event } = selectedDocument;

	const createdAt = format(new Date(event.created_at * 1000), 'MM/dd/yyyy kk:mm:ss');
	const updatedAt = format(new Date(event.updated_at * 1000), 'MM/dd/yyyy kk:mm:ss');

	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="document-modal" onDidDismiss={() => {closeShowDocument()}}>
				<IonContent scrollY>

					<IonCard>
						<IonCardHeader>
							<IonCardTitle className="document-title-modal">
								<div>
									{`${selectedDocument.data?.documentName} ( ${selectedDocument.data?.partyAName} - ${selectedDocument.data?.partyBName} )`}
								</div>
								{
									showVerifyDocumentButton &&
									<div>
										<IonButton
											className="small-button font-size-13"
											color="primary"
											onClick={async () => {
												verifyDocument(selectedDocument);
											}}
											disabled={verifyButtonDisable}
										>
											<span>Verify document</span>
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
								}
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
									<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.from}`} target="_blank">{selectedDocument.event.from}</a>
								</IonItem>
								<IonItem>
									<IonLabel position="stacked">Transaction Hash</IonLabel>
									<a href={`https://${networkText}.etherscan.io/tx/${selectedDocument.meta.transactionHash}`} target="_blank">{selectedDocument.meta.transactionHash}</a>
								</IonItem>
								<IonItem>
									<IonLabel position="stacked">Document Signature</IonLabel>
									<span>{selectedDocument.signature}</span>
								</IonItem>
								<IonItem>
									<IonLabel position="stacked">Created on</IonLabel>
									<span>{createdAt}</span>
								</IonItem>
								<IonItem>
									<IonLabel position="stacked">Updated</IonLabel>
									<span>{updatedAt}</span>
								</IonItem>
								{
									(!showVerifyDocumentButton) &&
									<IonItem>
										<IonLabel position="stacked">Comments</IonLabel>
										<IonTextarea
											title="Comments" 
											placeholder="Enter your comments"
											value={comments}
											onInput={setter(setComments)}
										/>
										{
											!validReject &&
											<IonNote color="danger" className="ion-margin-top">
												You must enter comments for reject.
											</IonNote>
										}
									</IonItem>
								}
							</div>
						</IonCardContent>
					</IonCard>
				</IonContent>
				<hr />
				<IonItem className="modal-actions">
					<IonButton
						color="gradient"
						shape="round"
						onClick={() => {
							openPdfViewerModal(selectedDocument.event.cid, selectedDocument.meta.transactionHash);
						}}
					>
						<span>Open Pdf</span>
					</IonButton>
					{
						(!showVerifyDocumentButton || showSignedText) &&
						<IonButton
							color="gradient"
							shape="round"
							onClick={() => {
								verifyDocument(selectedDocument);
							}}
							disabled={verifyButtonDisable || showSignedText}
						>
							{ (!showVerifyDocumentButton) && <span>Accept</span> }
						</IonButton>
					}
					{
						(!showVerifyDocumentButton) &&
						<IonButton
							color="gradient"
							shape="round"
							onClick={() => {
								reject(selectedDocument);
							}}
						>
							<span>Reject</span>
						</IonButton>
					}
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
	counterType: string,
	agreementTypes: [];
	onClickAgreementType: any;
}

const DocumentsList: React.FC<Props> = ({
	documentsTo, 
	documentsFrom, 
	type, 
	counterType,
	agreementTypes,
	onClickAgreementType
}) => {
	const dispatch = useDispatch();
	const documentsState = useSelector((state: any) => state.documents);
	const {
		selectedDocument,
		loading,
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
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
	const wallet = useSelector((state: any) => state.wallet);
	const { currentWallet } = wallet;

	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowVerifyDocumentButton(!(item.event.to === currentWallet?.address && parseInt(item.event.status?.toString()) === 0));
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

	function rejectDocument(document: any, comments: string) {
		dispatch(doRejectCounterpartyDocument(document, comments));
		setForceVerifyDocument(true);
		setReloadDocument(true);
		setShowVerifyDocumentButton(true);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
		if(reloadDocuments){
			dispatch(doGetDocuments(currentWallet));
			setReloadDocument(false);
		}
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

		let pdfContent = '';

		for await (const chunk of ipfs.cat(contentRef.cid)) {
			pdfContent = uint8ArrayToString(chunk);
		}

		setAgreementContent(pdfContent);
	}

	const agreementTypesList = () => {
		return <IonList>
			{
				agreementTypes.map((type: AgreementType, index: number) => {
					return (
						<IonItem
							className="ion-text-center"
							onClick={() => {
								onClickAgreementType(type.code);
							}}
							key={index}
						>
							<IonLabel>
								{type.name}
							</IonLabel>
						</IonItem>
					);
				})
			}
		</IonList>
	}

	return (
		<div>
				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}

				/>
				
			<div className="documents-container">
				{
					(documentsFrom.length > 0) &&
					<>
						<div className="table-header">
							<div className="col">Document</div>
							<div className="col">Company</div>
							<div className="col">Counterparty</div>
							<div className="col">Valid</div>
							<div className="col">Created</div>
							<div className="col">Updated</div>
							<div className="col">State</div>
						</div>
						{
							documentsFrom.map((document: any, index: number) => {
								const {data, meta, event} = document;
								const createdAt = format(new Date(event.created_at * 1000), 'MM/dd/yyyy kk:mm:ss');
								const updatedAt = format(new Date(event.updated_at * 1000), 'MM/dd/yyyy kk:mm:ss');

								return (
									<div key={index} className="table-body" onClick={async () => {showDocument({data, meta, event})}}>
										<div className="col">{(data.documentName?.length > 12) ? `${data.documentName.slice(0, 12)}...` : data.documentName}</div>
										<div className="col">{data.partyAName}</div>
										<div className="col">{data.partyBName}</div>
										<div className="col">{data.validUntil}</div>
										<div className="col">{createdAt}</div>
										<div className="col">{updatedAt}</div>
										<div className="col">
											{event.status == 0 && currentWallet?.address == event.from ? <IonBadge color="success">PENDING</IonBadge> :
											(event.status == 0 && currentWallet?.address == event.to ? <IonBadge color="secondary">SIGN</IonBadge> : 
											(event.status == 1 && currentWallet?.address == event.from ? <IonBadge color="warning">SIGNED</IonBadge> : 
											event.status == 1 && currentWallet?.address == event.to ? <IonBadge color="primary">SIGNED</IonBadge> : null))}
										</div>
									</div>
								);
							})
						}
					</>
				}
				{
					(!documentsFrom.length) &&
					<div className="empty-documents-container">
						<IonTitle color="primary">You don't have any agreements yet. Select a template from the list below to create one.</IonTitle>
						{
							agreementTypesList()
						}
					</div>
				}
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
				rejectDocument = {rejectDocument}
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
