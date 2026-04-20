import type { Hex } from "viem";

export type DefaultChainKey = "celo" | "celoSepolia";

function readPublicVar(name: string, fallback = ""): string {
  return process.env[name] || fallback;
}

function readHexOrUndefined(name: string): Hex | undefined {
  const value = process.env[name];
  return value ? (value as Hex) : undefined;
}

function readBlockNumber(name: string): bigint {
  const value = process.env[name];
  if (!value) return 0n;

  try {
    return BigInt(value);
  } catch {
    return 0n;
  }
}

export const env = {
  appUrl: readPublicVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  defaultChain: (
    process.env.NEXT_PUBLIC_DEFAULT_CHAIN === "celo" ? "celo" : "celoSepolia"
  ) as DefaultChainKey,
  celoMainnetRpcUrl: readPublicVar(
    "NEXT_PUBLIC_CELO_MAINNET_RPC_URL",
    process.env.CELO_MAINNET_RPC_URL || "https://forno.celo.org"
  ),
  celoSepoliaRpcUrl: readPublicVar(
    "NEXT_PUBLIC_CELO_SEPOLIA_RPC_URL",
    process.env.CELO_SEPOLIA_RPC_URL ||
      "https://forno.celo-sepolia.celo-testnet.org"
  ),
  contractAddressMainnet: readHexOrUndefined(
    "NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET"
  ),
  contractAddressSepolia: readHexOrUndefined(
    "NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA"
  ),
  contractDeploymentBlockMainnet: readBlockNumber(
    "NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_MAINNET"
  ),
  contractDeploymentBlockSepolia: readBlockNumber(
    "NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_SEPOLIA"
  )
};
