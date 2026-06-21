import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { LocaleProvider } from "../components/locale-provider";
import { MotionRoot } from "../components/motion-root";
import { publicEnv } from "../lib/env";
import { resolveLocaleFromRequest } from "../lib/i18n";

const geistSans = localFont({
  src: "../app/fonts/SFCompact-latin.woff",
  variable: "--font-sans",
  display: "swap"
});

const geistMono = localFont({
  src: "../app/fonts/SFNSMono-latin.woff",
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  applicationName: "MiniPay PayLink",
  title: {
    default: "MiniPay PayLink",
    template: "%s · MiniPay PayLink"
  },
  description:
    "Create a MiniPay PayLink public profile, share prefilled payment request links, and receive Celo stablecoin payments directly to your wallet with shareable, reopenable PayLink receipt URLs.",
  metadataBase: new URL(publicEnv.appUrl),
  keywords: [
    "MiniPay",
    "MiniPay PayLink",
    "MiniPay payments",
    "MiniPay payment request links",
    "MiniPay public profile",
    "PayLink",
    "Celo",
    "stablecoin",
    "Celo stablecoin payments",
    "mobile payments",
    "payments",
    "payment links",
    "payment request links",
    "payment request URLs",
    "public payment links",
    "prefilled payment request links",
    "walletless payment previews",
    "stablecoin payment request links",
    "payment receipts",
    "payment proof",
    "Celo receipts",
    "Celo explorer transaction links",
    "PayLink receipts",
    "MiniPay receipts",
    "shareable receipt URLs",
    "reopenable receipt URLs",
    "no-custody payments",
    "direct wallet settlement",
    "public payment profile",
    "public profile URL",
    "creator payments",
    "freelancer payments",
    "merchant payments",
    "PWA",
    "installable PWA"
  ],
  category: "finance",
  creator: "MiniPay PayLink",
  publisher: "MiniPay PayLink",
  authors: [{ name: "Gelborn" }],
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"]
  },
  appleWebApp: {
    capable: true,
    title: "MiniPay PayLink",
    statusBarStyle: "black-translucent"
  },
  openGraph: {
    title: "MiniPay PayLink",
    description:
      "Publish a no-custody payment profile, share prefilled payment request links, and give payers shareable, reopenable PayLink receipt URLs after direct Celo stablecoin payments.",
    url: publicEnv.appUrl,
    siteName: "MiniPay PayLink",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "MiniPay PayLink public profile payment page and shareable, reopenable receipt preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniPay PayLink",
    description:
      "Publish a no-custody payment profile, share prefilled payment request links, and give payers shareable, reopenable PayLink receipt URLs after direct Celo stablecoin payments.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "MiniPay PayLink public profile payment page and shareable, reopenable receipt preview"
      }
    ]
  },
  other: {
    "mobile-web-app-capable": "yes",
    "talentapp:project_verification":
      "1d52a6d849d241a451cf8976c20105cd8d9ecede245a552369eb4b46adc1b3c28cef0ac8091f852ccfc56385e8ad54fbe64f55319a352c2f0e1c3ced4c3a3a5f"
  }
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocaleFromRequest(await cookies(), await headers());

  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LocaleProvider initialLocale={locale}>
          <div className="page-shell">
            <MotionRoot>{children}</MotionRoot>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
