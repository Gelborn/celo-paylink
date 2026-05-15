"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Coins, ExternalLink, FileText, Send, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Hex } from "viem";
import {
  getExplorerBaseUrl,
  resolveContractAddressForChain
} from "../lib/chains";
import type { ProfileRecord } from "../lib/contract";
import {
  formatTokenAmount,
  sanitizeCurrencyInput,
  shortenAddress
} from "../lib/format";
import { interpolate } from "../lib/i18n";
import { useMiniPay } from "../lib/minipay";
import { fadeUp, motionTransitions, panelSwap } from "../lib/motion";
import { getSupportedTokens, getTokenByAddress, getTokenFromQuery } from "../lib/tokens";
import {
  approveToken,
  parseTokenAmount,
  payTx,
  readAllowance,
  readBalance,
  waitForTransaction
} from "../lib/wallet";
import { AmountPresets } from "./amount-presets";
import { NetworkMismatchModal } from "./network-mismatch-modal";
import { TokenPicker } from "./token-picker";
import { useLocale } from "./locale-provider";
import { Button } from "./ui/button";
import { FeedbackMessage } from "./ui/feedback-message";
import { Input } from "./ui/input";
import { DetailTile, IconFrame } from "./ui/patterns";

type PaymentStage =
  | null
  | "approving"
  | "confirmingApproval"
  | "sending"
  | "openingReceipt";

type PaymentResult = {
  txHash: Hex;
  amount: string;
  token: string;
  reference: string;
};

