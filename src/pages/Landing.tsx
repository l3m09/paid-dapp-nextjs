import {IonButton, IonContent, IonImg, IonPage, IonRouterLink} from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Terms from "../components/Terms";

function NotWallets() {
  return <div className="landing-actions">
              <IonButton routerLink="/wallet" class="red-button " color="FF4300">Create New Wallet</IonButton>
              <IonButton routerLink="/login" class="purple-button " color="8500FF">Import a Wallet</IonButton>
          </div>
}

const Landing: React.FC = () => {
 const wallet = useSelector((state: { wallet: { wallets: [], loading: boolean }}) => state.wallet);
    const {wallets, loading} = wallet;


  if (wallets.length <= 0) {
    return <NotWallets/>
  }
  return (
    <IonPage>
      <IonContent fullscreen class="landing-content">
          <div className="landing-logo">
              <IonImg src="/assets/images/logo-full.png"/>
        </div>
        
          <div className="landing-actions">
              <IonButton routerLink="/login-gmail" class="red-button " color="FF4300">Create New Wallet</IonButton>
              <IonButton routerLink="/login" class="purple-button " color="8500FF">Import a Wallet</IonButton>
          </div>
          <Terms/>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
