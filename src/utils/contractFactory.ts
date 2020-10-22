import { Contract, Wallet } from 'ethers';
import Agreement from '../contracts/Agreement.json';
export const AGREEMENT_ADDRESS = '0x949440afDc1714e3277abbbf96A9b4A66583c7fd';

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
