import { IonButton, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonSlide, IonSlides } from '@ionic/react';
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdvisorAgreementData from '../../../../models/AdvisorAgreementData';
import { doSetAdvisorAgreementData } from '../../../../redux/actions/smartAgreements';

const SlideFirst: FC<{
    purchaseOption: string;
    numberOfShares: string;
    termsConditions: string;
    stockPlanName: string;
    setter: any;
}> = ({ purchaseOption, numberOfShares, termsConditions, stockPlanName, setter }) => {
    return(<>
        <IonItem>
            <IonRadioGroup name="purchaseOption" value={purchaseOption} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Purchase Option</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>A Nonstatutory Option</IonLabel>
                    <IonRadio slot="start" color="primary" value="A Nonstatutory Option"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>A Right</IonLabel>
                    <IonRadio slot="start" color="primary" value="A Right"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Number of shares</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a number of shares"
                inputMode="numeric"
                min="1"
                max="100"
                value={numberOfShares}
                name="numberOfShares"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonRadioGroup name="termsConditions" value={termsConditions} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Terms And Conditions</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>Options</IonLabel>
                    <IonRadio slot="start" color="primary" value="options"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Restricted stock purchase awards</IonLabel>
                    <IonRadio slot="start" color="primary" value="restricted stock purchase awards"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Stock Plan name</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a stock plan name"
                value={stockPlanName}
                name="stockPlanName"
                onInput={setter}
            />
        </IonItem>
    </>);
};

const SlideSecond: FC<{
    stockPlanNameValue: string;
    percentageVest: string;
    anniversaryMonth: string;
    vestingCommencement: string;
    setter: any;
}> = ({ stockPlanNameValue, percentageVest, anniversaryMonth, vestingCommencement, setter }) => {
    return(<>
        <IonItem>
            <IonRadioGroup name="stockPlanNameValue" value={stockPlanNameValue} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Stock Plan Name Value</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>Stock option</IonLabel>
                    <IonRadio slot="start" color="primary" value="stock option"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Restricted stock purchase</IonLabel>
                    <IonRadio slot="start" color="primary" value="restricted stock purchase"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Percentage Vest</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a percentage"
                inputMode="numeric"
                min="1"
                max="100"
                value={percentageVest}
                name="percentageVest"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Anniversary Month</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter the number of month"
                inputMode="numeric"
                min="1"
                max="12"
                value={anniversaryMonth}
                name="anniversaryMonth"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Vesting Commencement %</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a vesting commencement %"
                inputMode="numeric"
                min="1"
                max="100"
                value={vestingCommencement}
                name="vestingCommencement"
                onInput={setter}
            />
        </IonItem>
    </>);
};

const SlideThird: FC<{
    vestingCommencement: string;
    typeOfTriggerAcceleration: string;
    typeOfPrice: string;
    acceptionOption: string;
    numberOfYears: string;
    state: string;
    setter: any;
}> = ({ vestingCommencement, typeOfTriggerAcceleration, typeOfPrice, acceptionOption, numberOfYears, state, setter }) => {
    return(<>
        <IonItem>
            <IonRadioGroup name="typeOfTriggerAcceleration" value={typeOfTriggerAcceleration} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Type Of Trigger Acceleration</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>
                        {`Single Trigger Acceleration: Upon a Change of Control (as defined in the Stock Agreement or Plan), ${vestingCommencement}% of Advisor’s then unvested shares will immediately vest (i.e., single trigger acceleration).`}
                    </IonLabel>
                    <IonRadio slot="start" color="primary" value={`Single Trigger Acceleration:  Upon a Change of Control (as defined in the Stock Agreement or Plan), ${vestingCommencement}% of Advisor’s then unvested shares will immediately vest (i.e., single trigger acceleration).`}></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        {`Double Trigger Acceleration: If Advisor’s services are terminated by the Company in connection with or following the consummation of a Change of Control (as defined in the Stock Agreement or Plan), then ${vestingCommencement}% of Advisor’s then unvested shares will immediately vest (i.e., double trigger acceleration).`}
                    </IonLabel>
                    <IonRadio slot="start" color="primary" value={`Double Trigger Acceleration: If Advisor’s services are terminated by the Company in connection with or following the consummation of a Change of Control (as defined in the Stock Agreement or Plan), then ${vestingCommencement}% of Advisor’s then unvested shares will immediately vest (i.e., double trigger acceleration).`}></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonRadioGroup name="typeOfPrice" value={typeOfPrice} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Type Of Price</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>Exercise</IonLabel>
                    <IonRadio slot="start" color="primary" value="exercise"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Purchase</IonLabel>
                    <IonRadio slot="start" color="primary" value="purchase"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonRadioGroup name="acceptionOption" value={acceptionOption} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>Accepting Option</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>An option</IonLabel>
                    <IonRadio slot="start" color="primary" value="an option"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>A Right</IonLabel>
                    <IonRadio slot="start" color="primary" value="a Right"></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Number Of Years</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a number of years"
                inputMode="numeric"
                min="1"
                max="100"
                value={numberOfYears}
                name="numberOfYears"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">State</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={state}
                name="state"
                onInput={setter}
            />
        </IonItem>
    </>);
};

const AdvisorAgreementForm: FC<{
    onClose: any
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const smartAgreementsState = useSelector(
        (state: {
            smartAgreements: {
                advisorAgreementData: AdvisorAgreementData
            }
        }) => state.smartAgreements
    );
    const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const { advisorAgreementData } = smartAgreementsState;

    const {
        state,
        stockPlanName,
        percentageVest,
        purchaseOption,
        numberOfShares,
        stockPlanNameValue,
        termsConditions,
        anniversaryMonth,
        vestingCommencement,
        typeOfTriggerAcceleration,
        typeOfPrice,
        acceptionOption,
        numberOfYears
    } = advisorAgreementData;

    const slideFirst = {
        purchaseOption,
        numberOfShares,
        termsConditions,
        stockPlanName
    };

    const slideSecond = {
        stockPlanNameValue,
        percentageVest,
        anniversaryMonth,
        vestingCommencement
    };

    const slideThird = {
        vestingCommencement,
        typeOfTriggerAcceleration,
        typeOfPrice,
        acceptionOption,
        numberOfYears,
        state
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
            advisorAgreementData[name] = value;
            dispatch(doSetAdvisorAgreementData({
                ...advisorAgreementData
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

export default AdvisorAgreementForm;