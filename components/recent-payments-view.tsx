import { ExternalLink, ReceiptText } from "lucide-react";
import * as motion from "motion/react-client";
import { formatDateLabel, formatTokenAmount, shortenAddress } from "../lib/format";
import type { PaymentRecord } from "../lib/contract";
import type { Dictionary, Locale } from "../lib/i18n";
import { fadeUp, staggerChildren } from "../lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IconFrame } from "./ui/patterns";

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
      <Card
        variant="elevated"
        className="compact-card"
        role="region"
        aria-label={title}
        aria-busy="true"
      >
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3.5">
          <p
            className="text-sm leading-7 text-zinc-400"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {dictionary.messages.loadingPayments}
          </p>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="rounded-lg border border-white/10 bg-zinc-950/45 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="motion-shimmer h-5 w-36 animate-pulse rounded-full bg-white/10" />
                    <div className="motion-shimmer h-4 w-28 animate-pulse rounded-full bg-white/5" />
                  </div>
                  <div className="motion-shimmer h-7 w-20 animate-pulse rounded-full bg-white/5" />
                </div>
                <div className="motion-shimmer h-16 animate-pulse rounded-lg bg-white/5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card
        variant="elevated"
        className="compact-card"
        role="region"
        aria-label={title}
      >
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 rounded-lg border border-dashed border-white/10 bg-zinc-950/45 px-4 py-5 text-sm leading-7 text-zinc-400">
            <IconFrame tone="accent" className="h-9 w-9 rounded-md">
              <ReceiptText aria-hidden="true" />
            </IconFrame>
            <p>{dictionary.dashboard.emptyTransactions}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      variant="elevated"
      className="compact-card"
      role="region"
      aria-label={title}
    >
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3.5">
        <motion.ul
          className="space-y-3.5"
          aria-label={title}
          variants={staggerChildren}
          initial="hidden"
          animate="show"
        >
          {payments.map((payment) => (
            <motion.li key={payment.txHash} variants={fadeUp}>
              <a
                href={payment.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dictionary.actions.openExplorer}: ${formatTokenAmount(
                  payment.amount,
                  payment.token,
                  chainId
                )} ${payment.tokenSymbol || dictionary.fields.token}, ${
                  dictionary.labels.transaction
                } ${shortenAddress(payment.txHash)}, @${payment.handle}`}
                className="group block rounded-lg border border-white/10 bg-zinc-950/45 px-4 py-4 transition-[background-color,border-color,transform] duration-200 ease-[var(--motion-ease)] hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:bg-zinc-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)] sm:px-5 sm:py-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <IconFrame tone="accent" className="h-9 w-9">
                        <ReceiptText aria-hidden="true" />
                      </IconFrame>
                      <div className="min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-white sm:text-lg">
                            {formatTokenAmount(payment.amount, payment.token, chainId)}{" "}
                            {payment.tokenSymbol || dictionary.fields.token}
                          </p>
                          <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
                            @{payment.handle}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400">
                          {dictionary.labels.payingFrom}{" "}
                          <span className="text-zinc-200" title={payment.payer}>
                            {shortenAddress(payment.payer)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-400">
                      {payment.timestamp
                        ? formatDateLabel(payment.timestamp, locale)
                        : dictionary.labels.checking}
                    </div>
                  </div>

                  {payment.reference ? (
                    <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">
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
                    <span className="transition group-hover:text-zinc-300" title={payment.txHash}>
                      {shortenAddress(payment.txHash)}
                    </span>
                    <ExternalLink
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition group-hover:text-zinc-300"
                    />
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}
