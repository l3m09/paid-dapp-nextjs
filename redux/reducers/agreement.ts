import ActionModel from '../../models/actionModel';
import AgreementStateModel from '../../models/agreementStateModel';
import AgreementActionTypes from '../actionTypes/agreement';

const initialState: AgreementStateModel = {
  agreements: [],
  loading: false,
  error: '',
  currentAgreement: null,
  isEditing: false,
  agreementExists: false,
};

const agreementReducer = (
  state: AgreementStateModel = initialState,
  action: ActionModel,
) => {
  const { type, payload } = action;
  switch (type) {
    case AgreementActionTypes.LOAD_AGREEMENTS: {
      return {
        ...state,
        agreements: payload.agreements,
        isEditing: false,
        agreementExists: false,
      };
    }
    case AgreementActionTypes.SET_IS_EDITING: {
      return {
        ...state,
        isEditing: payload.isEditing,
      };
    }
    case AgreementActionTypes.SET_AGREEMENT_EXIST: {
      return {
        ...state,
        agreementExists: payload.agreementExists,
      };
    }
    default:
      return { ...state };
  }
};

export default agreementReducer;
