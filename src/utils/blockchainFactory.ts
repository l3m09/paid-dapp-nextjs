import { add, options } from 'ionicons/icons';
import {  createWalletManager, WalletManager, AlgorithmType, KeyModel} from 'universal-crypto-wallet';
import { KeyStorageModel } from 'universal-crypto-wallet/dist/key-storage/KeyStorageModel';
import { WalletModel } from 'universal-crypto-wallet/dist/key-storage/WalletModel';
import { ethers, providers, Wallet } from 'ethers';
import Web3 from 'web3';

export class BlockchainFactory {
	// static GETH_URL =
	// 	'https://rinkeby.infura.io/v3/6d8bfebd6db24c3cb3f3d50839e1c5be';
	// 	//'http://127.0.0.1:7545';
	private static wssUrl = 'wss://kind-lalande:arrest-cursor-slogan-prism-carbon-neon@ws-nd-233-385-399.p2pify.com';
	// private static url : string = 'https://rinkeby.infura.io/v3/c01c014a022d43488fa1b30dc034a159';
	private static _web3: Web3 | null = null;
	private static _walletManager: WalletManager | null = null;
	private static _keystore: KeyStorageModel;
	private static _wallet: WalletModel | null = null;

	private static options = {
		timeout: 30000,
		clientConfig: {
			// Useful if requests are large
			maxReceivedFrameSize: 10000000,   // bytes - default: 1MiB
			maxReceivedMessageSize: 80000000, // bytes - default: 8MiB
	   
			// Useful to keep a connection alive
			keepalive: true,
			keepaliveInterval: 60000 // ms
		},
		// Enable auto reconnection
		reconnect: {
			auto: true,
			delay: 2500, // ms
			maxAttempts: 5,
			onTimeout: false
		}
	};

	public static getWeb3Instance = async (walletId: string, password: string) => {
		if (!BlockchainFactory._web3) {
			BlockchainFactory._web3 = new Web3 ( new Web3.providers.WebsocketProvider(BlockchainFactory.wssUrl, BlockchainFactory.options));
		}
		
		BlockchainFactory._wallet = await BlockchainFactory._walletManager?.createBlockchainWallet(
			BlockchainFactory.wssUrl, BlockchainFactory.options, walletId, password) as any;
		/*const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
		const { privateKey } = mnemonicWallet;
		console.log(address,privateKey);*/

		// if (keyService) {
		// 	const pk = keyService.getPrivateKey(AlgorithmType.ES256K, keyModel);
		// 	console.log('privateKey Wallet',pk);
		
		/*BlockchainFactory._web3.eth.accounts.wallet.clear().add(privateKey);*/
		
		// 	console.log('web3 eth accounts wallet', BlockchainFactory._web3.eth.accounts.wallet)
		// }
		return BlockchainFactory._wallet;
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

	public static getNetwork = async (network:number) => {
		switch (network) {
			case 1 : {
				return "mainnet";
			}
			case 3 : {
				return "ropsten";
			}
			case 4 : {
				return "rinkeby";
			}
			case 42 : {
				return "kovan";
			}
			default: {
				return "Not Admit this Network"
			}
		}
	}

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
