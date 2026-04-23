import type { MetadataRoute } from "next";
import { publicEnv } from "../lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/my", "/success"]
      }
    ],
    sitemap: `${publicEnv.appUrl}/sitemap.xml`,
    host: publicEnv.appUrl
  };
}
