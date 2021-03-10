import ActionModel from "../../models/actionModel";
import AdvisorAgreementData from "../../models/advisorAgreementData";
import CiiaAgreementData from "../../models/ciiaAgreementData";
// import ConsultingAgreementData from "../../models/consultingAgreementData";
import NdaAgreementData from "../../models/ndaAgreementData";
// import ReferralAgreementData from "../../models/ReferralAgreementData";
// import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

interface SmartAgreementsState {
    ndaAgreementData: NdaAgreementData;
    advisorAgreementData: AdvisorAgreementData;
    ciiaAgreementData: CiiaAgreementData;
    // consultingAgreementData: ConsultingAgreementData;
    // referralAgreementData: ReferralAgreementData;
    // saftAgreementData: SaftAgreementData;
};

const initialState: SmartAgreementsState = {
    ndaAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________'
    },
    advisorAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        state: '[STATE]',
        typeOfCompany: '[TYPE OF COMPANY]',
        stockPlanName: '',
        percentageVest: '',
        purchaseOption: 'A Right',
        numberOfShares: '1',
        stockPlanNameValue: 'Stock option',
        termsConditions: 'Options',
        anniversaryMonth: '',
        vestingCommencement: '',
        typeOfTriggerAcceleration: 'Single Trigger Acceleration...',
        typeOfPrice: 'Exersice',
        acceptionOption: 'An Option',
        numberOfYears: ''
    },
    ciiaAgreementData: {
        partyName: '',
        partyEmail: '',
        partyAddress: '',
        partyWallet: '',
        date: '',
        counterPartyName: '',
        counterPartyEmail: '',
        counterPartyAddress: '',
        counterPartyWallet: '',
        effectiveDate: '',
        companyState: '',
        stateConsultant: '',
        typeOfCompanyConsultant: '',
        title: '',
        datea: '',
        idNumberBriefDesc: '',
        stateCompany: '',
        typeOfComapny: '',
        listCompAgreements: ''
    },
    // consultingAgreementData: {
    //     partyName: '[________]',
    //     partyEmail: '________',
    //     partyAddress: '________',
    //     partyWallet: '________',
    //     date: '________',
    //     counterPartyName: '________',
    //     counterPartyEmail: '________',
    //     counterPartyAddress: '________',
    //     counterPartyWallet: '________',
    //     state: '[STATE]',
    //     typeOfCompany: '[TYPE OF COMPANY]',
    //     descriptionConsulting: '[DESCRIPTION CONSULTING SERVICES]',
    //     serviceRenderChecked: false,
    //     serviceRender:'',
    //     serviceRate: 0,
    //     servicePayable: '',
    //     serviceAmountLimit: 0,
    //     consultantChecked: false,
    //     consultanShall: '',
    //     consultantExecutionAmount: 0,
    //     consultantCompletionAmount: 0,
    //     companyWillChecked: false,
    //     companyWillRecommend: '',
    //     companyShares: '',
    //     companyFollows : '',
    //     otherChecked: false,
    //     other: '',
    //     companiesExcluded: '___',
    //     listCompanies: ''
    // },
    // referralAgreementData: {
    //     partyName: '[________]',
    //     partyEmail: '________',
    //     partyAddress: '________',
    //     partyWallet: '________',
    //     date: '________',
    //     counterPartyName: '________',
    //     counterPartyEmail: '________',
    //     counterPartyAddress: '________',
    //     counterPartyWallet: '________',
    //     typeOfCompany: '',
    //     terminationDate: undefined,
    //     stateOfCompany: '',
    //     geographicState: '',
    //     county: '',
    //     commision: 0,
    //     commisionDate: undefined
    // },
    // saftAgreementData: {
    //     partyName: '',
    //     partyEmail: '',
    //     partyAddress: '',
    //     partyWallet: '',
    //     date: '',
    //     counterPartyName: '',
    //     counterPartyEmail: '',
    //     counterPartyAddress: '',
    //     counterPartyWallet: '',
    //     purchaseAmount: 0,
    //     jurisdiction: '',
    //     tokenAmount: 0,
    //     typeOfCompany: '',
    //     discountRate: 0,
    //     website: '',
    //     paymentOption: 'dollar',
    //     bankName: '',
    //     address: '',
    //     aba: '',
    //     payeeAccount: '',
    //     payeeAccountName: '',
    //     ethereum: '',
    //     bitcoin: ''
    // }
}

export const smartAgreementsReducer = function (
    state: SmartAgreementsState = initialState,
    action: ActionModel
) {
    const { type, payload } = action;

    switch (type) {
        case SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA:
            const newNdaData = payload;
            return {
                ...state,
                ndaAgreementData: {
                    ...state.ndaAgreementData,
                    newNdaData
                }
            };
        case SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA:
            const newAdvisorData = payload;
            return {
                ...state,
                advisorAgreementData: {
                    ...state.advisorAgreementData,
                    ...newAdvisorData
                }
            };
        case SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA:
            const newCiiaData = payload;
            return {
                ...state,
                ciiaAgreementData: {
                    ...state.ciiaAgreementData,
                    ...newCiiaData
                }
            };
        // case SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA:
        //     const newConsultingData = payload;
        //     return {
        //         ...state,
        //         consultingAgreementData: {
        //             ...state.consultingAgreementData,
        //             ...newConsultingData
        //         }
        //     };
        // case SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA:
        //     const newReferralData = payload;
        //     return {
        //         ...state,
        //         referralAgreementData: {
        //             ...state.referralAgreementData,
        //             ...newReferralData
        //         }
        //     };
        // case SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA:
        //     const newSaftData = payload;
        //     return {
        //         ...state,
        //         saftAgreementData: {
        //             ...state.saftAgreementData,
        //             ...newSaftData
        //         }
        //     };
        default:
            return { ...state };
    }
}