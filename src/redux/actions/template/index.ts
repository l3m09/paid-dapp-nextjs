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

interface contractTemplate {
    listInterpolation: Array<String>,
    template: String
}

const findElementsInterpolation = (html:String) : Array<String> => {
    let listElements : Array<String> = []
    let regexExp = /\{\{[a-zA-Z0-9]+\}\}/gi
    html.match(regexExp)?.forEach(element => {
        let value = element.replace(/[^a-z0-9]/gi,"")
        if (listElements.indexOf(value) < 0){
            listElements.push(value)
        }
    });
    return listElements
}  

export const getContractTemplate = (contractName:String) :contractTemplate => {
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
            listInterpolation: findElementsInterpolation(contractTemplate),
            template: contractTemplate
        };
    } catch (error) {
        throw error;
    }
}