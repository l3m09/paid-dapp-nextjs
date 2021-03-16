import Nda from './nda.html';
import AdvisorAgreemt from './advisor-agreement.html';
import Ciia from './ciia.html';
import ConsultingAgreement from './consulting-agreement.html';
import ReferalAgreement from './referral-agreement.html';
import Saft from './saft.html';

enum contractsTemplates {
  TemplateNda = 'nda',
  TemplateAdvisorAgreement = 'advisor',
  TemplateCiia = 'ciia',
  TemplateConsultingAgreement = 'consulting',
  TemplateReferalAgreement = 'referral',
  TemplateSaft = 'saft',
}

interface contractTemplate {
  title: string;
  // interpolationFields: Object;
  template: string;
  dataName: string;
  jsonSchema: any;
  uiSchema: Object;
}

const getContractTemplate = (contractName: String): contractTemplate => {
  let contractTemplate;
  let title;
  let dataName = '';
  let jsonSchema: any = [];
  let uiSchema: Object = {};
  const sharedProperties = {
    couterparty: {
      counterPartyName: {
        title: 'Counterparty Name:',
        type: 'string',
      },
      counterPartyEmail: {
        title: 'Counterparty Email:',
        type: 'string',
      },
      counterPartyAddress: {
        title: 'Counterparty Address:',
        type: 'string',
      },
      counterPartyWallet: {
        title: 'Counterparty Wallet:',
        type: 'string',
      },
    },
    wallet: {
      sendWallet: {
        title: 'Sending Wallet:',
        type: 'string',
        readOnly: true,
      },
      ReceiveWallet: {
        title: 'Receiving Wallet:',
        type: 'string',
      },
    },
    required: [
      'counterPartyName',
      'counterPartyEmail',
      'counterPartyAddress',
    ],
  };

  switch (contractName) {
    case contractsTemplates.TemplateNda:
      title = 'MUTUAL NONDISCLOSURE AGREEMENT';
      contractTemplate = Nda;
      dataName = 'ndaAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
        },
        required: sharedProperties.required,
      };
      break;

    case contractsTemplates.TemplateAdvisorAgreement:
      title = 'ADVISOR AGREEMENT';
      contractTemplate = AdvisorAgreemt;
      dataName = 'advisorAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
          purchaseOption: {
            type: 'string',
            title: 'Purchase Option',
            enum: ['A Nonstatutory Option', 'A Right'],
          },
          numberOfShares: {
            title: 'Number of Shares',
            type: 'number',
          },
          termsConditions: {
            type: 'string',
            title: 'Terms and Conditions',
            enum: ['Options', 'Restricted stock purchase awards'],
          },
          stockPlanName: {
            title: 'Stock Plan name',
            type: 'string',
          },
          stockPlanNameValue: {
            type: 'string',
            title: 'Stock Plan Name Value',
            enum: ['Stock option', 'Restricted stock purchase'],
          },
          percentageVest: {
            title: 'Percentage Vest',
            type: 'number',
          },
          anniversaryMonth: {
            title: 'Anniversary Month',
            type: 'number',
          },
          vestingCommencement: {
            title: 'Vesting Commencement %',
            type: 'number',
          },
          typeOfTriggerAcceleration: {
            type: 'string',
            title: 'Type of Trigger Acceleration',
            enum: [
              'Single Trigger Acceleration...',
              'Double Trigger Acceleration...',
            ],
          },
          typeOfPrice: {
            type: 'string',
            title: 'Terms and Conditions',
            enum: ['Exersice', 'Purchase'],
          },
          acceptionOption: {
            type: 'string',
            title: 'Accepting Option',
            enum: ['An Option', 'A Right'],
          },
          numberOfYears: {
            title: 'Number Of Years',
            type: 'number',
          },
          state: {
            title: 'State',
            type: 'string',
          },
        },
        required: sharedProperties.required,
      };
      uiSchema = {
        purchaseOption: {
          'ui:widget': 'radio',
        },
        termsConditions: {
          'ui:widget': 'radio',
        },
        stockPlanNameValue: {
          'ui:widget': 'radio',
        },
        typeOfTriggerAcceleration: {
          'ui:widget': 'radio',
        },
        typeOfPrice: {
          'ui:widget': 'radio',
        },
        acceptionOption: {
          'ui:widget': 'radio',
        },
      };
      break;

    case contractsTemplates.TemplateCiia:
      title = 'CONFIDENTIAL INFORMATION AND INVENTION ASSIGNMENT AGREEMENT';
      contractTemplate = Ciia;
      dataName = 'ciiaAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
          effectiveDate: {
            title: 'Effective Date',
            type: 'string',
            format: 'date',
          },
          companyState: {
            title: 'Company State',
            type: 'string',
          },
          stateConsultant: {
            title: 'State',
            type: 'string',
          },
          typeOfCompanyConsultant: {
            title: 'Type of company',
            type: 'string',
          },
          title: {
            title: 'Title',
            type: 'string',
          },
          datea: {
            title: 'Date',
            type: 'string',
            format: 'date',
          },
          idNumberBriefDesc: {
            title: 'Identifying # or Brief Desc.',
            type: 'string',
          },
          stateCompany: {
            title: 'State',
            type: 'string',
          },
          typeOfComapny: {
            title: 'Type of Company',
            type: 'string',
          },
          listCompAgreements: {
            title:
              'List of companies and/or agreements excluded under section 10(b)',
            type: 'string',
            format: 'textarea',
          },
        },
        required: sharedProperties.required,
      };
      break;

    case contractsTemplates.TemplateConsultingAgreement:
      title = 'CONSULTING AGREEMENT';
      contractTemplate = ConsultingAgreement;
      dataName = 'consultingAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
          state: {
            title: 'State',
            type: 'string',
          },
          typeOfCompany: {
            title: 'Type of Company',
            type: 'string',
          },
          descriptionConsulting: {
            title: 'Description of Consulting Service',
            type: 'string',
          },
          serviceRenderChecked: {
            title: 'For Services rendered',
            type: 'boolean',
            default: false,
          },
          consultantChecked: {
            title: 'Consultan Shall',
            type: 'boolean',
            default: false,
          },
          companyWillChecked: {
            title: 'The Company will recommend',
            type: 'boolean',
          },
          otherChecked: {
            title: 'Other',
            type: 'boolean',
            default: '',
          },
        },
        required: sharedProperties.required,
        dependencies: {
          serviceRenderChecked: {
            oneOf: [
              {
                properties: {
                  serviceRenderChecked: {
                    enum: [true],
                  },
                  serviceRate: {
                    type: 'number',
                    title: 'Service Rate',
                  },
                  servicePayable: {
                    type: 'string',
                    title: 'Service Payable',
                  },
                  serviceAmountLimit: {
                    type: 'number',
                    title: 'Service Payable',
                  },
                },
              },
            ],
          },
          consultantChecked: {
            oneOf: [
              {
                properties: {
                  consultantChecked: {
                    enum: [true],
                  },
                  consultantExecutionAmount: {
                    type: 'number',
                    title: 'Consultant Execution Amount',
                  },
                  consultantCompletionAmount: {
                    type: 'number',
                    title: 'Consultant Completion Amount',
                  },
                },
              },
            ],
          },
          companyWillChecked: {
            oneOf: [
              {
                properties: {
                  companyWillChecked: {
                    enum: [true],
                  },
                  companyShares: {
                    type: 'string',
                    title: 'Company Shares',
                  },
                  companyFollows: {
                    type: 'string',
                    title: 'Follows',
                  },
                },
              },
            ],
          },
          otherChecked: {
            oneOf: [
              {
                properties: {
                  otherChecked: {
                    enum: [true],
                  },
                  other: {
                    type: 'string',
                  },
                },
              },
            ],
          },
        },
      };
      uiSchema = {
        'ui:widget': 'checkbox',
        'ui:order': [
          'counterPartyName',
          'counterPartyEmail',
          'counterPartyAddress',
          'counterPartyWallet',
          'sendWallet',
          'ReceiveWallet',
          'state',
          'typeOfCompany',
          'descriptionConsulting',
          'serviceRenderChecked',
          'serviceRate',
          'servicePayable',
          'serviceAmountLimit',
          'consultantChecked',
          'consultantExecutionAmount',
          'consultantCompletionAmount',
          'companyWillChecked',
          'companyShares',
          'companyFollows',
          'otherChecked',
          'other',
        ],
        descriptionConsulting: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 9,
          },
        },
        serviceRenderChecked: {
          'ui:widget': 'checkbox',
        },
        serviceRate: {
          'ui:emptyValue': '0',
        },
        servicePayable: {
          'ui:emptyValue': '',
        },
        serviceAmountLimit: {
          'ui:emptyValue': '0',
        },
        consultantChecked: {
          'ui:widget': 'checkbox',
        },
        companyFollows: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 9,
          },
        },
        other: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 9,
          },
        },
      };
      break;

    case contractsTemplates.TemplateReferalAgreement:
      title = 'SALES COMMISSION AGREEMENT';
      contractTemplate = ReferalAgreement;
      dataName = 'referralAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
          typeOfCompany: {
            title: 'Type of company',
            type: 'string',
          },
          terminationDate: {
            title: 'Termination date',
            type: 'string',
            format: 'date',
            ui: 'emptyValue',
          },
          stateOfCompany: {
            title: 'State of company',
            type: 'string',
          },
          county: {
            title: 'County',
            type: 'string',
          },
          commision: {
            title: 'Commision',
            type: 'number',
          },
          commisionDate: {
            title: 'Commision date',
            type: 'string',
            format: 'date',
          },
        },
      };
      uiSchema = {
        terminationDate: {
          'ui:emptyValue': '',
        },
        commisionDate: {
          'ui:emptyValue': '',
        },
      };
      break;

    case contractsTemplates.TemplateSaft:
      title = 'SIMPLE AGREEMENT FOR FUTURE TOKENS';
      contractTemplate = Saft;
      dataName = 'saftAgreementData';
      jsonSchema = {
        type: 'object',
        properties: {
          ...sharedProperties.couterparty,
          ...sharedProperties.wallet,
          purchaseAmount: {
            title: 'Purchase amount',
            type: 'number',
          },
          jurisdiction: {
            title: 'Jurisdiction (Non U.S.)',
            type: 'string',
          },
          tokenAmount: {
            title: 'Token amount',
            type: 'number',
          },
          typeOfCompany: {
            title: 'Type of company',
            type: 'string',
          },
          discountRate: {
            title: 'Discount Rate %',
            type: 'number',
          },
          website: {
            title: 'Website',
            type: 'string',
          },
          paymentOption: {
            title: 'Payment Options',
            type: 'string',
            enum: ['dollar', 'eth', 'btc'],
            enumNames: ['U.S. Dollars', 'Ethereum', 'Bitcoin'],
            default: 'dollar',
          },
        },
        required: sharedProperties.required,
        dependencies: {
          paymentOption: {
            oneOf: [
              {
                properties: {
                  paymentOption: {
                    enum: ['dollar'],
                  },
                  bankName: {
                    title: 'Bank Name',
                    type: 'string',
                  },
                  address: {
                    title: 'Address',
                    type: 'string',
                  },
                  aba: {
                    title: 'ABA#',
                    type: 'string',
                  },
                  payeeAccount: {
                    title: 'Payee Account #',
                    type: 'string',
                  },
                  payeeAccountName: {
                    title: 'Payee Account Name',
                    type: 'string',
                  },
                },
              },
              {
                properties: {
                  paymentOption: {
                    enum: ['eth'],
                  },
                  ethereum: {
                    title: 'Ethereum address',
                    type: 'string',
                  },
                },
              },
              {
                properties: {
                  paymentOption: {
                    enum: ['btc'],
                  },
                  bitcoin: {
                    title: 'Bitcoin address',
                    type: 'string',
                  },
                },
              },
            ],
          },
        },
      };
      break;

    default:
      throw new Error('No template Found');
  }
  return {
    title,
    // interpolationFields: findElementsInterpolation(contractTemplate),
    template: contractTemplate,
    dataName,
    jsonSchema,
    uiSchema,
  };
};

export default getContractTemplate;
