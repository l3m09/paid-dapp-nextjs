module.exports = {
    VERSION: "0.0.1",
    PaidTokenContract: {
      raw: {
        abi: [
            {
              "inputs": [
                { "internalType": "string", "name": "_name", "type": "string" },
                { "internalType": "string", "name": "_symbol", "type": "string" },
                { "internalType": "uint8", "name": "_decimals", "type": "uint8" },
                { "internalType": "uint256", "name": "_totalSupply", "type": "uint256" }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint8",
                  "name": "groupId",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "AddedToGroup",
              "type": "event",
              "signature": "0x108cdba04fa22e3af2c83669b3a439bae9df498af451d1b1a0a7da5453c97bce"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Approval",
              "type": "event",
              "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "BwAddedAttorney",
              "type": "event",
              "signature": "0x31f2f473acc030385200df8dddbab6686d4287a2166d4fe59a1dc72e37c1d312"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint8",
                  "name": "index",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "value",
                  "type": "address"
                }
              ],
              "name": "BwAddressSet",
              "type": "event",
              "signature": "0x8cc0f227b50d2cd57a989ac8e5ac9ff81662899e257e22a2b2de18834d66d5a6"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint8",
                  "name": "index",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                }
              ],
              "name": "BwQuillSet",
              "type": "event",
              "signature": "0xb7abafb9dcfc483442e92be6fab9775ae4d5fc9a8ffd19092d2475ed92d8005a"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "BwRemovedAdmin",
              "type": "event",
              "signature": "0xdd03a410a9b379c5c31df9bbec14f14840e84bec6958bba98d9c5df9fe4d713d"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "BwRemovedAttorney",
              "type": "event",
              "signature": "0xd1150a5bd2b0e9576d0be9aca2590fe10d79688e2026d41c3eeaa22d72bba1c4"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint64",
                  "name": "expiration",
                  "type": "uint64"
                },
                {
                  "indexed": false,
                  "internalType": "uint32",
                  "name": "periodLength",
                  "type": "uint32"
                },
                {
                  "indexed": false,
                  "internalType": "uint16",
                  "name": "periodCount",
                  "type": "uint16"
                }
              ],
              "name": "Locked",
              "type": "event",
              "signature": "0xddbc17715b9953cb1c631284bf34bc1f01934caee8c4f89d47cec8732a2f1494"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "MultiTransferPrevented",
              "type": "event",
              "signature": "0x57b832b60cac2d336bd974f846b5d4c4af5aeeeb2dbd0f8cbd3ea89fc9078eea"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "attorney",
                  "type": "bool"
                }
              ],
              "name": "Paused",
              "type": "event",
              "signature": "0xe8699cf681560fd07de85543bd994263f4557bdc5179dd702f256d15fd083e1d"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "order",
                  "type": "uint256"
                }
              ],
              "name": "Payment",
              "type": "event",
              "signature": "0x10258bfd896826cf69e885380049b1d1be0424a813d5117744373ec9f51bc86c"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint8",
                  "name": "groupId",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "RemovedFromGroup",
              "type": "event",
              "signature": "0x0e1900eb0958d3192c4824b787e78e8b534e429190d9d837ecbfb6257a8a1b1c"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "unlockTime",
                  "type": "uint256"
                }
              ],
              "name": "SetNewUnlockTime",
              "type": "event",
              "signature": "0x285ed4cab839e54405276e9e5f06f35f2f12e1d626384e4632854919077f7c7a"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "suggestionId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "text",
                  "type": "string"
                }
              ],
              "name": "SuggestionCreated",
              "type": "event",
              "signature": "0xbf516e0d163afacd132d846cf9538bcfc94834845151f27cdc9ba1ded8f063ad"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "fromChain",
                  "type": "string"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "swapId",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "SwapFromChain",
              "type": "event",
              "signature": "0x9403091f5664cd6d32ddbe58f2efce74b16b45841968713ab48a95da381203b1"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "toChain",
                  "type": "string"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "swapId",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "SwapToChain",
              "type": "event",
              "signature": "0x6bc4afad47e010c4a48e00a6b9a230555e1c4e8420c1ede42f30b54ebb4c3fcd"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Transfer",
              "type": "event",
              "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint16",
                  "name": "periodsLeft",
                  "type": "uint16"
                }
              ],
              "name": "Unlocked",
              "type": "event",
              "signature": "0x9a28dc0f48ec36a159106c19199977fe86124fd78cf91ebe0345a1e93ecaccf8"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "Unpaused",
              "type": "event",
              "signature": "0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "voter",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "suggestionId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "votes",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "totalVotes",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "comment",
                  "type": "string"
                }
              ],
              "name": "Votes",
              "type": "event",
              "signature": "0x4fa7d628f07312402be45de3ce5d77059237591939a1154550b9a3166550ebcd"
            },
            {
              "inputs": [],
              "name": "ADMIN",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x2a0acc6a"
            },
            {
              "inputs": [],
              "name": "ATTORNEY",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x40dce49a"
            },
            {
              "inputs": [],
              "name": "BUNDLER",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x32a49578"
            },
            {
              "inputs": [],
              "name": "BW_ADMIN",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x97599fd9"
            },
            {
              "inputs": [],
              "name": "DELEGATE",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x4a2d5c9d"
            },
            {
              "inputs": [],
              "name": "FROZEN",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x3b5764eb"
            },
            {
              "inputs": [],
              "name": "SWAPPER",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x700d85ae"
            },
            {
              "inputs": [],
              "name": "WHITELIST",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x1bb7cc99"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addAdmin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x70480275"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addAttorney",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x380a75bf"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addBundler",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xce531ff1"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addBwAdmin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x40abfe26"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addDelegate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xe71bdf41"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addSwapper",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x99385006"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "addToWhitelist",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xe43252d7"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "owner", "type": "address" },
                { "internalType": "address", "name": "spender", "type": "address" }
              ],
              "name": "allowance",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xdd62ed3e"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" }
              ],
              "name": "approve",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x095ea7b3"
            },
            {
              "inputs": [],
              "name": "attorneyEmail",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xefa1937d"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "availableBalanceOf",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x25d998bb"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "balanceOf",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x70a08231"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "bwAddAttorney",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x89cf785a"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "bwRemoveAdmin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xa75d5254"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "bwRemoveAttorney",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x13c3e409"
            },
            {
              "inputs": [],
              "name": "bwtype",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x7c7b0e61"
            },
            {
              "inputs": [],
              "name": "bwver",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x4f2bf9d1"
            },
            {
              "inputs": [
                { "internalType": "bool", "name": "restrictSuggestions", "type": "bool" },
                { "internalType": "bool", "name": "balanceForVote", "type": "bool" },
                {
                  "internalType": "bool",
                  "name": "balanceForCreateSuggestion",
                  "type": "bool"
                },
                { "internalType": "uint256", "name": "cost", "type": "uint256" },
                { "internalType": "bool", "name": "oneVote", "type": "bool" }
              ],
              "name": "configureVoting",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x7ad44d60"
            },
            {
              "inputs": [{ "internalType": "string", "name": "text", "type": "string" }],
              "name": "createSuggestion",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x33b15378"
            },
            {
              "inputs": [],
              "name": "decimals",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x313ce567"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                {
                  "internalType": "uint256",
                  "name": "subtractedValue",
                  "type": "uint256"
                }
              ],
              "name": "decreaseAllowance",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xa457c2d7"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "freeze",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x8d1fdf2f"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" },
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" }
              ],
              "name": "getAccountVotes",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x111c5bee"
            },
            {
              "inputs": [],
              "name": "getAllSuggestionCreators",
              "outputs": [
                { "internalType": "address[]", "name": "", "type": "address[]" }
              ],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xb306f735"
            },
            {
              "inputs": [],
              "name": "getAllVotes",
              "outputs": [
                { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
              ],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x851b6ef2"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "getBwAddress1",
              "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x86f96d67"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "getBwQuill1",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x82a45f58"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" }
              ],
              "name": "getSuggestionCreator",
              "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x26d2527c"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" }
              ],
              "name": "getSuggestionText",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xd157f8c8"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" }
              ],
              "name": "getVotes",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xff981099"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" },
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" }
              ],
              "name": "hasVoted",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x42545825"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
              ],
              "name": "increaseAllowance",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x39509351"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isAdmin",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x24d7806c"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isAttorney",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xf7af4a30"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isBundler",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x551530d6"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isBwAdmin",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xbc9ac68c"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isDelegate",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x07779627"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isFrozen",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xe5839836"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isSwapper",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xb64230ba"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "isWhitelisted",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x3af32abf"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "locksOf",
              "outputs": [
                { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
              ],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xc3f9ab58"
            },
            {
              "inputs": [
                { "internalType": "address[]", "name": "account", "type": "address[]" }
              ],
              "name": "multiFreeze",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xde1be3c2"
            },
            {
              "inputs": [
                { "internalType": "address[]", "name": "to", "type": "address[]" },
                { "internalType": "uint256[]", "name": "value", "type": "uint256[]" }
              ],
              "name": "multiTransfer",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x1e89d545"
            },
            {
              "inputs": [
                { "internalType": "address[]", "name": "to", "type": "address[]" },
                { "internalType": "uint256[]", "name": "value", "type": "uint256[]" },
                { "internalType": "uint32", "name": "lockTime", "type": "uint32" },
                { "internalType": "uint32", "name": "periodLength", "type": "uint32" },
                { "internalType": "uint16", "name": "periods", "type": "uint16" }
              ],
              "name": "multiTransferAndLock",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x7275f3c8"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "from", "type": "address" },
                { "internalType": "address[]", "name": "to", "type": "address[]" },
                { "internalType": "uint256[]", "name": "value", "type": "uint256[]" }
              ],
              "name": "multiTransferFrom",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xcb31b6cd"
            },
            {
              "inputs": [
                { "internalType": "address[]", "name": "account", "type": "address[]" }
              ],
              "name": "multiUnfreeze",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xf1eddfd5"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" },
                { "internalType": "uint256", "name": "votes", "type": "uint256" },
                { "internalType": "string", "name": "comment", "type": "string" }
              ],
              "name": "multiVote",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x8fad11bf"
            },
            {
              "inputs": [],
              "name": "name",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x06fdde03"
            },
            {
              "inputs": [],
              "name": "oneVotePerAccount",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xc93dbc49"
            },
            {
              "inputs": [],
              "name": "pause",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x8456cb59"
            },
            {
              "inputs": [],
              "name": "paused",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x5c975abb"
            },
            {
              "inputs": [],
              "name": "pausedByAttorney",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xae1ccf2c"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" },
                { "internalType": "uint256", "name": "order", "type": "uint256" }
              ],
              "name": "payment",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x9b91293b"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeAdmin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x1785f53c"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeAttorney",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x3192d50a"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeBundler",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x25db64c0"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeDelegate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x67e7646f"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeFromWhitelist",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x8ab1d681"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "removeSwapper",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x3f2d4131"
            },
            {
              "inputs": [],
              "name": "renounceBwAdmin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xe19e4349"
            },
            {
              "inputs": [],
              "name": "requireBalanceForCreateSuggestion",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x373ccc52"
            },
            {
              "inputs": [],
              "name": "requireBalanceForVote",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x72160860"
            },
            {
              "inputs": [{ "internalType": "string", "name": "email", "type": "string" }],
              "name": "setAttorneyEmail",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x33fd8b4e"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" },
                { "internalType": "address", "name": "value", "type": "address" }
              ],
              "name": "setBwAddress1",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x670d403b"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" },
                { "internalType": "string", "name": "value", "type": "string" }
              ],
              "name": "setBwQuill1",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x37607f01"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
              ],
              "name": "setUnlockTime",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xdace4557"
            },
            {
              "inputs": [],
              "name": "suggestionCount",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x8027d6cc"
            },
            {
              "inputs": [],
              "name": "suggestionsRestricted",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x7c365c2c"
            },
            {
              "inputs": [
                { "internalType": "string", "name": "fromChain", "type": "string" },
                { "internalType": "address", "name": "from", "type": "address" },
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "bytes32", "name": "swapId", "type": "bytes32" },
                { "internalType": "uint256", "name": "value", "type": "uint256" }
              ],
              "name": "swapFromChain",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x9f9b58d3"
            },
            {
              "inputs": [],
              "name": "swapNonce",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x53f74a7e"
            },
            {
              "inputs": [
                { "internalType": "string", "name": "chain", "type": "string" },
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" }
              ],
              "name": "swapToChain",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x6c76c2a1"
            },
            {
              "inputs": [],
              "name": "symbol",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x95d89b41"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "totalLocked",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xd8fb9337"
            },
            {
              "inputs": [],
              "name": "totalSupply",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x18160ddd"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "totalUnlockable",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x6f9336a9"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" }
              ],
              "name": "transfer",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xa9059cbb"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" },
                { "internalType": "uint32", "name": "lockTime", "type": "uint32" },
                { "internalType": "uint32", "name": "periodLength", "type": "uint32" },
                { "internalType": "uint16", "name": "periods", "type": "uint16" }
              ],
              "name": "transferAndLock",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x633db62c"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "from", "type": "address" },
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "value", "type": "uint256" }
              ],
              "name": "transferFrom",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x23b872dd"
            },
            {
              "inputs": [],
              "name": "transferLockTime",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0xe87a7a59"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "unfreeze",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x45c8b1a6"
            },
            {
              "inputs": [],
              "name": "unlock",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0xa69df4b5"
            },
            {
              "inputs": [],
              "name": "unlockTime",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x251c1aa3"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "unlockedBalanceOf",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x84955c88"
            },
            {
              "inputs": [],
              "name": "unpause",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x3f4ba83a"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "suggestionId", "type": "uint256" },
                { "internalType": "string", "name": "comment", "type": "string" }
              ],
              "name": "vote",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x24108475"
            },
            {
              "inputs": [],
              "name": "voteCost",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function",
              "signature": "0x4c1b8ffd"
            },
            {
              "inputs": [],
              "name": "withdrawTokens",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
              "signature": "0x8d8f2adb"
            }
          ],
      },
      address: {
          rinkeby: "0x312677f89B5301515CFcA95a3F8806797130720d",
      },
    },
}