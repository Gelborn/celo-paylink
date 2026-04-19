import Link from "next/link";
import { Header } from "../components/header";
import { getChainLabel, getDefaultChainId } from "../lib/chains";
import { getSupportedTokens } from "../lib/tokens";

export default function HomePage() {
  const chainId = getDefaultChainId();
  const tokens = getSupportedTokens(chainId);

  return (
    <main>
      <Header />

      <section className="hero-grid">
        <div className="card-surface rounded-[2.4rem] p-6 md:p-10">
          <span className="eyebrow">MiniPay utility app</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            A payment profile that feels native to MiniPay, not bolted onto it.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:rgba(23,50,40,0.8)] md:text-lg">
            MiniPay PayLink gives freelancers, creators, and solo merchants a
            simple public payment card on Celo. Claim a handle, publish a short
            profile, and receive stablecoins directly through a shareable link.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/my"
              className="rounded-full bg-[var(--meadow)] px-5 py-3 text-sm font-semibold text-[var(--sand)] transition hover:opacity-90"
            >
              Create my PayLink
            </Link>
            <a
              href="https://docs.celo.org/build-on-celo/build-on-minipay/quickstart"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
            >
              MiniPay docs
            </a>
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-[var(--line)] bg-white/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.68)]">
              What the app does
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.4rem] bg-[var(--sand)] p-4">
                <p className="text-lg font-semibold">1. Claim a handle</p>
                <p className="mt-2 text-sm leading-7 text-[color:rgba(23,50,40,0.78)]">
                  Your handle becomes the public route for payments and stays
                  locked once published.
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-[var(--sand)] p-4">
                <p className="text-lg font-semibold">2. Share the page</p>
                <p className="mt-2 text-sm leading-7 text-[color:rgba(23,50,40,0.78)]">
                  Send a MiniPay-friendly link to clients, supporters, or people
                  paying a lightweight invoice.
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-[var(--sand)] p-4">
                <p className="text-lg font-semibold">3. Get paid onchain</p>
                <p className="mt-2 text-sm leading-7 text-[color:rgba(23,50,40,0.78)]">
                  Stablecoins move straight from payer to creator. No custody,
                  no backend ledger, no offchain settlement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface rounded-[2.2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
              Proof of Ship fit
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:rgba(23,50,40,0.8)]">
              <li>MiniPay-facing utility instead of an ecosystem engagement app.</li>
              <li>Verified Celo contract + open source repo + public pay links.</li>
              <li>Real stablecoin transactions are the product, not a side effect.</li>
            </ul>
          </div>

          <div className="card-surface rounded-[2.2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
              Supported tokens
            </p>
            <div className="mt-4 space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.address}
                  className="rounded-[1.4rem] border border-[var(--line)] bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold">{token.symbol}</p>
                      <p className="text-sm text-[color:rgba(23,50,40,0.72)]">
                        {token.name}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--sand)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                      {getChainLabel(chainId)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-[2.2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
              Sample link
            </p>
            <code
              className="mt-4 block overflow-x-auto rounded-[1.4rem] bg-[var(--sand)] px-4 py-4 text-sm"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              /u/gelborn?amount=5&amp;ref=coffee
            </code>
          </div>
        </aside>
      </section>
    </main>
  );
}
