import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import Agreement from '../contracts/Agreement.json';

const AGREEMENT_ADDRESS = '0x91Df554FA6Abc7f42b3ad2465f4969EE1658Dd4f';

export class ContractFactory {
	private static _agreementContract: Contract | null = null;

	public static getAgrementContract = (web3: Web3) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new web3.eth.Contract(
				Agreement.abi as any,
				AGREEMENT_ADDRESS
			);
		}
		return ContractFactory._agreementContract;
	};
}
