import { PublicProfileShell } from "../../../components/public-profile-shell";
import {
  fetchProfileByHandle,
  fetchRecentPayments
} from "../../../lib/contract";
import { safeAmountInput, safeTextQuery } from "../../../lib/format";
import { getContractAddress, getDefaultChainId } from "../../../lib/chains";
import { env } from "../../../lib/env";

type HandlePageProps = {
  params: {
    handle: string;
  };
  searchParams: {
    amount?: string;
    ref?: string;
    token?: string;
  };
};

export default async function HandlePage({
  params,
  searchParams
}: HandlePageProps) {
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const profile = contractAddress
    ? await fetchProfileByHandle(params.handle, chainId)
    : null;
  const payments =
    profile && contractAddress
      ? await fetchRecentPayments(profile.owner, chainId)
      : [];
  const amount = safeAmountInput(searchParams.amount);
  const reference = safeTextQuery(searchParams.ref);
  const tokenQuery = safeTextQuery(searchParams.token);

  return (
    <PublicProfileShell
      appUrl={env.appUrl}
      initialChainId={chainId}
      contractAddresses={{
        celo: env.contractAddressMainnet || null,
        celoSepolia: env.contractAddressSepolia || null
      }}
      handle={params.handle}
      profile={profile}
      payments={payments}
      initialAmount={amount}
      initialReference={reference}
      initialTokenQuery={tokenQuery}
      contractReady={Boolean(contractAddress)}
    />
  );
}
