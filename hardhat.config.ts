import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import type { HardhatUserConfig } from "hardhat/config";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];
const verificationApiKey =
  process.env.ETHERSCAN_API_KEY || process.env.CELOSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    celo: {
      url: process.env.CELO_MAINNET_RPC_URL || "https://forno.celo.org",
      chainId: 42220,
      accounts
    },
    celoSepolia: {
      url:
        process.env.CELO_SEPOLIA_RPC_URL ||
        "https://forno.celo-sepolia.celo-testnet.org",
      chainId: 11142220,
      accounts
    }
  },
  etherscan: {
    apiKey: {
      celo: verificationApiKey,
      celoSepolia: verificationApiKey
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://celoscan.io"
        }
      },
      {
        network: "celoSepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://sepolia.celoscan.io"
        }
      }
    ]
  }
};

export default config;
