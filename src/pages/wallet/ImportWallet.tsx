import {
    IonContent,
    IonHeader,
    IonLabel,
    IonTitle,
    IonItem,
    IonButton,
    IonTextarea,
    IonText,
    IonModal,
    IonToolbar,
    IonButtons,
    IonInput
} from '@ionic/react';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {doImportWallet} from "../../redux/actions/wallet";

interface Props {
    show: boolean;
    dismissible?: boolean;
    dismiss: () => void;
}

interface WalletInfo {
    name: string;
    password: string;
    confirmpassword: string;
    mnemonic: string;
    verified: boolean;
}


const ImportWallet: React.FC<Props> = ({show, dismiss}) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state: any) => state.wallet);
    const { importingWallet } = wallet;

    let walletInfo: WalletInfo = { name: '', password: '', confirmpassword: '', verified: false, mnemonic: '' };

    function verifyInfo() {
        if (walletInfo.name.length > 0 && walletInfo.password.length > 3 && walletInfo.mnemonic.length > 12) {
            walletInfo.verified = true;
        }
    }
    
    function nameChanged(e: any) {
        walletInfo.name = e.target.value;
        verifyInfo();
    }
    function passwordChanged(e: any) {
        walletInfo.password = e.target.value;
        verifyInfo();
    }
     function confirmationPassword(e: any) {
        walletInfo.confirmpassword = e.target.value;
        if(walletInfo.confirmpassword = walletInfo.password){
            verifyInfo();
        }
    }
    function mnemonicChanged(e: any) {
        walletInfo.mnemonic = e.target.value;
        verifyInfo();
    }
    function onSubmit() {
        dispatch(doImportWallet(walletInfo))
    }
	async function doDismiss() {
        dismiss();
    }
    
    return (
        <IonModal cssClass="import-modal" isOpen={show} onDidDismiss={() => {doDismiss()}}>
            <IonHeader translucent={false} mode="md">
                <IonToolbar>
                    <IonTitle>Import a Wallet</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="secondary" shape="round" disabled={importingWallet} onClick={() => doDismiss()}>
                            Cancel
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen class="import-content wallet-content">
                <IonItem>
                    <IonText class="import-information">
                        You would need to enter your <span className="text-secondary">Recovery Phrase</span> to import your wallet
                    </IonText>
                </IonItem>

                <form action="" className="import-form">
                    <IonItem>
                        <IonLabel position="stacked">Wallet Name</IonLabel>
                        <IonInput
                            title="Label"
                            type="text"
                            placeholder="Enter a name for this wallet"
                            value={walletInfo.name}
                            onInput={(e) => {
                                nameChanged(e);
                            }}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput
                            title="password"
                            type="password"
                            placeholder="Enter a password for this wallet"
                            value={walletInfo.password}
                            onInput={passwordChanged}
                        />
                    </IonItem>
			 <IonItem>
                        <IonLabel position="stacked">Confirmation Password</IonLabel>
                        <IonInput
                            title="confirm password"
                            type="password"
                            placeholder="Enter the password for second time"
                            value={walletInfo.confirmpassword}
                            onInput={confirmationPassword}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Phrase</IonLabel>
                        <IonTextarea 
                            title="Phrase" 
                            placeholder="Enter your seed phrase"
                            value={walletInfo.mnemonic}
                            onInput={mnemonicChanged}
                        />
                        <IonText className="textarea-hint">
                            <small>
                                Typically 12 (sometimes 24) words separeted by single spaces
                            </small>
                        </IonText>
                    </IonItem>
                    <IonItem class="form-options">
                        <IonButton
                            onClick={() => {onSubmit()}}
                            class="import-button"
                            color="gradient"
                            shape="round"
                            disabled={importingWallet}
                        >
                            {importingWallet ? 'Loading..' : 'Import'}
                        </IonButton>
                    </IonItem>
                </form>
            </IonContent>
        </IonModal>
    );
};

export default ImportWallet;
