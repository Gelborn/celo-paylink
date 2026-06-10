"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  Coins,
  FileText,
  LayoutDashboard,
  Send,
  Share2,
  UserRound
} from "lucide-react";
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
import { DetailTile, IconFrame } from "./ui/patterns";
import { SectionHeader } from "./ui/section-header";

function PaymentPanelLoadingFallback() {
  const { dictionary } = useLocale();

  return (
    <div
      id="paylink-payment-panel"
      className="space-y-5 rounded-lg border border-white/10 bg-zinc-950 px-5 py-5"
      role="status"
      aria-label={dictionary.publicPage.paymentFormLoading}
      aria-busy="true"
      aria-atomic="true"
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
  );
}

const PaymentPanelIsland = dynamic(
  () => import("./payment-panel-island").then((module) => module.PaymentPanelIsland),
  {
    ssr: false,
    loading: PaymentPanelLoadingFallback
  }
);

function TrustList({ items, label }: { items: string[]; label: string }) {
  return (
    <motion.ul
      className="trust-list"
      aria-label={label}
      variants={staggerChildren}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <motion.li key={item} className="trust-list-item text-sm leading-6" variants={fadeUp}>
          <IconFrame tone="accent" className="h-7 w-7 rounded-md">
            <CheckCircle2 aria-hidden="true" />
          </IconFrame>
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
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
  handle,
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
  const requestSummaryId = useId();
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
  const homeAriaLabel = `${dictionary.productName}: ${dictionary.nav.home}`;
  const createMissingProfileLabel = `${dictionary.publicPage.createYours}: @${handle}`;

  if (!contractReady) {
    return (
      <main>
        <StaticHeader homeAriaLabel={homeAriaLabel} />
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
        <StaticHeader homeAriaLabel={homeAriaLabel} />
        <EmptyState
          title={dictionary.publicPage.missingTitle}
          description={dictionary.publicPage.missingDescription}
          actions={
            <Link href="/my">
              <Button
                leftIcon={<UserRound aria-hidden="true" />}
                aria-label={createMissingProfileLabel}
              >
                {dictionary.publicPage.createYours}
              </Button>
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
  const shareProfileLabel = `${dictionary.actions.shareProfile}: @${profile.handle}`;
  const shareCreatorLinkLabel = `${dictionary.actions.shareCreatorLink}: @${profile.handle}`;
  const openDashboardLabel = `${dictionary.actions.openDashboard}: @${profile.handle}`;
  const payCreatorLabel = `${dictionary.actions.payCreator}: @${profile.handle}`;
  const createYourOwnLabel = `${dictionary.actions.createYourOwn}: @${profile.handle}`;

  async function handleSharePublicPage() {
    try {
      const nextStatus = await shareOrCopyUrl(publicUrl, shareProfileLabel);
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
        homeAriaLabel={homeAriaLabel}
        actionsLabel={dictionary.labels.walletControls}
        actions={
          previewMode ? null : (
            <div
              id="public-wallet-slot"
              className="flex min-h-9 min-w-9 justify-end sm:min-w-[5.5rem]"
              aria-label={dictionary.labels.walletControls}
              aria-live="polite"
              aria-atomic="true"
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
        className="space-y-5"
        aria-label={
          isOwner
            ? dictionary.publicPage.ownerTitle
            : dictionary.publicPage.visitorTitle
        }
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

        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <Card variant="elevated" className="compact-card overflow-hidden">
            <CardContent className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6">
              <div className="flex min-w-0 items-center gap-4">
                <Avatar
                  name={profile.displayName}
                  imageUrl={profile.avatarUrl}
                  size="md"
                />
                <div className="min-w-0 space-y-2">
                  <Badge variant={isOwner ? "accent" : "neutral"}>@{profile.handle}</Badge>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-normal text-white sm:text-[2rem]">
                      {profile.displayName}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{profile.bio}</p>
                  </div>
                </div>
              </div>

              {profile.paymentMessage ? (
                <DetailTile
                  icon={<FileText aria-hidden="true" />}
                  label={dictionary.fields.paymentMessage}
                  value={profile.paymentMessage}
                  className="bg-zinc-950/35 py-3"
                />
              ) : null}

              {isOwner ? (
                <div className="space-y-4">
                  <TrustList items={trustItems} label={dictionary.home.proofEyebrow} />
                  <div
                    className="grid gap-3 sm:grid-cols-2"
                    role="group"
                    aria-label={dictionary.publicPage.ownerTitle}
                  >
                    <Link href="/my" className="block">
                      <Button
                        className="w-full"
                        leftIcon={<LayoutDashboard aria-hidden="true" />}
                        aria-label={openDashboardLabel}
                      >
                        {dictionary.actions.openDashboard}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      leftIcon={<Share2 aria-hidden="true" />}
                      onClick={() => {
                        void handleSharePublicPage();
                      }}
                      aria-label={shareProfileLabel}
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
                    <div
                      className="rounded-lg border border-white/10 bg-zinc-950/45 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:px-4 sm:py-4"
                      role="group"
                      aria-labelledby={requestSummaryId}
                    >
                      <p
                        id={requestSummaryId}
                        className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500"
                      >
                        {dictionary.publicPage.requestSummaryLabel}
                      </p>
                      <div className="mt-3 grid min-w-0 gap-2.5 sm:grid-cols-2 sm:gap-3">
                        {hasPrefilledAmount ? (
                          <DetailTile
                            icon={<Coins aria-hidden="true" />}
                            label={dictionary.fields.amount}
                            value={
                              <span className="text-sm leading-5 sm:text-base">
                                {initialAmount} {selectedToken?.symbol}
                              </span>
                            }
                            valueTitle={selectedToken?.name}
                            tone="accent"
                            className="min-h-[4.5rem] px-3 py-3"
                          />
                        ) : null}
                        {hasPrefilledToken && !hasPrefilledAmount ? (
                          <DetailTile
                            icon={<Coins aria-hidden="true" />}
                            label={dictionary.fields.token}
                            value={
                              <span className="text-sm leading-5 sm:text-base">
                                {selectedToken?.symbol}
                              </span>
                            }
                            valueTitle={selectedToken?.name}
                            tone="accent"
                            className="min-h-[4.5rem] px-3 py-3"
                          />
                        ) : null}
                        {hasPrefilledReference ? (
                          <DetailTile
                            icon={<FileText aria-hidden="true" />}
                            label={dictionary.fields.note}
                            value={initialReference}
                            className="min-h-[4.5rem] px-3 py-3"
                          />
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid gap-3 sm:grid-cols-2"
                      role="group"
                      aria-label={dictionary.publicPage.visitorTitle}
                    >
                      <Button
                        className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 hover:bg-[color:var(--accent-strong)]"
                        size="lg"
                        leftIcon={<Send aria-hidden="true" />}
                        onClick={() => setIsPaymentPanelOpen(true)}
                        aria-expanded={isPaymentPanelOpen}
                        aria-controls="paylink-payment-panel"
                        aria-label={payCreatorLabel}
                      >
                        {dictionary.actions.payCreator}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        leftIcon={<Share2 aria-hidden="true" />}
                        onClick={() => {
                          void handleSharePublicPage();
                        }}
                        aria-label={shareCreatorLinkLabel}
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

                  <TrustList items={trustItems} label={dictionary.home.proofEyebrow} />

                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {showInvoiceView ? (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        leftIcon={<Share2 aria-hidden="true" />}
                        onClick={() => {
                          void handleSharePublicPage();
                        }}
                        aria-label={shareCreatorLinkLabel}
                      >
                        {dictionary.actions.shareCreatorLink}
                      </Button>
                    ) : null}
                    <Link href="/my" className="block w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        className="w-full sm:w-auto"
                        leftIcon={<UserRound aria-hidden="true" />}
                        aria-label={createYourOwnLabel}
                      >
                        {dictionary.actions.createYourOwn}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="min-w-0 self-start lg:sticky lg:top-6">{recentPaymentsSlot}</div>
        </div>
      </motion.section>
    </main>
  );
}
