import { HomeShell } from "../components/home-shell";
import { getDefaultChainId } from "../lib/chains";
import { env } from "../lib/env";

export default function HomePage() {
  return (
    <HomeShell
      appUrl={env.appUrl}
      initialChainId={getDefaultChainId()}
      contractAddresses={{
        celo: env.contractAddressMainnet || null,
        celoSepolia: env.contractAddressSepolia || null
      }}
    />
  );
}
