import dataAgreementModel from './dataAgreementModel';
import EventAgreementModel from './eventAgreementModel';

// interface AgreementModel {
//     id: number;
//     name: string;
//     title?: string;
//     lastModified?: string;
//     createdDate?: string;
//     signedOn?: string;
//     status?: number;
// }

interface AgreementModel {
    logIndex?: number;
    transactionIndex?: number,
    transactionHash?: string;
    blockHash?: string;
    blockNumber?: number;
    address?: object;
    event: EventAgreementModel;
    data?: dataAgreementModel;
}

export default AgreementModel;
