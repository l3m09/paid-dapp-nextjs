import { IonButton, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonSlide, IonSlides } from '@ionic/react';
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaftAgreementData from '../../../../models/SaftAgreementData';
import { doSetSaftAgreementData } from '../../../../redux/actions/smartAgreements';

const SlideFirst: FC<{
    purchaseAmount: string;
    jurisdiction: string;
    tokenAmount: string;
    typeOfCompany: string;
    setter: any;
}> = ({ purchaseAmount, jurisdiction, tokenAmount, typeOfCompany, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Purchase amount</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a purchase amount"
                inputMode="numeric"
                min="1"
                max="100"
                value={purchaseAmount}
                name="purchaseAmount"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Jurisdiction (Non U.S.)</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a jurisdiction"
                value={jurisdiction}
                name="jurisdiction"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Token amount</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a token amount"
                inputMode="numeric"
                min="1"
                max="100"
                value={tokenAmount}
                name="tokenAmount"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Type of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a jurisdiction"
                value={typeOfCompany}
                name="typeOfCompany"
                onInput={setter}
            />
        </IonItem>
    </>);
};

const SlideSecond: FC<{
    discountRate: string;
    website: string;
    paymentOption: string;
    setter: any;
}> = ({ discountRate, website, paymentOption, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Discount Rate %</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a percentage"
                inputMode="numeric"
                min="1"
                max="100"
                value={discountRate}
                name="discountRate"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Website</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a jurisdiction"
                value={website}
                name="website"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonRadioGroup name="paymentOption" value={paymentOption} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Payment Options</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>U.S. Dollars</IonLabel>
                    <IonRadio slot="start" color="primary" value="dollar"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Ethereum</IonLabel>
                    <IonRadio slot="start" color="primary" value="eth"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Bitcoin</IonLabel>
                    <IonRadio slot="start" color="primary" value="btc"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
    </>);
};

const SlideThird: FC<{
    paymentOption: string;
    bankName: string;
    address: string;
    aba: string;
    payeeAccount: string;
    payeeAccountName: string;
    ethereum: string;
    bitcoin: string;
    setter: any;
}> = ({ paymentOption, bankName, address, aba, payeeAccount, payeeAccountName, ethereum, bitcoin, setter }) => {
    return(<>
        {
            paymentOption === 'dollar' &&
            <>
                <IonItem>
                    <IonLabel position="stacked">Bank Name</IonLabel>
                    <IonInput
                        title="Label"
                        type="text"
                        placeholder="Enter a bank name"
                        value={bankName}
                        name="bankName"
                        onInput={setter}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Address</IonLabel>
                    <IonInput
                        title="Label"
                        type="text"
                        placeholder="Enter a address"
                        value={address}
                        name="address"
                        onInput={setter}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">ABA#</IonLabel>
                    <IonInput
                        title="Label"
                        type="text"
                        placeholder="Enter an aba#"
                        value={aba}
                        name="aba"
                        onInput={setter}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Payee Account #</IonLabel>
                    <IonInput
                        title="Label"
                        type="text"
                        placeholder="Enter a payee account #"
                        value={payeeAccount}
                        name="payeeAccount"
                        onInput={setter}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Payee Account Name</IonLabel>
                    <IonInput
                        title="Label"
                        type="text"
                        placeholder="Enter a payee account name"
                        value={payeeAccountName}
                        name="payeeAccountName"
                        onInput={setter}
                    />
                </IonItem>
            </>
        }
        {
            paymentOption === 'eth' &&
            <IonItem>
                <IonLabel position="stacked">Ethereum address</IonLabel>
                <IonInput
                    title="Label"
                    type="text"
                    placeholder="Enter a ethereum address"
                    value={ethereum}
                    name="ethereum"
                    onInput={setter}
                />
            </IonItem>
        }
        {
            paymentOption === 'btc' &&
            <IonItem>
                <IonLabel position="stacked">Bitcoin address</IonLabel>
                <IonInput
                    title="Label"
                    type="text"
                    placeholder="Enter a bitcoin address"
                    value={bitcoin}
                    name="bitcoin"
                    onInput={setter}
                />
            </IonItem>
        }
    </>);
};

