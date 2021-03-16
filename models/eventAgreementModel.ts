interface EventAgreementModel {
  id: number;
  from?: number,
  to?: number,
  agreementFormTemplateId?: number;
  cid?: number;
  status?: number;
  signedOn?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default EventAgreementModel;
