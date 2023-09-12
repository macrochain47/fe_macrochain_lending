export const LendingData = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "acceptTerm",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721Enumerable",
				"name": "nft",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "claimAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "loanduration",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "payableCurrency",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			},
			{
				"internalType": "uint160",
				"name": "interestRate",
				"type": "uint160"
			}
		],
		"name": "DepositOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721Enumerable",
				"name": "nft",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LoanDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collateralId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "payableCurrency",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			},
			{
				"internalType": "uint160",
				"name": "interestRate",
				"type": "uint160"
			}
		],
		"name": "listLoan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721Enumerable",
				"name": "nft",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "payback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "LoanEnd",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "LoanEndTime",
				"type": "uint256"
			}
		],
		"name": "LoanStart",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "depositId",
				"type": "uint256"
			}
		],
		"name": "startLoan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "depositId",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BASIS_POINTS_DENOMINATOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "interestRate",
				"type": "uint256"
			}
		],
		"name": "getFullInterestAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "INSTALLMENT_PERIOD_MULTIPLIER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "INTEREST_RATE_DENOMINATOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listDeposits",
		"outputs": [
			{
				"internalType": "address",
				"name": "lender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "loanduration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LoanStartTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LoanEndtime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "payableCurrency",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			},
			{
				"internalType": "uint160",
				"name": "interestRate",
				"type": "uint160"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Loans",
		"outputs": [
			{
				"internalType": "address",
				"name": "lender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanduration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LoanStartTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LoanEndtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collateralId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "payableCurrency",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			},
			{
				"internalType": "uint160",
				"name": "interestRate",
				"type": "uint160"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]