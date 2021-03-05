import  agreementsData from '../../data/agreements'
import AgreementActionTypes from '../actionTypes/agreement'

const loadAgreements = () => (dispatch: any) => {
  dispatch({ type: AgreementActionTypes.LOAD_AGREEMENTS, payload: agreementsData })
}

export default loadAgreements;
