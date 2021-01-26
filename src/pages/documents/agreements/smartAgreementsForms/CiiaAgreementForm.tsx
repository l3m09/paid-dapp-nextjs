import { IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonSlide, IonSlides, IonTextarea } from '@ionic/react';
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CiiaAgreementData from '../../../../models/CiiaAgreementData';
import { doSetCiiaAgreementData } from '../../../../redux/actions/smartAgreements';

const SlideFirst: FC<{
    effectiveDate: string;
    companyState: string;
    stateConsultant: string;
    typeOfCompanyConsultant: string;
    setter: any;
}> = ({ effectiveDate, companyState, stateConsultant, typeOfCompanyConsultant, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Effective Date</IonLabel>
            <IonDatetime
                displayFormat="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                max="2999"
                name="effectiveDate"
                value={effectiveDate}
                onIonChange={setter}
                mode="md"
            >
            </IonDatetime>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Company State</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={companyState}
                name="companyState"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">State</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={stateConsultant}
                name="stateConsultant"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Type of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a type of company"
                value={typeOfCompanyConsultant}
                name="typeOfCompanyConsultant"
                onInput={setter}
            />
        </IonItem>
        <br />
    </>);
};

const SlideSecond: FC<{
    title: string;
    datea: string;
    idNumberBriefDesc: string;
    stateCompany: string;
    setter: any;
}> = ({ title, datea, idNumberBriefDesc, stateCompany, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a title"
                value={title}
                name="title"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
                displayFormat="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                max="2999"
                name="datea"
                value={datea}
                onIonChange={setter}
                mode="md"
            >
            </IonDatetime>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Identifying # or Brief Desc.</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a id or desc"
                value={idNumberBriefDesc}
                name="idNumberBriefDesc"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">State</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={stateCompany}
                name="stateCompany"
                onInput={setter}
            />
        </IonItem>
        <br />
    </>);
};

const SlideThird: FC<{
    typeOfComapny: string;
    listCompAgreements: string;
    setter: any;
}> = ({ typeOfComapny, listCompAgreements, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">Type of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a type of company"
                value={typeOfComapny}
                name="typeOfComapny"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">
                List of companies and/or agreements excluded under section 10(b)
            </IonLabel>
            <IonTextarea
                title="Label"
                placeholder="Enter a list of companies and/or agreements"
                rows={20}
                value={listCompAgreements}
                name="listCompAgreements"
                onInput={setter}
            />
        </IonItem>
        <br />
    </>);
};

const CiiaAgreementForm: FC<{
    onClose: any
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const smartAgreementsState = useSelector(
        (state: {
            smartAgreements: {
                ciiaAgreementData: CiiaAgreementData
            }
        }) => state.smartAgreements
    );
    const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const { ciiaAgreementData } = smartAgreementsState;

    const {
        effectiveDate,
        companyState,
        stateConsultant,
        typeOfCompanyConsultant,
        title,
        datea,
        idNumberBriefDesc,
        stateCompany,
        typeOfComapny,
        listCompAgreements
    } = ciiaAgreementData;

    const slideFirst = {
        effectiveDate,
        companyState,
        stateConsultant,
        typeOfCompanyConsultant
    };

    const slideSecond = {
        title,
        datea,
        idNumberBriefDesc,
        stateCompany
    };

    const slideThird = {
        typeOfComapny,
        listCompAgreements
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
            ciiaAgreementData[name] = value;
            dispatch(doSetCiiaAgreementData({
                ...ciiaAgreementData
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

export default CiiaAgreementForm;