import type { Metadata } from "next";
import { SuccessShell } from "../../components/success-shell";
import { fetchProfileByHandle } from "../../lib/contract";
import { shouldUseDemoPreview } from "../../lib/demo-profile";
import { getContractAddress, getDefaultChainId } from "../../lib/chains";

type SuccessPageProps = {
  searchParams: Promise<{
    tx?: string;
    handle?: string;
    amount?: string;
    token?: string;
    ref?: string;
    preview?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Payment sent",
  description: "Open the explorer receipt for your Celo payment and return to the PayLink profile.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const previewMode = shouldUseDemoPreview(resolvedSearchParams.preview);
  const profile =
    previewMode
      ? null
      : resolvedSearchParams.handle
        ? contractAddress
          ? await fetchProfileByHandle(resolvedSearchParams.handle, chainId)
          : null
      : null;

  return (
    <SuccessShell
      chainId={chainId}
      txHash={resolvedSearchParams.tx}
      handle={resolvedSearchParams.handle}
      profile={profile}
      amount={resolvedSearchParams.amount}
      token={resolvedSearchParams.token}
      reference={resolvedSearchParams.ref}
      previewMode={previewMode}
    />
  );
}
