import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem, IonItemDivider, IonItemGroup,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonPopover, IonList, IonListHeader, IonButton
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import {useDispatch, useSelector} from "react-redux";
import {doGeneratePhrase, doGetWallets} from "../../redux/actions/wallet";
const Wallets: React.FC = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state: any) => state.wallet);
    const {wallets, loading} = wallet;
    const [showPopover, setShowPopover] = useState(false);

    let totalValue: number = 0.00;
    for (let i = 0; i < wallets.length; i += 1) {
        totalValue = totalValue + wallets[i].amount;
    }

    function doSomething(item:any) {
        console.log('Wallet', item)
    }
    return (
        <IonPage class="wallets-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Wallets</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonItemDivider>
                    <IonLabel>Total Value: ${totalValue}</IonLabel>
                </IonItemDivider>
                <IonItemGroup class="wallets-container">
                    {wallets.map((wallet: any, index: any) => {
                        return (
                            <IonItem class="wallet-wrapper" key={index}  onClick={() => setShowPopover(true)}>
                                <div className="wallet-container">
                                    <span className="amount">$ {wallet.amount}</span>
                                    <span className="label">{wallet.label}</span>
                                    <span className="type">{wallet.type}</span>
                                    <span className="address">{wallet.address}</span>
                                </div>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='my-custom-class'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonList>
                                        <IonItem button onClick={() => {doSomething(wallet)}}>Send</IonItem>
                                        <IonItem button onClick={() => {doSomething(wallet)}}>Transfer</IonItem>
                                        <IonItem button onClick={() => {doSomething(wallet)}}>Export</IonItem>
                                        <IonItemDivider/>
                                        <IonItem button onClick={() => {doSomething(wallet)}}>Edit</IonItem>
                                    </IonList>
                                </IonPopover>
                            </IonItem>
                        )
                    })}

                </IonItemGroup>
                <IonItemGroup>
                    <IonItem class="form-options">
                        <IonButton
                            routerLink="/wallet/create"
                            class=""
                            color="secondary"
                        >
                            Create
                        </IonButton>
                        <IonButton
                            routerLink="/wallet/import"
                            class=""
                            color="secondary"
                        >
                            Import
                        </IonButton>
                    </IonItem>
                </IonItemGroup>
            </IonContent>
        </IonPage>
    );
};

export default Wallets;