export function PaymentPanelIsland({
  initialChainId,
  contractAddresses,
  profile,
  initialAmount,
  initialReference,
  initialTokenQuery
}: {
  initialChainId: number;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
  profile: ProfileRecord;
  initialAmount: string;
  initialReference: string;
  initialTokenQuery: string;
}) {
  const { dictionary } = useLocale();
  const {
    account,
    connect,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    chainId,
    expectedChainLabel,
    isWrongChain,
    switchToDefaultChain,
    refreshWalletState
  } = useMiniPay(initialChainId);
  const [amount, setAmount] = useState(initialAmount || "15");
  const [reference, setReference] = useState(initialReference || "");
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);
  const [paymentStage, setPaymentStage] = useState<PaymentStage>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const tokens = getSupportedTokens(initialChainId);
  const contractAddress = resolveContractAddressForChain(
    initialChainId,
    contractAddresses
  );
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<Hex | "">(
    getTokenFromQuery(initialTokenQuery, initialChainId)?.address ||
      profile.preferredToken ||
      tokens[0]?.address ||
      ""
  );
  const selectedToken =
    getTokenByAddress(selectedTokenAddress, initialChainId) || tokens[0];
  const isPaymentBusy = paymentStage !== null;

  useEffect(() => {
    const preferredToken =
      getTokenFromQuery(initialTokenQuery, initialChainId)?.address ||
      profile.preferredToken ||
      tokens[0]?.address ||
      "";

    if (
      !selectedTokenAddress ||
      getTokenByAddress(selectedTokenAddress, initialChainId)
    ) {
      if (!selectedTokenAddress && preferredToken) {
        setSelectedTokenAddress(preferredToken);
      }
      return;
    }

    setSelectedTokenAddress(preferredToken);
  }, [
    initialChainId,
    initialTokenQuery,
    profile.preferredToken,
    selectedTokenAddress,
    tokens
  ]);

  useEffect(() => {
    if (!account || !selectedToken) {
      setBalance(null);
      return;
    }

    let cancelled = false;

    void readBalance(selectedToken.address, account, initialChainId)
      .then((nextBalance) => {
        if (!cancelled) {
          setBalance(nextBalance);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBalance(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [account, initialChainId, selectedToken]);

  const parsedAmount = (() => {
    if (!selectedToken || !amount) {
      return null;
    }

    try {
      return parseTokenAmount(amount, selectedToken.decimals);
    } catch {
      return null;
    }
  })();
  const hasInsufficientBalance = Boolean(
    account &&
      selectedToken &&
      parsedAmount !== null &&
      parsedAmount > 0n &&
      balance !== null &&
      balance < parsedAmount
  );
  const balanceWarning = hasInsufficientBalance && selectedToken
    ? interpolate(dictionary.messages.insufficientBalance, {
        token: selectedToken.symbol
      })
    : null;
  const paymentOverlayCopy =
    paymentStage === "approving"
      ? {
          eyebrow: dictionary.success.eyebrow,
          title: `${dictionary.messages.approving} ${selectedToken?.symbol || ""}`.trim(),
          description: dictionary.messages.waitingConfirmation
        }
      : paymentStage === "confirmingApproval"
        ? {
            eyebrow: dictionary.success.eyebrow,
            title: dictionary.messages.confirmingApproval,
            description: dictionary.messages.waitingConfirmation
          }
        : paymentStage === "sending"
          ? {
              eyebrow: dictionary.success.eyebrow,
              title: `${dictionary.messages.sending} ${selectedToken?.symbol || ""}`.trim(),
              description: dictionary.messages.waitingConfirmation
            }
          : paymentStage === "openingReceipt"
            ? {
                eyebrow: dictionary.success.eyebrow,
                title: dictionary.success.title,
                description: dictionary.messages.openingReceipt
              }
            : null;

  async function handlePay() {
    setStatus(null);
    setTxHash(null);

    try {
      const activeAccount = account || (await connect());
      if (!activeAccount) {
        throw new Error(dictionary.messages.connectBeforePay);
      }

      if (isWrongChain) {
        throw new Error(
          isMiniPay
            ? dictionary.messages.wrongNetworkMiniPayDescription
            : dictionary.messages.wrongNetworkDescription
        );
      }

      if (!contractAddress || !selectedToken) {
        throw new Error(dictionary.messages.missingContract);
      }

      if (!amount || !parsedAmount) {
        throw new Error(dictionary.messages.missingAmount);
      }

      if (parsedAmount <= 0n) {
        throw new Error(dictionary.messages.positiveAmount);
      }

      const allowance = await readAllowance(
        selectedToken.address,
        activeAccount,
        contractAddress,
        initialChainId
      );

      if (allowance < parsedAmount) {
        setPaymentStage("approving");
        const approvalHash = await approveToken({
          contractAddress,
          tokenAddress: selectedToken.address,
          amount: parsedAmount,
          chainId: initialChainId
        });
        setTxHash(approvalHash);
        setPaymentStage("confirmingApproval");
        await waitForTransaction(approvalHash, initialChainId);
      }

      setPaymentStage("sending");
      const paymentHash = await payTx({
        contractAddress,
        recipientOrHandle: profile.handle,
        token: selectedToken.address,
        amount: parsedAmount,
        reference,
        chainId: initialChainId
      });

      setTxHash(paymentHash);
      setPaymentStage("openingReceipt");
      await waitForTransaction(paymentHash, initialChainId);
      setPaymentResult({
        txHash: paymentHash,
        amount,
        token: selectedToken.symbol,
        reference
      });
      setPaymentStage(null);
    } catch (error) {
      setPaymentStage(null);
      setStatus(
        error instanceof Error ? error.message : dictionary.messages.noProfile
      );
    }
  }

  const handleWrongNetworkAction = () => {
    if (isMiniPay) {
      void refreshWalletState();
      return;
    }

    void switchToDefaultChain();
  };

  if (paymentResult) {
    return (
      <motion.div
        className="space-y-5 rounded-lg border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] px-5 py-6 text-center sm:px-6"
        variants={panelSwap}
        initial="hidden"
        animate="show"
      >
        <IconFrame tone="success" className="mx-auto h-12 w-12">
          <CheckCircle2 aria-hidden="true" />
        </IconFrame>
        <div className="space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {dictionary.success.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {dictionary.success.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-400">
            {dictionary.success.description}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950/70 px-4 py-4 text-left">
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailTile
              icon={<Coins aria-hidden="true" />}
              label={dictionary.fields.amount}
              value={`${paymentResult.amount} ${paymentResult.token}`}
              tone="accent"
            />
            {paymentResult.reference ? (
              <DetailTile
                icon={<FileText aria-hidden="true" />}
                label={dictionary.fields.note}
                value={paymentResult.reference}
              />
            ) : null}
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.labels.transaction}
            </p>
            <code className="mt-2 block break-all text-sm text-zinc-300">
              {paymentResult.txHash}
            </code>
          </div>
        </div>

        <Link
          href={`${getExplorerBaseUrl(initialChainId)}/tx/${paymentResult.txHash}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]"
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          {dictionary.actions.openExplorer}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      {account && isWrongChain ? (
        <NetworkMismatchModal
          eyebrow={dictionary.labels.network}
          title={expectedChainLabel}
          description={
            isMiniPay
              ? dictionary.messages.wrongNetworkMiniPayDescription
              : dictionary.messages.wrongNetworkDescription
          }
          actionLabel={
            isMiniPay
              ? dictionary.actions.refreshNetwork
              : dictionary.actions.switchNetwork
          }
          onAction={handleWrongNetworkAction}
        />
      ) : null}

      <div
        id="paylink-payment-panel"
        className="space-y-5 rounded-lg border border-white/10 bg-black/25 px-4 py-4 sm:px-5 sm:py-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          {paymentOverlayCopy ? (
            <motion.div
              key={paymentStage}
              className="rounded-lg border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] px-4 py-4"
              variants={panelSwap}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                {paymentOverlayCopy.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {paymentOverlayCopy.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-zinc-400">
                {paymentOverlayCopy.description}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {dictionary.publicPage.paymentFormTitle}
          </p>
          <p className="text-sm leading-7 text-zinc-400">
            {dictionary.publicPage.paymentFormDescription}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            {dictionary.fields.suggestedAmounts}
          </p>
          <AmountPresets
            values={[5, 15, 25, 50]}
            selectedValue={amount}
            onSelect={setAmount}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.fields.amount}
            </span>
            <Input
              inputMode="decimal"
              value={amount}
              onChange={(event) =>
                setAmount(sanitizeCurrencyInput(event.target.value))
              }
              placeholder={dictionary.placeholders.amount}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.fields.note}
            </span>
            <Input
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder={dictionary.placeholders.note}
            />
          </label>
        </div>

        <TokenPicker
          label={dictionary.fields.token}
          selectedAddress={selectedTokenAddress}
          options={tokens}
          onChange={(address) => setSelectedTokenAddress(address as Hex)}
        />

        <DetailTile
          icon={<Wallet aria-hidden="true" />}
          label={dictionary.labels.payingFrom}
          value={account ? shortenAddress(account) : dictionary.labels.notConnected}
          description={
            balance !== null && selectedToken
              ? `${formatTokenAmount(balance, selectedToken.address, initialChainId)} ${
                  selectedToken.symbol
                }`
              : undefined
          }
        />

        {balanceWarning ? (
          <p className="text-sm text-amber-300">{balanceWarning}</p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {!account && (!isMiniPay || isDisconnectedByUser) ? (
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              leftIcon={<Wallet aria-hidden="true" />}
              onClick={() => {
                void connect();
              }}
            >
              {isConnecting
                ? dictionary.messages.waitingConfirmation
                : dictionary.actions.connectWallet}
            </Button>
          ) : null}
          <Button
            className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 hover:bg-[color:var(--accent-strong)] sm:w-auto"
            leftIcon={<Send aria-hidden="true" />}
            onClick={handlePay}
            disabled={
              isPaymentBusy ||
              !contractAddress ||
              isWrongChain ||
              hasInsufficientBalance
            }
          >
            {isPaymentBusy
              ? dictionary.messages.waitingConfirmation
              : dictionary.actions.payNow}
          </Button>
        </div>

        <FeedbackMessage tone={status ? "error" : "muted"}>
          {status}
        </FeedbackMessage>
        {txHash ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransitions.micro}
          >
            <Link
              href={`${getExplorerBaseUrl(initialChainId)}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 underline underline-offset-4"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              {dictionary.actions.openExplorer}
            </Link>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
