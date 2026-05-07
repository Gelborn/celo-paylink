"use client";

import { useEffect } from "react";
import type { Hex } from "viem";
import { useMiniPay } from "../lib/minipay";

export function PublicOwnerDetectorInner({
  initialChainId,
  owner,
  onOwnerChange
}: {
  initialChainId: number;
  owner: Hex;
  onOwnerChange: (isOwner: boolean) => void;
}) {
  const { account } = useMiniPay(initialChainId);

  useEffect(() => {
    onOwnerChange(
      Boolean(account) && account!.toLowerCase() === owner.toLowerCase()
    );
  }, [account, onOwnerChange, owner]);

  return null;
}
