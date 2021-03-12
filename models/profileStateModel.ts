import ProfileModel from './profileModel';

interface ProfileStateModel {
  profile: ProfileModel;
  loading: boolean;
  error: string;
}

export default ProfileStateModel;
