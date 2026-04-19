import Link from "next/link";
import { Header } from "../../components/header";
import { getDefaultChainId, getExplorerBaseUrl } from "../../lib/chains";

type SuccessPageProps = {
  searchParams: {
    tx?: string;
    handle?: string;
  };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const chainId = getDefaultChainId();
  const txHash = searchParams.tx;
  const handle = searchParams.handle;

  return (
    <main>
      <Header />

      <section className="card-surface mx-auto max-w-3xl rounded-[2.4rem] p-6 text-center md:p-10">
        <span className="eyebrow">Payment complete</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
          Your stablecoin payment is onchain.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
          The payment was sent directly through the PayLink contract. Keep the
          explorer link as proof, and refresh the public page to see the event
          appear in recent payments.
        </p>

        <div className="mt-8 rounded-[1.8rem] border border-[var(--line)] bg-white p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.66)]">
            Transaction
          </p>
          <code
            className="mt-3 block overflow-x-auto rounded-[1.2rem] bg-[var(--sand)] px-4 py-4 text-sm"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            {txHash || "No transaction hash supplied"}
          </code>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {txHash ? (
            <a
              href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--meadow)] px-5 py-3 text-sm font-semibold text-[var(--sand)] transition hover:opacity-90"
            >
              View on explorer
            </a>
          ) : null}
          {handle ? (
            <Link
              href={`/u/${encodeURIComponent(handle)}`}
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
            >
              Back to public page
            </Link>
          ) : null}
          <Link
            href="/my"
            className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
          >
            Edit my PayLink
          </Link>
        </div>
      </section>
    </main>
  );
}
