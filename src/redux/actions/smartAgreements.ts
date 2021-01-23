import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import ReferralAgreementData from "../../models/ReferralAgreementData";
import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

export const doSetAdvisorAgreementData = (payload: AdvisorAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA,
        payload
    });
}

export const doSetReferralAgreementData = (payload: ReferralAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA,
        payload
    });
}

export const doSetSaftAgreementData = (payload: SaftAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA,
        payload
    });
}