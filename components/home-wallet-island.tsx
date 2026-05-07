"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Hex } from "viem";

const HomeWalletControls = dynamic(
  () => import("./home-wallet-controls").then((module) => module.HomeWalletControls),
  {
    ssr: false,
    loading: () => null
  }
);

export function HomeWalletIsland({
  initialChainId,
  targetId = "home-wallet-slot"
}: {
  initialChainId: number;
  targetId?: string;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
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
    <HomeWalletControls initialChainId={initialChainId} targetId={targetId} />
  ) : null;
}
