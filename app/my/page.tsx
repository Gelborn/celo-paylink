import type { Metadata } from "next";
import { DashboardShell } from "../../components/dashboard-shell";
import { getDefaultChainId } from "../../lib/chains";
import { publicEnv } from "../../lib/env";

export const metadata: Metadata = {
  title: "MiniPay PayLink dashboard",
  description:
    "Manage your MiniPay PayLink public profile, create prefilled payment request links, review recent incoming payments, and reopen PayLink receipt URLs.",
  alternates: {
    canonical: "/my"
  },
  robots: {
    index: false,
    follow: false
  }
};

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
