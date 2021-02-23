module.exports = {
    VERSION: "1.0.0",
    PAIDMockup: {
        wallet:{
                currentWallet: {
                    address: '0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c',
                    address_eth: '0x46a2ECcb7d7212bEAb99132B0F2129bC06e1e7Fe',
                    balance: '6.40549549',
                    balanceToken: '13809',
                    balanceEth: '0.1',
                    network: 'bsc-mainnet', //bsc-mainnet, testnet
                    network_eth: 'mainnet', // ,mainnet, rinkeby, ropsten
                },
                selectedWallet: null,
                settingCurrentWallet: false, // true when loading the wallet
                gettingCurrentWallet: false, 
                selectedToken: 'paid', // paid or bnb
                settingCurrentToken: false, // true when loading the token
                gettingCurrentToken: false,
                unlockingWallet: false, // true when unlocked the wallet
                unlockedWallet: null, // true when de wallet is unlocked
                connectingWallet: false, //true when connecting wallet (case metamask or binance)
                connectedWallet: null, // true when connected wallet (case metamask or binance)
                openCurrentWallet: false,
                error: null // when is different  null is a string with a message error
        },
        document: {
            loading: false, // true when is loading the documents
            error: null, // different to null is a string with a error message
            creatingAgreement: false, // true while creating a agreements
            documentsFrom: [{
                meta: {
                    logIndex: 0,
                    transactionIndex: 0,
                    transactionHash: '',
                    blockHash: '',
                    blockNumber: 0,
                    address: ''
                },
                event:{
                    id: '',
                    from: '',
                    to: '',
                    agreementFormTemplateId: '',
                    cid: '',
                    status: '',
                    created_at: 0,
                    updated_at: 0,
                },
                data: {
                    documentName: '',
                    partyAName:'',
                    partyBName:'',
                    agreementForm:'',
                    escrowed:'',
                    validUntil: '',
                    toSigner: '',
                    fromSigner: ''
                }
            }, {
                data: {
                    agreementForm: "0x30c6c52cc20770bc52989a2504bce2fd00252ca25fe3f176a393b5b09fd3e51c",
                    documentName: "CIIA",
                    escrowed: false,
                    fromSigner: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                    partyAName: "alfredo",
                    partyBName: "ruben",
                    toSigner: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                    validUntil: "0",
                },
                event: {
                    agreementFormTemplateId: "0x6369696100000000000000000000000000000000000000000000000000000000",
                    cid: "QmTREiNABLjf26rAXrrxH2MYYqMtN4FopaEsnKFAmPko3x",
                    created_at: "1613099257",
                    from: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                    id: "16",
                    status: "9",
                    to: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                    updated_at: "1613099386",
                },
                meta: {
                    address: "0x85989B58b6898649377f3e85Bec441C3Df04ec0e",
                    blockHash: "0x124d01e31fc82e562d53d5b8e262801d521320a22552f34535bfda52da4555d5",
                    blockNumber: 4804661,
                    logIndex: 1,
                    transactionHash: "0x696f939be12e8d23a965800e346cdfd47e2d39d98390b7bd3abc2f88faeddc9d",
                    transactionIndex: 1,
            }
        } , {
                data: {
                    agreementForm: "0x30c6c52cc20770bc52989a2504bce2fd00252ca25fe3f176a393b5b09fd3e51c",
                    documentName: "CIIA",
                    escrowed: false,
                    fromSigner: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                    partyAName: "alfredo",
                    partyBName: "ruben",
                    toSigner: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                    validUntil: "0",
                },
                event: {
                    agreementFormTemplateId: "0x6369696100000000000000000000000000000000000000000000000000000000",
                    cid: "QmTREiNABLjf26rAXrrxH2MYYqMtN4FopaEsnKFAmPko3x",
                    created_at: "1613099344",
                    from: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                    id: "17",
                    status: "1",
                    to: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                    updated_at: "1613099407",
                },
                meta: {
                    address: "0x85989B58b6898649377f3e85Bec441C3Df04ec0e",
                    blockHash: "0x993a2f72e2e6b4d37782f7637f68bfd200cdcb5a2beca925dab0d894404ebaed",
                    blockNumber: 4804690,
                    logIndex: 0,
                    transactionHash: "0x92f3cbc315646bab3fab4194271aaae8e48387d60494b9c34f3c56551d5e9c1e",
                    transactionIndex: 0,
                },
        }, {
            data: {
                agreementForm: "0x30c6c52cc20770bc52989a2504bce2fd00252ca25fe3f176a393b5b09fd3e51c",
                documentName: "CIIA",
                escrowed: false,
                fromSigner: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                partyAName: "alfredo",
                partyBName: "ruben",
                toSigner: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                validUntil: "0",
            },
            event: {
                agreementFormTemplateId: "0x6369696100000000000000000000000000000000000000000000000000000000",
                cid: "QmRvokVC3gMEe8p1wSEQ48rbSyVNBoSPsUXAYFH3S5BzRN",
                created_at: "1613099257",
                from: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                id: "16",
                status: "9",
                to: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                updated_at: "1613099386",
            },
            meta: {
                address: "0x85989B58b6898649377f3e85Bec441C3Df04ec0e",
                blockHash: "0xf6bc9f718f7fe3c9e7cfbda6d30a60704c815545fa448ab8adedb61096a3efcc",
                blockNumber: 4804704,
                logIndex: 0,
                transactionHash: "0x2571c4cc1e39ffbf2c6584fe3061bead0eb9d3f504ca3a677ea912d3e621d913",
                transactionIndex: 0,
            }
        }, {
            data: {
                agreementForm: "0x6a04db469d7b3ec69ff05bd69da283b47e6cb564b5c3142f9848b13d04948f16",
                documentName: "MUTUAL NONDISCLOSURE AGREEMENT",
                escrowed: false,
                fromSigner: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                partyAName: "Alfredo Lopez Herize",
                partyBName: "ruben",
                toSigner: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                validUntil: "0",
            },
            event:
            {
                agreementFormTemplateId: "0x6e64610000000000000000000000000000000000000000000000000000000000",
                cid: "QmdYKmW21omf19zsxh7dn76gfQNS7RHe12GXZm8NR73edF",
                created_at: "1613168672",
                from: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                id: "25",
                status: "9",
                to: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                updated_at: "1613168705",
            },
            meta: {
                address: "0x85989B58b6898649377f3e85Bec441C3Df04ec0e",
                blockHash: "0x8cca6eebeaf65bc42b4c199a7dd5c7f55b178c3c3a9f4821e3be821c25e71a6a",
                blockNumber: 4827799,
                logIndex: 0,
                transactionHash: "0x9c82b1009da6fcd37d2853baf69cbf2d89bdbf9dea3938c975e8e02469d611ea",
                transactionIndex: 0,
            }
        }, {
            data: {
                agreementForm: "0x6a04db469d7b3ec69ff05bd69da283b47e6cb564b5c3142f9848b13d04948f16",
                documentName: "MUTUAL NONDISCLOSURE AGREEMENT",
                escrowed: false,
                fromSigner: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                partyAName: "Alfredo Lopez Herize",
                partyBName: "ruben",
                toSigner: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                validUntil: "0",
            },
            event: {
                agreementFormTemplateId: "0x6e64610000000000000000000000000000000000000000000000000000000000",
                cid: "QmY27KGrsvGwcge6FdDnQE1uHtXWv2iKJr1JcrG8KvviFT",
                created_at: "1613168672",
                from: "0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e",
                id: "25",
                status: "9",
                to: "0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c",
                updated_at: "1613168705",
            },
            meta: {
                address: "0x85989B58b6898649377f3e85Bec441C3Df04ec0e",
                blockHash: "0x368cfbb90f6e222118328faf89f15c0f43c280d1e6efd96fe9c061cdba292fed",
                blockNumber: 4827810,
                logIndex: 8,
                transactionHash: "0xe2533f051a2f267e436b481d83764c7f1a86a0f0f75368edab800f44eef6ab23",
                transactionIndex: 1,
            }
        }],
            documentsTo: [],
            selectedDocument: null,
            agreementTypes: [
                {
                    code: 'nda',
                    name: 'Mutual-NDA'
                },
                {
                    code: 'advisorAgreement',
                    name: 'Advisor'
                },
                {
                    code: 'ciia',
                    name: 'CIIA'
                },
                {
                    code: 'consultingAgreement',
                    name: 'Consulting'
                },
                {
                    code: 'referalAgreement',
                    name: 'Referral'
                },
                {
                    code: 'saftAgreement',
                    name: 'SAFT'
                }
            ],
            agreementFormInfo: {
                email: 'party@paidnetwork.com',
                confirmEmail: 'party@paidnetwork.com',
                name: 'Party A',
                address: 'Los Angeles',
                phone: '(555)-678-6403',
                partyWallet: '0x739Af4aa67c15DF4D4eae3619b06532Ac5Aef65e',
                counterpartyEmail: 'counterparty@paidnetwork.com',
                counterpartyConfirmEmail: 'counterparty@paidnetwork.com',
                counterpartyWallet: '0x24712cD9219081C9E1272B5d4aC2B8fdc66C076c',
                counterpartyName: 'Party B',
                counterpartyAddress: 'San Francisco',
                counterpartyPhone: '(555)-565-3433',
                createdAt: null
            },
            keepMyInfo: false,
            notification: ['You created a new CIIA', 'Ruben created a new NDA', 'PartyB countersigns NDA and agreement status changed to: ACCEPT']
        }
    }
}