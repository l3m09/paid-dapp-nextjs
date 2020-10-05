import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonLabel,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonRouterLink
} from '@ionic/react';
import React from 'react';
// import '../../theme/views/_menu.scss'
import { arrowBackOutline } from 'ionicons/icons';

const Login: React.FC = () => {

    return (
        <IonPage >
            <IonHeader class="auth-header">
                <IonRouterLink routerLink="/">
                    <IonIcon icon={arrowBackOutline}/>
                </IonRouterLink>
                <IonTitle>Log in with email</IonTitle>
            </IonHeader>

            <IonContent fullscreen class="login-content auth-content">
                <form action="" className="login-form">

                    <IonItem>
                        <IonLabel position="stacked">Email address</IonLabel>
                        <IonInput title="Email" type="email" placeholder="Enter your email"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput type="password" placeholder="Enter your password"></IonInput>
                    </IonItem>
                    <IonItem class="form-options">
                        <IonButton routerLink="/page/wallet" class="purple-button " color="8500FF">Log In</IonButton>
                    </IonItem>
                    <IonItem class="form-options">
                        <span>Don't have an account? <IonRouterLink routerLink="/signup">Sign up</IonRouterLink></span>
                    </IonItem>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Login;
