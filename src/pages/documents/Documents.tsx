import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonPopover,
    IonList,
    IonListHeader,
    IonButton,
    IonLoading,
    IonIcon,
    IonModal,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle, IonCardHeader, IonCard, IonInput
} from '@ionic/react';
import {fileTrayFull, documentsOutline as documentsIcon, documentOutline as documentIcon} from 'ionicons/icons';

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import {useDispatch, useSelector} from "react-redux";
import {doGeneratePhrase} from "../../redux/actions/wallet";
import {doGetDocuments} from "../../redux/actions/documents";

import Collapsible from 'react-collapsible';

const Documents: React.FC = () => {
    const dispatch = useDispatch();
    const documentsState = useSelector((state: any) => state.documents);
    const {documents, loading} = documentsState;

    const [showLoading, setShowLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    setTimeout(() => {
        setShowLoading(false);
    }, 1000);

    const { id } = useParams<{ id: string; }>();

    useEffect(() => {
        // dispatch(doGetDocuments({id}))
    },[documents]);

    let selectedDocument: any = {
        id: 1,
        name: 'SafeSign IC Standard Version 3.5 Windows Silent Install Guide.pdf',
        hash: '50D858E0985ECC7F60418AAF0CC5AB587F42C2570A884095A9E8CCACD0F6545C',
        signature: 'da135216asdfgasda36w516awef5a1fw6e51fas3e21faw51651fasea...awse65a1wefawef6a5sd1651asdf',
        qualifiedSignature: false,
        type: 'application/pdf',
        size: '748.231 kb',
        modified_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)',
        created_at: 'Tue Oct 09 2020 18:13:57 GMT-0500 (EST)'
    };

    function showDocument(item:any) {
        selectedDocument = item;
        console.log('Selected Document', selectedDocument)
        setShowModal(true)
    }

    function trigger(name: string) {
        return (
            <button className="no-button grey-button document-trigger">
                <IonIcon icon={documentsIcon}/>
                <span>{name} ({id})</span>
            </button>
        )
    }

    return (
        <IonPage class="documents-page">
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
                <IonModal isOpen={showModal} cssClass='document-modal'>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>{selectedDocument.name}</IonCardTitle>
                                <IonCardSubtitle>{selectedDocument.type}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <h2>Details</h2>
                                <IonItem>
                                    <IonLabel position="stacked">Hash</IonLabel>
                                    <span>
                                        {selectedDocument.hash}
                                    </span>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Signature</IonLabel>
                                    <span>
                                        {selectedDocument.signature}
                                    </span>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Qualified Signature</IonLabel>
                                    <span>
                                        {selectedDocument.signature ? 'Yes' : 'No'}
                                    </span>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Size</IonLabel>
                                    <span>
                                        {selectedDocument.size}
                                    </span>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Last Modified</IonLabel>
                                    <span>
                                        {selectedDocument.modified_at}
                                    </span>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Created</IonLabel>
                                    <span>
                                        {selectedDocument.created_at}
                                    </span>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    <hr/>
                    <IonButton buttonType="secondary" onClick={() => setShowModal(false)}>Close</IonButton>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Documents;
