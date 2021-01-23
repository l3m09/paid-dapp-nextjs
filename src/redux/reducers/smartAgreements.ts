import ActionModel from "../../models/ActionModel";
import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

interface SmartAgreementsState {
    advisorAgreementData: AdvisorAgreementData;
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
        anniversaryMonth: "[ANNIVERSARY MONTH]",
        vestingCommencement: "[VESTING COMMENCEMENT]",
        typeOfTriggerAcceleration: '[TYPE OF TRIGGER ACCELERATION]',
        typeOfPrice: '[TYPE OF PRICE]',
        acceptionOption: '[ACCEPTING OPTION]',
        numberOfYears: '[NUMBER OF YEARS]'
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
        default:
            return { ...state };
    }
}