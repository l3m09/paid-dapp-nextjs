import { KeyStorageModel } from 'paid-universal-wallet/dist/key-storage/KeyStorageModel';
import { DocumentsActionTypes } from '../actionTypes/documents';
import { BigNumber, ethers, Wallet } from 'ethers';
// import { Contract } from 'web3-eth-contract';
import { BlockchainFactory } from '../../utils/blockchainFactory';
import { ContractFactory } from '../../utils/contractFactory';
import { base64StringToBlob } from 'blob-util';
import { AlgorithmType, CEASigningService, WalletManager } from 'paid-universal-wallet';
import { eddsa } from "elliptic";
import { doGetCurrentWallet } from './wallet';
// const http = require('http');
// const html2PDF = require('jspdf-html2canvas');
const uint8ArrayToString = require('uint8arrays/to-string')
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });

//const { compile } = require('./compile');

const createAgreementFormPayload = (obj: any) => {
	const types: string[] = [];
	const values: any[] = [];
	const keys = Object.keys(obj);
	keys.forEach((k) => {
		if (typeof obj[k] === 'string') {
			types.push('string');
			values.push(obj[k]);
		}
		if (typeof obj[k] === 'number') {
			types.push('uint256');
			values.push(obj[k]);
		}
	});
	return ethers.utils.defaultAbiCoder.encode(types, values);
};
/*const getDocuments = (agreements: any[], agreementsFrom: any[], agreementsTo: any[]) => {
	const payload = {
		from: agreementsFrom,
		to: agreementsTo
	}*/
	
const getDocuments = (payload: any[]) => {
	return {
		type: DocumentsActionTypes.GET_DOCUMENTS_SUCCESS,
		payload
	};
};
// const getDocuments = (agreementsFrom: any[], agreementsTo: any[]) => {
// 	const payload = {
// 		from: agreementsFrom,
// 		to: agreementsTo
// 	}
// 	return {
// 		type: DocumentsActionTypes.GET_DOCUMENTS_SUCCESS,
// 		payload
// 	};
// };
const uploadDocuments = () => {
	return {
		type: DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS
	};
};
const getSelectedDocument = (document: any) => {
	return {
		type: DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS,
		payload: document
	};
};

const setAgreementFormInfo = (formInfo: any) => {
	return {
		type: DocumentsActionTypes.SET_AGREEMENT_FORM_INFO,
		payload: formInfo
	};
};

const createAgreement = () => {
	return {
		type: DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS
	};
};
declare global {
	interface Window { web3: any; ethereum: any; }
}

// ACTIONS

/*
get account
get the network
get smart contract
get meme hash
*/