const SaftAgreementForm: FC<{
    onClose: any
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const smartAgreementsState = useSelector(
        (state: {
            smartAgreements: {
                saftAgreementData: SaftAgreementData
            }
        }) => state.smartAgreements
    );
    const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const { saftAgreementData } = smartAgreementsState;

    const {
        purchaseAmount,
        jurisdiction,
        tokenAmount,
        typeOfCompany,
        discountRate,
        website,
        paymentOption,
        bankName,
        address,
        aba,
        payeeAccount,
        payeeAccountName,
        ethereum,
        bitcoin
    } = saftAgreementData;

    const slideFirst = {
        purchaseAmount,
        jurisdiction,
        tokenAmount,
        typeOfCompany
    };

    const slideSecond = {
        discountRate,
        website,
        paymentOption,
    };

    const slideThird = {
        paymentOption,
        bankName,
        address,
        aba,
        payeeAccount,
        payeeAccountName,
        ethereum,
        bitcoin
    };

    const slideOptions = {
        initialSlide: 0,
		speed: 400,
        slidesPerView: 1,
        autoHeight: true,
		centeredSlides: true,
		centeredSlidesBounds: true
    }

    useEffect(
        () => {
            const bootstrapAsync = async () => {
                await slidesRef.current?.update();
                await slidesRef.current?.lockSwipeToPrev(true);
                await slidesRef.current?.lockSwipeToNext(true);
            }

            bootstrapAsync();
        },
        [slidesRef]
    );

    const setter = useCallback(
        (event: FormEvent<HTMLIonInputElement>) => {
            const { currentTarget } = event;
            const { name, value } = currentTarget;
            saftAgreementData[name] = value;
            dispatch(doSetSaftAgreementData({
                ...saftAgreementData
            }));
        },
        []
    );

    const slideNext = async () => {
        if (isLastSlide) {
            onClose();
            return;
        }
        const numberOfSlides = 3;
        await slidesRef.current?.lockSwipeToNext(false);
		await slidesRef.current?.slideNext();
        await slidesRef.current?.lockSwipeToNext(true);
        setIsFirstSlide(false);
        setIsLastSlide(await slidesRef.current?.getActiveIndex() === (numberOfSlides - 1));
    };

    const slideBack = async () => {
        const indexFirstSlide = 0;
        await slidesRef.current?.lockSwipeToPrev(false);
        await slidesRef.current?.slidePrev();
        await slidesRef.current?.lockSwipeToPrev(true);
        setIsLastSlide(false);
        setIsFirstSlide(await slidesRef.current?.getActiveIndex() === indexFirstSlide);
    };

    return(
        <div className="smart-agreements-form">
            <IonSlides pager={false} options={slideOptions} ref={slidesRef}>
                <IonSlide>
                    <SlideFirst {...slideFirst} setter={setter} />
                </IonSlide>
                <IonSlide>
                    <SlideSecond {...slideSecond} setter={setter} />
                </IonSlide>
                <IonSlide>
                    <SlideThird { ...slideThird} setter={setter} />
                </IonSlide>
            </IonSlides>
            <IonItem class="form-options">
					<IonButton
						color="danger"
						shape="round"
                        onClick= { () => slideBack() }
                        disabled={isFirstSlide}
					>
					 Back
					</IonButton>
					<IonButton
						// routerLink="/phrase/instructions"
						onClick={() => {
							slideNext();
						}}
						color="gradient"
                        shape="round"
					>
						{ isLastSlide ? 'Close' : 'Next' }
					</IonButton>
				</IonItem>
        </div>
    );
};

export default SaftAgreementForm;