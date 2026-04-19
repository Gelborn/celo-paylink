"use client";

import { startTransition, useEffect, useState } from "react";
import type { Hex } from "viem";
import { getDefaultChainId, isSupportedCeloChain } from "./chains";

type EthereumProvider = NonNullable<Window["ethereum"]>;

async function detectChainId() {
  if (!window.ethereum) return getDefaultChainId();
  const raw = (await window.ethereum.request({
    method: "eth_chainId"
  })) as string;
  const chainId = Number.parseInt(raw, 16);
  return isSupportedCeloChain(chainId) ? chainId : getDefaultChainId();
}

export function useMiniPay() {
  const [account, setAccount] = useState<Hex | null>(null);
  const [chainId, setChainId] = useState<number>(getDefaultChainId());
  const [hasProvider, setHasProvider] = useState(false);
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  async function connect() {
    if (!window.ethereum) {
      throw new Error("No injected wallet found. Open the app in MiniPay or another browser wallet.");
    }

    setIsConnecting(true);

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
        params: []
      })) as Hex[];
      const nextChainId = await detectChainId();

      setAccount(accounts[0] || null);
      setChainId(nextChainId);

      return accounts[0] || null;
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const provider = window.ethereum;
    setHasProvider(Boolean(provider));
    setIsMiniPay(Boolean(provider?.isMiniPay));

    if (!provider) return;

    const syncFromProvider = async () => {
      const accounts = (await provider.request({
        method: "eth_accounts",
        params: []
      })) as Hex[];
      const nextChainId = await detectChainId();
      setAccount(accounts[0] || null);
      setChainId(nextChainId);
    };

    const handleAccountsChanged = (accounts: unknown) => {
      const nextAccounts = accounts as Hex[];
      setAccount(nextAccounts[0] || null);
    };

    const handleChainChanged = (nextChainId: unknown) => {
      const parsed = Number.parseInt(nextChainId as string, 16);
      if (isSupportedCeloChain(parsed)) {
        setChainId(parsed);
      }
    };

    void syncFromProvider();

    if (provider.isMiniPay) {
      startTransition(() => {
        void syncFromProvider();
      });
    }

    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, []);

  return {
    account,
    chainId,
    hasProvider,
    isMiniPay,
    isConnecting,
    connect
  };
}
