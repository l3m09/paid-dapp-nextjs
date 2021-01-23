import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderToString } from 'react-dom/server';
import TemplateComponent from 'react-mustache-template-component';
import { IonButton, IonButtons, IonItem, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import {
    doSetAgreementFormInfo,
	doCreateAgreement,
} from '../../../redux/actions/documents';
import { useHistory, useParams } from 'react-router';
import { getContractTemplate } from '../../../redux/actions/template/index';
import { BlockchainFactory } from '../../../utils/blockchainFactory';
import { ContractFactory } from '../../../utils/contractFactory';
import SmartAgreementsForm from './smartAgreementsForms/SmartAgreementsForm';

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
    const smartAgreementsState = useSelector(
        (state: { smartAgreements }) => state.smartAgreements
    );
    const [showEditPopover, setShowEditPopover] = useState(false);
    const [agreementDocument, setAgreementDocument] = useState('');
    const [agreementData, setAgreementData] = useState({});
    
    const { agreementFormInfo, loading } = documentState;
    const { currentWallet } = wallet;

    const { type } = useParams<{ type: string }>();

    const getDataInfo = useCallback((dataName: string) => {
        const today = new Date();
        const dataInfos = new Map([
            ['date', today.toLocaleDateString()],
            ['createDate', today.toLocaleDateString()],
            ['partyEmail', agreementFormInfo?.email],
            ['partyName', agreementFormInfo?.name],
            ['partyAddress', agreementFormInfo?.address],
            ['partyWallet', currentWallet?.address],
            ['counterPartyEmail',agreementFormInfo?.counterpartyEmail],
            ['counterPartyAddress', agreementFormInfo?.counterpartyAddress],
            ['counterPartyWallet', agreementFormInfo?.counterpartyWallet],
            ['counterPartyName', agreementFormInfo?.counterpartyName],
        ]);

        return dataInfos.get(dataName);
    }, [currentWallet, agreementFormInfo]);

    const agreementTemplate = useCallback(() => {
        return <TemplateComponent template={agreementDocument} data={agreementData} />;
    }, [agreementDocument, agreementData]);

    const slideNext = useCallback(async () => {
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
    }, [current, history, dispatch]);
    
    const slideBack = useCallback(async () => {
		await current.lockSwipeToPrev(false);
		await current.slidePrev();
		await current.lockSwipeToPrev(true);
    }, [current]);
    let addr = '';
    const metodofn = async (ethereum: any) => {
        const addresses = await ethereum.request({ method: 'eth_requestAccounts' });
        const address = addresses[0];
        addr = address;
        // const address = unlockedWallet.address
        const _walletModel = await BlockchainFactory.getWeb3Mask(ethereum);
        const walletModel = _walletModel!;
        const web3 = walletModel.web3Instance;
        const network = await BlockchainFactory.getNetwork(walletModel.network);
    
        const AgreementContract = ContractFactory.getAgreementContract(web3, network);
        const PaidTokenContract = ContractFactory.getPaidTokenContract(web3, network);
        const token = PaidTokenContract.options.address;
        console.log('address token', token);
        const methodFn = AgreementContract.methods.getBalanceToken(token, address);
        const balanceverify = await methodFn.call({ from: address })
        .then(async function (receipt: any) {
            const resultado =  web3.utils.fromWei(receipt,'ether');
            return resultado;
        });
        return Promise.resolve(balanceverify).then((x:string) => {return x})
    }

    const onSubmit = useCallback(async () => {

        const result: number = +(await metodofn(window.ethereum));
        console.log('type agreementID', type, 'result balance', result);
        if(result > 1){
            dispatch(doSetAgreementFormInfo({ createdAt: new Date().toDateString() }));
            dispatch(
                doCreateAgreement({
                    signatoryA: addr,
                    signatoryB: agreementFormInfo.counterpartyWallet,
                    validUntil: 0,
                    agreementFormTemplateId: type,
                    agreementForm: agreementFormInfo,
                    template: renderToString(agreementTemplate()),
                    slideNext: slideNext,
                    slideBack: slideBack
                })
            );
        }
        else{
            alert("You have not enough balance to perform this action");
        }
	}, [type, currentWallet, agreementFormInfo, agreementTemplate, dispatch, slideNext, slideBack]);

    useEffect(() => {
        const templateData = getContractTemplate(type);
        const data: any = {
            ...smartAgreementsState[templateData.dataName]
        };
        for (const key in data) {
            data[key] = getDataInfo(key) ?? data[key];
        }

        setAgreementDocument(templateData.template);
        setAgreementData(data);
    }, [type, smartAgreementsState, getDataInfo]);
    
    return (
        <div className="agreement-content">
            <IonToolbar className="agreement-preview-toolbar">
                <IonTitle className="agreement-form-title">Preview Document</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => {
                        setShowEditPopover(true)
                    }}>
                        edit
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonItem class="form-options preview-document">
                {
                    agreementTemplate()
                }
            </IonItem>
            <IonPopover
                mode="md"
                translucent={false}
                isOpen={showEditPopover}
                cssClass="agreements-popover"
                onDidDismiss={() => setShowEditPopover(false)}
            >
                <IonItem class="form-options">
                    <SmartAgreementsForm type={type} onClose={() => setShowEditPopover(false)} />
                </IonItem>
            </IonPopover>
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