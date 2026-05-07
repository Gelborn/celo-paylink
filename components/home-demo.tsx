"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "./locale-provider";

const DEMO_MEDIA = {
  en: {
    poster: "/paylink-demo-poster.webp",
    video: "/paylink-demo-loop.webm",
    alt: "PayLink payment flow preview"
  },
  "pt-BR": {
    poster: "/paylink-demo-pt-br-poster.webp",
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
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [canUseMotion, setCanUseMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const demoMedia = DEMO_MEDIA[locale];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          addEventListener?: (
            type: "change",
            listener: () => void
          ) => void;
          removeEventListener?: (
            type: "change",
            listener: () => void
          ) => void;
        };
      }
    ).connection;
    const syncPreference = () => {
      setCanUseMotion(!mediaQuery.matches && !connection?.saveData);
    };

    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);
    connection?.addEventListener?.("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
      connection?.removeEventListener?.("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" }
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setIsIdle(true), {
        timeout: 1800
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setIsIdle(true), 900);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  const shouldRenderVideo = canUseMotion && isVisible && isIdle;

  return (
    <figure className="mx-auto max-w-full space-y-4 overflow-hidden">
      <div className="device-shell">
        <div className="device-frame">
          <div className="device-screen">
            <div ref={frameRef} className="device-screen-inner">
              {shouldRenderVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={demoMedia.poster}
                  className="landing-demo-video"
                  aria-label={demoMedia.alt}
                >
                  <source src={demoMedia.video} type="video/webm" />
                </video>
              ) : (
                <Image
                  src={demoMedia.poster}
                  alt={demoMedia.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 84vw"
                  className="landing-demo-image"
                />
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
