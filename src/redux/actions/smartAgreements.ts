import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

export const doSetAdvisorAgreementData = (payload: AdvisorAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA,
        payload
    });
}