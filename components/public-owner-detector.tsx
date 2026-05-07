"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Hex } from "viem";

const PublicOwnerDetectorInner = dynamic(
  () =>
    import("./public-owner-detector-inner").then(
      (module) => module.PublicOwnerDetectorInner
    ),
  {
    ssr: false,
    loading: () => null
  }
);

export function PublicOwnerDetector({
  initialChainId,
  owner,
  onOwnerChange
}: {
  initialChainId: number;
  owner: Hex;
  onOwnerChange: (isOwner: boolean) => void;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 1800
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setShouldLoad(true), 900);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return shouldLoad ? (
    <PublicOwnerDetectorInner
      initialChainId={initialChainId}
      owner={owner}
      onOwnerChange={onOwnerChange}
    />
  ) : null;
}
