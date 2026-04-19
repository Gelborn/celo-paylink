import { formatUnits } from "viem";
import { getTokenByAddress } from "./tokens";

export function shortenAddress(address?: string | null) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTokenAmount(amount: bigint, tokenAddress: string, chainId: number) {
  const token = getTokenByAddress(tokenAddress, chainId);
  if (!token) return amount.toString();

  const formatted = Number(formatUnits(amount, token.decimals));
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: token.decimals === 18 ? 4 : 2
  }).format(formatted);
}

export function sanitizeHandleInput(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
}

export function buildShareUrl(
  baseUrl: string,
  handle: string,
  amount?: string,
  reference?: string
) {
  const url = new URL(`/u/${handle}`, baseUrl);

  if (amount) {
    url.searchParams.set("amount", amount);
  }

  if (reference) {
    url.searchParams.set("ref", reference);
  }

  return url.toString();
}

export function safeAmountInput(value?: string | string[]) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return "";
  return candidate.replace(/[^\d.]/g, "").slice(0, 12);
}
