/* eslint-disable import/no-unresolved */
import AdvisorAgreementData from '@/models/advisorAgreementData';
import CiiaAgreementData from '@/models/ciiaAgreementData';
import ConsultingAgreementData from '@/models/consultingAgreementData';
import NdaAgreementData from '@/models/ndaAgreementData';
import ReferralAgreementData from '@/models/referralAgreementData';
import SaftAgreementData from '@/models/saftAgreementData';
import SmartAgreementsTypes from '../actionTypes/smartAgreements';

export const doSetNdaAgreementData = (payload: NdaAgreementData) => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA,
    payload,
  });
};

export const doSetAdvisorAgreementData = (payload: AdvisorAgreementData) => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA,
    payload,
  });
};

export const doSetCiiaAgreementData = (payload: CiiaAgreementData) => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA,
    payload,
  });
};

export const doSetConsultingAgreementData = (
  payload: ConsultingAgreementData,
) => (dispatch: any) => {
  dispatch({
    type: SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA,
    payload,
  });
};

export const doSetReferralAgreementData = (payload: ReferralAgreementData) => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA,
    payload,
  });
};

export const doSetSaftAgreementData = (payload: SaftAgreementData) => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA,
    payload,
  });
};

export const resetTemplateAgreement = () => (
  dispatch: any,
) => {
  dispatch({
    type: SmartAgreementsTypes.RESET_AGREEMENT_TEMPLATE,
  });
};

export const doSetSmartAgreementData = (payload: any) => (dispatch: any) => {
  const { type, formData } = payload;
  const mapTypeToComponent = new Map([
    ['nda', SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA],
    ['advisor', SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA],
    ['ciia', SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA],
    ['consulting', SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA],
    ['referral', SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA],
    ['saft', SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA],
  ]);

  dispatch({
    type: mapTypeToComponent.get(type),
    payload: formData,
  });
};
