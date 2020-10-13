import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonLabel,
    IonTitle,
    IonItem,
    IonButton,
    IonRouterLink,
    IonTextarea, IonText, IonList, IonItemDivider, IonPopover
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
// import '../../theme/views/_menu.scss'
import { arrowBackOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';

const Import: React.FC = () => {
    const wallet = useSelector((state: any) => state.wallet);
    const { loading } = wallet;
    const [showPopover, setShowPopover] = useState(false);

    return (
        <IonPage >
            <IonHeader class="backarrow-header">
                <IonRouterLink routerLink="/wallets">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Import Wallet</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="import-content wallet-content">
                <IonItem>
                    <IonText class="import-information">
                        You would need to enter your Recovery Phrase to import your wallet
                    </IonText>
                </IonItem>

                <form action="" className="import-form">

                    <IonItem>
                        <IonLabel position="stacked">Phrase</IonLabel>
                        <IonTextarea title="Phrase" placeholder="Enter your seed phrase"></IonTextarea>
                        <IonText>
                            <small>
                                Typically 12 (sometimes 24) words separeted by single spaces
                            </small>
                        </IonText>
                    </IonItem>
                    <IonItem class="form-options">
                        <IonButton
                            routerLink="/wallets"
                            class="purple-button import-button"
                            color="8500FF"
                            disabled={loading}
                        >
                            {loading ? 'Loading..' : 'Import'}
                        </IonButton>
                    </IonItem>
                </form>
                <IonItem class="">
                    <span className="what-is"><IonRouterLink onClick={() => setShowPopover(true)}>What is a Recovery Phrase?</IonRouterLink></span>
                    <IonPopover
                        isOpen={showPopover}
                        cssClass='my-custom-class'
                        onDidDismiss={e => setShowPopover(false)}
                    >
                        <IonList>
                           <IonItem>
                               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                               Consectetur consequatur cumque deserunt libero
                               pariatur perspiciatis praesentium quos! Ab aliquam cumque,
                           </IonItem>
                        </IonList>
                    </IonPopover>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Import;
