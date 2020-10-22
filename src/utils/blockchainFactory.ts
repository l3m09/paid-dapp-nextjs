import {
	AlgorithmType,
	createWalletManager,
	WalletManager
} from 'cea-crypto-wallet';
import { KeyStorageModel } from 'cea-crypto-wallet/dist/key-storage/KeyStorageModel';
import { ethers, Wallet } from 'ethers';

export const GETH_URL =
	'wss://goofy-austin:tyke-racing-reload-curing-fade-tricky@ws-nd-645-752-688.p2pify.com';

export class BlockchainFactory {
	private static _provider: ethers.providers.WebSocketProvider;
	private static _walletManager: WalletManager | null = null;

	public static getProvider = () => {
		if (!BlockchainFactory._provider) {
			BlockchainFactory._provider = new ethers.providers.WebSocketProvider(
				GETH_URL
			);
		}
		return BlockchainFactory._provider;
	};

	public static getWalletManager = () => {
		if (!BlockchainFactory._walletManager) {
			BlockchainFactory._walletManager = createWalletManager();
		}

		return BlockchainFactory._walletManager;
	};

	public static getWallet = async (walletId: string) => {
		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(walletId);
		const provider = BlockchainFactory.getProvider();

		const privateKey =
			manager
				.getKeyService()
				?.getPrivateKey(AlgorithmType.ES256K, rawWallet.keypairs) || '';
		const wallet = new Wallet(privateKey, provider);
		return wallet;
	};
}
