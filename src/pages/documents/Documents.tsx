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
	IonFab,
	IonSlides,
	IonSlide
} from '@ionic/react';
import {
	add,
	documentsOutline as documentsIcon,
} from 'ionicons/icons';

import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument
} from '../../redux/actions/documents';

import MenuAlternate from '../../components/MenuAlternate';
import DocumentsList from './DocumentsList';

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
	const {
		documentsFrom,
		documentsTo,
		selectedDocument,
		loading,
		agreementTypes
	} = documentsState;
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		dispatch(doGetDocuments());
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
						<IonTitle>Documents</IonTitle>
						<MenuAlternate/>
					</IonToolbar>
				</IonHeader>
				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}

				/>
				<div>
					<IonItem class="documents-controls">
						<IonButton
							type="submit"
							color="transparent"
							className={currentIndex === 0 ? 'current-tab document-control document-control-from': 'document-control document-control-from'}
							onClick={() => {slideTo(0)}}
						>
							From
						</IonButton>
						<IonButton
							type="submit"
							color="transparent"
							className={currentIndex === 1 ? 'current-tab document-control document-control-to': 'document-control document-control-to'}
							onClick={() => {slideTo(1)}}
						>
							To
						</IonButton>
					</IonItem>
					<IonSlides mode="md" pager={false} options={slideOpts} ref={slidesRef}>
						<IonSlide key="documents-from" >
							<DocumentsList documents={documentsFrom} type="to" counterType="from"/>
						</IonSlide>
						<IonSlide key="documents-to">
							<DocumentsList documents={documentsTo} type="from" counterType="to"/>
						</IonSlide>
					</IonSlides>

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
			</IonContent>
		</IonPage>
	);
};

export default Documents;
