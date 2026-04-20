import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { LocaleProvider } from "../components/locale-provider";
import { env } from "../lib/env";
import { resolveLocaleFromRequest } from "../lib/i18n";

const geistSans = localFont({
  src: "../app/fonts/SFCompact.ttf",
  variable: "--font-sans",
  display: "swap"
});

const geistMono = localFont({
  src: "../app/fonts/SFNSMono.ttf",
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
    "A shareable payment profile for MiniPay freelancers, creators, and solo merchants on Celo.",
  metadataBase: new URL(env.appUrl),
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
      "Claim a handle, publish a payment profile, and accept stablecoins directly from MiniPay.",
    url: env.appUrl,
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
      "Claim a handle, publish a payment profile, and accept stablecoins directly from MiniPay.",
    images: ["/og.svg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocaleFromRequest(cookies(), headers());

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LocaleProvider initialLocale={locale}>
          <div className="page-shell">
            <div className="app-frame">{children}</div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
