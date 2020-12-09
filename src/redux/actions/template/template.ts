const template = require('./agreement.html.js');

export const templateRender = (payload: {
	party_name: any;
	party_wallet: any;
	party_address: any;
	counterparty_name: any;
	counterparty_wallet: any;
	counterparty_address: any;
	create_date: any;
}) => () => {
	const { party_name, party_wallet, party_address, counterparty_name, counterparty_wallet, counterparty_address, create_date } = payload;
	const party_name_regex = /{party_name}/g;
	const party_wallet_regex = /{party_wallet}/g;
	const party_address_regex = /{party_address}/g;
	const counterparty_name_regex = /{counterparty_name}/g;
	const counterparty_wallet_regex = /{counterparty_wallet}/g;
	const counterparty_address_regex = /{counterparty_address}/g;
	const response = template
		.replace('{create_date}', create_date)
		.replace(party_name_regex, party_name)
		.replace(party_wallet_regex, party_wallet)
		.replace(party_address_regex, party_address)
		.replace(counterparty_name_regex, counterparty_name)
		.replace(counterparty_wallet_regex, counterparty_wallet)
		.replace(counterparty_address_regex, counterparty_address);
	return response;
};