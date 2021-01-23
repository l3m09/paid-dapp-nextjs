import { IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonSlide, IonSlides } from '@ionic/react';
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReferralAgreementData from '../../../../models/ReferralAgreementData';
import { doSetReferralAgreementData } from '../../../../redux/actions/smartAgreements';

const SlideFirst: FC<{
    typeOfCompany: string;
    terminationDate: string;
    stateOfCompany: string;
    setter: any;
}> = ({ typeOfCompany, terminationDate, stateOfCompany, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Type Of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a type of company"
                value={typeOfCompany}
                name="typeOfCompany"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Termination Date</IonLabel>
            <IonDatetime
                displayFormat="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                name="terminationDate"
                value={terminationDate}
                onIonChange={setter}
            >
            </IonDatetime>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">State Of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={stateOfCompany}
                name="stateOfCompany"
                onInput={setter}
            />
        </IonItem>
        <br />
    </>);
};

const SlideSecond: FC<{
    county: string;
    commision: string;
    commisionDate: string;
    setter: any;
}> = ({ county, commision, commisionDate, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">County</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a county"
                value={county}
                name="county"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Commision</IonLabel>
            <IonInput
                title="Label"
                type="number"
                placeholder="Enter a commision"
                inputMode="numeric"
                min="1"
                max="100"
                value={commision}
                name="commision"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Commision End Date</IonLabel>
            <IonDatetime
                displayFormat="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                value={commisionDate}
                name="commisionDate"
                onIonChange={setter}
            >
            </IonDatetime>
        </IonItem>
    </>);
};

const ReferralAgreementForm: FC<{
    onClose: any
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const smartAgreementsState = useSelector(
        (state: {
            smartAgreements: {
                referralAgreementData: ReferralAgreementData
            }
        }) => state.smartAgreements
    );
    const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const { referralAgreementData } = smartAgreementsState;

    const {
        typeOfCompany,
        terminationDate,
        stateOfCompany,
        county,
        commision,
        commisionDate
    } = referralAgreementData;

    const slideFirst = {
        typeOfCompany,
        terminationDate,
        stateOfCompany
    };

    const slideSecond = {
        county,
        commision,
        commisionDate
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
            referralAgreementData[name] = value;
            dispatch(doSetReferralAgreementData({
                ...referralAgreementData
            }));
        },
        []
    );

    const slideNext = async () => {
        if (isLastSlide) {
            onClose();
            return;
        }
        const numberOfSlides = 2;
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

export default ReferralAgreementForm;