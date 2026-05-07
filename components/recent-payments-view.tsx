import { formatDateLabel, formatTokenAmount, shortenAddress } from "../lib/format";
import type { PaymentRecord } from "../lib/contract";
import type { Dictionary, Locale } from "../lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type RecentPaymentsViewProps = {
  payments: PaymentRecord[];
  chainId: number;
  title: string;
  dictionary: Dictionary;
  locale: Locale;
  isLoading?: boolean;
};

export function RecentPaymentsView({
  payments,
  chainId,
  title,
  dictionary,
  locale,
  isLoading = false
}: RecentPaymentsViewProps) {
  if (isLoading) {
    return (
      <Card aria-busy="true">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3.5">
          <p className="text-sm leading-7 text-zinc-400">
            {dictionary.messages.loadingPayments}
          </p>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="h-5 w-36 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-28 animate-pulse rounded-full bg-white/5" />
                  </div>
                  <div className="h-7 w-20 animate-pulse rounded-full bg-white/5" />
                </div>
                <div className="h-16 animate-pulse rounded-lg bg-white/5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-white/10 bg-zinc-900 px-4 py-5 text-sm leading-7 text-zinc-400">
            {dictionary.dashboard.emptyTransactions}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3.5">
        {payments.map((payment) => (
          <a
            key={payment.txHash}
            href={payment.explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-lg border border-white/10 bg-zinc-900 px-4 py-4 transition hover:border-white/20 hover:bg-zinc-900/90 sm:px-5 sm:py-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold text-white sm:text-lg">
                      {formatTokenAmount(payment.amount, payment.token, chainId)}{" "}
                      {payment.tokenSymbol || dictionary.fields.token}
                    </p>
                    <span className="rounded-full border border-white/10 bg-zinc-950 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
                      @{payment.handle}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    {dictionary.labels.payingFrom}{" "}
                    <span className="text-zinc-200">{shortenAddress(payment.payer)}</span>
                  </p>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-400">
                  {payment.timestamp
                    ? formatDateLabel(payment.timestamp, locale)
                    : dictionary.labels.checking}
                </div>
              </div>

              {payment.reference ? (
                <div className="rounded-lg border border-white/10 bg-zinc-950 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                    {dictionary.fields.note}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    {payment.reference}
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
                <span>{dictionary.labels.transaction}</span>
                <span className="transition group-hover:text-zinc-300">
                  {shortenAddress(payment.txHash)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
