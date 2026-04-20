import type { Hex } from "viem";
import { celo, celoSepolia } from "viem/chains";
import { env } from "./env";

export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_SEPOLIA_CHAIN_ID = 11142220;

export function getDefaultChainId(): number {
  return env.defaultChain === "celo"
    ? CELO_MAINNET_CHAIN_ID
    : CELO_SEPOLIA_CHAIN_ID;
}

export function getChainConfig(chainId = getDefaultChainId()) {
  return chainId === CELO_MAINNET_CHAIN_ID ? celo : celoSepolia;
}

export function getChainLabel(chainId = getDefaultChainId()) {
  return chainId === CELO_MAINNET_CHAIN_ID ? "Celo Mainnet" : "Celo Sepolia";
}

export function getRpcUrl(chainId = getDefaultChainId()) {
  return chainId === CELO_MAINNET_CHAIN_ID
    ? env.celoMainnetRpcUrl
    : env.celoSepoliaRpcUrl;
}

export function getExplorerBaseUrl(chainId = getDefaultChainId()) {
  return chainId === CELO_MAINNET_CHAIN_ID
    ? "https://celoscan.io"
    : "https://celo-sepolia.blockscout.com";
}

export function getContractAddress(chainId = getDefaultChainId()): Hex | null {
  return chainId === CELO_MAINNET_CHAIN_ID
    ? env.contractAddressMainnet || null
    : env.contractAddressSepolia || null;
}

export function getContractDeploymentBlock(chainId = getDefaultChainId()) {
  return chainId === CELO_MAINNET_CHAIN_ID
    ? env.contractDeploymentBlockMainnet
    : env.contractDeploymentBlockSepolia;
}

export function resolveContractAddressForChain(
  chainId: number,
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  }
) {
  return chainId === CELO_MAINNET_CHAIN_ID
    ? contractAddresses.celo
    : contractAddresses.celoSepolia;
}

export function isSupportedCeloChain(chainId?: number): chainId is number {
  return chainId === CELO_MAINNET_CHAIN_ID || chainId === CELO_SEPOLIA_CHAIN_ID;
}
