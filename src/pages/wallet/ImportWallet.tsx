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
    IonInput,
    IonNote
} from '@ionic/react';
import React, { useReducer, Reducer } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ActionModel from '../../models/ActionModel';
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
    mnemonic: string;
    verified: boolean;
    validName: boolean;
	validPassphrase: boolean;
    confirmedPassphrase: boolean;
    validMnemonic: boolean;
}

const CHANGE_WALLET_NAME = 'CHANGE_WALLET_NAME';
const CHANGE_PASSPHRASE = 'CHANGE_PASSPHRASE';
const CHANGE_CONFIRM_PASSPHRASE = 'CHANGE_CONFIRM_PASSPHRASE';
const CHANGE_MNEMONIC = 'CHANGE_MNEMONIC';

const importWalletReducer: Reducer<WalletInfo, ActionModel> = (state: WalletInfo, action: ActionModel) => {
    const { type, payload } = action;

    switch(type) {
        case CHANGE_WALLET_NAME:
			const name = payload;
			return {
				...state,
				name,
				verified: name.length > 0 && state.passphrase.length > 3 &&
				state.passphrase === state.confirmPassphrase,
				validName: name.length > 0
			};
		case CHANGE_PASSPHRASE:
			const passphrase = payload;
			return {
				...state,
				passphrase,
				verified: state.name.length > 0 && passphrase.length > 3 &&
				passphrase === state.confirmPassphrase,
				validPassphrase: passphrase.length > 3,
				confirmedPassphrase: passphrase === state.confirmPassphrase
			};
		case CHANGE_CONFIRM_PASSPHRASE:
			const confirmPassphrase = payload;
			return {
				...state,
				confirmPassphrase,
				verified: state.name.length > 0 && state.passphrase.length > 3 &&
				state.passphrase === confirmPassphrase,
				confirmedPassphrase: state.passphrase === confirmPassphrase,
            };
        case CHANGE_MNEMONIC:
            const mnemonic = payload;
            return {
                ...state,
                mnemonic,
                verified: state.name.length > 0 && state.passphrase.length > 3 &&
                state.passphrase === state.confirmPassphrase && mnemonic.length > 0,
                validMnemonic: mnemonic.length > 0
            };
        default:
            return { ...state };
    }
}


const ImportWallet: React.FC<Props> = ({show, dismiss}) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state: any) => state.wallet);
    const { importingWallet, error } = wallet;

    let walletInfo: WalletInfo = { 
        name: '', 
        passphrase: '', 
        confirmPassphrase: '', 
        mnemonic: '',
        verified: false, 
        validName: true,
		validPassphrase: true,
        confirmedPassphrase: true,
        validMnemonic: true
    };

    const [state, commit] = useReducer(importWalletReducer, walletInfo);

    const setter = (type: string) => (e: any) => {
        const { target } = e;
        const { value } = target;

        commit({ type, payload: value });
    };

    function onSubmit() {
        const {name, passphrase, mnemonic, verified} = state;

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
                            value={state.name}
                            onInput={setter(CHANGE_WALLET_NAME)}
                            onIonBlur={setter(CHANGE_WALLET_NAME)}
                        />
                        {
                            !state.validName &&
                            <IonNote color="danger" className="ion-margin-top">
                                You must enter a Wallet Name.
                            </IonNote>
                        }
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Passphrase</IonLabel>
                        <IonInput
                            title="passphrase"
                            type="password"
                            placeholder="Enter a passphrase for this wallet"
                            value={state.passphrase}
                            onInput={setter(CHANGE_PASSPHRASE)}
                            onIonBlur={setter(CHANGE_PASSPHRASE)}
                        />
                        {
                            !state.validPassphrase &&
                            <IonNote color="danger" className="ion-margin-top">
                                Passphrase must be at least 3 characters.
                            </IonNote>
                        }
                    </IonItem>
			        <IonItem>
                        <IonLabel position="stacked">Confirm Passphrase</IonLabel>
                        <IonInput
                            title="confirm passphrase"
                            type="password"
                            placeholder="Enter the passphrase for second time"
                            value={state.confirmPassphrase}
                            onInput={setter(CHANGE_CONFIRM_PASSPHRASE)}
                            onIonBlur={setter(CHANGE_CONFIRM_PASSPHRASE)}
                        />
                        {
                            !state.confirmedPassphrase &&
                            <IonNote color="danger" className="ion-margin-top">
                                Passphrase and Confirm Passphrase do not match.
                            </IonNote>
                        }
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Phrase</IonLabel>
                        <IonTextarea 
                            title="Phrase" 
                            placeholder="Enter your seed phrase"
                            value={state.mnemonic}
                            onInput={setter(CHANGE_MNEMONIC)}
                            onIonBlur={setter(CHANGE_MNEMONIC)}
                        />
                        {
                            !state.validMnemonic &&
                            <IonNote color="danger" className="ion-margin-top">
                                You must enter the Phrase.
                            </IonNote>
                        }{
                            (error?.length > 0) &&
                            <IonNote color="danger" className="ion-margin-top">
                                { error }
                            </IonNote>
                        }
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
                            disabled={importingWallet || !state.verified}
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
