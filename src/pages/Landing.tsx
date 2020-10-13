import {IonButton, IonContent, IonImg, IonPage, IonRouterLink} from '@ionic/react';
import React from 'react';
import Terms from "../components/Terms";

const Landing: React.FC = () => {


  return (
    <IonPage>
      <IonContent fullscreen class="landing-content">
          <div className="landing-logo">
              <IonImg src="/assets/images/logo-full.png"/>
          </div>
          <div className="landing-actions">
              <IonButton routerLink="/login-gmail" class="red-button " color="FF4300">Continue with Gmail</IonButton>
              <IonButton routerLink="/login" class="purple-button " color="8500FF">Log In with email</IonButton>
              <IonRouterLink routerLink="/signup">Sign up with email</IonRouterLink>
          </div>
          <Terms/>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