export const doCreateAgreement = (payload: {
	signatoryA: string;
	signatoryB: string;
	validUntil: number;
	agreementFormTemplateId: string;
	agreementForm: any;
	slideNext: () => Promise<void>;
	slideBack: () => Promise<void>;
}) => async (dispatch: any, getState: () => { wallet: any }) => {
	dispatch({ type: DocumentsActionTypes.CREATE_AGREEMENT_LOADING });
	try {
		const {
			validUntil,
			agreementFormTemplateId,
			agreementForm,
			slideNext,
			slideBack
		} = payload;


		const formId = ethers.utils.formatBytes32String(agreementFormTemplateId);
		const form = createAgreementFormPayload(agreementForm);

		const { wallet } = getState();
		const { unlockedWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);

		const address = manager.getWalletAddress(rawWallet.mnemonic);
		console.log('Current_Wallet_Documents', address,'agreementForm', agreementForm);

		// ALICE SIDE
		const today = new Date();

		const content = '<div>'+
		'<div>Date: ' + today.toLocaleDateString() + ' ' + today.toLocaleTimeString()+ ' </div>' +
		'Agreement creator:<br/>' +
		'<div style="margin-left: 20px;">Name:' + agreementForm.name + '</div>' +
		'<div style="margin-left: 20px;">Address:' + agreementForm.address + '</div>' +
		'<div style="margin-left: 20px;">Phone:' + agreementForm.phone + '</div>' +
		'<div style="margin-left: 20px;">Wallet:' + address + '</div>' +
		'<div>---------------------------------------</div>' +
		'Agreement counterparty:<br/>' +
		'<div style="margin-left: 20px;">Name:' + agreementForm.counterpartyName + '</div>' +
		'<div style="margin-left: 20px;">Address:' + agreementForm.counterpartyAddress + '</div>' +
		'<div style="margin-left: 20px;">Phone:' + agreementForm.counterpartyPhone + '</div>' +
		'<div style="margin-left: 20px;">Wallet:' + agreementForm.counterpartyWallet + '</div>' +
		'</div>';
		console.info('content address:',content);
		const blobContent = base64StringToBlob(btoa(content), 'application/pdf');
		const ceass = new CEASigningService();
		ceass.useKeyStorage(rawWallet);

		const arrayContent = btoa(content);
		const bytesContent = ethers.utils.toUtf8Bytes(arrayContent);
		const digest = ethers.utils.sha256(bytesContent).replace('0x', '');
		const ec_alice = new eddsa('ed25519');

		const signer = ec_alice.keyFromSecret(rawWallet.keypairs.ED25519);
		const signature = signer
			.sign(digest)
			.toHex();

		const pubKey = signer.getPublic();

		const opts = { create: true, parents: true };

		let ipfsHash = await uploadsIPFS(ipfs, blobContent, opts, digest, signature, pubKey, formId, null);

		console.log('ipfs hash: ' + ipfsHash.toString());

		// Transaction for Created Agreements
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs, rawWallet.mnemonic);
		const agreementContract = ContractFactory.getAgreementContract(web3);
		console.log(web3.eth.accounts.wallet);
		// const agreementContract = await new web3.eth.Contract(AgreementJSON.abi,
		// 	ContractFactory._contractAddress,
		// 	{ from: address, gas: '1500000', gasPrice: '1000000000' });
		// console.log('Crear Transacciones:',agreementContract)
		const agreementTransaction = await agreementContract.methods['partyCreate(uint256,string,bytes32,bytes,bytes)'](
			validUntil,
			ipfsHash.toString(),
			formId,
			form,
			'0x' + digest)
		.send({ from: address,  gas: '1500000', gasPrice: '1000000000'})
		.on('receipt', async function(receipt: any){

			// BOB SIDE
			console.log('receipt of agreements Transaction:', receipt);

			let fetchedContent = '';
			for await (const chunk of ipfs.cat(ipfsHash.toString())) {
				fetchedContent = uint8ArrayToString(chunk);
			}
			const jsonContent = JSON.parse(fetchedContent);
			const contentRef = jsonContent.contentRef;
			let pdfContent:HTMLElement = document.createElement("html");

			for await (const chunk of ipfs.cat(contentRef.cid)) {
				pdfContent.innerHTML = uint8ArrayToString(chunk);
			}

			const doc = new jsPDF('p', 'px','a4');
			doc.html(pdfContent, {
				callback: function () {
					doc.save('Agreement-' + receipt.transactionHash.replace('0x','').substring(0,10) + '.pdf');
				}
			});

			const fetchedPubKey = jsonContent.publicKey;

			const ec_bob = new eddsa('ed25519');

			const key = ec_bob.keyFromPublic(fetchedPubKey);
			const sigRef = jsonContent.sigRef;
			let sigDocument = '';
			for await (const chunk of ipfs.cat(sigRef.cid)) {
				sigDocument = uint8ArrayToString(chunk);
			}

			console.log(key.verify(jsonContent.digest, sigDocument));

			dispatch(createAgreement());
			slideNext();
		})
		.on('error', function(error: any, receipt: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.		
			slideBack();
			console.log(error, error.message, 'receipt:', receipt);
			alert('Transaction failed');
			throw new Error('Transaction failed');
		});
		
		console.info('agreementTransaction:',agreementTransaction);
		/*
		const contract = ContractFactory.getAgreementContract(ethersWallet.wallet);
		const balance = await ethersWallet.wallet.provider.getBalance(
			ethersWallet.wallet.address
		);

		const parsedBalance = BigNumber.from(balance);
		if (parsedBalance.lte(0)) {
			throw new Error('The wallet should has balance to send a transaction.');
		}

		const options = { gasPrice: 1000000000, gasLimit: 85000 };*/
		/*const gasPrice = await contract.estimateGas.partyCreate(
			validUntil,
			ipfsHash.toString(),
			formId,
			form,
			'0x' + digest,
			options
		);*/

		/*const agreementTransaction: ContractTransaction = await contract.partyCreate(
			validUntil,
			ipfsHash.toString(),
			formId,
			form,
			'0x' + digest,
			options
		);

		agreementTransaction.gasPrice = BigNumber.from(options.gasPrice);
		
		///---------------------------------------------------------------------------------------------------

		new Promise(async (resolve) => {
			await agreementTransaction.wait().then((receipt) => {
				console.log('Transaction receipt', receipt);
				if (receipt.status === 1) {
					dispatch(createAgreement());
					slideNext();
					resolve();
				} else {
					slideBack();
					alert('Transaction failed');
					throw new Error('Transaction failed');
				}
			});
		});*/
	} catch (err) {
		await payload.slideBack();
		alert(err.message);
		console.log('ln284',err);
		dispatch({
			type: DocumentsActionTypes.CREATE_AGREEMENT_FAILURE,
			payload: err.msg
		});
	}
};

