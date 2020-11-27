import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonItem,
    IonButton,
    IonRouterLink,
    IonImg,
    IonText
} from '@ionic/react';
import React, {useState} from 'react';
// import '../../theme/views/_menu.scss'
import { arrowBackOutline } from 'ionicons/icons';
import Terms from '../../components/Terms';

const LoginGmail: React.FC = () => {
    const [showTermsModal, setShowTermsModal] = useState(false);

    return (
        <IonPage >
            <IonHeader translucent={false} mode="md" class="backarrow-header">
                <IonRouterLink routerLink="/">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Continue with Gmail</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="login-gmail-content auth-content">
                <IonItem>
                    <IonImg class="avatar" src="/assets/images/avatar-placeholder.png"/>
                </IonItem>
                <IonItem>
                    <IonTitle class="username">Hey John</IonTitle>
                </IonItem>
                <IonItem>
                    <IonText class="no-account-text">
                        There is no existing Paid account connected to your Gmail account,
                        Do you want to create a new account?
                    </IonText>
                </IonItem>
                <IonItem class="">
                    <IonButton routerLink="/signup" class="purple-button create-button" color="8500FF">
                        Create account
                    </IonButton>
                </IonItem>
                <IonItem class="">
                    <span className="or-text">Or</span>
                </IonItem>
                <IonItem class="">
                    <IonRouterLink routerLink="/login" class="singin-link">
                        I already have an account
                    </IonRouterLink>
                </IonItem>
                <IonItem>
                    <Terms show={showTermsModal} dismiss={() => {setShowTermsModal(false)}} />
                </IonItem>

                <IonItem>
                    <div className="terms">
                        To learn more about how <a href="https://www.paidnetwork.com" target="_blank" rel="noopener noreferrer">Paid</a> collects, uses, shares
                        and protects your personal data, please read Truthit’s
                        <IonRouterLink routerLink="/">Privacy Policy</IonRouterLink>
                    </div>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default LoginGmail;
