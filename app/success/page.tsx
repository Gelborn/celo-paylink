import type { Metadata } from "next";
import { SuccessShell } from "../../components/success-shell";
import { fetchProfileByHandle } from "../../lib/contract";
import { shouldUseDemoPreview } from "../../lib/demo-profile";
import { getContractAddress, getDefaultChainId } from "../../lib/chains";

type SuccessPageProps = {
  searchParams: Promise<{
    tx?: string;
    handle?: string;
    amount?: string;
    token?: string;
    ref?: string;
    preview?: string;
  }>;
};

const receiptTitle = "PayLink receipt proof";
const receiptDescription =
  "Open a shareable PayLink receipt with amount, token, reference, Celo explorer proof, and a path back to the recipient profile.";

export const metadata: Metadata = {
  title: receiptTitle,
  description: receiptDescription,
  alternates: {
    canonical: "/success"
  },
  openGraph: {
    title: receiptTitle,
    description: receiptDescription,
    siteName: "MiniPay PayLink",
    url: "/success",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "MiniPay PayLink receipt with Celo explorer proof preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: receiptTitle,
    description: receiptDescription,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "MiniPay PayLink receipt with Celo explorer proof preview"
      }
    ]
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const chainId = getDefaultChainId();
  const contractAddress = getContractAddress(chainId);
  const previewMode = shouldUseDemoPreview(resolvedSearchParams.preview);
  const profile =
    previewMode
      ? null
      : resolvedSearchParams.handle
        ? contractAddress
          ? await fetchProfileByHandle(resolvedSearchParams.handle, chainId)
          : null
      : null;

  return (
    <SuccessShell
      chainId={chainId}
      txHash={resolvedSearchParams.tx}
      handle={resolvedSearchParams.handle}
      profile={profile}
      amount={resolvedSearchParams.amount}
      token={resolvedSearchParams.token}
      reference={resolvedSearchParams.ref}
      previewMode={previewMode}
    />
  );
}
