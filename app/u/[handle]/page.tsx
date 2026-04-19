import Link from "next/link";
import { Header } from "../../../components/header";
import { PayCard } from "../../../components/pay-card";
import {
  fetchProfileByHandle,
  fetchRecentPayments
} from "../../../lib/contract";
import { buildShareUrl, safeAmountInput } from "../../../lib/format";
import {
  getContractAddress,
  getDefaultChainId,
  getExplorerBaseUrl
} from "../../../lib/chains";
import { env } from "../../../lib/env";

type HandlePageProps = {
  params: {
    handle: string;
  };
  searchParams: {
    amount?: string;
    ref?: string;
  };
};

export default async function HandlePage({
  params,
  searchParams
}: HandlePageProps) {
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);

  if (!contractAddress) {
    return (
      <main>
        <Header />
        <section className="card-surface rounded-[2rem] p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Contract address not configured
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
            Add `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET` or
            `NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA` in your environment before
            opening public pay link routes.
          </p>
        </section>
      </main>
    );
  }

  const profile = await fetchProfileByHandle(params.handle, chainId);

  if (!profile) {
    return (
      <main>
        <Header />
        <section className="card-surface rounded-[2rem] p-6 md:p-8">
          <span className="eyebrow">Handle not found</span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            No PayLink profile lives at “{params.handle}”.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
            Publish a profile first on the creator page, then reuse that handle
            as your shareable MiniPay payment route.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/my"
              className="rounded-full bg-[var(--meadow)] px-5 py-3 text-sm font-semibold text-[var(--sand)] transition hover:opacity-90"
            >
              Create a profile
            </Link>
            <a
              href={`${getExplorerBaseUrl(chainId)}/address/${contractAddress}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
            >
              View contract
            </a>
          </div>
        </section>
      </main>
    );
  }

  const payments = await fetchRecentPayments(profile.owner, chainId);
  const amount = safeAmountInput(searchParams.amount);
  const reference = searchParams.ref || "";
  const shareUrl = buildShareUrl(env.appUrl, profile.handle, amount, reference);

  return (
    <main>
      <Header />
      <PayCard
        profile={profile}
        payments={payments}
        shareUrl={shareUrl}
        initialAmount={amount}
        initialReference={reference}
        chainId={chainId}
      />
    </main>
  );
}
