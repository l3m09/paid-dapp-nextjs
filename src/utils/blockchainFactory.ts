import {
	AlgorithmType,
	createWalletManager,
	WalletManager
} from 'cea-crypto-wallet';
import { KeyStorageModel } from 'cea-crypto-wallet/dist/key-storage/KeyStorageModel';
import { ethers, Wallet } from 'ethers';

export const GETH_URL = 'http://localhost:8545';

export class BlockchainFactory {
	private static _provider: ethers.providers.JsonRpcProvider;
	private static _walletManager: WalletManager | null = null;
	private static _keystore: KeyStorageModel;

	public static getProvider(): ethers.providers.JsonRpcProvider {
		if (!BlockchainFactory._provider) {
			BlockchainFactory._provider = new ethers.providers.JsonRpcProvider(
				GETH_URL
			);
		}
		return BlockchainFactory._provider;
	}

	public static getWalletManager(): WalletManager {
		if (!BlockchainFactory._walletManager) {
			BlockchainFactory._walletManager = createWalletManager();
		}

		return BlockchainFactory._walletManager;
	}

	public static setKeystore(keystore: KeyStorageModel): void {
		BlockchainFactory._keystore = keystore;
	}
	public static async getWallet(): Promise<Wallet | null> {
		if (!BlockchainFactory._keystore) {
			return null;
		}
		const { keypairs } = BlockchainFactory._keystore;
		const provider = BlockchainFactory.getProvider();
		const manager = BlockchainFactory.getWalletManager();
		const privateKey =
			manager.getKeyService()?.getPrivateKey(AlgorithmType.ES256K, keypairs) ||
			'';
		const wallet = new Wallet(privateKey, provider);
		return wallet;
	}
}
