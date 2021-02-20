import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AgreementContract } from '../contracts/agreement.js';
import { PAIDTokenContract } from '../contracts/paidtoken.js'
import { DAITokenContract } from '../contracts/daitoken.js'

export class ContractFactory {

	private static _agreementContract: Contract | null = null;
	private static _agreementContract_eth: Contract | null = null;
	private static _paidtokenContract: Contract | null = null;
	private static _daitokenContract: Contract | null = null;

	// Get agreement contract
	public static getAgreementContract = (web3: Web3, network: string) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new web3.eth.Contract(
				AgreementContract.raw.abi as any,
				AgreementContract.address[network]
			);
			ContractFactory._agreementContract.options.address = AgreementContract.address[network];
		}
		return ContractFactory._agreementContract;
	};

	public static getAgreementContract_eth = (web3: Web3, network: string) => {
		if (!ContractFactory._agreementContract_eth) {
			ContractFactory._agreementContract_eth = new web3.eth.Contract(
				AgreementContract.raw.abi as any,
				AgreementContract.address[network]
			);
			ContractFactory._agreementContract_eth.options.address = AgreementContract.address[network];
		}
		return ContractFactory._agreementContract_eth;
	};

	public static getPaidTokenContract = (web3: Web3, network: string) => {
		if (!ContractFactory._paidtokenContract) {
			ContractFactory._paidtokenContract = new web3.eth.Contract(
				PAIDTokenContract.raw.abi as any,
				PAIDTokenContract.address[network]
			);
			ContractFactory._paidtokenContract.options.address = PAIDTokenContract.address[network];
		}
		return ContractFactory._paidtokenContract;
	};

	public static getDaiTokenContract = (web3: Web3, network: string) => {
		if (!ContractFactory._daitokenContract) {
			ContractFactory._daitokenContract = new web3.eth.Contract(
				DAITokenContract.raw.abi as any,
				DAITokenContract.address[network]
			);
			ContractFactory._daitokenContract.options.address = DAITokenContract.address[network];
		}
		return ContractFactory._daitokenContract;
	};
}
