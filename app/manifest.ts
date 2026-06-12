import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniPay PayLink",
    short_name: "PayLink",
    id: "/",
    lang: "en",
    dir: "ltr",
    description:
      "A MiniPay-ready public payment profile for no-custody Celo stablecoin payments, prefilled request links, and shareable PayLink receipts.",
    categories: ["business", "finance", "productivity"],
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#09090B",
    theme_color: "#09090B",
    screenshots: [
      {
        src: "/paylink-demo-poster.png",
        type: "image/png",
        sizes: "1200x2598",
        form_factor: "narrow",
        label: "MiniPay PayLink English mobile public profile payment preview"
      },
      {
        src: "/paylink-demo-pt-br-poster.png",
        type: "image/png",
        sizes: "1200x2598",
        form_factor: "narrow",
        label: "MiniPay PayLink Brazilian Portuguese mobile public profile payment preview"
      }
    ],
    shortcuts: [
      {
        name: "Open PayLink dashboard",
        short_name: "Dashboard",
        description: "Open the PayLink dashboard to manage your public profile, create request links, and review incoming payments and PayLink receipts.",
        url: "/my",
        icons: [
          {
            src: "/icon.svg",
            type: "image/svg+xml",
            sizes: "any",
            purpose: "any maskable"
          }
        ]
      }
    ],
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any maskable"
      }
    ]
  };
}
