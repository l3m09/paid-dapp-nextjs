import { createWalletManager, WalletManager } from 'paid-universal-wallet';
import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
import { ethers, providers, Wallet } from 'ethers';
import Web3 from 'web3';


export class BlockchainFactory {
	static GETH_URL =
		'https://rinkeby.infura.io/v3/6d9efbca18e24cf2ba065b6cc0683c1d';
		//'http://127.0.0.1:7545';
	private static _provider: ethers.providers.JsonRpcProvider;
	private static _walletManager: WalletManager | null = null;
	private static _keystore: KeyStorageModel;

	public static getProvider(): ethers.providers.JsonRpcProvider {
		if (!BlockchainFactory._provider) {
			BlockchainFactory._provider = new ethers.providers.JsonRpcProvider(
				this.GETH_URL
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
		const { mnemonic } = BlockchainFactory._keystore;
		const provider = BlockchainFactory.getProvider();
		// const manager = BlockchainFactory.getWalletManager();
		// const privateKey =
		// 	manager.getKeyService()?.getPrivateKey(AlgorithmType.ES256K, keypairs) ||
		// 	'';
		const wallet = Wallet.fromMnemonic(mnemonic);
		return wallet.connect(provider);
	}

	public static webHttpProvider(): any | null {
		return new Web3(
			new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/6d8bfebd6db24c3cb3f3d50839e1c5be')
		);
	}

	public static async getWallet2(): Promise<any | null> {
		if (!BlockchainFactory._keystore) {
			return null;
		}
		const { mnemonic } = BlockchainFactory._keystore;
		const provider = BlockchainFactory.getProvider();
		// const manager = BlockchainFactory.getWalletManager();
		// const privateKey =
		// 	manager.getKeyService()?.getPrivateKey(AlgorithmType.ES256K, keypairs) ||
		// 	'';
		const wallet = Wallet.fromMnemonic(mnemonic);
		return { wallet: wallet.connect(provider), keystore: BlockchainFactory._keystore };
	}
}
