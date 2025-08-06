// This is a placeholder for your contract ABIs.
// Replace with your actual contract ABIs.

export const ChainExABIs = {
  dexAbi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "swapExactETHForTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  stakingAbi: [
      {
          "constant": false,
          "inputs": [
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "stake",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
  ],
  membershipAbi: [
      {
          "constant": false,
          "inputs": [
            {
              "name": "tierId",
              "type": "uint256"
            }
          ],
          "name": "purchaseMembership",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        }
  ]
}
