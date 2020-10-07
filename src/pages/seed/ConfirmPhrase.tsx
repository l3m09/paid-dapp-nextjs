import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonItem,
    IonButton,
    IonRouterLink,
    IonText
} from '@ionic/react';
import React from 'react';
import { arrowBackOutline, lockClosedOutline } from 'ionicons/icons';

const words = ['glide', 'slim', 'edit', 'jacket', 'suit', 'stock', 'vast', 'gym',
    'index', 'square', 'people', 'glide'];

const ConfirmPhrase: React.FC = () => {

    return (
        <IonPage >
            <IonHeader class="backarrow-header">
                <IonRouterLink routerLink="/phrase/seed">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Secure your wallet</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="phrase-content confirm-phrase">
                <IonItem>
                    <IonTitle class="phrase-content-title confirm-phrase-title">
                        Confirm your seed phrase
                    </IonTitle>
                </IonItem>
                <IonItem>
                    <IonText class="phrase-content-sub-text confirm-phrase-sub-text">
                        Select each word in the order it was presented to you.
                    </IonText>
                </IonItem>
                <IonItem>
                    <div className="confirm-phrase-words phrase-words">
                        {words.map((word, index) => {
                            return (
                                <span className="word-wrapper">
                                    <span className="index">{index + 1}.</span>
                                    <span className="word" key={index}> </span>
                                </span>
                            )
                        })}
                    </div>
                </IonItem>
                <IonItem>
                    <div className="confirm-phrase-words phrase-words">
                        {words.map((word, index) => {
                            return (
                                <span className="word" key={index}>{word}</span>
                            )
                        })}
                    </div>
                </IonItem>
                <IonItem class="">
                    <IonButton routerLink="/phrase/completed" class="purple-button create-button" color="8500FF">
                        Complete Backup
                    </IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default ConfirmPhrase;
