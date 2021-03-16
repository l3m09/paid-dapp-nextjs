interface dataAgreementModel {
  documentName: string;
  counterpartyName: string,
  agreementForm?: object,
  agreementFormTemplateId?: string;
  escrowed?: string;
  validUntil?: string;
  toSigner?: string;
  fromSigner?: string;
  fileString?: string;
}

export default dataAgreementModel;
