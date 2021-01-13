import {Nda} from "./nda.html"
import {AdvisorAgreem} from "./advisor-agreem.html"
import {Ciia} from "./ciia.html"
import {ConsultingAgreement} from "./consulting-agreement.html"
import {ReferalAgreement} from "./referral-agreement.html"
import {Saft} from "./saft.html"

enum contractsTemplates {
    TemplateNda = "Nda",
    TemplateAdvisorAgreem = "AdvisorAgreem",
    TemplateCiia = "Ciia",
    TemplateConsultingAgreement = "ConsultingAgreement",
    TemplateReferalAgreement = "ReferalAgreement",
    TemplateSaft = "ConsultingAgreement",
}

const findElementsInterpolation = (html:String) : Array<String> => {
    let listElements = []
    let regexExp = /\{\{[a-zA-Z]+\}\}/gi
    

    return listElements
}  

export const getContractTemplate = (contractName:String) :Object => {
    let contractTemplate 
    try {
        switch (contractName) {
            case contractsTemplates.TemplateNda:
                contractTemplate = Nda
                break;
        
            case contractsTemplates.TemplateAdvisorAgreem:
                contractTemplate = AdvisorAgreem
                break;
        
            case contractsTemplates.TemplateCiia:
                contractTemplate = Ciia
                break;
        
            case contractsTemplates.TemplateConsultingAgreement:
                contractTemplate = ConsultingAgreement
                break;
        
            case contractsTemplates.TemplateReferalAgreement:
                contractTemplate = ReferalAgreement
                break;
        
            case contractsTemplates.TemplateSaft:
                contractTemplate = Saft
                break;
        
            default:
                throw new Error("No template Found");
        }
        return {
            listInterpolation: [],
            template: contractTemplate
        };
    } catch (error) {
        throw error;
    }
}