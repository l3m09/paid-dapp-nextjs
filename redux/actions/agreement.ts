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

export const setAgreementExists = (agreementExists: boolean) => (dispatch: any) => {
  dispatch({
    type: AgreementActionTypes.SET_AGREEMENT_EXIST,
    payload: { agreementExists },
  });
};

export default loadAgreements;
