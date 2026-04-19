import type { Metadata } from "next";
import "./globals.css";
import { env } from "../lib/env";

export const metadata: Metadata = {
  title: "MiniPay PayLink",
  description:
    "A shareable payment profile for MiniPay freelancers, creators, and solo merchants on Celo.",
  metadataBase: new URL(env.appUrl),
  openGraph: {
    title: "MiniPay PayLink",
    description:
      "Claim a handle, publish a payment profile, and accept stablecoins directly from MiniPay.",
    images: ["/og.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            '"Space Grotesk", "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif'
        }}
      >
        <div className="page-shell">
          <div className="app-frame">{children}</div>
        </div>
      </body>
    </html>
  );
}
