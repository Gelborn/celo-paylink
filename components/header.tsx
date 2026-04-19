import Link from "next/link";
import Image from "next/image";
import { getChainLabel, getDefaultChainId } from "../lib/chains";

export function Header() {
  return (
    <header className="mb-8 rounded-[2rem] border border-[var(--line)] bg-white/70 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="MiniPay PayLink"
            width={220}
            height={64}
            className="h-10 w-auto rounded-2xl"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--meadow)]">
              MiniPay PayLink
            </p>
            <p className="text-xs text-[color:rgba(23,50,40,0.7)]">
              Stablecoin payment profiles on {getChainLabel(getDefaultChainId())}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm font-medium">
          <Link
            href="/"
            className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-[var(--meadow)] hover:bg-[var(--sand)]"
          >
            Home
          </Link>
          <Link
            href="/my"
            className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-[var(--meadow)] hover:bg-[var(--sand)]"
          >
            My PayLink
          </Link>
          <a
            href="https://talent.app/~/earn/celo-proof-of-ship"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--meadow)] px-4 py-2 text-[var(--sand)] transition hover:opacity-90"
          >
            Proof of Ship
          </a>
        </nav>
      </div>
    </header>
  );
}
