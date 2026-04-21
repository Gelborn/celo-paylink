import { DashboardShell } from "../../components/dashboard-shell";
import { getDefaultChainId } from "../../lib/chains";
import { publicEnv } from "../../lib/env";

export default function MyPayLinkPage() {
  return (
    <DashboardShell
      appUrl={publicEnv.appUrl}
      initialChainId={getDefaultChainId()}
      contractAddresses={{
        celo: publicEnv.contractAddressMainnet || null,
        celoSepolia: publicEnv.contractAddressSepolia || null
      }}
    />
  );
}
