import AgreementModel from '@/models/agreementModel';
import agreementsData from '../../data/agreements';
import AgreementActionTypes from '../actionTypes/agreement';

const loadAgreements = () => (dispatch: any) => {
  dispatch({
    type: AgreementActionTypes.LOAD_AGREEMENTS,
    payload: { agreements: agreementsData },
  });
};

export const setIsEditing = (isEditing: boolean) => (dispatch: any) => {
  dispatch({
    type: AgreementActionTypes.SET_IS_EDITING,
    payload: { isEditing },
  });
};

export const setAgreementReviewed = (agreementReviewed: boolean) => (
  dispatch: any,
) => {
  dispatch({
    type: AgreementActionTypes.SET_AGREEMENT_REVIEWED,
    payload: { agreementReviewed },
  });
};

export const createAgreement = (newAgreement: AgreementModel) => (
  dispatch: any,
) => {
  dispatch({
    type: AgreementActionTypes.CREATE_AGREEMENT,
    payload: { newAgreement },
  });
};

export const updateAgreement = (
  cid: number,
  agreementToUpdate: AgreementModel,
) => (dispatch: any) => {
  dispatch({
    type: AgreementActionTypes.UPDATE_AGREEMENT,
    payload: { cid, agreementToUpdate },
  });
};

export default loadAgreements;
