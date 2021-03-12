import AgreementModel from './agreementModel';

interface AgreementStateModel {
  agreements: AgreementModel[];
  loading: boolean;
  error: string;
}

export default AgreementStateModel;
