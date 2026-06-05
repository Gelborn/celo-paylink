import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniPay PayLink",
    short_name: "PayLink",
    id: "/",
    description:
      "A MiniPay-ready payment profile for direct Celo stablecoin payments and reusable request links.",
    categories: ["finance", "productivity"],
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
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
