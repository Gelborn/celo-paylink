import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniPay PayLink",
    short_name: "PayLink",
    id: "/",
    lang: "en",
    description:
      "A MiniPay-ready public payment profile for direct Celo stablecoin payments and prefilled request links.",
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
        label: "MiniPay PayLink prefilled public payment page"
      }
    ],
    shortcuts: [
      {
        name: "Create or manage PayLink profile",
        short_name: "Dashboard",
        description: "Open the PayLink dashboard to manage a public profile and create prefilled request links.",
        url: "/my",
        icons: [
          {
            src: "/icon.svg",
            type: "image/svg+xml",
            sizes: "any"
          }
        ]
      }
    ],
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any"
      }
    ]
  };
}
