import agreementsData from '../../data/agreements';
import AgreementActionTypes from '../actionTypes/agreement';

const loadAgreements = () => (dispatch: any) => {
  dispatch({
    type: AgreementActionTypes.LOAD_AGREEMENTS,
    payload: { agreements: agreementsData },
  });
};

export default loadAgreements;
