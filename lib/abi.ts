export const payLinkAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "allowedTokens",
        type: "address[]",
        internalType: "address[]"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "PaymentSent",
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "recipient",
        type: "address",
        internalType: "address"
      },
      {
        indexed: true,
        name: "payer",
        type: "address",
        internalType: "address"
      },
      {
        indexed: true,
        name: "token",
        type: "address",
        internalType: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
        internalType: "uint256"
      },
      {
        indexed: false,
        name: "paymentReference",
        type: "string",
        internalType: "string"
      },
      {
        indexed: false,
        name: "handle",
        type: "string",
        internalType: "string"
      }
    ]
  },
  {
    type: "event",
    name: "ProfileSet",
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
        internalType: "address"
      },
      {
        indexed: false,
        name: "handle",
        type: "string",
        internalType: "string"
      },
      {
        indexed: false,
        name: "displayName",
        type: "string",
        internalType: "string"
      },
      {
        indexed: false,
        name: "preferredToken",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "function",
    name: "getProfile",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PayLinkProfile.Profile",
        components: [
          { name: "owner", type: "address", internalType: "address" },
          { name: "handle", type: "string", internalType: "string" },
          { name: "displayName", type: "string", internalType: "string" },
          { name: "bio", type: "string", internalType: "string" },
          {
            name: "paymentMessage",
            type: "string",
            internalType: "string"
          },
          {
            name: "preferredToken",
            type: "address",
            internalType: "address"
          },
          { name: "exists", type: "bool", internalType: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "getProfileByHandle",
    stateMutability: "view",
    inputs: [
      {
        name: "handle",
        type: "string",
        internalType: "string"
      }
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PayLinkProfile.Profile",
        components: [
          { name: "owner", type: "address", internalType: "address" },
          { name: "handle", type: "string", internalType: "string" },
          { name: "displayName", type: "string", internalType: "string" },
          { name: "bio", type: "string", internalType: "string" },
          {
            name: "paymentMessage",
            type: "string",
            internalType: "string"
          },
          {
            name: "preferredToken",
            type: "address",
            internalType: "address"
          },
          { name: "exists", type: "bool", internalType: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "pay",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipientOrHandle",
        type: "string",
        internalType: "string"
      },
      {
        name: "token",
        type: "address",
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "paymentReference",
        type: "string",
        internalType: "string"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "resolveHandle",
    stateMutability: "view",
    inputs: [
      {
        name: "handle",
        type: "string",
        internalType: "string"
      }
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "function",
    name: "setProfile",
    stateMutability: "nonpayable",
    inputs: [
      { name: "handle", type: "string", internalType: "string" },
      { name: "displayName", type: "string", internalType: "string" },
      { name: "bio", type: "string", internalType: "string" },
      {
        name: "paymentMessage",
        type: "string",
        internalType: "string"
      },
      {
        name: "preferredToken",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "supportedTokens",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address", internalType: "address" }
    ],
    outputs: [
      { name: "", type: "bool", internalType: "bool" }
    ]
  }
] as const;

export const erc20Abi = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" }
    ],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      { name: "", type: "bool", internalType: "bool" }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address", internalType: "address" }
    ],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" }
    ]
  }
] as const;
