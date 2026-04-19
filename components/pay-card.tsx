"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Hex } from "viem";
import type { PaymentRecord, ProfileRecord } from "../lib/contract";
import { getContractAddress, getExplorerBaseUrl } from "../lib/chains";
import { formatTokenAmount, shortenAddress } from "../lib/format";
import { useMiniPay } from "../lib/minipay";
import { getSupportedTokens, getTokenByAddress } from "../lib/tokens";
import {
  approveToken,
  parseTokenAmount,
  payTx,
  readAllowance,
  readBalance,
  waitForTransaction
} from "../lib/wallet";
import { AmountPresets } from "./amount-presets";
import { RecentPayments } from "./recent-payments";
import { ShareLink } from "./share-link";
import { TokenPicker } from "./token-picker";

type PayCardProps = {
  profile: ProfileRecord;
  payments: PaymentRecord[];
  shareUrl: string;
  initialAmount?: string;
  initialReference?: string;
  chainId: number;
};

export function PayCard({
  profile,
  payments,
  shareUrl,
  initialAmount = "",
  initialReference = "",
  chainId
}: PayCardProps) {
  const router = useRouter();
  const { account, connect, isMiniPay, isConnecting } = useMiniPay();
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<Hex>(
    profile.preferredToken
  );
  const [amountInput, setAmountInput] = useState(initialAmount);
  const [reference, setReference] = useState(initialReference);
  const [balance, setBalance] = useState<bigint | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [isProcessing, startProcessing] = useTransition();

  const tokens = getSupportedTokens(chainId);
  const selectedToken =
    getTokenByAddress(selectedTokenAddress, chainId) || tokens[0];
  const contractAddress = getContractAddress(chainId);

  useEffect(() => {
    if (!account || !selectedToken) {
      setBalance(null);
      return;
    }

    const activeAccount = account;

    let cancelled = false;

    async function loadBalance() {
      const nextBalance = await readBalance(
        selectedToken.address,
        activeAccount,
        chainId
      );

      if (!cancelled) {
        setBalance(nextBalance);
      }
    }

    void loadBalance();

    return () => {
      cancelled = true;
    };
  }, [account, chainId, selectedToken]);

  async function handlePay() {
    setStatus(null);
    setTxHash(null);

    startProcessing(() => {
      void (async () => {
        try {
          const activeAccount = account || (await connect());
          if (!activeAccount) {
            throw new Error("Connect a wallet to complete the payment.");
          }

          if (!contractAddress || !selectedToken) {
            throw new Error("Missing contract or token configuration.");
          }

          if (!amountInput) {
            throw new Error("Enter an amount before sending.");
          }

          const parsedAmount = parseTokenAmount(
            amountInput,
            selectedToken.decimals
          );

          if (parsedAmount <= 0n) {
            throw new Error("Use a positive amount.");
          }

          const allowance = await readAllowance(
            selectedToken.address,
            activeAccount,
            contractAddress,
            chainId
          );

          if (allowance < parsedAmount) {
            setStatus(`Approving ${selectedToken.symbol}...`);
            const approvalHash = await approveToken({
              tokenAddress: selectedToken.address,
              amount: parsedAmount,
              chainId
            });
            await waitForTransaction(approvalHash, chainId);
          }

          setStatus(`Sending ${selectedToken.symbol}...`);
          const paymentHash = await payTx({
            recipientOrHandle: profile.handle,
            token: selectedToken.address,
            amount: parsedAmount,
            reference,
            chainId
          });

          setTxHash(paymentHash);
          await waitForTransaction(paymentHash, chainId);

          router.push(
            `/success?tx=${paymentHash}&handle=${encodeURIComponent(profile.handle)}`
          );
        } catch (error) {
          setStatus(
            error instanceof Error ? error.message : "Payment failed."
          );
        }
      })();
    });
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <div className="card-surface rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{isMiniPay ? "MiniPay ready" : "Wallet ready"}</span>
          <span className="eyebrow">{profile.handle}</span>
        </div>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {profile.displayName}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
              {profile.bio}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[var(--meadow)] px-4 py-3 text-[var(--sand)]">
            <p className="text-xs uppercase tracking-[0.16em] opacity-75">
              Preferred token
            </p>
            <p className="mt-1 text-lg font-semibold">
              {getTokenByAddress(profile.preferredToken, chainId)?.symbol || "Token"}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[var(--line)] bg-white p-5">
          <p className="text-sm font-medium text-[color:rgba(23,50,40,0.8)]">
            {profile.paymentMessage}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_220px]">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                  Preset amount
                </p>
                <AmountPresets
                  values={[1, 5, 10, 25]}
                  selectedValue={amountInput}
                  onSelect={setAmountInput}
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                  Custom amount
                </span>
                <input
                  inputMode="decimal"
                  value={amountInput}
                  onChange={(event) =>
                    setAmountInput(event.target.value.replace(/[^\d.]/g, ""))
                  }
                  placeholder="5.00"
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--sand)] px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                  Note
                </span>
                <input
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="Coffee, logo deposit, landing page..."
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--sand)] px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
                />
              </label>
            </div>

            <div className="space-y-5">
              <TokenPicker
                selectedAddress={selectedTokenAddress}
                options={tokens}
                onChange={(address) => setSelectedTokenAddress(address as Hex)}
              />

              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
                  Paying from
                </p>
                <p className="mt-2 font-semibold">
                  {account ? shortenAddress(account) : "Not connected"}
                </p>
                <p className="mt-2 text-[color:rgba(23,50,40,0.7)]">
                  {balance !== null && selectedToken
                    ? `${formatTokenAmount(balance, selectedToken.address, chainId)} ${selectedToken.symbol} available`
                    : "Connect to check balance"}
                </p>
              </div>

              {!account ? (
                <button
                  type="button"
                  onClick={() => {
                    void connect();
                  }}
                  className="w-full rounded-full border border-[var(--line)] px-4 py-3 text-sm font-semibold transition hover:border-[var(--meadow)] hover:bg-white"
                >
                  {isConnecting ? "Connecting..." : "Connect wallet"}
                </button>
              ) : null}

              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing || !contractAddress}
                className="w-full rounded-full bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Pay now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <ShareLink url={shareUrl} />

        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
            Payment flow
          </p>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-[color:rgba(23,50,40,0.8)]">
            <li>1. Pick a stablecoin and set the amount.</li>
            <li>2. Approve the token if this is the first payment.</li>
            <li>3. Send the payment directly to {profile.displayName}.</li>
            <li>4. Use the success page tx link as proof of payment.</li>
          </ol>

          {status ? (
            <div className="mt-5 rounded-[1.5rem] bg-[var(--sand)] px-4 py-3 text-sm">
              {status}
            </div>
          ) : null}

          {txHash ? (
            <a
              href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block rounded-[1.5rem] border border-[var(--line)] px-4 py-3 text-sm font-medium transition hover:border-[var(--meadow)]"
            >
              View pending transaction
            </a>
          ) : null}
        </div>

        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(23,50,40,0.66)]">
            Recent payments
          </p>
          <div className="mt-4">
            <RecentPayments payments={payments} chainId={chainId} />
          </div>
        </div>
      </aside>
    </section>
  );
}
