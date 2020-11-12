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
	documentOutline as documentIcon,
	downloadOutline, listCircleOutline, documentOutline, documentSharp
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument
} from '../../redux/actions/documents';

import Collapsible from 'react-collapsible';
import {useLocation} from "react-router-dom";

function SelectedDocument(payload: {
	show: boolean;
	selectedDocument: any;
	closeShowDocument: () => void;
}) {
	const { show, selectedDocument, closeShowDocument } = payload;
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
							{/*<IonItem>*/}
							{/*	<IonLabel position="stacked">Size</IonLabel>*/}
							{/*	<span>{selectedDocument.size}</span>*/}
							{/*</IonItem>*/}
							{/*<IonItem>*/}
							{/*	<IonLabel position="stacked">Last Modified</IonLabel>*/}
							{/*	<span>{selectedDocument.modified_at}</span>*/}
							{/*</IonItem>*/}
							{/*<IonItem>*/}
							{/*	<IonLabel position="stacked">Created</IonLabel>*/}
							{/*	<span>{selectedDocument.created_at}</span>*/}
							{/*</IonItem>*/}
							<IonItem>
								<IonLabel position="stacked">Transaction Hash</IonLabel>
								<span>{selectedDocument.meta.transactionHash}</span>
							</IonItem>
						</div>
					</IonCardContent>
				</IonCard>
				<hr />
				<IonItem className="modal-actions">
					{/*<IonButton*/}
					{/*	download={selectedDocument.link}*/}
					{/*	className="download-button"*/}
					{/*>*/}
					{/*	<IonIcon icon={downloadOutline} />*/}
					{/*	<span>Download</span>*/}
					{/*</IonButton>*/}
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
interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
	disabled: boolean;
}

const Documents: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const documentsState = useSelector((state: any) => state.documents);
	const {
		documents,
		selectedDocument,
		loading,
		agreementTypes
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);

	useEffect(() => {
		dispatch(doGetDocuments());
	}, [dispatch]);

	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowModal(true);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
	}

	function trigger(name: string) {
		return (
			<button className="document-trigger">
				<IonIcon icon={documentsIcon} />
				<span>{name}</span>
			</button>
		);
	}

	function chooseOption(type: string) {
		setShowPopover(false);
		history.push('/agreements/' + type.toLowerCase());
	}

	const location = useLocation();
	const appPages: AppPage[] = [
		{
			title: 'Wallets',
			url: '/wallets',
			iosIcon: listCircleOutline,
			mdIcon: listCircleOutline,
			disabled: false
		},
		{
			title: 'Agreements',
			url: '/documents',
			iosIcon: documentOutline,
			mdIcon: documentSharp,
			disabled: false
		},
	];


	return (
		<IonPage className="documents-page content-page">
			<IonContent fullscreen>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>Documents</IonTitle>
						<IonButtons className="alternate-menu" slot="end">
							{appPages.map((appPage, index) => {
								return (
										<IonItem
											key={index}
											disabled={appPage.disabled}
											className={
												location.pathname === appPage.url ? 'selected' : ''
											}
											routerLink={appPage.url}
											routerDirection="none"
											lines="none"
											detail={false}
										>
											<span className="icon-wrapper">
												<IonIcon
													ios={appPage.iosIcon}
													md={appPage.mdIcon}
													color="gradient"
												/>
											</span>
											<IonLabel color="gradient">{appPage.title}</IonLabel>
										</IonItem>
								);
							})}
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonLoading
					cssClass="my-custom-class"
					isOpen={loading}
					message={'Please wait...'}
					duration={1000}
				/>
				<div>
					<div className="documents-container">
						{documents
							? documents.map((document: any, index: number) => {
								const { data, meta, event } = document;
								return (
									<Collapsible
										transitionTime={200}
										contentInnerClassName="document-container"
										trigger={trigger(`${event.id} - ${event.from}`)}
										key={index}
									>
										<div className="document-titles">
											<div className="document-title-wrapper">
												<div
													className="document-title"
													onClick={() => {
														showDocument({ data, meta, event });
													}}
												>
													<IonIcon icon={documentIcon} />
													<span>Id: {event.id}</span>
													<span>-</span>
													<span>From: {event.from}</span>
												</div>
												<hr />
											</div>
										</div>
									</Collapsible>
								);
							})
							: null}
					</div>
					<IonPopover isOpen={showPopOver} cssClass="agreements-popover" onDidDismiss={() => {setShowPopover(false)}}>
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
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Documents;
