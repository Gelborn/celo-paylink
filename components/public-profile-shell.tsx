"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Hex } from "viem";
import type { ProfileRecord } from "../lib/contract";
import { buildShareUrl } from "../lib/format";
import { interpolate } from "../lib/i18n";
import { fadeUp, panelSwap, staggerChildren } from "../lib/motion";
import { shareOrCopyUrl } from "../lib/share";
import { getSupportedTokens, getTokenByAddress, getTokenFromQuery } from "../lib/tokens";
import { HomeWalletIsland } from "./home-wallet-island";
import { PublicOwnerDetector } from "./public-owner-detector";
import { StaticHeader } from "./static-header";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { EmptyState } from "./ui/empty-state";
import { FeedbackMessage } from "./ui/feedback-message";
import { SectionHeader } from "./ui/section-header";

const PaymentPanelIsland = dynamic(
  () => import("./payment-panel-island").then((module) => module.PaymentPanelIsland),
  {
    ssr: false,
    loading: () => (
      <div
        id="paylink-payment-panel"
        className="space-y-5 rounded-lg border border-white/10 bg-zinc-950 px-5 py-5"
        aria-busy="true"
      >
        <div className="space-y-3">
          <div className="motion-shimmer h-4 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="motion-shimmer h-4 w-full animate-pulse rounded-full bg-white/5" />
          <div className="motion-shimmer h-4 w-3/4 animate-pulse rounded-full bg-white/5" />
        </div>
        <div className="motion-shimmer h-12 animate-pulse rounded-lg bg-white/5" />
        <div className="motion-shimmer h-12 animate-pulse rounded-lg bg-white/5" />
        <div className="motion-shimmer h-12 animate-pulse rounded-lg bg-white/5" />
      </div>
    )
  }
);

function TrustList({ items }: { items: string[] }) {
  return (
    <motion.div
      className="trust-list"
      variants={staggerChildren}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <motion.div key={item} className="trust-list-item text-sm" variants={fadeUp}>
          <span className="trust-list-dot" aria-hidden="true" />
          <span>{item}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function PublicProfileShell({
  appUrl,
  initialChainId,
  contractAddresses,
  profile,
  initialAmount,
  initialReference,
  initialTokenQuery,
  contractReady,
  previewMode = false,
  recentPaymentsSlot
}: {
  appUrl: string;
  initialChainId: number;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
  handle: string;
  profile: ProfileRecord | null;
  initialAmount: string;
  initialReference: string;
  initialTokenQuery: string;
  contractReady: boolean;
  previewMode?: boolean;
  recentPaymentsSlot?: ReactNode;
}) {
  const { dictionary } = useLocale();
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");
  const [isOwner, setIsOwner] = useState(false);
  const hasPrefilledAmount = Boolean(initialAmount);
  const hasPrefilledReference = Boolean(initialReference);
  const hasPrefilledToken = Boolean(initialTokenQuery);
  const hasPrefilledInvoice = Boolean(
    initialAmount || initialReference || initialTokenQuery
  );
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(
    hasPrefilledInvoice
  );

  if (!contractReady) {
    return (
      <main>
        <StaticHeader />
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
        <StaticHeader />
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

  const publicUrl = buildShareUrl(appUrl, profile.handle);
  const tokens = getSupportedTokens(initialChainId);
  const selectedToken =
    getTokenFromQuery(initialTokenQuery, initialChainId) ||
    getTokenByAddress(profile.preferredToken, initialChainId) ||
    tokens[0];
  const showInvoiceView = hasPrefilledInvoice;
  const trustItems = [
    dictionary.home.trustStatements[0],
    dictionary.home.trustStatements[1],
    dictionary.home.trustStatements[2],
    interpolate(dictionary.messages.supportsTokens, {
      tokens: tokens.map((token) => token.symbol).join(", ")
    })
  ];

  async function handleSharePublicPage() {
    try {
      const nextStatus = await shareOrCopyUrl(publicUrl);
      setShareStatus(nextStatus);
      window.setTimeout(() => setShareStatus("idle"), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setShareStatus("error");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    }
  }

  return (
    <main>
      <StaticHeader
        actions={
          previewMode ? null : (
            <div
              id="public-wallet-slot"
              className="flex min-h-9 min-w-[5.5rem] justify-end"
              aria-live="polite"
            />
          )
        }
      />
      {previewMode ? null : (
        <>
          <HomeWalletIsland
            initialChainId={initialChainId}
            contractAddresses={contractAddresses}
            targetId="public-wallet-slot"
          />
          <PublicOwnerDetector
            initialChainId={initialChainId}
            owner={profile.owner}
            onOwnerChange={setIsOwner}
          />
        </>
      )}

      <motion.section
        className="space-y-6"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
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

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="compact-card">
            <CardContent className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                <div className="rounded-lg border border-white/10 bg-zinc-950/60 px-4 py-4">
                  <p className="text-sm leading-7 text-zinc-300">
                    {profile.paymentMessage}
                  </p>
                </div>
              ) : null}

              {isOwner ? (
                <div className="space-y-4">
                  <TrustList items={trustItems} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link href="/my" className="block">
                      <Button className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 hover:bg-[color:var(--accent-strong)]">
                        {dictionary.actions.openDashboard}
                      </Button>
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
                  <FeedbackMessage
                    tone={shareStatus === "error" ? "error" : "success"}
                  >
                    {shareStatus === "copied"
                      ? dictionary.messages.linkCopied
                      : shareStatus === "shared"
                        ? dictionary.messages.shareOpened
                        : shareStatus === "error"
                          ? dictionary.messages.shareFailed
                          : null}
                  </FeedbackMessage>
                </div>
              ) : (
                <div className="space-y-4">
                  {showInvoiceView ? (
                    <div className="rounded-lg border border-white/10 bg-zinc-950/60 px-4 py-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {dictionary.publicPage.requestSummaryLabel}
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {hasPrefilledAmount ? (
                          <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                              {dictionary.fields.amount}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                              {initialAmount} {selectedToken?.symbol}
                            </p>
                          </div>
                        ) : null}
                        {hasPrefilledToken && !hasPrefilledAmount ? (
                          <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                              {dictionary.fields.token}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                              {selectedToken?.symbol}
                            </p>
                          </div>
                        ) : null}
                        {hasPrefilledReference ? (
                          <div>
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
                        className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 hover:bg-[color:var(--accent-strong)]"
                        size="lg"
                        onClick={() => setIsPaymentPanelOpen(true)}
                        aria-expanded={isPaymentPanelOpen}
                        aria-controls="paylink-payment-panel"
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

                  <FeedbackMessage
                    tone={shareStatus === "error" ? "error" : "success"}
                  >
                    {shareStatus === "copied"
                      ? dictionary.messages.linkCopied
                      : shareStatus === "shared"
                        ? dictionary.messages.shareOpened
                        : shareStatus === "error"
                          ? dictionary.messages.shareFailed
                          : null}
                  </FeedbackMessage>

                  <AnimatePresence initial={false}>
                    {isPaymentPanelOpen ? (
                      <motion.div
                        key="payment-panel"
                        variants={panelSwap}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <PaymentPanelIsland
                          initialChainId={initialChainId}
                          contractAddresses={contractAddresses}
                          profile={profile}
                          initialAmount={initialAmount}
                          initialReference={initialReference}
                          initialTokenQuery={initialTokenQuery}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <TrustList items={trustItems} />

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

          <div className="self-start">{recentPaymentsSlot}</div>
        </div>
      </motion.section>
    </main>
  );
}
