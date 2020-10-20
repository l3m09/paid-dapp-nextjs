import {
    IonContent,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
} from '@ionic/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {doCreateWallet} from "../../../redux/actions/wallet";

interface NamePasswordProps {
    current: any
}
interface WalletInfo {
    name: string;
    password: string;
    verified: boolean;
}

const NamePassword: React.FC<NamePasswordProps> = ({current}) => {
    const dispatch = useDispatch();
    const wallet = useSelector(
        (state: { wallet: { wallets: []; loading: boolean, confirmedSeedPhrase: [] } }) => state.wallet
    );
    const { loading, confirmedSeedPhrase } = wallet;

    let walletInfo: WalletInfo = { name: '', password: '', verified: false}

    function nameChanged(e: any) {
        walletInfo.name = e.target.value
        verifyInfo()
    }
    function passwordChanged(e: any) {
        walletInfo.password = e.target.value
        verifyInfo()
    }

    function verifyInfo() {
        if (walletInfo.name.length > 0 && walletInfo.password.length > 3) {
            walletInfo.verified = true
        }
    }

    async function slideNext() {
        console.log('NamePassword', await current.getActiveIndex())
        await current.lockSwipeToNext(false);
        current.slideNext()
        await current.lockSwipeToNext(true);

    }

    const onSubmit = () => {
        // e.preventDefault();
        let mnemonic = confirmedSeedPhrase.join(' ')
        dispatch(doCreateWallet({name: walletInfo.name, password: walletInfo.password, mnemonic: mnemonic}));
        slideNext().then(r => {})

    }

    return (
            <IonContent fullscreen class="phrase-content phrase-name-password">
                <form action="" className="name-password-form">
                    <IonItem>
                        <IonLabel position="stacked">Wallet Name</IonLabel>
                        <IonInput title="Label"
                                  type="text"
                                  placeholder="Enter a name for this wallet"
                                  value={walletInfo.name}
                                  onInput={(e) => {nameChanged(e)}}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput title="password"
                                  type="password"
                                  placeholder="Enter a password for this wallet"
                                  value={walletInfo.password}
                                  onInput={passwordChanged}
                        />
                    </IonItem>
                    <IonItem class="form-options">
                        <IonButton
                            // routerLink="/phrase/instructions"
                            onClick={() => {onSubmit()}}
                            class="purple-button "
                            color="8500FF"
                            disabled={loading}
                        >
                            {loading ? 'Loading..' : 'Confirm'}
                        </IonButton>
                    </IonItem>
                </form>
            </IonContent>
    );
};

export default NamePassword;
