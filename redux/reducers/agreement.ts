import ActionModel from '../../models/actionModel';
import AgreementStateModel from '../../models/agreementStateModel';
import AgreementActionTypes from '../actionTypes/agreement';

const initialState: AgreementStateModel = {
  agreements: [],
  loading: false,
  error: '',
  currentAgreement: null,
  isEditing: false,
  agreementReviewed: false,
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
        isEditing: false,
        agreementReviewed: false,
      };
    }
    case AgreementActionTypes.SET_IS_EDITING: {
      return {
        ...state,
        isEditing: payload.isEditing,
      };
    }
    case AgreementActionTypes.SET_AGREEMENT_REVIEWED: {
      return {
        ...state,
        agreementReviewed: payload.agreementReviewed,
      };
    }
    case AgreementActionTypes.CREATE_AGREEMENT: {
      return {
        ...state,
        agreements: [...state.agreements, payload.newAgreement],
      };
    }
    default:
      return { ...state };
  }
};

export default agreementReducer;
