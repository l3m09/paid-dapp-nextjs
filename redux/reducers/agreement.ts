import ActionModel from '../../models/actionModel';
import AgreementStateModel from '../../models/agreementStateModel';
import AgreementActionTypes from '../actionTypes/agreement';

const initialState: AgreementStateModel = {
  agreements: [],
  loading: false,
  error: '',
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
      };
    }
    default:
      return { ...state };
  }
};

export default agreementReducer;
