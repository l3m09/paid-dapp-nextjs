export const columnsAgreement = [
  {
    Header: 'Counterparty',
    accessor: 'name',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
  },
  {
    Header: 'Created',
    accessor: 'createdDate',
  },
  {
    Header: 'SignedOn',
    accessor: 'signedOn',
  },
];

// no-unused-vars
export enum agreementStatus {
  PENDING = 1,
  DECLINED = 2,
  SIGNED = 3,
}

export const PARTY_NAME_FIELD = 'partyName';
export const PARTY_EMAIL_FIELD = 'partyEmail';
export const PARTY_ADDRESS_FIELD = 'partyAddress';
export const PARTY_WALLET_FIELD = 'partyWallet';
export const AGREEMENT_CREATE_DATE_FIELD = 'createDate';
