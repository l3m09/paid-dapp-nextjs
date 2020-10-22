import Web3 from 'web3';

export const signAndSendRawTransaction = async (
	web3: Web3,
	privateKey: string,
	to: string,
	gasPriceCoef: number | null,
	gas: number | null,
	data: string
) => {
	if (!gasPriceCoef) gasPriceCoef = 0;
	if (!gas) gas = 1000000;

	let txBody = {
		to,
		gas,
		data,
		gasPriceCoef,
		from: web3.eth.defaultAccount ? web3.eth.defaultAccount : ''
	};

	const { rawTransaction } = await web3.eth.accounts.signTransaction(
		txBody,
		privateKey
	);
	if (rawTransaction) {
		return await web3.eth.sendSignedTransaction(rawTransaction);
	}

	return null;
};
