import { cache } from "react";
import type { Metadata } from "next";
import { PublicProfileShell } from "../../../components/public-profile-shell";
import {
  fetchProfileByHandle,
  fetchRecentPayments
} from "../../../lib/contract";
import {
  getDemoPayments,
  getDemoProfile,
  shouldUseDemoPreview
} from "../../../lib/demo-profile";
import { safeAmountInput, safeTextQuery } from "../../../lib/format";
import { getContractAddress, getDefaultChainId } from "../../../lib/chains";
import { publicEnv } from "../../../lib/env";

type HandlePageProps = {
  params: Promise<{
    handle: string;
  }>;
  searchParams: Promise<{
    amount?: string;
    ref?: string;
    token?: string;
    preview?: string;
  }>;
};

const getProfileForHandle = cache(
  async (handle: string, chainId: number, contractAddress: string | null) => {
    if (!contractAddress) {
      return null;
    }

    return fetchProfileByHandle(handle, chainId);
  }
);

export async function generateMetadata({
  params,
  searchParams
}: HandlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const previewMode = shouldUseDemoPreview(resolvedSearchParams.preview);
  const profile = previewMode
    ? getDemoProfile(resolvedParams.handle, chainId)
    : await getProfileForHandle(resolvedParams.handle, chainId, contractAddress);
  const handleLabel = `@${resolvedParams.handle}`;
  const title = profile
    ? `${profile.displayName} (${handleLabel})`
    : `${handleLabel} · MiniPay PayLink`;
  const description = profile
    ? profile.bio || profile.paymentMessage || "Direct payments on Celo."
    : previewMode
      ? "Preview the PayLink public payment flow."
      : `Open ${handleLabel} on PayLink to send a direct payment on Celo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/u/${resolvedParams.handle}`
    },
    openGraph: {
      title,
      description,
      url: `${publicEnv.appUrl}/u/${resolvedParams.handle}`,
      siteName: "MiniPay PayLink",
      type: "website",
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.svg"]
    },
    robots:
      previewMode || !profile
        ? {
            index: false,
            follow: false
          }
        : undefined
  };
}

export default async function HandlePage({
  params,
  searchParams
}: HandlePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const previewMode = shouldUseDemoPreview(resolvedSearchParams.preview);
  const profile = previewMode
    ? getDemoProfile(resolvedParams.handle, chainId)
    : await getProfileForHandle(resolvedParams.handle, chainId, contractAddress);
  const payments = previewMode
    ? getDemoPayments(resolvedParams.handle, chainId)
    : profile && contractAddress
      ? await fetchRecentPayments(profile.owner, chainId)
      : [];
  const amount = safeAmountInput(resolvedSearchParams.amount);
  const reference = safeTextQuery(resolvedSearchParams.ref);
  const tokenQuery = safeTextQuery(resolvedSearchParams.token);

  return (
    <PublicProfileShell
      appUrl={publicEnv.appUrl}
      initialChainId={chainId}
      contractAddresses={{
        celo: publicEnv.contractAddressMainnet || null,
        celoSepolia: publicEnv.contractAddressSepolia || null
      }}
      handle={resolvedParams.handle}
      profile={profile}
      payments={payments}
      initialAmount={amount}
      initialReference={reference}
      initialTokenQuery={tokenQuery}
      contractReady={previewMode || Boolean(contractAddress)}
      previewMode={previewMode}
    />
  );
}
