import AgreementModel from './agreementModel';

interface AgreementStateModel {
  agreements: AgreementModel[];
  loading: boolean;
  error: string;
  currentAgreement: any,
  isEditing: boolean,
  agreementExists: boolean
}

export default AgreementStateModel;
