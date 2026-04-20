"use client";

import { useEffect, useState } from "react";
import type { Hex } from "viem";
import { fetchProfileByOwner, fetchRecentPayments, type PaymentRecord, type ProfileRecord } from "./contract";
import { resolveContractAddressForChain } from "./chains";
import { useMiniPay } from "./minipay";

type ContractAddresses = {
  celo: Hex | null;
  celoSepolia: Hex | null;
};

export function useOwnerState({
  initialChainId,
  contractAddresses
}: {
  initialChainId: number;
  contractAddresses: ContractAddresses;
}) {
  const wallet = useMiniPay(initialChainId);
  const contractAddress = resolveContractAddressForChain(
    initialChainId,
    contractAddresses
  );
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);

  useEffect(() => {
    if (!wallet.account || !contractAddress) {
      setProfile(null);
      setPayments([]);
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      setIsLoadingProfile(true);
      const nextProfile = await fetchProfileByOwner(
        wallet.account as Hex,
        initialChainId,
        contractAddress
      );

      if (!cancelled) {
        setProfile(nextProfile);
        setIsLoadingProfile(false);
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [contractAddress, initialChainId, wallet.account]);

  useEffect(() => {
    const activeProfile = profile;

    if (!activeProfile || !contractAddress) {
      setPayments([]);
      return;
    }

    let cancelled = false;
    const owner = activeProfile.owner;

    async function loadPayments() {
      setIsLoadingPayments(true);
      const nextPayments = await fetchRecentPayments(
        owner,
        initialChainId,
        contractAddress
      );

      if (!cancelled) {
        setPayments(nextPayments);
        setIsLoadingPayments(false);
      }
    }

    void loadPayments();

    return () => {
      cancelled = true;
    };
  }, [contractAddress, initialChainId, profile]);

  async function refreshProfile() {
    if (!wallet.account || !contractAddress) return null;

    setIsLoadingProfile(true);

    const nextProfile = await fetchProfileByOwner(
      wallet.account as Hex,
      initialChainId,
      contractAddress
    );

    setProfile(nextProfile);
    setIsLoadingProfile(false);

    if (nextProfile) {
      setIsLoadingPayments(true);
      const nextPayments = await fetchRecentPayments(
        nextProfile.owner,
        initialChainId,
        contractAddress
      );
      setPayments(nextPayments);
      setIsLoadingPayments(false);
      return nextProfile;
    }

    setPayments([]);
    return null;
  }

  return {
    ...wallet,
    contractAddress,
    profile,
    payments,
    isLoadingProfile,
    isLoadingPayments,
    refreshProfile
  };
}
