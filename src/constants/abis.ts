// This is a placeholder for your contract ABIs.
// Replace with your actual contract ABIs.

export const TOKEN_SWAP_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenIn",
        "type": "address"
      },
      {
        "name": "tokenOut",
        "type": "address"
      },
      {
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "name": "swap",
    "outputs": [
      {
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];

export const STAKING_ABI = [
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
];

export const MEMBERSHIP_ABI = [
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
