"use client";

import { createPublicClient, createWalletClient, custom, http, type Hex } from "viem";
import { parseUnits } from "viem";
import { erc20Abi, payLinkAbi } from "./abi";
import {
  getChainConfig,
  getDefaultChainId,
  getRpcUrl,
  isSupportedCeloChain
} from "./chains";

type EthereumProvider = NonNullable<Window["ethereum"]>;

function ensureProvider() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("An injected wallet is required for this action.");
  }

  return window.ethereum;
}

export async function getInjectedAccounts() {
  const provider = ensureProvider();
  return (await provider.request({
    method: "eth_requestAccounts",
    params: []
  })) as Hex[];
}

export async function getInjectedChainId() {
  const provider = ensureProvider();
  const raw = (await provider.request({ method: "eth_chainId" })) as string;
  const chainId = Number.parseInt(raw, 16);
  return isSupportedCeloChain(chainId) ? chainId : getDefaultChainId();
}

export async function getInjectedWalletClient(chainId?: number) {
  const activeChainId = chainId ?? (await getInjectedChainId());
  return createWalletClient({
    chain: getChainConfig(activeChainId),
    transport: custom(ensureProvider())
  });
}

export function getBrowserPublicClient(chainId = getDefaultChainId()) {
  return createPublicClient({
    chain: getChainConfig(chainId),
    transport: http(getRpcUrl(chainId))
  });
}

export async function readAllowance(
  tokenAddress: Hex,
  owner: Hex,
  spender: Hex,
  chainId?: number
) {
  const client = getBrowserPublicClient(chainId);
  return client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner, spender]
  });
}

export async function readBalance(
  tokenAddress: Hex,
  owner: Hex,
  chainId?: number
) {
  const client = getBrowserPublicClient(chainId);
  return client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [owner]
  });
}

export async function approveToken(params: {
  contractAddress: Hex;
  tokenAddress: Hex;
  amount: bigint;
  chainId?: number;
}) {
  const { contractAddress, tokenAddress, amount, chainId } = params;
  const [account] = await getInjectedAccounts();
  const activeChainId = chainId ?? (await getInjectedChainId());
  const walletClient = await getInjectedWalletClient(activeChainId);

  return walletClient.writeContract({
    account,
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [contractAddress, amount] as const
  });
}

export async function setProfileTx(params: {
  contractAddress: Hex;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  paymentMessage: string;
  preferredToken: Hex;
  chainId?: number;
}) {
  const {
    contractAddress,
    handle,
    displayName,
    avatarUrl,
    bio,
    paymentMessage,
    preferredToken,
    chainId
  } = params;
  const [account] = await getInjectedAccounts();
  const activeChainId = chainId ?? (await getInjectedChainId());
  const walletClient = await getInjectedWalletClient(activeChainId);

  return walletClient.writeContract({
    account,
    address: contractAddress,
    abi: payLinkAbi,
    functionName: "setProfile",
    args: [
      handle,
      displayName,
      avatarUrl,
      bio,
      paymentMessage,
      preferredToken
    ] as const
  });
}

export async function payTx(params: {
  contractAddress: Hex;
  recipientOrHandle: string;
  token: Hex;
  amount: bigint;
  reference: string;
  chainId?: number;
}) {
  const { contractAddress, recipientOrHandle, token, amount, reference, chainId } =
    params;
  const [account] = await getInjectedAccounts();
  const activeChainId = chainId ?? (await getInjectedChainId());
  const walletClient = await getInjectedWalletClient(activeChainId);

  return walletClient.writeContract({
    account,
    address: contractAddress,
    abi: payLinkAbi,
    functionName: "pay",
    args: [recipientOrHandle, token, amount, reference] as const
  });
}

export async function waitForTransaction(hash: Hex, chainId?: number) {
  const activeChainId = chainId ?? (await getInjectedChainId());
  const client = getBrowserPublicClient(activeChainId);
  return client.waitForTransactionReceipt({ hash });
}

export function parseTokenAmount(amount: string, decimals: number) {
  return parseUnits(amount, decimals);
}
