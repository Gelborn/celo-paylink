import type { Hex } from "viem";
import type { PaymentRecord, ProfileRecord } from "./contract";
import { getExplorerBaseUrl } from "./chains";
import { getSupportedTokens } from "./tokens";

const DEMO_OWNER = "0x8ba1f109551bD432803012645Ac136ddd64DBA72" as Hex;
const DEMO_PAYER = "0xAb5801a7D398351b8bE11C439e05C5B3259aec9B" as Hex;
const DEMO_TX_HASH =
  "0x51f0ed1f7cf8e3d4860ef65bfb30e94c877ce4bfc0a463ce84f674fed0ef8e2c" as Hex;

function getDemoToken(chainId: number) {
  const token = getSupportedTokens(chainId)[0];

  if (!token) {
    throw new Error("No supported token configured for demo preview.");
  }

  return token;
}

export function shouldUseDemoPreview(preview?: string) {
  return process.env.NODE_ENV !== "production" && preview === "1";
}

export function getDemoProfile(handle: string, chainId: number): ProfileRecord {
  const token = getDemoToken(chainId);

  return {
    owner: DEMO_OWNER,
    handle,
    displayName: "Atlas Studio",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bio: "Design retainers, project deposits, and direct support in one MiniPay-ready profile.",
    paymentMessage: "Thanks for sending this payment.",
    preferredToken: token.address,
    exists: true
  };
}

export function getDemoPayments(
  handle: string,
  chainId: number
): PaymentRecord[] {
  const token = getDemoToken(chainId);

  return [
    {
      recipient: DEMO_OWNER,
      payer: DEMO_PAYER,
      token: token.address,
      amount: 20_000_000n,
      reference: "Brand sprint deposit",
      handle,
      txHash: DEMO_TX_HASH,
      blockNumber: 0n,
      explorerUrl: `${getExplorerBaseUrl(chainId)}/tx/${DEMO_TX_HASH}`,
      tokenSymbol: token.symbol,
      timestamp: 1_713_657_600
    }
  ];
}
