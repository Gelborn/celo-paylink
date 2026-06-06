import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniPay PayLink",
    short_name: "PayLink",
    id: "/",
    lang: "en",
    description:
      "A MiniPay-ready payment profile for direct Celo stablecoin payments and reusable request links.",
    categories: ["finance", "productivity"],
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
    shortcuts: [
      {
        name: "Create or manage PayLink profile",
        short_name: "Dashboard",
        description: "Open the PayLink dashboard to publish or manage a payment profile.",
        url: "/my"
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
