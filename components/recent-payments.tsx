import { formatTokenAmount, shortenAddress } from "../lib/format";
import type { PaymentRecord } from "../lib/contract";

type RecentPaymentsProps = {
  payments: PaymentRecord[];
  chainId: number;
};

export function RecentPayments({ payments, chainId }: RecentPaymentsProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-[var(--line)] bg-white/70 p-5 text-sm text-[color:rgba(23,50,40,0.7)]">
        No onchain payments yet. Seed this page with a real MiniPay transaction and
        it will show up here automatically from contract events.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <a
          key={payment.txHash}
          href={payment.explorerUrl}
          target="_blank"
          rel="noreferrer"
          className="block rounded-[1.5rem] border border-[var(--line)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[var(--meadow)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">
                {formatTokenAmount(payment.amount, payment.token, chainId)}{" "}
                {payment.tokenSymbol}
              </p>
              <p className="text-xs text-[color:rgba(23,50,40,0.7)]">
                from {shortenAddress(payment.payer)}
              </p>
            </div>
            <div className="text-right text-xs text-[color:rgba(23,50,40,0.7)]">
              <p>
                {payment.timestamp
                  ? new Date(payment.timestamp * 1000).toLocaleDateString()
                  : "Recent"}
              </p>
              <p className="font-medium">{payment.handle}</p>
            </div>
          </div>

          {payment.reference ? (
            <p className="mt-3 rounded-2xl bg-[var(--sand)] px-3 py-2 text-sm text-[color:rgba(23,50,40,0.82)]">
              “{payment.reference}”
            </p>
          ) : null}
        </a>
      ))}
    </div>
  );
}
