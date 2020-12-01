import {  createWalletManager, WalletManager, AlgorithmType, KeyModel} from 'paid-universal-wallet';
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
// import { ethers, providers, Wallet } from 'ethers';
import Web3 from 'web3';

export class BlockchainFactory {
	// static GETH_URL =
	// 	'https://rinkeby.infura.io/v3/6d8bfebd6db24c3cb3f3d50839e1c5be';
	// 	//'http://127.0.0.1:7545';
	// static urlInfo = {
	// 	url: 'https://nd-233-385-399.p2pify.com',
	// 	user: 'kind-lalande',
	// 	password: 'arrest-cursor-slogan-prism-carbon-neon'
	// };
	private static wssUrl = 'wss://kind-lalande:arrest-cursor-slogan-prism-carbon-neon@ws-nd-233-385-399.p2pify.com';
	private static _web3: Web3 | null = null;
	private static _walletManager: WalletManager | null = null;
	private static _keystore: KeyStorageModel;

	private static options = {
		// Enable auto reconnection
		reconnect: {
			auto: true,
			delay: 5000, // ms
			maxAttempts: 5,
			onTimeout: false
		}
	};

	// private static _provider = BlockchainFactory.web3.currentProvider;

	public static getWeb3Instance = (keyModel: KeyModel) => {
		if (!BlockchainFactory._web3) {
			BlockchainFactory._web3 = new Web3 ( new Web3.providers.WebsocketProvider(BlockchainFactory.wssUrl, BlockchainFactory.options));
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


	// public static getProvider(): any | null {
	// 	if (!BlockchainFactory._provider) {
	// 		BlockchainFactory._provider = BlockchainFactory.web3.currentProvider;
	// 	}
	// 	return BlockchainFactory._provider;
	// }

	// public static getWalletManager(): WalletManager {
	// 	if (!BlockchainFactory._walletManager) {
	// 		BlockchainFactory._walletManager = createWalletManager();
	// 	}

	// 	return BlockchainFactory._walletManager;
	// }

	public static setKeystore(keystore: KeyStorageModel): void {
		BlockchainFactory._keystore = keystore;
	}

	// public static async getWallet(): Promise<any | null> {
	// 	if (!BlockchainFactory._keystore) {
	// 		return null;
	// 	}
	// 	const { keypairs } = BlockchainFactory._keystore;
	// 	const provider = BlockchainFactory.getProvider();
	// 	const manager = BlockchainFactory.getWalletManager();
	// 	const privateKey =
	// 		manager.getKeyService()?.getPrivateKey(AlgorithmType.ES256K, keypairs) ||
	// 		'';
	// 	const wallet = Wallet.fromMnemonic(mnemonic);
	// 	return wallet.connect(provider);
	// }



	// public static async getWallet2(): Promise<any | null> {
	// 	if (!BlockchainFactory._keystore) {
	// 		return null;
	// 	}
	// 	const { mnemonic } = BlockchainFactory._keystore;
	// 	const provider = BlockchainFactory.getProvider();
	// 	// const manager = BlockchainFactory.getWalletManager();
	// 	// const privateKey =
	// 	// 	manager.getKeyService()?.getPrivateKey(AlgorithmType.ES256K, keypairs) ||
	// 	// 	'';
	// 	const wallet = Wallet.fromMnemonic(mnemonic);
	// 	return { wallet: wallet.connect(provider), keystore: BlockchainFactory._keystore };
	// }
}
