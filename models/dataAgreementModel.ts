interface dataAgreementModel {
  documentName: string;
  counterpartyName: string,
  agreementForm?: object,
  agreementFormTemplateId?: string;
  escrowed?: string;
  validUntil?: string;
  toSigner?: string;
  fromSigner?: string;
}

export default dataAgreementModel;
