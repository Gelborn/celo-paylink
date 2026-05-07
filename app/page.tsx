import { cookies, headers } from "next/headers";
import { HomeStaticShell } from "../components/home-static-shell";
import { getDefaultChainId } from "../lib/chains";
import { publicEnv } from "../lib/env";
import { getDictionary, resolveLocaleFromRequest } from "../lib/i18n";

export default async function HomePage() {
  const locale = resolveLocaleFromRequest(await cookies(), await headers());

  return (
    <HomeStaticShell
      dictionary={getDictionary(locale)}
      initialChainId={getDefaultChainId()}
      contractAddresses={{
        celo: publicEnv.contractAddressMainnet || null,
        celoSepolia: publicEnv.contractAddressSepolia || null
      }}
    />
  );
}
