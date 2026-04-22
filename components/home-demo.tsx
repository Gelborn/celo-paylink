"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DEMO_POSTER_SRC = "/paylink-demo-poster.png";
const DEMO_VIDEO_SRC = "/paylink-demo-loop.webm";

export function HomeDemo({
  caption
}: {
  caption: string;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    <figure className="space-y-4">
      <div className="device-shell">
        <div className="device-frame">
          <div className="device-screen">
            <div className="device-screen-inner">
              {prefersReducedMotion ? (
                <Image
                  src={DEMO_POSTER_SRC}
                  alt="PayLink payment flow preview"
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
                  poster={DEMO_POSTER_SRC}
                  className="landing-demo-video"
                  aria-label="PayLink payment flow preview"
                >
                  <source src={DEMO_VIDEO_SRC} type="video/webm" />
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
