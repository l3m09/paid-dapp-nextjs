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
	IonItemDivider
} from '@ionic/react';
import {
	add,
	documentsOutline as documentsIcon,
	documentOutline as documentIcon,
	downloadOutline
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument
} from '../../redux/actions/documents';

import Collapsible from 'react-collapsible';

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
			<IonModal isOpen={show} cssClass="document-modal">
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
								<IonLabel position="stacked">Size</IonLabel>
								<span>{selectedDocument.size}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Last Modified</IonLabel>
								<span>{selectedDocument.modified_at}</span>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Created</IonLabel>
								<span>{selectedDocument.created_at}</span>
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
						download={selectedDocument.link}
						className="download-button"
					>
						<IonIcon icon={downloadOutline} />
						<span>Download</span>
					</IonButton>
					<IonButton
						buttonType="danger"
						className="close-button"
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
			<button className="no-button grey-button document-trigger">
				<IonIcon icon={documentsIcon} />
				<span>{name}</span>
			</button>
		);
	}

	function chooseOption(type: string) {
		setShowPopover(false);
		history.push('/agreements/' + type.toLowerCase());
	}

	return (
		<IonPage className="documents-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Documents</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonLoading
				cssClass="my-custom-class"
				isOpen={loading}
				message={'Please wait...'}
				duration={1000}
			/>
			<IonContent fullscreen>
				<div className="documents-container">
					{documents
						? documents.map((document: any, index: number) => {
								const { data, meta, event } = document;
								return (
									<Collapsible
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
													<span>{event.id}</span>
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
				<IonPopover isOpen={showPopOver} cssClass="agreements-popover">
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
				<IonButton
					className="add-document-button"
					onClick={() => {
						setShowPopover(true);
					}}
				>
					<IonIcon icon={add} />
					{/*<input
                        className="upload-input"
                        type="file"
                        accept="pdf"
                        onChange={(e: any) => {
                            setFileData(e.target.files[0]);
                        }}
                    />*/}
				</IonButton>
				<SelectedDocument
					show={showModal}
					selectedDocument={selectedDocument}
					closeShowDocument={closeShowDocument}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Documents;
