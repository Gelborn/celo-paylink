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
    "Create a PayLink profile and receive direct Celo payments through one clean link.",
  metadataBase: new URL(publicEnv.appUrl),
  keywords: [
    "MiniPay",
    "Celo",
    "stablecoin",
    "payments",
    "pay link",
    "creator payments"
  ],
  category: "finance",
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
      "Claim a handle, publish a payment profile, and receive direct Celo payments through MiniPay.",
    url: publicEnv.appUrl,
    siteName: "MiniPay PayLink",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "MiniPay PayLink"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniPay PayLink",
    description:
      "Claim a handle, publish a payment profile, and receive direct Celo payments through MiniPay.",
    images: ["/og.svg"]
  },
  other: {
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
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
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
