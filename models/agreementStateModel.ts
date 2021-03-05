import AgreementModel from './agreementModel'

export default interface AgreementStateModel {
  agreements: AgreementModel[];
  loading: boolean;
  error: string;
}
