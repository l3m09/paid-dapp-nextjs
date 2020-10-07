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

const SeedPhrase: React.FC = () => {

    return (
        <IonPage >
            <IonHeader class="backarrow-header">
                <IonRouterLink routerLink="/phrase/instructions">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Secure your wallet</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="phrase-content seed-phrase">
                <IonItem>
                    <span className="phrase-lock-icon">
                        <IonIcon ios={lockClosedOutline} md={lockClosedOutline} />
                    </span>
                </IonItem>
                <IonItem>
                    <IonTitle class="phrase-content-title seed-phrase-title">
                        Write down your seed phrase
                    </IonTitle>
                </IonItem>
                <IonItem>
                    <IonText class="phrase-content-sub-text seed-phrase-sub-text">
                        This is your seed phrase. Write it down on a
                        paper and keep it in a safe place.
                        You’ll be asked to re-enter this phrase
                        (in order) on the next step.
                    </IonText>
                </IonItem>
                <IonItem>
                    <div className="seed-phrase-words phrase-words">
                        {words.map((word, index) => {
                            return (
                                <span className="word" key={index}>{index + 1}. {word}</span>
                            )
                        })}
                    </div>
                </IonItem>
                <IonItem class="">
                    <IonButton routerLink="/phrase/confirm" class="purple-button create-button" color="8500FF">
                        Continue
                    </IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default SeedPhrase;
