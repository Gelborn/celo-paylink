import type { Metadata } from "next";
import { DashboardShell } from "../../components/dashboard-shell";
import { getDefaultChainId } from "../../lib/chains";
import { publicEnv } from "../../lib/env";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your MiniPay PayLink profile, create prefilled request links, and review incoming payments and PayLink receipts.",
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
