import { Contract, Wallet } from 'ethers';
import Agreement from '../contracts/Agreement.json';
import SimpleStorage from '../contracts/SimpleStorage.json';
export const _ADDRESS = '0xfbD7ce7eF81751A7bc8e914a77A2fe6A92122ADF';

export class ContractFactory {
	private static _agreementContract: Contract | null = null;
	private static _simpleContract: Contract | null = null;

	public static getAgrementContract = (wallet: Wallet) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new Contract(
				_ADDRESS,
				Agreement.abi,
				wallet
			);
		}
		return ContractFactory._agreementContract;
	};

	public static getSimpleContract = (wallet: Wallet) => {
		if(!ContractFactory._simpleContract){
			ContractFactory._simpleContract = new Contract(
				_ADDRESS,
				SimpleStorage.abi,
				wallet
			);
		}
		return ContractFactory._simpleContract;
	};
}
