import {
	IonItem,
	IonLabel,
	IonButton,
	IonIcon,
	IonModal,
	IonCardContent,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader,
	IonCard, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent,
} from '@ionic/react';
import {
	documentsOutline as documentsIcon,
	documentOutline as documentIcon,
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument
} from '../../redux/actions/documents';

import Collapsible from 'react-collapsible';

import { jsPDF } from "jspdf";
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

const uint8ArrayToString = require('uint8arrays/to-string');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });

function PdfViewerModal(payload: {
	show: boolean;
	closePdfViewer: () => void;
	url: string
}) {
	const { show, closePdfViewer, url } = payload;
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

function SelectedDocument(payload: {
	show: boolean;
	showPdfViewerModal: boolean;
	selectedDocument: any;
	closeShowDocument: () => void;
	openPdfViewerModal: (cid : string, transactionHash: string) => void;
	closePdfViewerModal: () => void;
	agreementsurl: string;
}) {
	const { show, agreementsurl, selectedDocument, closeShowDocument, showPdfViewerModal, openPdfViewerModal, closePdfViewerModal} = payload;
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
						</div>
					</IonCardContent>
				</IonCard>
				<hr />
				<IonItem className="modal-actions">
					<IonButton
						color="gradient"
						shape="round"
						onClick={async () => {
							openPdfViewerModal(selectedDocument.meta.cid, selectedDocument.meta.transactionHash);
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
			/>
		</div>
	);
}


interface Props {
	documents: [];
	type: string;
	counterType: string
}

const DocumentsList: React.FC<Props> = ({documents, type, counterType}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const documentsState = useSelector((state: any) => state.documents);
	const {
		selectedDocument,
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [showPdfViewerModal, setPdfViewerModal] = useState(false);
	const [showAgreementsUrl, setAgreementUrl] = useState('');

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

	function closePdfViewer() {
		setPdfViewerModal(false)
	}
	async function openPdfViewer(cid:string, transactionHash: string) {
		setPdfViewerModal(true)
		let fetchedContent = '';

		for await (const chunk of ipfs.cat(cid.toString())) {
			fetchedContent = uint8ArrayToString(chunk);
		}
		const jsonContent = JSON.parse(fetchedContent);
		const contentRef = jsonContent.contentRef;
		setAgreementUrl(contentRef.cid);
		let pdfContent:HTMLElement = document.createElement('DIV');

		for await (const chunk of ipfs.cat(contentRef.cid)) {
			pdfContent.innerHTML = uint8ArrayToString(chunk);
		}
		console.info(pdfContent);

		// ReactPDF.render(
		// 	<Document>
		// 	  <Page>
		// 	  	<h2>Texto de prueba</h2>
		// 	  </Page>
		// 	</Document>,`${__dirname}/agreeement-${transactionHash.replace('0x','').substring(0,10)}.pdf`);

		// let doc = new jsPDF('p','pt','a4',true);
		// doc.setDisplayMode('100%', 'single', 'FullScreen');
		// doc.html(pdfContent, {
		// 	callback: function () {
		// 		doc.save('agreeementAL-' + transactionHash.replace('0x','').substring(0,10) + '.pdf');
		// 		window.open(doc.output('bloburl').toString()); 
		// 	},
		// 	x:30,
		// 	y:30
		// });
		console.log('showPdfViewerModal', showPdfViewerModal);
	}

	return (
		<div>
			<div className="documents-container">
				{documents.length
					? documents.map((document: any, index: number) => {
						const {data, meta, event} = document;
						return (
							<Collapsible
								transitionTime={200}
								contentInnerClassName="document-container"
								trigger={trigger(`${event.id}`, `${event[counterType]}`)}
								key={index}
							>
								<div className="document-titles">
									<div className="document-title-wrapper">
										<div
											className="document-title"
											onClick={() => {
												showDocument({data, meta, event});
											}}
										>
											<IonIcon icon={documentIcon}/>
											{/*<span>{event.id}</span>*/}
											<span>{event[type]}</span>
										</div>
										<hr/>
									</div>
								</div>
							</Collapsible>
						);
					})
					: <IonTitle color="primary">No documents found</IonTitle>}
			</div>

			<SelectedDocument
				show={showModal}
				selectedDocument={selectedDocument}
				closeShowDocument={closeShowDocument}
				showPdfViewerModal={showPdfViewerModal}
				closePdfViewerModal={closePdfViewer}
				openPdfViewerModal={openPdfViewer}
				agreementsurl={showAgreementsUrl}
			/>
		</div>
	);
};

// @ts-ignore
export default DocumentsList;
