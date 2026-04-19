"use client";

import { useEffect, useState, useTransition } from "react";
import type { Hex } from "viem";
import { getExplorerBaseUrl, getChainLabel, getContractAddress } from "../lib/chains";
import { fetchProfileByOwner } from "../lib/contract";
import { buildShareUrl, sanitizeHandleInput, shortenAddress } from "../lib/format";
import { useMiniPay } from "../lib/minipay";
import { env } from "../lib/env";
import { getSupportedTokens } from "../lib/tokens";
import { setProfileTx, waitForTransaction } from "../lib/wallet";
import { ShareLink } from "./share-link";
import { TokenPicker } from "./token-picker";

type FormState = {
  handle: string;
  displayName: string;
  bio: string;
  paymentMessage: string;
  preferredToken: Hex | "";
};

const emptyState: FormState = {
  handle: "",
  displayName: "",
  bio: "",
  paymentMessage: "",
  preferredToken: ""
};

export function ProfileForm() {
  const { account, chainId, hasProvider, isMiniPay, isConnecting, connect } =
    useMiniPay();
  const [form, setForm] = useState<FormState>(emptyState);
  const [profileExists, setProfileExists] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSubmitting, startSubmitting] = useTransition();

  const tokens = getSupportedTokens(chainId);
  const contractAddress = getContractAddress(chainId);
  const defaultTokenAddress = tokens[0]?.address || "";

  useEffect(() => {
    if (!form.preferredToken && defaultTokenAddress) {
      setForm((current) => ({
        ...current,
        preferredToken: defaultTokenAddress
      }));
    }
  }, [defaultTokenAddress, form.preferredToken]);

  useEffect(() => {
    if (!account) return;
    const activeAccount = account;

    let isCancelled = false;

    async function loadProfile() {
      setIsLoadingProfile(true);
      const profile = await fetchProfileByOwner(activeAccount, chainId);

      if (isCancelled) return;

      if (profile) {
        setProfileExists(true);
        setForm({
          handle: profile.handle,
          displayName: profile.displayName,
          bio: profile.bio,
          paymentMessage: profile.paymentMessage,
          preferredToken: profile.preferredToken
        });
      } else {
        setProfileExists(false);
        setForm((current) => ({
          ...current,
          preferredToken: current.preferredToken || defaultTokenAddress
        }));
      }

      setIsLoadingProfile(false);
    }

    void loadProfile();

    return () => {
      isCancelled = true;
    };
  }, [account, chainId, defaultTokenAddress]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setTxHash(null);

    startSubmitting(() => {
      void (async () => {
        try {
          const activeAccount = account || (await connect());
          if (!activeAccount) {
            throw new Error("Connect your wallet before saving a PayLink.");
          }

          if (!contractAddress) {
            throw new Error("No contract is configured for the active chain yet.");
          }

          if (
            !form.handle ||
            !form.displayName ||
            !form.bio ||
            !form.paymentMessage ||
            !form.preferredToken
          ) {
            throw new Error("Fill out all fields before publishing the profile.");
          }

          const hash = await setProfileTx({
            handle: form.handle,
            displayName: form.displayName,
            bio: form.bio,
            paymentMessage: form.paymentMessage,
            preferredToken: form.preferredToken,
            chainId
          });

          setTxHash(hash);
          setStatus("Waiting for confirmation...");
          await waitForTransaction(hash, chainId);
          setProfileExists(true);
          setStatus("Profile published onchain.");
        } catch (error) {
          setStatus(
            error instanceof Error ? error.message : "Could not save the profile."
          );
        }
      })();
    });
  }

  const shareUrl = form.handle
    ? buildShareUrl(env.appUrl, form.handle)
    : null;

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <div className="card-surface rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">
            {isMiniPay ? "MiniPay detected" : "Wallet compatible"}
          </span>
          <span className="eyebrow">{getChainLabel(chainId)}</span>
          {account ? (
            <span className="eyebrow">{shortenAddress(account)}</span>
          ) : null}
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create the payment page you can actually share.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
            Publish a short MiniPay-native profile, keep a stablecoin preference,
            and reuse the same handle for freelancer tips, service payments, and
            lightweight invoices.
          </p>
        </div>

        {!hasProvider ? (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-[var(--line)] bg-white/80 p-5 text-sm text-[color:rgba(23,50,40,0.75)]">
            Open this page in MiniPay or a browser wallet to publish your profile.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                Handle
              </span>
              <input
                value={form.handle}
                readOnly={profileExists}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    handle: sanitizeHandleInput(event.target.value)
                  }))
                }
                placeholder="gelborn"
                className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)] disabled:bg-[var(--sand)]"
              />
              <p className="mt-2 text-xs text-[color:rgba(23,50,40,0.65)]">
                {profileExists
                  ? "Handles are immutable after the first publish."
                  : "3-32 characters. Use lowercase letters, numbers, - or _."}
              </p>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                Display name
              </span>
              <input
                value={form.displayName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    displayName: event.target.value
                  }))
                }
                placeholder="Gelborn Studio"
                className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
              Bio
            </span>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  bio: event.target.value
                }))
              }
              placeholder="Product design, lightweight websites, and interface systems."
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
              Payment message
            </span>
            <textarea
              rows={3}
              value={form.paymentMessage}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  paymentMessage: event.target.value
                }))
              }
              placeholder="Thanks for paying through MiniPay."
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
            />
          </label>

          <TokenPicker
            selectedAddress={form.preferredToken}
            options={tokens}
            onChange={(address) =>
              setForm((current) => ({
                ...current,
                preferredToken: address as Hex
              }))
            }
          />

          <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-[color:rgba(23,50,40,0.7)]">
              {isLoadingProfile
                ? "Loading your existing profile..."
                : contractAddress
                  ? "Profile updates write directly to the deployed PayLink contract."
                  : "Set a contract address in .env before using the editor."}
            </div>

            <div className="flex flex-wrap gap-3">
              {!account ? (
                <button
                  type="button"
                  onClick={() => {
                    void connect();
                  }}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
                >
                  {isConnecting ? "Connecting..." : "Connect wallet"}
                </button>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting || isLoadingProfile || !contractAddress}
                className="rounded-full bg-[var(--meadow)] px-5 py-2.5 text-sm font-semibold text-[var(--sand)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Publishing..." : profileExists ? "Update profile" : "Publish profile"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <aside className="space-y-6">
        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
            Live status
          </p>
          <div className="mt-4 space-y-3 text-sm text-[color:rgba(23,50,40,0.8)]">
            <p>
              Wallet: <span className="font-semibold">{account ? shortenAddress(account) : "Not connected"}</span>
            </p>
            <p>
              Chain: <span className="font-semibold">{getChainLabel(chainId)}</span>
            </p>
            <p>
              Contract:{" "}
              <span className="font-semibold">
                {contractAddress ? shortenAddress(contractAddress) : "Missing"}
              </span>
            </p>
            {status ? <p className="rounded-2xl bg-[var(--sand)] px-3 py-3">{status}</p> : null}
            {txHash ? (
              <a
                href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-[var(--line)] px-3 py-3 font-medium transition hover:border-[var(--meadow)]"
              >
                View last transaction
              </a>
            ) : null}
          </div>
        </div>

        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
            Why this matters
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:rgba(23,50,40,0.8)]">
            <li>Turn a public handle into a direct stablecoin payment surface.</li>
            <li>Keep profile state onchain and payment history event-driven.</li>
            <li>Stay inside the MiniPay utility lane instead of building a generic demo.</li>
          </ul>
        </div>

        {shareUrl ? <ShareLink url={shareUrl} /> : null}
      </aside>
    </section>
  );
}