export const uploadsIPFS = async (ipfs: any, blobContent: any, opts: any, 
	_digest: string, sigArray: any, pubKey: any, _docId: any, parent: any = null) => {
	const createCIDHash = (fileEntry: any) => {
		return { path: fileEntry.path, cid: fileEntry.cid.toString() }
	}

	const fileContent = await ipfs.add(blobContent);
	const fileSignature = await ipfs.add(sigArray);
	const index = { contentRef: createCIDHash(fileContent), sigRef: createCIDHash(fileSignature), digest: _digest, 
		publicKey: pubKey, parent: parent, docId: _docId };

	const fileIndex = await ipfs.add(JSON.stringify(index));
	return fileIndex.cid;
}

export const doGetDocuments = (currentWallet: any) => async (
	dispatch: any,
	getState: () => { wallet: any }
) => {
	dispatch({ type: DocumentsActionTypes.GET_DOCUMENTS_LOADING });
	try {
		const { address } = currentWallet;
		const { wallet } = getState();
		const { unlockedWallet } = wallet;
		if (!unlockedWallet) {
			throw new Error('Not unlocked wallet found');
		}

		const manager = BlockchainFactory.getWalletManager();
		const storage = manager.getKeyStorage();
		const rawWallet = await storage.find<KeyStorageModel>(unlockedWallet._id);
		const web3 = BlockchainFactory.getWeb3Instance(rawWallet.keypairs,rawWallet.mnemonic);

		const agreementContract = ContractFactory.getAgreementContract(web3);
		const address_Contract = agreementContract.options.address;
		// console.log('Address of the Contract',address_Contract,'Load Agreements:',agreementContract);
		console.log('Address Wallet Events:', address, 'web3 accounts wallet', web3.eth.accounts.wallet);
		const events = await agreementContract.getPastEvents('AgreementPartyCreated', {
			filter: { from: [address], to: [address] },
			fromBlock: 0,
			toBlock: 'latest'
		});


		// .on("connected", function(subscriptionId:any){
		// 	console.log('Connected:',subscriptionId);
		// })
		// .on('data', function(event:any){
		// 	console.log('Data:',event); // same results as the optional callback above
		// })
		// .on('changed', function(event:any){
		// 	console.info('Changed:',event);// remove event from local database
		// })
		// .on('error', function(error:any, receipt:any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
		// 	console.error('Error Function:',error);
		// 	console.log('Receipt:',receipt);
		// });
		/*('AgreementPartyCreated', { 
				filter: { partySource: [accounts[0]] },
				fromBlock: 0, 
				toBlock: 'latest'
			}, function(error: any, events: any){ 
				console.log(events); })*/
			/*.then(function(events: any){
				console.log(events) // same results as the optional callback above
			});*/
		/*
		const contract = ContractFactory.getAgreementContract(ethersWallet);
		const filterFrom = contract.filters.AgreementCreated(
			null,
			null,
			ethersWallet.address
		);
		const filterTo = contract.filters.AgreementCreated(
			null,
			null,
			null,
			ethersWallet.address
		);

		const eventsFrom = await contract.queryFilter(filterFrom);
		const eventsTo = await contract.queryFilter(filterTo);*/
		const promises = events.map((event) => {
			const args = event.returnValues;
			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, partySource, partyDestination, formTemplateId, agreementStoredReference } = args;
			const agreementId = (id as BigNumber).toString();
			return new Promise(async (resolve) => {
				const agreement = await agreementContract.methods.agreements(id).call();
				const {
					agreementForm,
					escrowed,
					validUntil,
					toSigner,
					fromSigner
				} = agreement;
				resolve({
					meta: {
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id: agreementId,
						from: partySource,
						to:partyDestination,
						agreementFormTemplateId: formTemplateId,
						cid: agreementStoredReference
					},
					data: {
						agreementForm,
						escrowed,
						validUntil: (validUntil as BigNumber).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});
		/*const promisesFrom = eventsFrom.map((event) => {
			const { args } = contract.interface.parseLog(event);

			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, from, to, agreementFormTemplateId } = args;
			const agreementId = (id as BigNumber).toString();
			return new Promise(async (resolve) => {
				const agreement = await contract.agreements(id);
				const {
					agreementForm,
					escrowed,
					validUntil,
					toSigner,
					fromSigner
				} = agreement;
				resolve({
					meta: {
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id: agreementId,
						from,
						to,
						agreementFormTemplateId
					},
					data: {
						agreementForm,
						escrowed,
						validUntil: (validUntil as BigNumber).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});
		const promisesTo = eventsTo.map((event) => {
			const { args } = contract.interface.parseLog(event);

			const {
				logIndex,
				transactionIndex,
				transactionHash,
				blockHash,
				blockNumber,
				address
			} = event;
			const { id, from, to, agreementFormTemplateId } = args;
			const agreementId = (id as BigNumber).toString();
			return new Promise(async (resolve) => {
				const agreement = await contract.agreements(id);
				const {
					agreementForm,
					escrowed,
					validUntil,
					toSigner,
					fromSigner
				} = agreement;
				resolve({
					meta: {
						logIndex,
						transactionIndex,
						transactionHash,
						blockHash,
						blockNumber,
						address
					},
					event: {
						id: agreementId,
						from,
						to,
						agreementFormTemplateId
					},
					data: {
						agreementForm,
						escrowed,
						validUntil: (validUntil as BigNumber).toString(),
						toSigner: toSigner.signatory,
						fromSigner: fromSigner.signatory
					}
				});
			});
		});

		const agreementsFrom = await Promise.all(promisesFrom);
		const agreementsTo = await Promise.all(promisesTo);
		*/
		// const agreementsFrom : any = [];
		// agreementsFrom.push({
		// 	meta: {
		// 		logIndex:'1',
		// 		transactionIndex:'2',
		// 		transactionHash:'0x180d4s6s8ds6d4e6e4t6ee5dd6ey46j48',
		// 		blockHash:'4',
		// 		cid: 'QmPSe6J67nWcReBaa435AYEVByVv3VjyUQ2tjhnZAfW8Bv',
		// 		blockNumber:'5',
		// 		address:'6'
		// 	},
		// 	event: {
		// 		id: '700',
		// 		from:ethersWallet.wallet.address,
		// 		to:'0x9s4d5a6d4w6r4c7c89s61d31a3d22s',
		// 		agreementFormTemplateId:'10'
		// 	},
		// 	data: {
		// 		agreementForm:'11',
		// 		escrowed:'12',
		// 		validUntil: '13',
		// 		toSigner: '14',
		// 		fromSigner: '15'
		// 	}
		// });
		// agreementsFrom.push({
		// 	meta: {
		// 		logIndex:'16',
		// 		transactionIndex:'17',
		// 		transactionHash:'0x180d4s66d4s6d4e6e4t6d5s4d6ey46j48',
		// 		blockHash:'19',
		// 		cid: 'QmPSe6J67nWcReBaa435AYEVByVv3VjyUQ2tjhnZAfW8Bv',
		// 		blockNumber:'20',
		// 		address:'21'
		// 	},
		// 	event: {
		// 		id: '220',
		// 		from:ethersWallet.wallet.address,
		// 		to:'0x24d5d66s4d5d4w6r6we5c4d5s46df464s',
		// 		agreementFormTemplateId:'25'
		// 	},
		// 	data: {
		// 		agreementForm:'26',
		// 		escrowed:'27',
		// 		validUntil: '28',
		// 		toSigner: '29',
		// 		fromSigner: '30'
		// 	}
		// });
		// const agreementsTo : any = [];

		// agreementsTo.push({
		// 	meta: {
		// 		logIndex:'31',
		// 		transactionIndex:'32',
		// 		transactionHash:'0x180d4s66d4s6dde6eww33e33d7f6ey46j48',
		// 		blockHash:'34',
		// 		cid: 'QmPSe6J67nWcReBaa435AYEVByVv3VjyUQ2tjhnZAfW8Bv',
		// 		blockNumber:'35',
		// 		address:'36',

		// 	},
		// 	event: {
		// 		id: '37',
		// 		from:'0x23d45ds64e4r6e4s6d4bb6h646ds4d5es',
		// 		to:ethersWallet.wallet.address,
		// 		agreementFormTemplateId:'40'
		// 	},
		// 	data: {
		// 		agreementForm:'41',
		// 		escrowed:'42',
		// 		validUntil: '43',
		// 		toSigner: '44',
		// 		fromSigner: '45'
		// 	}
		// });

		// console.log('agreements', agreementsFrom);
		const agreements = await Promise.all(promises);
		console.log('agreements', agreements);

		dispatch(getDocuments(agreements));
	} catch (err) {
		console.log('ln564',err);
		dispatch({
			type: DocumentsActionTypes.GET_DOCUMENTS_FAILURE,
			payload: err.msg
		});
	}
};

export const doUploadDocuments = (file: any) => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.UPLOAD_DOCUMENTS_LOADING });
	// const config = {
	//     headers: {
	//         'Content-type': 'application/json'
	//     }
	// };
	try {
		console.log('uploading documents', file);
		// const res = await axios.post(`${API_ENDPOINT}/documents/`, file, config);
		// dispatch(login(res.data);
		setTimeout(function () {
			dispatch(uploadDocuments());
		}, 3000);
	} catch (err) {
		console.log(err);
		dispatch({
			type: DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE,
			payload: err.msg
		});
	}
};

export const doGetSelectedDocument = (document: any) => async (dispatch: any) => {
	dispatch({ type: DocumentsActionTypes.GET_SELECTED_DOCUMENT_LOADING });
	let fetchedContent = '';
	if(document){
		for await (const chunk of ipfs.cat(document.event.cid.toString())) {
			fetchedContent = uint8ArrayToString(chunk);
		}
		const jsonContent = JSON.parse(fetchedContent);

		let signatureContent = '';

		for await (const chunk of ipfs.cat(jsonContent.sigRef.cid)) {
			signatureContent = uint8ArrayToString(chunk);
		}

		document.signature = signatureContent.substr(0,20) + '...' + 
			signatureContent.substr(signatureContent.length - 20);

		// verify signature

		const fetchedPubKey = jsonContent.publicKey;

		const ec = new eddsa('ed25519');
		const key = ec.keyFromPublic(fetchedPubKey);
		const sigRef = jsonContent.sigRef;
		let sigDocument = '';
		for await (const chunk of ipfs.cat(sigRef.cid)) {
			sigDocument = uint8ArrayToString(chunk);
		}
		
		document.verified = key.verify(jsonContent.digest, sigDocument);
		console.log(document.signature);
	}
	dispatch(getSelectedDocument(document));
};

export const doSetAgreementFormInfo = (formInfo: any) => async (
	dispatch: any
) => {
	try {
		dispatch(setAgreementFormInfo(formInfo));
	} catch (err) {
		console.log(err);
	}
};
