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
    : contractAddress
      ? await fetchProfileByHandle(resolvedParams.handle, chainId)
      : null;
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
