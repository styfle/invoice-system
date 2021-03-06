export const invoiceABI = {
  "contract_name": "InvoiceContract",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_transactionNum",
          "type": "uint256"
        },
        {
          "name": "_invoiceHash",
          "type": "bytes32"
        }
      ],
      "name": "sendPaymentLog",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_invoiceHash",
          "type": "bytes32"
        }
      ],
      "name": "sendPaymentRequest",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_transactionNum",
          "type": "uint256"
        }
      ],
      "name": "cancelPaymentRequest",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_partyA",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "transactionNum",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "invoiceHash",
          "type": "bytes32"
        }
      ],
      "name": "sentPaymentRequest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "transactionNum",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "invoiceHash",
          "type": "bytes32"
        }
      ],
      "name": "sentPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "transactionNum",
          "type": "uint256"
        }
      ],
      "name": "paymentRequestCancelled",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x606060405260018054600160a060020a03191633600160a060020a0316179055341561002757fe5b6040516020806103d483398101604052515b60008054600160a060020a031916600160a060020a0383161790555b505b61036e806100666000396000f300606060405263ffffffff60e060020a6000350416632a701a82811461003757806394609a311461004f578063e873114d14610064575bfe5b341561003f57fe5b61004d600435602435610079565b005b341561005757fe5b61004d600435610138565b005b341561006c57fe5b61004d6004356101f9565b005b600154600160a060020a0390811690331681146100965760006000fd5b816002848154811015156100a657fe5b906000526020600020906002020160005b50556002805460019190859081106100cb57fe5b906000526020600020906002020160005b5060010180549115156101000261ff0019909216919091179055604080518481526020810184905281517f5f01253f23ba42ce9ce4eb00cd8001659dbdd494d87ddc2572b37d3c2ec599a7929181900390910190a15b5b505050565b600054600160a060020a0390811690331681146101555760006000fd5b600280546001810161016783826102e2565b916000526020600020906002020160005b506040805160608101825285815260016020808301829052600092840192909252868455928301805460ff191690931761ff001916909255600354815190815291820185905280517f70c5828cb94c178c32baf13f86282ef03f04ba17525d6ca30fa0211d645a99f19350918290030190a16003805460010190555b5b5050565b600054600154600160a060020a039182169190811690331682148061022f575080600160a060020a031633600160a060020a0316145b151561023b5760006000fd5b600280548490811061024957fe5b906000526020600020906002020160005b5060010154610100900460ff16156102725760006000fd5b600060028481548110151561028357fe5b906000526020600020906002020160005b50600101805460ff19169115159190911790556040805184815290517fae54c2e482351c899f34e0732eef919606c1f074109a91f5d80a3a11c9f51fdc916020908290030190a15b5b505050565b815481835581811511610132576002028160020283600052602060002091820191016101329190610314565b5b505050565b61033f91905b8082111561033b576000815560018101805461ffff1916905560020161031a565b5090565b905600a165627a7a72305820807b821a747dd56b1f9120db47b9e95bc5da10f8187fb71e877f71ea33b4df740029",
  "networks": {
    "1500765566889": {
      "events": {
        "0x1a6d94b506162abad78177fed4f84b03c010ebac596ab2b2538a1b86b5f71b31": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "uniqueTransactionKey",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "invoiceHash",
              "type": "bytes32"
            }
          ],
          "name": "sentPaymentRequest",
          "type": "event"
        },
        "0x56587d003ce199806388dc71a1ad4d26789b666c4894e77a73685593d77b8f36": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "uniqueTransactionKey",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "invoiceHash",
              "type": "bytes32"
            }
          ],
          "name": "sentPayment",
          "type": "event"
        },
        "0xbc8d6b9cfc3138b837868be50815a0cbb9f1dc4690452e23e77218a005c8941e": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "uniqueTransactionKey",
              "type": "bytes32"
            }
          ],
          "name": "paymentRequestCancelled",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x65b76ca91f6ec94b3eb8f2e750065e2a9cad712f",
      "updated_at": 1500768201747
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1500803678236
}