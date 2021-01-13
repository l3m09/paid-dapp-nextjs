import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderToString } from 'react-dom/server';
import TemplateComponent from 'react-mustache-template-component';
import { IonButton, IonItem } from '@ionic/react';
import {
    doSetAgreementFormInfo,
	doCreateAgreement,
} from '../../../redux/actions/documents';
import { useHistory, useParams } from 'react-router';
import { templateRender } from '../../../redux/actions/template/template';

interface PreviewAgreementProps {
    current: any;
}

const PreviewAgreement: FC<PreviewAgreementProps> = ({ current }) => {
    const history = useHistory();
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
		dispatch(doSetAgreementFormInfo({
			name: '',
			address: '',
			phone: '',
			counterpartyWallet: '',
			counterpartyName: '',
			counterpartyAddress: '',
			counterpartyPhone: '',
			createdAt: null
		}));

		await current.lockSwipeToPrev(false);
		await current.lockSwipeToNext(false);
		await current.slideTo(0).then(() => {
			history.push('/documents');
		});
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
        // console.log('template', renderToString(<TemplateComponent template={agreementDocument} />));
        //console.log('type template', type);
	};
    
    return (
        <div className="agreement-content">
            <h5 className="agreement-form-title">
                Preview Document
            </h5>
            <IonItem class="form-options preview-document">
                <TemplateComponent template={agreementDocument} />
            </IonItem>
            <IonItem class="form-options preview-document-buttons">
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
                    {loading ? 'Loading..' : 'Accept'}
                </IonButton>
            </IonItem>
        </div>
    );
}

export default PreviewAgreement;