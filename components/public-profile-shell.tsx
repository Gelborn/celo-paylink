"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Hex } from "viem";
import type { PaymentRecord, ProfileRecord } from "../lib/contract";
import {
  getExplorerBaseUrl,
  resolveContractAddressForChain
} from "../lib/chains";
import {
  buildShareUrl,
  formatTokenAmount,
  sanitizeCurrencyInput,
  shortenAddress
} from "../lib/format";
import { useMiniPay } from "../lib/minipay";
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
import { Header } from "./header";
import { RecentPayments } from "./recent-payments";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { EmptyState } from "./ui/empty-state";
import { Input } from "./ui/input";
import { SectionHeader } from "./ui/section-header";
import { TokenPicker } from "./token-picker";

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

export function PublicProfileShell({
  appUrl,
  initialChainId,
  contractAddresses,
  profile,
  payments,
  initialAmount,
  initialReference,
  initialTokenQuery,
  contractReady
}: {
  appUrl: string;
  initialChainId: number;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
  handle: string;
  profile: ProfileRecord | null;
  payments: PaymentRecord[];
  initialAmount: string;
  initialReference: string;
  initialTokenQuery: string;
  contractReady: boolean;
}) {
  const { dictionary } = useLocale();
  const {
    account,
    connect,
    disconnect,
    hasProvider,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    connectError,
    clearConnectError,
    chainId
  } = useMiniPay(initialChainId);
  const [amount, setAmount] = useState(initialAmount || "15");
  const [reference, setReference] = useState(initialReference || "");
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);
  const hasPrefilledAmount = Boolean(initialAmount);
  const hasPrefilledReference = Boolean(initialReference);
  const hasPrefilledToken = Boolean(initialTokenQuery);
  const hasPrefilledInvoice = Boolean(
    initialAmount || initialReference || initialTokenQuery
  );
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(
    hasPrefilledInvoice
  );
  const [paymentStage, setPaymentStage] = useState<PaymentStage>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const tokens = getSupportedTokens(chainId);
  const contractAddress = resolveContractAddressForChain(chainId, contractAddresses);

  const [selectedTokenAddress, setSelectedTokenAddress] = useState<Hex | "">(
    getTokenFromQuery(initialTokenQuery, initialChainId)?.address ||
      profile?.preferredToken ||
      tokens[0]?.address ||
      ""
  );

  const selectedToken =
    getTokenByAddress(selectedTokenAddress, chainId) || tokens[0];
  const isOwner =
    Boolean(account) &&
    Boolean(profile) &&
    account!.toLowerCase() === profile!.owner.toLowerCase();

  useEffect(() => {
    const preferredToken =
      getTokenFromQuery(initialTokenQuery, chainId)?.address ||
      profile?.preferredToken ||
      tokens[0]?.address ||
      "";

    if (!selectedTokenAddress || getTokenByAddress(selectedTokenAddress, chainId)) {
      if (!selectedTokenAddress && preferredToken) {
        setSelectedTokenAddress(preferredToken);
      }
      return;
    }

    setSelectedTokenAddress(preferredToken);
  }, [chainId, initialTokenQuery, profile?.preferredToken, selectedTokenAddress, tokens]);

  useEffect(() => {
    if (!account || !selectedToken) {
      setBalance(null);
      return;
    }

    let cancelled = false;

    void readBalance(selectedToken.address, account, chainId).then((nextBalance) => {
      if (!cancelled) {
        setBalance(nextBalance);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [account, chainId, selectedToken]);

  if (!contractReady) {
    return (
      <main>
        <Header
          account={account}
          chainId={chainId}
          hasProvider={hasProvider}
          isMiniPay={isMiniPay}
          isConnecting={isConnecting}
          isDisconnectedByUser={isDisconnectedByUser}
          connectError={connectError}
          onConnect={connect}
          onDisconnect={disconnect}
          onClearConnectError={clearConnectError}
        />
        <EmptyState
          title={dictionary.publicPage.noContractTitle}
          description={dictionary.publicPage.noContractDescription}
        />
      </main>
    );
  }

  if (!profile) {
    return (
      <main>
        <Header
          account={account}
          chainId={chainId}
          hasProvider={hasProvider}
          isMiniPay={isMiniPay}
          isConnecting={isConnecting}
          isDisconnectedByUser={isDisconnectedByUser}
          connectError={connectError}
          onConnect={connect}
          onDisconnect={disconnect}
          onClearConnectError={clearConnectError}
        />
        <EmptyState
          title={dictionary.publicPage.missingTitle}
          description={dictionary.publicPage.missingDescription}
          actions={
            <Link href="/my">
              <Button>{dictionary.publicPage.createYours}</Button>
            </Link>
          }
        />
      </main>
    );
  }

  const activeProfile = profile;
  const publicUrl = buildShareUrl(appUrl, activeProfile.handle);
  const showInvoiceView = !isOwner && hasPrefilledInvoice;
  const isPaymentBusy = paymentStage !== null;
  const paymentSummary = {
    amount,
    token: selectedToken?.symbol || "",
    reference
  };

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

  async function handleSharePublicPage() {
    try {
      if (navigator.share) {
        await navigator.share({ url: publicUrl });
        return;
      }

      await navigator.clipboard.writeText(publicUrl);
    } catch {}
  }

  async function handlePay() {
    setStatus(null);
    setTxHash(null);

    try {
      const activeAccount = account || (await connect());
      if (!activeAccount) {
        throw new Error(dictionary.messages.connectBeforePay);
      }

      if (!contractAddress || !selectedToken) {
        throw new Error(dictionary.messages.missingContract);
      }

      if (!amount) {
        throw new Error(dictionary.messages.missingAmount);
      }

      const parsedAmount = parseTokenAmount(amount, selectedToken.decimals);
      if (parsedAmount <= 0n) {
        throw new Error(dictionary.messages.positiveAmount);
      }

      const allowance = await readAllowance(
        selectedToken.address,
        activeAccount,
        contractAddress,
        chainId
      );

      if (allowance < parsedAmount) {
        setPaymentStage("approving");
        const approvalHash = await approveToken({
          contractAddress,
          tokenAddress: selectedToken.address,
          amount: parsedAmount,
          chainId
        });
        setTxHash(approvalHash);
        setPaymentStage("confirmingApproval");
        await waitForTransaction(approvalHash, chainId);
      }

      setPaymentStage("sending");
      const paymentHash = await payTx({
        contractAddress,
        recipientOrHandle: activeProfile.handle,
        token: selectedToken.address,
        amount: parsedAmount,
        reference,
        chainId
      });

      setTxHash(paymentHash);
      setPaymentStage("openingReceipt");
      await waitForTransaction(paymentHash, chainId);
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

  return (
    <main>
      <Header
        account={account}
        chainId={chainId}
        hasProvider={hasProvider}
        isMiniPay={isMiniPay}
        isConnecting={isConnecting}
        isDisconnectedByUser={isDisconnectedByUser}
        connectError={connectError}
        profileName={isOwner ? activeProfile.displayName : undefined}
        profileImageUrl={isOwner ? activeProfile.avatarUrl : undefined}
        onConnect={connect}
        onDisconnect={disconnect}
        onClearConnectError={clearConnectError}
      />
      {paymentOverlayCopy ? (
        <section className="space-y-6">
          <SectionHeader
            eyebrow={
              showInvoiceView
                ? dictionary.publicPage.invoiceEyebrow
                : dictionary.labels.visitor
            }
            title={activeProfile.displayName}
            description={paymentOverlayCopy.description}
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Card>
              <CardContent className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Avatar
                    name={activeProfile.displayName}
                    imageUrl={activeProfile.avatarUrl}
                    size="xl"
                  />
                  <div className="space-y-2">
                    <Badge>@{activeProfile.handle}</Badge>
                    <div>
                      <h1 className="text-3xl font-semibold text-white sm:text-[2rem]">
                        {activeProfile.displayName}
                      </h1>
                      <p className="text-sm text-zinc-500">{activeProfile.bio}</p>
                    </div>
                  </div>
                </div>

                {activeProfile.paymentMessage ? (
                  <div className="rounded-3xl border border-white/10 bg-zinc-900 px-5 py-5">
                    <p className="text-sm leading-7 text-zinc-300">
                      {activeProfile.paymentMessage}
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-6 px-6 py-8 text-center sm:px-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                    {paymentOverlayCopy.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    {paymentOverlayCopy.title}
                  </h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-900 px-5 py-5 text-left">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        {dictionary.fields.amount}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {paymentSummary.amount} {paymentSummary.token}
                      </p>
                    </div>
                    {paymentSummary.reference ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                          {dictionary.fields.note}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-zinc-300">
                          {paymentSummary.reference}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {txHash ? (
                  <Link
                    href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm text-zinc-300 underline underline-offset-4"
                  >
                    {dictionary.actions.openExplorer}
                  </Link>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </section>
      ) : paymentResult ? (
        <section className="space-y-6">
          <Card className="mx-auto max-w-3xl">
            <CardContent className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar
                  name={activeProfile.displayName}
                  imageUrl={activeProfile.avatarUrl}
                  size="xl"
                />
                <div className="space-y-2">
                  <Badge>@{activeProfile.handle}</Badge>
                  <div>
                    <h1 className="text-3xl font-semibold text-white sm:text-[2rem]">
                      {activeProfile.displayName}
                    </h1>
                    <p className="text-sm text-zinc-500">{activeProfile.bio}</p>
                  </div>
                </div>
              </div>

              {activeProfile.paymentMessage ? (
                <div className="rounded-3xl border border-white/10 bg-zinc-900 px-5 py-5">
                  <p className="text-sm leading-7 text-zinc-300">
                    {activeProfile.paymentMessage}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="mx-auto max-w-3xl">
            <CardContent className="space-y-6 px-6 py-8 text-center sm:px-8">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {dictionary.success.eyebrow}
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-white">
                  {dictionary.success.title}
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-400">
                  {dictionary.success.description}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-900 px-5 py-5 text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {dictionary.fields.amount}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {paymentResult.amount} {paymentResult.token}
                    </p>
                  </div>
                  {paymentResult.reference ? (
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        {dictionary.fields.note}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">
                        {paymentResult.reference}
                      </p>
                    </div>
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

              <div className="space-y-3">
                <Link
                  href={`${getExplorerBaseUrl(chainId)}/tx/${paymentResult.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm text-zinc-300 underline underline-offset-4"
                >
                  {dictionary.actions.openExplorer}
                </Link>
                <div>
                  <Button
                    size="lg"
                    onClick={() => {
                      window.location.assign(`/u/${activeProfile.handle}`);
                    }}
                  >
                    {dictionary.actions.viewProfile} @{activeProfile.handle}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
      <section className="space-y-6">
        <SectionHeader
          eyebrow={
            isOwner
              ? dictionary.labels.owner
              : showInvoiceView
                ? dictionary.publicPage.invoiceEyebrow
                : dictionary.labels.visitor
          }
          title={
            isOwner
              ? dictionary.publicPage.ownerTitle
              : showInvoiceView
                ? dictionary.publicPage.visitorTitle
                : dictionary.publicPage.visitorTitle
          }
          description={
            isOwner
              ? dictionary.publicPage.ownerDescription
              : showInvoiceView
                ? dictionary.publicPage.invoiceDescription
                : dictionary.publicPage.visitorDescription
          }
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card>
            <CardContent className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar
                  name={profile.displayName}
                  imageUrl={profile.avatarUrl}
                  size="xl"
                />
                <div className="space-y-2">
                  <Badge>@{profile.handle}</Badge>
                  <div>
                    <h1 className="text-3xl font-semibold text-white sm:text-[2rem]">
                      {profile.displayName}
                    </h1>
                    <p className="text-sm text-zinc-500">{profile.bio}</p>
                  </div>
                </div>
              </div>

              {profile.paymentMessage ? (
                <div className="rounded-3xl border border-white/10 bg-zinc-900 px-5 py-5">
                  <p className="text-sm leading-7 text-zinc-300">
                    {profile.paymentMessage}
                  </p>
                </div>
              ) : null}

              {isOwner ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href="/my" className="block">
                    <Button className="w-full">{dictionary.actions.openDashboard}</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      void handleSharePublicPage();
                    }}
                  >
                    {dictionary.actions.shareProfile}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {showInvoiceView ? (
                    <div className="rounded-3xl border border-white/10 bg-zinc-950 px-5 py-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {dictionary.publicPage.invoiceSummary}
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {hasPrefilledAmount ? (
                          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                              {dictionary.fields.amount}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                              {initialAmount} {selectedToken?.symbol}
                            </p>
                          </div>
                        ) : null}
                        {hasPrefilledToken && !hasPrefilledAmount ? (
                          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                              {dictionary.fields.token}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                              {selectedToken?.symbol}
                            </p>
                          </div>
                        ) : null}
                        {hasPrefilledReference ? (
                          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                              {dictionary.fields.note}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-zinc-300">
                              {initialReference}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setIsPaymentPanelOpen(true)}
                      >
                        {dictionary.actions.payCreator}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          void handleSharePublicPage();
                        }}
                      >
                        {dictionary.actions.shareCreatorLink}
                      </Button>
                    </div>
                  )}

                  {isPaymentPanelOpen ? (
                    <div className="space-y-5 rounded-3xl border border-white/10 bg-zinc-950 px-5 py-5">
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                          {dictionary.fields.amount}
                        </p>
                        <AmountPresets
                          values={[5, 15, 25, 50]}
                          selectedValue={amount}
                          onSelect={setAmount}
                        />
                      </div>

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

                      <TokenPicker
                        label={dictionary.fields.token}
                        selectedAddress={selectedTokenAddress}
                        options={tokens}
                        onChange={(address) => setSelectedTokenAddress(address as Hex)}
                      />

                      <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-sm text-zinc-400">
                        <p>{dictionary.labels.payingFrom}</p>
                        <p className="mt-2 text-white">
                          {account
                            ? shortenAddress(account)
                            : dictionary.labels.notConnected}
                        </p>
                        {balance !== null && selectedToken ? (
                          <p className="mt-2">
                            {formatTokenAmount(balance, selectedToken.address, chainId)}{" "}
                            {selectedToken.symbol}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {!account && (!isMiniPay || isDisconnectedByUser) ? (
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto"
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
                          className="w-full sm:w-auto"
                          onClick={handlePay}
                          disabled={isPaymentBusy || !contractAddress}
                        >
                          {isPaymentBusy
                            ? dictionary.messages.waitingConfirmation
                            : dictionary.actions.payNow}
                        </Button>
                      </div>

                      {status ? <p className="text-sm text-zinc-400">{status}</p> : null}
                      {txHash ? (
                        <Link
                          href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-zinc-300 underline underline-offset-4"
                        >
                          {dictionary.actions.openExplorer}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {showInvoiceView ? (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          void handleSharePublicPage();
                        }}
                      >
                        {dictionary.actions.shareCreatorLink}
                      </Button>
                    ) : null}
                    <Link href="/my" className="block w-full sm:w-auto">
                      <Button variant="secondary" className="w-full sm:w-auto">
                        {dictionary.actions.createYourOwn}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <RecentPayments
            payments={payments}
            chainId={chainId}
            title={dictionary.publicPage.recentPayments}
          />
        </div>
      </section>
      )}
    </main>
  );
}
