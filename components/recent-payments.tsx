"use client";

import type { PaymentRecord } from "../lib/contract";
import { useLocale } from "./locale-provider";
import { RecentPaymentsView } from "./recent-payments-view";

type RecentPaymentsProps = {
  payments: PaymentRecord[];
  chainId: number;
  title: string;
  isLoading?: boolean;
};

export function RecentPayments({
  payments,
  chainId,
  title,
  isLoading = false
}: RecentPaymentsProps) {
  const { dictionary, locale } = useLocale();

  return (
    <RecentPaymentsView
      payments={payments}
      chainId={chainId}
      title={title}
      dictionary={dictionary}
      locale={locale}
      isLoading={isLoading}
    />
  );
}
