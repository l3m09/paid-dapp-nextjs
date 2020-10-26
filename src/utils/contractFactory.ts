import { Contract, Wallet } from 'ethers';
import Agreement from '../contracts/Agreement.json';
export const AGREEMENT_ADDRESS = '0xfbD7ce7eF81751A7bc8e914a77A2fe6A92122ADF';

export class ContractFactory {
	private static _agreementContract: Contract | null = null;

	public static getAgrementContract = (wallet: Wallet) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new Contract(
				AGREEMENT_ADDRESS,
				Agreement.abi,
				wallet
			);
		}
		return ContractFactory._agreementContract;
	};
}
