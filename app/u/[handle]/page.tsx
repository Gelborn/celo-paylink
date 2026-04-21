import { PublicProfileShell } from "../../../components/public-profile-shell";
import {
  fetchProfileByHandle,
  fetchRecentPayments
} from "../../../lib/contract";
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
  const profile = contractAddress
    ? await fetchProfileByHandle(resolvedParams.handle, chainId)
    : null;
  const payments =
    profile && contractAddress
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
      contractReady={Boolean(contractAddress)}
    />
  );
}
