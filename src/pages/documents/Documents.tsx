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

	let selectedD: any = selectedDocument ? selectedDocument : { metadata: {} };

	function showDocument(item: any) {
		// selectedDocument = item;
		dispatch(doGetSelectedDocument(item));
		setShowModal(true);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument({}));
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
								return (
									<Collapsible
										contentInnerClassName="document-container"
										trigger={trigger(document.id)}
										key={index}
									>
										<div className="document-titles">
											{document.documents
												? document.documents.map(
														(agreement: any, i: number) => {
															return (
																<div key={i} className="document-title-wrapper">
																	<div
																		className="document-title"
																		onClick={() => {
																			showDocument(agreement);
																		}}
																	>
																		<IonIcon icon={documentIcon} />
																		<span>{agreement.id}</span>
																	</div>
																	<hr />
																</div>
															);
														}
												  )
												: null}
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
				<div id="modal-container">
					<IonModal isOpen={showModal} cssClass="document-modal">
						<IonCard>
							<IonCardHeader>
								<IonCardTitle>{selectedD.metadata.name}</IonCardTitle>
								<IonCardSubtitle>{selectedD.type}</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								<h2>Details</h2>
								<div className="details-wrapper">
									<IonItem>
										<IonLabel position="stacked">Hash</IonLabel>
										<span>{selectedD.ipfs_pin_hash}</span>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Signature</IonLabel>
										<span>{selectedD.signature}</span>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Size</IonLabel>
										<span>{selectedD.size}</span>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Last Modified</IonLabel>
										<span>{selectedD.modified_at}</span>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Created</IonLabel>
										<span>{selectedD.created_at}</span>
									</IonItem>
								</div>
							</IonCardContent>
						</IonCard>
						<hr />
						<IonItem className="modal-actions">
							<IonButton download={selectedD.link} className="download-button">
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
			</IonContent>
		</IonPage>
	);
};

export default Documents;
