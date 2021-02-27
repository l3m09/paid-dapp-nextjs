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
import { arrowBackOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';

const Export: React.FC = () => {
    const wallet = useSelector((state: any) => state.wallet);
    const { loading } = wallet;

    return (
        <IonPage >
            <IonHeader translucent={false} mode="md" class="backarrow-header">
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
                        <IonButton
                            // routerLink="/phrase/instructions"
                            class="purple-button "
                            color="8500FF"
                            disabled={loading}
                        >
                            {loading ? 'Loading..' : 'Log In'}
                        </IonButton>
                    </IonItem>
                    <IonItem class="form-options">
                        <span>Don't have an account? <IonRouterLink routerLink="/signup">Sign up</IonRouterLink></span>
                    </IonItem>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Export;
