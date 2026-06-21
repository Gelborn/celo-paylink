import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniPay PayLink",
    short_name: "PayLink",
    id: "/",
    lang: "en",
    dir: "ltr",
    description:
      "A MiniPay-ready public payment profile for localized no-custody Celo stablecoin payments, localized prefilled payment request URLs, and shareable, reopenable PayLink receipt URLs.",
    categories: ["business", "finance", "productivity", "utilities"],
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
        label: "MiniPay PayLink English mobile prefilled payment request page and shareable, reopenable receipt preview"
      },
      {
        src: "/paylink-demo-pt-br-poster.png",
        type: "image/png",
        sizes: "1200x2598",
        form_factor: "narrow",
        label: "MiniPay PayLink Brazilian Portuguese mobile prefilled payment request page and shareable, reopenable receipt preview"
      }
    ],
    shortcuts: [
      {
        name: "Open PayLink dashboard",
        short_name: "My PayLink",
        description: "Open the PayLink dashboard to manage your public profile URL, create localized prefilled payment request URLs, review recent incoming payments, and reopen PayLink receipt URLs.",
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
