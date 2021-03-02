import ProfileModel from './profileModel'

export default interface ProfileStateModel {
  profile: ProfileModel;
  loading: boolean;
  error: string;
}
