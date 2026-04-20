import { DashboardShell } from "../../components/dashboard-shell";
import { getDefaultChainId } from "../../lib/chains";
import { env } from "../../lib/env";

export default function MyPayLinkPage() {
  return (
    <DashboardShell
      appUrl={env.appUrl}
      initialChainId={getDefaultChainId()}
      contractAddresses={{
        celo: env.contractAddressMainnet || null,
        celoSepolia: env.contractAddressSepolia || null
      }}
    />
  );
}
