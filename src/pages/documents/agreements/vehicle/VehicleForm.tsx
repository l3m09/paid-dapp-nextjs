import {
    IonContent,
    IonLabel,
    IonItem,
    IonInput,
    IonButton, IonTitle, IonTextarea,
} from '@ionic/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {doCreateAgreement, doSetAgreementFormInfo} from "../../../../redux/actions/documents";
import {useParams} from "react-router";

interface AgreementFormProps {
    current: any
}
interface AgreementInfo {
    name: string;
    address: string;
    phone: string;
    destinationWallet: string;
    createdAt: any;
    filled: boolean;
}

const VehicleForm: React.FC<AgreementFormProps> = ({current}) => {
    const dispatch = useDispatch();
    const { type } = useParams<{ type: string; }>();
    const documentsState = useSelector((state: any) => state.documents);
    const wallet = useSelector(
        (state: { wallet: { currentWallet: any } }) => state.wallet
    );
    const { currentWallet } = wallet;

    const {loading} = documentsState;

    let agreementInfo: AgreementInfo = { name: '', filled: false, address: '', phone: '', destinationWallet: '', createdAt: ''}
    function nameChanged(e: any) {
        agreementInfo.name = e.target.value
        verifyInfo()
    }
    function addressChanged(e: any) {
        agreementInfo.address = e.target.value
        verifyInfo()
    }
    function phoneChanged(e: any) {
        agreementInfo.phone = e.target.value
        verifyInfo()
    }
    function destinationWalletChanged(e: any) {
        agreementInfo.destinationWallet = e.target.value
        verifyInfo()
    }
    function verifyInfo() {
        if (agreementInfo.name.length > 0 &&
            agreementInfo.address.length > 0 &&
            agreementInfo.destinationWallet.length > 0 &&
            agreementInfo.phone.length > 0) {
            agreementInfo.filled = true
        }
    }

    async function slideNext() {
        await current.lockSwipeToNext(false);
        current.slideNext()
        await current.lockSwipeToNext(true);

    }

    const onSubmit = () => {
        // e.preventDefault();
        agreementInfo.createdAt = new Date().toDateString();
        dispatch(doSetAgreementFormInfo(agreementInfo));
        dispatch(doCreateAgreement({
            signatoryA: currentWallet.address,
            signatoryB: agreementInfo.destinationWallet,
            validUntil: 0,
            agreementFormTemplateId: type,
            agreementForm: agreementInfo
        }))
        slideNext().then(r => {})

    }

    return (
            <IonContent fullscreen class="phrase-content phrase-name-password">
               <h5>
                   <IonTitle>Information</IonTitle>
               </h5>
                <form action="" className="name-password-form">
                    <IonItem>
                        <IonLabel position="stacked">Full Name</IonLabel>
                        <IonInput title="Label"
                                  type="text"
                                  placeholder="Enter your name"
                                  value={agreementInfo.name}
                                  onInput={(e) => {nameChanged(e)}}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonInput title="Label"
                                  type="text"
                                  placeholder="Enter your billing address"
                                  value={agreementInfo.address}
                                  onInput={(e) => {addressChanged(e)}}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Phone</IonLabel>
                        <IonInput title="Label"
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  value={agreementInfo.phone}
                                  onInput={(e) => {phoneChanged(e)}}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Destination Wallet Address</IonLabel>
                        <IonInput title="Label"
                                  placeholder="Enter the destination wallet address"
                                  value={agreementInfo.destinationWallet}
                                  onInput={(e) => {destinationWalletChanged(e)}}
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

export default VehicleForm;
