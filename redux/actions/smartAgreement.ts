import AdvisorAgreementData from '../../models/advisorAgreementData';
import CiiaAgreementData from '../../models/ciiaAgreementData';
// import ConsultingAgreementData from "../../models/consultingAgreementData";
import NdaAgreementData from '../../models/ndaAgreementData';
// import ReferralAgreementData from "../../models/ReferralAgreementData";
// import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from '../actionTypes/smartAgreements';

export const doSetNdaAgreementData = (payload: NdaAgreementData) => (dispatch: any) => {
  dispatch({
    type: SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA,
    payload,
  });
}

export const doSetAdvisorAgreementData = (payload: AdvisorAgreementData) => (dispatch: any) => {
  dispatch({
    type: SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA,
    payload,
  });
}

export const doSetCiiaAgreementData = (payload: CiiaAgreementData) => (dispatch: any) => {
  dispatch({
    type: SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA,
    payload,
  });
}

// export const doSetConsultingAgreementData = (payload: ConsultingAgreementData) => (dispatch: any) => {
//     dispatch({
//         type: SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA,
//         payload
//     });
// }

// export const doSetReferralAgreementData = (payload: ReferralAgreementData) => (dispatch: any) => {
//     dispatch({
//         type: SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA,
//         payload
//     });
// }

// export const doSetSaftAgreementData = (payload: SaftAgreementData) => (dispatch: any) => {
//     dispatch({
//         type: SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA,
//         payload
//     });
// }

export const doSetSmartAgreementData = (payload: any) => (dispatch: any) => {
  const { type, formData } = payload;
  const mapTypeToComponent = new Map([
    ['advisoragreement', SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA],
    ['ciia', SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA],
    ['consultingagreement', SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA],
    ['referalagreement', SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA],
    ['saftagreement', SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA],
  ]);

  dispatch({
    type: mapTypeToComponent.get(type),
    payload: formData,
  });
}
