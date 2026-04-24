"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "./locale-provider";

const DEMO_MEDIA = {
  en: {
    poster: "/paylink-demo-poster.png",
    video: "/paylink-demo-loop.webm",
    alt: "PayLink payment flow preview"
  },
  "pt-BR": {
    poster: "/paylink-demo-pt-br-poster.png",
    video: "/paylink-demo-pt-br-loop.webm",
    alt: "Visualizacao do fluxo de pagamento do PayLink"
  }
} as const;

export function HomeDemo({
  caption
}: {
  caption: string;
}) {
  const { locale } = useLocale();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const demoMedia = DEMO_MEDIA[locale];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <figure className="mx-auto max-w-full space-y-4 overflow-hidden">
      <div className="device-shell">
        <div className="device-frame">
          <div className="device-screen">
            <div className="device-screen-inner">
              {prefersReducedMotion ? (
                <Image
                  src={demoMedia.poster}
                  alt={demoMedia.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 84vw"
                  className="landing-demo-image"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={demoMedia.poster}
                  className="landing-demo-video"
                  aria-label={demoMedia.alt}
                >
                  <source src={demoMedia.video} type="video/webm" />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mx-auto max-w-sm text-center text-sm leading-7 text-zinc-400">
        {caption}
      </figcaption>
    </figure>
  );
}
