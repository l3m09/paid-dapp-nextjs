import { NextRouter } from 'next/router';
import AgreementActionTypes from '../actionTypes/agreement';
import ProfileActionTypes from '../actionTypes/profile';
import WalletActionTypes from '../actionTypes/wallet';
import {
  agreementStatus,
} from '../../utils/agreement';

const retrieveScenarios = (scenarioCode) => {
  const createdAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(new Date());
  const scenarios = new Map([
    [
      'partyANotLogged',
      {
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
        },
        agreements: [],
        router: '/profile',
      },
    ],
    [
      'partyALogged',
      {
        profile: {
          firstName: 'Dan',
          lastName: 'Smith',
          email: 'dan.smith@paidnetwork.com',
          address: 'Suite 5A-1204\n799 E Dragram\nTucson AZ 85705\nUSA',
          phone: '+1 500 7080 7788',
        },
        agreements: [],
      },
    ],
    [
      'partyBNotLogged',
      {
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
        },
        agreements: [],
      },
    ],
    [
      'partyBLogged',
      {
        profile: {
          firstName: 'Dan B',
          lastName: 'Smith B',
          email: 'danb.smithb@paidnetwork.com',
          address: 'Suite 5A-1224\n788 E Dragram\nTucson AZ 85705\nUSA',
          phone: '+1 700 7080 8877',
        },
        agreements: [{
          transactionHash:
            '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
          event: {
            id: 1,
            from: 1,
            to: 2,
            agreementFormTemplateId: 1,
            cid: 1,
            status: agreementStatus.PENDING,
            createdAt,
            updatedAt: createdAt,
          },
          data: {
            documentName: 'Mutual NDA',
            counterpartyName: 'Party A',
            agreementForm: null,
            agreementFormTemplateId: 'nda',
            escrowed: null,
            validUntil: '12/21/2023',
            toSigner: 'b',
            fromSigner: null,
          },
        }, {
          transactionHash:
            '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da7A88t',
          event: {
            id: 1,
            from: 1,
            to: 2,
            agreementFormTemplateId: 1,
            cid: 2,
            status: agreementStatus.PENDING,
            createdAt,
            updatedAt: createdAt,
          },
          data: {
            documentName: 'CIIA',
            counterpartyName: 'Party A',
            agreementForm: null,
            agreementFormTemplateId: 'advisor',
            escrowed: null,
            validUntil: '12/21/2023',
            toSigner: 'b',
            fromSigner: null,
          },
        }],
      },
    ],
  ]);

  return scenarios.get(scenarioCode ?? 'partyANotLogged');
};

const doConnectToWallet = (
  { router, scenarioCode }: { router: NextRouter; scenarioCode: string; },
) => (dispatch: any) => {
  dispatch({ type: WalletActionTypes.CONNECTING_WALLET });
  const currentWallet = '0x3442C44B4Bbf87144Ad0e4a2C60e4bE801d30FA8';
  const currentScenario = retrieveScenarios(scenarioCode);
  const { profile, agreements } = currentScenario;
  const {
    firstName,
    lastName,
    email,
  } = profile;

  if (!(firstName && lastName && email)) {
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    router.push('/profile');
  } else {
    dispatch({ type: ProfileActionTypes.SET_PROFILE_DATA, payload: profile });
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    if (agreements.length) {
      agreements.forEach((agreement) => {
        dispatch({
          type: AgreementActionTypes.CREATE_AGREEMENT,
          payload: { newAgreement: agreement },
        });
      });
    }
    router.push('/agreements');
  }
};

export default doConnectToWallet;
