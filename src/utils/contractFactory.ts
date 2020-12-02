// import { Contract, Wallet } from 'ethers';
import { options } from 'ionicons/icons';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AgreementContract } from '../contracts/agreement.js';

// import Agreements from '../contracts/Agreement.json';

const networks = 'rinkeby';

export class ContractFactory {

	private static _agreementContract: Contract | null = null;

	public static getAgreementContract = (web3: Web3) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new web3.eth.Contract(
				AgreementContract.raw.abi as any,
				AgreementContract.address["rinkeby"]
			);
			console.log(AgreementContract.address["rinkeby"], ContractFactory._agreementContract);
		}
		console.log(ContractFactory._agreementContract);
		return ContractFactory._agreementContract;
	};
}
