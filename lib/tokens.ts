import type { Hex } from "viem";
import { CELO_MAINNET_CHAIN_ID, CELO_SEPOLIA_CHAIN_ID } from "./chains";

export type SupportedTokenSymbol = "USDm" | "USDC" | "USD₮";

export type SupportedToken = {
  symbol: SupportedTokenSymbol;
  name: string;
  decimals: number;
  accent: string;
  addresses: {
    42220: Hex;
    11142220: Hex;
  };
};

export const SUPPORTED_TOKENS: readonly SupportedToken[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    accent: "from-sky-400 to-cyan-300",
    addresses: {
      42220: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
      11142220: "0x01C5C0122039549AD1493B8220cABEdD739BC44E"
    }
  },
  {
    symbol: "USD₮",
    name: "Tether USD",
    decimals: 6,
    accent: "from-teal-400 to-green-300",
    addresses: {
      42220: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
      11142220: "0xd077A400968890Eacc75cdc901F0356c943e4fDb"
    }
  },
  {
    symbol: "USDm",
    name: "Mento Dollar",
    decimals: 18,
    accent: "from-emerald-400 to-lime-300",
    addresses: {
      42220: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      11142220: "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b"
    }
  }
] as const;

export function getSupportedTokens(chainId = CELO_MAINNET_CHAIN_ID) {
  const resolvedChainId =
    chainId === CELO_MAINNET_CHAIN_ID
      ? CELO_MAINNET_CHAIN_ID
      : CELO_SEPOLIA_CHAIN_ID;

  return SUPPORTED_TOKENS.map((token) => ({
    ...token,
    address: token.addresses[resolvedChainId]
  }));
}

export function getSupportedTokenAddresses(chainId = CELO_MAINNET_CHAIN_ID) {
  return getSupportedTokens(chainId).map((token) => token.address);
}

export function getTokenByAddress(address: string, chainId = CELO_MAINNET_CHAIN_ID) {
  return getSupportedTokens(chainId).find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

export function getTokenBySymbol(
  symbol: SupportedTokenSymbol,
  chainId = CELO_MAINNET_CHAIN_ID
) {
  return getSupportedTokens(chainId).find((token) => token.symbol === symbol);
}

export function getTokenFromQuery(
  value: string | undefined,
  chainId = CELO_MAINNET_CHAIN_ID
) {
  if (!value) return undefined;

  const bySymbol = getSupportedTokens(chainId).find(
    (token) => token.symbol.toLowerCase() === value.toLowerCase()
  );

  if (bySymbol) return bySymbol;

  return getTokenByAddress(value, chainId);
}
