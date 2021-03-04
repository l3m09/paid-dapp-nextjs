export const columnsAgreement = [
  {
    Header: 'Name',
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
