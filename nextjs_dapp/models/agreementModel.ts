export default interface AgreementModel {
    id: number;
    name: string;
    title?: string;
    lastModified?: string;
    createdDate?: string;
    signedOn?: string;
    status?: number;
}
