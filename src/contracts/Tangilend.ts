export const Tangilend_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        }
      ],
      "name": "LoanCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        }
      ],
      "name": "OfferedTerm",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        }
      ],
      "name": "StartedBorrow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        }
      ],
      "name": "StartedLend",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "collateralAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "collateralID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "principal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "apr",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "currency",
          "type": "address"
        }
      ],
      "name": "createLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        }
      ],
      "name": "forfeitCollateral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        }
      ],
      "name": "getRepayment",
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
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "loans",
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
          "internalType": "contract ERC721",
          "name": "collection",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenID",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "principal",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "apr",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "contract ERC20",
              "name": "currency",
              "type": "address"
            }
          ],
          "internalType": "struct Tangilend.Offer",
          "name": "defaultTerm",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "acceptedOfferID",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "enum Tangilend.Status",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "principal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "apr",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "currency",
          "type": "address"
        }
      ],
      "name": "offerLoanTerm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        }
      ],
      "name": "offers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "principal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "apr",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "contract ERC20",
          "name": "currency",
          "type": "address"
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
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        }
      ],
      "name": "removeLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        }
      ],
      "name": "repayLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        }
      ],
      "name": "startBorrowing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        }
      ],
      "name": "startLending",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanID",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "offerID",
          "type": "bytes32"
        }
      ],
      "name": "withdrawOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]