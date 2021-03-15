import ProfileModel from '../../models/profileModel';
import ProfileActionTypes from '../actionTypes/profile';

const doSetProfile = (profile: ProfileModel) => (dispatch: any) => {
  dispatch({ type: ProfileActionTypes.SET_PROFILE_DATA, payload: profile });
};

export default doSetProfile;
