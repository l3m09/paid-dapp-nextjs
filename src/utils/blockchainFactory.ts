import {  createWalletManager, WalletManager, AlgorithmType, KeyModel} from 'universal-crypto-wallet';
import { KeyStorageModel } from 'universal-crypto-wallet/dist/key-storage/KeyStorageModel';
import { WalletModel } from 'universal-crypto-wallet/dist/key-storage/WalletModel';
import Web3 from 'web3';

export class BlockchainFactory {
	
	// private static wssUrl = 'wss://kind-lalande:arrest-cursor-slogan-prism-carbon-neon@ws-nd-233-385-399.p2pify.com';
	private static wssUrl = `${process.env.REACT_APP_WEB3_WSS}`;
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

	public static getWeb3Instance = async (walletAddress: string, walletId: string, password: string) => {
		if(!BlockchainFactory._wallet || (BlockchainFactory._wallet.walletInstance.address !== walletAddress)){
			BlockchainFactory._wallet = await BlockchainFactory._walletManager?.createBlockchainWallet(BlockchainFactory.wssUrl, BlockchainFactory.options, 
				walletId, password) as any;
		}
		return BlockchainFactory._wallet;
	};

	public static getWeb3Mask = async (ethereum: any) => {
		if(!BlockchainFactory._wallet) {
				const _web3 = new Web3 (ethereum);
				const wallet:WalletModel = {
					web3Instance: _web3,
					walletInstance: _web3.eth.accounts.wallet,
					network: await _web3.eth.getChainId()
				}
				BlockchainFactory._wallet = wallet;
		}
		return BlockchainFactory._wallet;
	}

	public static getWalletManager = () => {
		if (!BlockchainFactory._walletManager) {
			BlockchainFactory._walletManager = createWalletManager();
		}

		return BlockchainFactory._walletManager;
	};


	public static setKeystore(keystore: KeyStorageModel): void {
		BlockchainFactory._keystore = keystore;
	}


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


}
