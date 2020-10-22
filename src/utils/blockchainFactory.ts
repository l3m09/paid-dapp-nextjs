import {
	AlgorithmType,
	createWalletManager,
	KeyModel,
	WalletManager
} from 'cea-crypto-wallet';
import Web3 from 'web3';

const GETH_URL =
	'https://rinkeby.infura.io/v3/92ed13edfad140409ac24457a9c4e22d';

export class BlockchainFactory {
	private static _web3: Web3 | null = null;
	private static _walletManager: WalletManager | null = null;

	public static getWeb3Instance = (keyModel: KeyModel) => {
		if (!BlockchainFactory._web3) {
			BlockchainFactory._web3 = new Web3(GETH_URL);
		}

		const keyService = BlockchainFactory._walletManager?.getKeyService();
		if (keyService) {
			const pk = keyService.getPrivateKey(AlgorithmType.ES256K, keyModel);
			BlockchainFactory._web3.eth.accounts.wallet.clear().add(pk);
		}

		return BlockchainFactory._web3;
	};

	public static getWalletManager = () => {
		if (!BlockchainFactory._walletManager) {
			BlockchainFactory._walletManager = createWalletManager();
		}

		return BlockchainFactory._walletManager;
	};
}
