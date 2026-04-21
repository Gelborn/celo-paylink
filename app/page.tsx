import { HomeShell } from "../components/home-shell";
import { getDefaultChainId } from "../lib/chains";
import { publicEnv } from "../lib/env";

export default function HomePage() {
  return (
    <HomeShell
      appUrl={publicEnv.appUrl}
      initialChainId={getDefaultChainId()}
      contractAddresses={{
        celo: publicEnv.contractAddressMainnet || null,
        celoSepolia: publicEnv.contractAddressSepolia || null
      }}
    />
  );
}
