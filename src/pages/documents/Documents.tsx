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
    IonCard
} from '@ionic/react';
import {documentsOutline as documentsIcon, documentOutline as documentIcon} from 'ionicons/icons';

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {doGetSelectedDocument} from "../../redux/actions/documents";

import Collapsible from 'react-collapsible';

const Documents: React.FC = () => {
    const dispatch = useDispatch();
    const documentsState = useSelector((state: any) => state.documents);
    const {documents, selectedDocument} = documentsState;

    const [showLoading, setShowLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    setTimeout(() => {
        setShowLoading(false);
    }, 1000);

    const { id } = useParams<{ id: string; }>();

    useEffect(() => {
        // dispatch(doGetDocuments({id}))
    },[documents, selectedDocument]);

    let selectedD: any = selectedDocument.document ? selectedDocument.document : {};


    function showDocument(item:any) {
        // selectedDocument = item;
        dispatch(doGetSelectedDocument(item))
        setShowModal(true)
    }

    function closeShowDocument() {
        dispatch(doGetSelectedDocument({}))
        setShowModal(false)
    }

    function trigger(name: string) {
        return (
            <button className="no-button grey-button document-trigger">
                <IonIcon icon={documentsIcon}/>
                <span>{name} {id ? `(${id})` : ''}</span>
            </button>
        )
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
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={1000}
            />
            <IonContent fullscreen>
                <div className="documents-container">
                    {
                        documents ?
                            documents.map((document: any, index: number) => {
                                return (
                                    <Collapsible contentInnerClassName="document-container" trigger={trigger(document.label)} key={index}>
                                        <div className="document-titles">
                                            {document.documents ?
                                                document.documents.map((file: any, i: number) => {
                                                    return (
                                                        <div key={i} className="document-title-wrapper">
                                                            <div className="document-title" onClick={() => {showDocument(file)}}>
                                                                <IonIcon icon={documentIcon}/>
                                                                <span>{file.name}</span>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    )
                                                })

                                                : null
                                            }
                                        </div>
                                    </Collapsible>
                                )
                            })
                            : null
                    }
                </div>
                <div id="modal-container">
                    <IonModal isOpen={showModal} cssClass='document-modal'>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>{selectedD.name}</IonCardTitle>
                                <IonCardSubtitle>{selectedD.type}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <h2>Details</h2>
                                <div className="details-wrapper">
                                    <IonItem>
                                        <IonLabel position="stacked">Hash</IonLabel>
                                        <span>
                                        {selectedD.hash}
                                    </span>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Signature</IonLabel>
                                        <span>
                                        {selectedD.signature}
                                    </span>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Size</IonLabel>
                                        <span>
                                        {selectedD.size}
                                    </span>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Last Modified</IonLabel>
                                        <span>
                                        {selectedD.modified_at}
                                    </span>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">Created</IonLabel>
                                        <span>
                                        {selectedD.created_at}
                                    </span>
                                    </IonItem>
                                </div>
                            </IonCardContent>
                        </IonCard>
                        <hr/>
                        <IonButton buttonType="secondary" onClick={() => {closeShowDocument()}}>Close</IonButton>
                    </IonModal>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Documents;
