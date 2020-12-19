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
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {doImportWallet} from "../../redux/actions/wallet";

interface Props {
    show: boolean;
    dismissible?: boolean;
    dismiss: () => void;
}

interface WalletInfo {
	name: string;
	passphrase: string;
	confirmPassphrase: string,
    verified: boolean;
    mnemonic: string;
}


const ImportWallet: React.FC<Props> = ({show, dismiss}) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state: any) => state.wallet);
    const { importingWallet } = wallet;

    let walletInfo: WalletInfo = { name: '', passphrase: '', confirmPassphrase: '', verified: false, mnemonic: '' };

    function verifyInfo() {
        if (walletInfo.name.length > 0 && 
            walletInfo.passphrase.length > 3 &&
            walletInfo.passphrase === walletInfo.confirmPassphrase && 
            walletInfo.mnemonic.length > 12) {
            walletInfo.verified = true;
            return;
        }
        walletInfo.verified = false;
    }

    function nameChanged(e: any) {
        walletInfo.name = e.target.value;
        verifyInfo();
    }

    function passphraseChanged(e: any) {
        walletInfo.passphrase = e.target.value;
        verifyInfo();
    }

     function confirmPassphraseChange(e: any) {
        walletInfo.confirmPassphrase = e.target.value;
        verifyInfo();
    }

    function mnemonicChanged(e: any) {
        walletInfo.mnemonic = e.target.value;
        verifyInfo();
    }

    function onSubmit() {
        const {name, passphrase, mnemonic, verified} = walletInfo;
        if (verified) {
            dispatch(doImportWallet({
                name,
                password: passphrase,
                mnemonic
            }));
        } else if (walletInfo.passphrase !== walletInfo.confirmPassphrase) {
			alert('Passphrase is different Confirm Passphrase');
		} else if (walletInfo.passphrase === '') {
			alert('Passphrase is Empty');
		} else if (walletInfo.confirmPassphrase === '') {
			alert('Passphrase is Empty');
		}
    }

    useEffect(() => {
		verifyInfo();
	}, [walletInfo]);

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
                        <IonLabel position="stacked">Passphrase</IonLabel>
                        <IonInput
                            title="passphrase"
                            type="password"
                            placeholder="Enter a passphrase for this wallet"
                            value={walletInfo.passphrase}
                            onInput={passphraseChanged}
                        />
                    </IonItem>
			        <IonItem>
                        <IonLabel position="stacked">Confirm Passphrase</IonLabel>
                        <IonInput
                            title="confirm passphrase"
                            type="password"
                            placeholder="Enter the passphrase for second time"
                            value={walletInfo.confirmPassphrase}
                            onInput={confirmPassphraseChange}
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
