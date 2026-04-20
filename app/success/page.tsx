import { SuccessShell } from "../../components/success-shell";
import { fetchProfileByHandle } from "../../lib/contract";
import { getContractAddress, getDefaultChainId } from "../../lib/chains";

type SuccessPageProps = {
  searchParams: {
    tx?: string;
    handle?: string;
    amount?: string;
    token?: string;
    ref?: string;
  };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const profile =
    searchParams.handle && contractAddress
      ? await fetchProfileByHandle(searchParams.handle, chainId)
      : null;

  return (
    <SuccessShell
      chainId={chainId}
      txHash={searchParams.tx}
      handle={searchParams.handle}
      profile={profile}
      amount={searchParams.amount}
      token={searchParams.token}
      reference={searchParams.ref}
    />
  );
}
