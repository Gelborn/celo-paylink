"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import type { Hex } from "viem";
import {
  getChainLabel,
  CELO_SEPOLIA_CHAIN_ID,
  isSupportedCeloChain
} from "./chains";
import { ensureInjectedChain } from "./wallet";

type EthereumProvider = NonNullable<Window["ethereum"]>;
const DISCONNECT_STORAGE_KEY = "paylink_wallet_disconnected";

async function detectChainId(fallbackChainId: number) {
  if (!window.ethereum) return fallbackChainId;
  const raw = (await window.ethereum.request({
    method: "eth_chainId"
  })) as string;
  const chainId = Number.parseInt(raw, 16);
  return isSupportedCeloChain(chainId) ? chainId : fallbackChainId;
}

export function useMiniPay(initialChainId = CELO_SEPOLIA_CHAIN_ID) {
  const [account, setAccount] = useState<Hex | null>(null);
  const [chainId, setChainId] = useState<number>(initialChainId);
  const [hasProvider, setHasProvider] = useState(false);
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnectedByUser, setIsDisconnectedByUser] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const autoConnectAttemptedRef = useRef(false);

  function isSoftDisconnected() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(DISCONNECT_STORAGE_KEY) === "1";
  }

  const switchToDefaultChain = useCallback(async (options?: { silent?: boolean }) => {
    if (!window.ethereum) {
      const message =
        "No wallet found. Open the app in MiniPay or use a browser with an injected wallet.";
      if (!options?.silent) {
        setConnectError(message);
      }
      return null;
    }

    if (window.ethereum.isMiniPay) {
      return null;
    }

    try {
      const nextChainId = await ensureInjectedChain(initialChainId);
      setChainId(nextChainId);
      if (!options?.silent) {
        setConnectError(null);
      }
      return nextChainId;
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : `Switch your wallet to ${getChainLabel(initialChainId)} to continue.`;
      if (!options?.silent) {
        setConnectError(message);
      }
      return null;
    }
  }, [initialChainId]);

  const refreshWalletState = useCallback(async () => {
    if (typeof window === "undefined") return;

    const provider = window.ethereum;
    setHasProvider(Boolean(provider));
    setIsMiniPay(Boolean(provider?.isMiniPay));
    setIsDisconnectedByUser(isSoftDisconnected());

    if (!provider) return;

    const nextChainId = await detectChainId(initialChainId);
    setChainId(nextChainId);
    const disconnected = isSoftDisconnected();
    setIsDisconnectedByUser(disconnected);

    if (disconnected) {
      setAccount(null);
      return;
    }

    const accounts = (await provider.request({
      method: "eth_accounts",
      params: []
    })) as Hex[];
    setAccount(accounts[0] || null);
  }, [initialChainId]);

  const connect = useCallback(async (options?: { silent?: boolean }) => {
    if (!window.ethereum) {
      const message =
        "No wallet found. Open the app in MiniPay or use a browser with an injected wallet.";
      if (!options?.silent) {
        setConnectError(message);
      }
      return null;
    }

    setIsConnecting(true);
    if (!options?.silent) {
      setConnectError(null);
    }

    try {
      window.localStorage.removeItem(DISCONNECT_STORAGE_KEY);
      setIsDisconnectedByUser(false);
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
        params: []
      })) as Hex[];
      const detectedChainId = await detectChainId(initialChainId);
      const nextChainId =
        !window.ethereum.isMiniPay && detectedChainId !== initialChainId
          ? ((await switchToDefaultChain({ silent: options?.silent })) ??
            detectedChainId)
          : detectedChainId;

      setAccount(accounts[0] || null);
      setChainId(nextChainId);

      return accounts[0] || null;
    } catch (error) {
      if (options?.silent) {
        return null;
      }

      const message =
        error instanceof Error && error.message
          ? error.message
          : "Could not connect the wallet.";
      setConnectError(message);
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [initialChainId, switchToDefaultChain]);

  const disconnect = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISCONNECT_STORAGE_KEY, "1");
    }
    setIsDisconnectedByUser(true);
    setConnectError(null);
    setAccount(null);
  }, []);

  const clearConnectError = useCallback(() => {
    setConnectError(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const provider = window.ethereum;
    setHasProvider(Boolean(provider));
    setIsMiniPay(Boolean(provider?.isMiniPay));
    setIsDisconnectedByUser(isSoftDisconnected());

    if (!provider) return;

    const syncFromProvider = async () => {
      await refreshWalletState();

      if (
        provider.isMiniPay &&
        !(await provider.request({
          method: "eth_accounts",
          params: []
        }) as Hex[])[0] &&
        !autoConnectAttemptedRef.current
      ) {
        autoConnectAttemptedRef.current = true;
        startTransition(() => {
          void connect({ silent: true });
        });
      }
    };

    const handleAccountsChanged = (accounts: unknown) => {
      if (isSoftDisconnected()) {
        setAccount(null);
        return;
      }
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
  }, [connect, initialChainId, refreshWalletState]);

  return {
    account,
    chainId,
    expectedChainId: initialChainId,
    expectedChainLabel: getChainLabel(initialChainId),
    isWrongChain: chainId !== initialChainId,
    hasProvider,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    connectError,
    connect,
    switchToDefaultChain,
    refreshWalletState,
    disconnect,
    clearConnectError
  };
}
