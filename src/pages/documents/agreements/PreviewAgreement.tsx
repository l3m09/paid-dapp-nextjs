import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TemplateComponent from 'react-mustache-template-component';
import { IonButton, IonItem } from '@ionic/react';
import {
    doSetAgreementFormInfo,
	doCreateAgreement,
} from '../../../redux/actions/documents';
import { useParams } from 'react-router';
import { templateRender } from '../../../redux/actions/template/template';

interface PreviewAgreementProps {
    current: any;
}

const PreviewAgreement: FC<PreviewAgreementProps> = ({ current }) => {
    const dispatch = useDispatch();
    const documentState = useSelector((state: any) => state.documents);
    const wallet = useSelector(
		(state: { wallet: { currentWallet: any } }) => state.wallet
    );
    const [agreementDocument, setAgreementDocument] = useState('');
    
    const { agreementFormInfo, loading } = documentState;
	const { currentWallet } = wallet;

    const { type } = useParams<{ type: string }>();

    useEffect(() => {
        const today = new Date();
        const template = templateRender({
			party_name: agreementFormInfo.name,
			party_wallet: agreementFormInfo.address,
			party_address: agreementFormInfo.address,
			counterparty_name: agreementFormInfo.counterpartyName,
			counterparty_wallet: agreementFormInfo.counterpartyWallet,
			counterparty_address: agreementFormInfo.counterpartyAddress,
			create_date: today.toLocaleDateString()
        });
        setAgreementDocument(template());
    }, [agreementFormInfo]);

    async function slideNext() {
		await current.lockSwipeToNext(false);
		await current.slideNext();
		await current.lockSwipeToNext(true);
    }
    
    async function slideBack() {
		await current.lockSwipeToPrev(false);
		await current.slidePrev();
		await current.lockSwipeToPrev(true);
    }

    const onSubmit = async () => {
		dispatch(doSetAgreementFormInfo({ createdAt: new Date().toDateString() }));
		dispatch(
			doCreateAgreement({
				signatoryA: currentWallet.address,
				signatoryB: agreementFormInfo.counterpartyWallet,
				validUntil: 0,
				agreementFormTemplateId: type,
				agreementForm: agreementFormInfo,
				slideNext: slideNext,
				slideBack: slideBack
			})
		);
	};
    
    return (
        <div className="agreement-content">
            <h5 className="agreement-form-title">
                Preview Document
            </h5>
            <IonItem class="form-options">
                <TemplateComponent template={agreementDocument} />
            </IonItem>
            <IonItem class="form-options">
                <IonButton
                    color="danger"
                    shape="round"
                    onClick= { () => slideBack() }
                >
                    Back
                </IonButton>
                <IonButton
                    color="gradient"
                    shape="round"
                    disabled={loading}
                    onClick={ () => onSubmit() }
                >
                    {loading ? 'Loading..' : 'Confirm'}
                </IonButton>
            </IonItem>
        </div>
    );
}

export default PreviewAgreement;