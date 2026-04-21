import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import type { HardhatUserConfig } from "hardhat/config";
import { serverEnv } from "./lib/server-env";

const accounts = serverEnv.privateKey ? [serverEnv.privateKey] : [];
const verificationApiKey =
  serverEnv.etherscanApiKey || serverEnv.celoscanApiKey || "";

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
      url: serverEnv.celoMainnetRpcUrl,
      chainId: 42220,
      accounts
    },
    celoSepolia: {
      url: serverEnv.celoSepoliaRpcUrl,
      chainId: 11142220,
      accounts
    }
  },
  etherscan: {
    apiKey: verificationApiKey,
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
