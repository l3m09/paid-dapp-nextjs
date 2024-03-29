interface ConsultingAgreementData {
  partyName: string;
  partyEmail: string;
  partyAddress: string;
  partyWallet: string;
  date: string;
  counterPartyName: string;
  counterPartyEmail: string;
  counterPartyAddress: string;
  counterPartyWallet: string;
  state: string;
  typeOfCompany: string;
  descriptionConsulting: string;
  serviceRenderChecked: boolean;
  serviceRender: string;
  serviceRate: number;
  servicePayable: string;
  serviceAmountLimit: number;
  consultantChecked: boolean;
  consultanShall: string;
  consultantExecutionAmount: number;
  consultantCompletionAmount: number;
  companyWillChecked: boolean;
  companyWillRecommend: string;
  companyShares: string;
  companyFollows: string;
  otherChecked: boolean;
  other: string;
  companiesExcluded: string;
  listCompanies: string;
}

export default ConsultingAgreementData;
