import AgreementModel from './agreementModel';

interface AgreementStateModel {
  agreements: AgreementModel[];
  loading: boolean;
  error: string;
  currentAgreement: any,
  isEditing: boolean,
  agreementReviewed: boolean
}

export default AgreementStateModel;
