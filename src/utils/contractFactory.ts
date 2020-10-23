import { Contract, Wallet } from 'ethers';
import Agreement from '../contracts/Agreement.json';
export const AGREEMENT_ADDRESS = '0x83a1CAEa7bC9247E3755451F361d53c7b1640Dbb';

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
