import {IonRouterLink, IonIcon, IonContent, IonHeader, IonPage, IonLabel, IonTitle, IonItem, IonInput, IonButton} from '@ionic/react';
import React from 'react';
// import '../../theme/views/_menu.scss'
import { arrowBackOutline } from 'ionicons/icons';
import Terms from "../../components/Terms";

const SignUp: React.FC = () => {

    return (
        <IonPage >
            <IonHeader class="auth-header">
                <IonRouterLink routerLink="/">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Sign up with email</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="signup-content auth-content">
                <form action="" className="login-form">
                    <IonItem>
                        <IonLabel position="stacked">Email address</IonLabel>
                        <IonInput title="Email" type="email" placeholder="Enter your email"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput type="password" placeholder="Enter your password"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password confirmation</IonLabel>
                        <IonInput type="password" placeholder="Confirm your password"></IonInput>
                    </IonItem>
                    <IonItem>
                        <Terms/>
                    </IonItem>
                    <IonItem class="form-options">
                        <IonButton routerLink="/page/wallet" class="purple-button " color="8500FF">Sign up</IonButton>
                    </IonItem>
                    <IonItem >
                        <span><IonRouterLink routerLink="/login">Log in with email</IonRouterLink></span>
                    </IonItem>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
