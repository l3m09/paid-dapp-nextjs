import ActionModel from "../../models/ActionModel";
import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import ReferralAgreementData from "../../models/ReferralAgreementData";
import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

interface SmartAgreementsState {
    advisorAgreementData: AdvisorAgreementData;
    referralAgreementData: ReferralAgreementData;
    saftAgreementData: SaftAgreementData;
};

const initialState: SmartAgreementsState = {
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
        stockPlanName: '[STOCK PLAN NAME]',
        percentageVest: '[VEST%]',
        purchaseOption: '[PURCHASE OPTION]',
        numberOfShares: '[NUMBER OF SHARES]',
        stockPlanNameValue: '[STOCK PLAN NAME VALUE]',
        termsConditions: '[TERMS CONDITIONS]',
        anniversaryMonth: '[ANNIVERSARY MONTH]',
        vestingCommencement: '[VESTING COMMENCEMENT]',
        typeOfTriggerAcceleration: '[TYPE OF TRIGGER ACCELERATION]',
        typeOfPrice: '[TYPE OF PRICE]',
        acceptionOption: '[ACCEPTING OPTION]',
        numberOfYears: '[NUMBER OF YEARS]'
    },
    referralAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        typeOfCompany:'[TYPE OF COMPANY]',
        terminationDate: '[TERMINATION DATE]',
        stateOfCompany:'[STATE OF COMPANY]',
        geographicState:'[GEOGRAPHIC SATE]',
        county:'[COUNTY]',
        commision:'[COMMISION]',
        commisionDate:'[COMMISION DATE]'
    },
    saftAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        purchaseAmount: '[PURCHASE AMOUNT]',
        jurisdiction: '[JURISDICTION (NON US)]',
        tokenAmount: '[TOKEN AMOUNT]',
        typeOfCompany: '[TYPE OF COMPANY]',
        discountRate: '[DISCOUNT RATE]',
        website: '[WEBSITE]',
        paymentOption: 'dollar',
        bankName: '',
        address: '',
        aba: '',
        payeeAccount: '',
        payeeAccountName: '',
        ethereum: '',
        bitcoin: ''
    }
}

export const SmartAgreementsReducer = function (
    state: SmartAgreementsState = initialState,
    action: ActionModel
) {
    const { type, payload } = action;

    switch (type) {
        case SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA:
            const newAdvisorData = payload;
            return {
                ...state,
                advisorAgreementData: {
                    ...state.advisorAgreementData,
                    ...newAdvisorData
                }
            };
        case SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA:
            const newReferralData = payload;
            return {
                ...state,
                referralAgreementData: {
                    ...state.referralAgreementData,
                    ...newReferralData
                }
            };
        default:
            return { ...state };
    }
}