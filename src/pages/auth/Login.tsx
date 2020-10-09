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
import React, {useEffect} from 'react';
// import '../../theme/views/_menu.scss'
import { arrowBackOutline } from 'ionicons/icons';
import { doLogin } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);
    const { loading, error, user, redirect } = auth;

    useEffect(() => {
        if (error) {
            console.log('USE EFFECT ERROR', error)
        } else if (user) {
            console.log('USE EFFECT SUCCESS', user)
        }
    },[loading, error, user]);

    const onSubmit = () => {
        // e.preventDefault();
        dispatch(doLogin({username: 'John Cena'}));

    }

    if (redirect) {
        return <Redirect to="/phrase/instructions"/>
    }
    return (
        <IonPage >
            <IonHeader class="backarrow-header">
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
                            onClick={() => {onSubmit()}}
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

export default Login;
