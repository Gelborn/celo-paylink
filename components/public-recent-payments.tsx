import type { Hex } from "viem";
import { fetchRecentPayments } from "../lib/contract";
import type { Dictionary, Locale } from "../lib/i18n";
import { RecentPaymentsView } from "./recent-payments-view";

export function PublicRecentPaymentsFallback({
  chainId,
  title,
  dictionary,
  locale
}: {
  chainId: number;
  title: string;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <RecentPaymentsView
      payments={[]}
      chainId={chainId}
      title={title}
      dictionary={dictionary}
      locale={locale}
      isLoading
    />
  );
}

export async function PublicRecentPayments({
  owner,
  chainId,
  contractAddress,
  title,
  dictionary,
  locale
}: {
  owner: Hex;
  chainId: number;
  contractAddress: Hex | null;
  title: string;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const payments = contractAddress
    ? await fetchRecentPayments(owner, chainId, contractAddress)
    : [];

  return (
    <RecentPaymentsView
      payments={payments}
      chainId={chainId}
      title={title}
      dictionary={dictionary}
      locale={locale}
    />
  );
}
