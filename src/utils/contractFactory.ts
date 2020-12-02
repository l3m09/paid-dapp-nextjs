// import { Contract, Wallet } from 'ethers';
import { options } from 'ionicons/icons';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
const Agreement = require('../contracts/Agreement.json');
// import Agreement from '../contracts/Agreement.json';
const _ADDRESS = '0x04Dfd3Cfca0E110b6B3c2e7D2384a851d1665988';


const networks = {
	mainnet: 1,
	ropsten: 3,
	rinkeby: 4,
	kovan: 42
}

// const ContractOptions = {
// 	from: '0xaCf5ABBB75c4B5bA7609De6f89a4d0466483225a'
// }

export class ContractFactory {

	private static _agreementContract: Contract | null = null;
	// public static deployNetwork = Agreement.contractName;
	public static _contractAddress = _ADDRESS;

	public static getAgreementContract = (web3: Web3) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new web3.eth.Contract(
				Agreement.abi as any,
				ContractFactory._contractAddress
			);
			// console.log(ContractFactory._contractAddress, ContractFactory._agreementContract);
		}
		// console.log(ContractFactory._agreementContract);
		return ContractFactory._agreementContract;
	};
}
