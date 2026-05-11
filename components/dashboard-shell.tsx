"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Hex } from "viem";
import { buildShareUrl, shortenAddress } from "../lib/format";
import { fadeUp, motionTransitions, panelSwap, softTap } from "../lib/motion";
import { copyTextToClipboard, shareOrCopyUrl } from "../lib/share";
import { useOwnerState } from "../lib/use-owner-state";
import { ChargeLinkPanel } from "./charge-link-panel";
import { Header } from "./header";
import { NetworkMismatchModal } from "./network-mismatch-modal";
import { ProfileEditor, type PublishStage } from "./profile-editor";
import { ProfileDiscovery } from "./profile-discovery";
import { RecentPayments } from "./recent-payments";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { FeedbackMessage } from "./ui/feedback-message";
import { SectionHeader } from "./ui/section-header";

type DashboardTab = "manage" | "transactions" | "discover";
type ManageView = "overview" | "invoice";

export function DashboardShell({
  appUrl,
  initialChainId,
  contractAddresses
}: {
  appUrl: string;
  initialChainId: number;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
}) {
  const { dictionary } = useLocale();
  const router = useRouter();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [publishStage, setPublishStage] = useState<PublishStage | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>("manage");
  const [manageView, setManageView] = useState<ManageView>("overview");
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "copy-error" | "share-error"
  >("idle");
  const {
    account,
    chainId,
    expectedChainLabel,
    isWrongChain,
    connect,
    switchToDefaultChain,
    refreshWalletState,
    disconnect,
    hasProvider,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    connectError,
    clearConnectError,
    contractAddress,
    profile,
    payments,
    isLoadingProfile,
    isLoadingPayments,
    refreshProfile
  } = useOwnerState({
    initialChainId,
    contractAddresses
  });

  const publicUrl = profile ? buildShareUrl(appUrl, profile.handle) : "";

  useEffect(() => {
    if (!account) {
      setIsEditingProfile(false);
      setPublishStage(null);
      setActiveTab("manage");
      setManageView("overview");
    }
  }, [account]);

  useEffect(() => {
    if (profile?.handle) {
      setIsEditingProfile(false);
      setPublishStage(null);
      setManageView("overview");
    }
  }, [profile?.handle]);

  async function handleSaved() {
    const requiresFreshProfile = !profile;
    let syncedProfile = await refreshProfile();

    if (requiresFreshProfile && !syncedProfile) {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
        syncedProfile = await refreshProfile();

        if (syncedProfile) {
          break;
        }
      }
    }

    router.refresh();
    setActiveTab("manage");
    setManageView("overview");
    setIsEditingProfile(false);
  }

  async function handleShareProfile() {
    if (!publicUrl) return;

    try {
      const nextStatus = await shareOrCopyUrl(publicUrl);
      setShareStatus(nextStatus);
      window.setTimeout(() => setShareStatus("idle"), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setShareStatus("share-error");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    }
  }

  async function handleCopyProfileLink() {
    if (!publicUrl) return;

    try {
      await copyTextToClipboard(publicUrl);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1600);
    } catch {
      setShareStatus("copy-error");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    }
  }

  const publishFlowCopy =
    publishStage === "wallet"
      ? {
          title: dictionary.messages.finishingProfile,
          description: dictionary.messages.confirmProfileInWallet
        }
      : publishStage === "confirming"
        ? {
            title: dictionary.messages.finishingProfile,
            description: dictionary.messages.waitingConfirmation
          }
        : publishStage === "syncing"
          ? {
              title: dictionary.messages.finishingProfile,
              description: dictionary.messages.syncingProfile
            }
          : null;

  const handleWrongNetworkAction = () => {
    if (isMiniPay) {
      void refreshWalletState();
      return;
    }

    void switchToDefaultChain();
  };
  const tabButtonClassName = (selected: boolean) =>
    `min-w-[8rem] rounded-md border px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] ${
      selected
        ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
        : "border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"
    }`;

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
        profileName={profile?.displayName}
        profileImageUrl={profile?.avatarUrl}
        onConnect={connect}
        onDisconnect={disconnect}
        onClearConnectError={clearConnectError}
      />
      {account && isWrongChain && !publishFlowCopy ? (
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
      {publishFlowCopy ? (
        <motion.section
          className="space-y-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <SectionHeader
            eyebrow={dictionary.dashboard.eyebrow}
            title={publishFlowCopy.title}
            description={publishFlowCopy.description}
          />
          <Card className="compact-card">
            <CardContent className="px-6 py-10 sm:px-8 sm:py-12">
              <div className="mx-auto max-w-2xl space-y-6 text-center">
                <div className="motion-shimmer mx-auto h-1 w-24 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {dictionary.dashboard.profileSection}
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {publishFlowCopy.title}
                  </h2>
                  <p className="mx-auto max-w-xl text-sm leading-7 text-zinc-400">
                    {publishFlowCopy.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      ) : (
        <motion.section
          className="space-y-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <SectionHeader
            eyebrow={dictionary.dashboard.eyebrow}
            title={
              profile
                ? dictionary.dashboard.titleWithProfile
                : dictionary.dashboard.titleNoProfile
            }
            description={
              profile
                ? dictionary.dashboard.descriptionWithProfile
                : dictionary.dashboard.descriptionNoProfile
            }
          />

          {!account ? (
            <Card className="compact-card">
              <CardContent className="px-6 py-10 sm:px-8 sm:py-12">
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {dictionary.dashboard.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {dictionary.actions.connectWallet}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                    {isMiniPay && !isDisconnectedByUser
                      ? dictionary.messages.waitingConfirmation
                      : dictionary.dashboard.connectPrompt}
                  </p>
                  {!isMiniPay || isDisconnectedByUser ? (
                    <Button
                      size="lg"
                      className="mt-8 min-w-[13rem] bg-[color:var(--accent)] text-black hover:bg-[color:var(--accent-strong)]"
                      onClick={() => {
                        void connect();
                      }}
                    >
                      {isConnecting
                        ? dictionary.messages.waitingConfirmation
                        : dictionary.actions.connectWallet}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {account && profile ? (
            <Card className="compact-card">
              <CardContent className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={profile.displayName}
                    imageUrl={profile.avatarUrl}
                    size="lg"
                  />
                  <div className="space-y-2">
                    <Badge>{dictionary.labels.profileLive}</Badge>
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {profile.displayName}
                      </h2>
                      <p className="text-sm text-zinc-400">
                        @{profile.handle} · {shortenAddress(account)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveTab("manage");
                      setManageView("overview");
                      setIsEditingProfile(true);
                    }}
                  >
                    {dictionary.actions.editProfile}
                  </Button>
                  <Link href={`/u/${profile.handle}`}>
                    <Button
                      variant="secondary"
                      className="border-[color:var(--accent-line)] text-[color:var(--accent)]"
                    >
                      {dictionary.actions.openPublicPage}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {account && profile ? (
            isEditingProfile ? (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    {dictionary.actions.cancel}
                  </Button>
                </div>
                <ProfileEditor
                  account={account}
                  chainId={initialChainId}
                  contractAddress={contractAddress}
                  profile={profile}
                  onSaved={handleSaved}
                  onPublishStateChange={setPublishStage}
                />
              </div>
            ) : (
              <div className="space-y-5">
                <div className="overflow-x-auto">
                  <div
                    role="tablist"
                    aria-label={dictionary.dashboard.eyebrow}
                    className="inline-flex min-w-full rounded-lg border border-white/10 bg-zinc-950/70 p-1 sm:min-w-0"
                  >
                    <motion.button
                      id="dashboard-tab-manage"
                      role="tab"
                      aria-selected={activeTab === "manage"}
                      aria-controls="dashboard-panel-manage"
                      type="button"
                      onClick={() => {
                        setActiveTab("manage");
                        setManageView("overview");
                      }}
                      whileTap={softTap}
                      transition={motionTransitions.micro}
                      className={tabButtonClassName(activeTab === "manage")}
                    >
                      {dictionary.dashboard.actionsTab}
                    </motion.button>
                    <motion.button
                      id="dashboard-tab-transactions"
                      role="tab"
                      aria-selected={activeTab === "transactions"}
                      aria-controls="dashboard-panel-transactions"
                      type="button"
                      onClick={() => setActiveTab("transactions")}
                      whileTap={softTap}
                      transition={motionTransitions.micro}
                      className={tabButtonClassName(activeTab === "transactions")}
                    >
                      {dictionary.dashboard.transactionsTab}
                    </motion.button>
                    <motion.button
                      id="dashboard-tab-discover"
                      role="tab"
                      aria-selected={activeTab === "discover"}
                      aria-controls="dashboard-panel-discover"
                      type="button"
                      onClick={() => setActiveTab("discover")}
                      whileTap={softTap}
                      transition={motionTransitions.micro}
                      className={tabButtonClassName(activeTab === "discover")}
                    >
                      {dictionary.profileDiscovery.searchTab}
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {activeTab === "manage" ? (
                    <motion.div
                      key={`manage-${manageView}`}
                      id="dashboard-panel-manage"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab-manage"
                      variants={panelSwap}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {manageView === "invoice" ? (
                        <Card className="compact-card">
                          <CardContent className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                                  {dictionary.dashboard.chargeSection}
                                </p>
                                <h3 className="mt-2 text-xl font-semibold text-white">
                                  {dictionary.actions.createChargeLink}
                                </h3>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-400">
                                  {dictionary.dashboard.chargeLinkHint}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                onClick={() => setManageView("overview")}
                              >
                                {dictionary.actions.cancel}
                              </Button>
                            </div>
                            <ChargeLinkPanel
                              appUrl={appUrl}
                              profile={profile}
                              chainId={initialChainId}
                              embedded
                            />
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="compact-card">
                          <CardContent className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
                            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                              {dictionary.dashboard.descriptionWithProfile}
                            </p>

                            <div className="grid gap-3">
                              <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0 space-y-2">
                                  <p className="text-base font-medium text-white">
                                    {dictionary.actions.shareProfile}
                                  </p>
                                  <p className="text-sm leading-7 text-zinc-400">
                                    {dictionary.dashboard.profileShareHint}
                                  </p>
                                  <code
                                    className="inline-flex max-w-full break-all rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs leading-5 text-zinc-300"
                                    style={{ fontFamily: "var(--font-mono), monospace" }}
                                  >
                                    {publicUrl}
                                  </code>
                                </div>
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                  <Button
                                    variant="outline"
                                    className="w-full sm:min-w-[10rem]"
                                    onClick={() => {
                                      void handleCopyProfileLink();
                                    }}
                                  >
                                    {shareStatus === "copied"
                                      ? dictionary.labels.copied
                                      : shareStatus === "shared"
                                        ? dictionary.labels.shared
                                        : dictionary.actions.copyLink}
                                  </Button>
                                  <Button
                                    className="w-full bg-[color:var(--accent)] text-black hover:bg-[color:var(--accent-strong)] sm:min-w-[10rem]"
                                    onClick={() => {
                                      void handleShareProfile();
                                    }}
                                  >
                                    {dictionary.actions.shareLink}
                                  </Button>
                                </div>
                              </div>
                              <FeedbackMessage
                                tone={
                                  shareStatus === "copy-error" || shareStatus === "share-error"
                                    ? "error"
                                    : "success"
                                }
                              >
                                {shareStatus === "copied"
                                  ? dictionary.messages.linkCopied
                                  : shareStatus === "shared"
                                    ? dictionary.messages.shareOpened
                                    : shareStatus === "copy-error"
                                      ? dictionary.messages.copyFailed
                                      : shareStatus === "share-error"
                                        ? dictionary.messages.shareFailed
                                        : null}
                              </FeedbackMessage>

                              <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                  <p className="text-base font-medium text-white">
                                    {dictionary.actions.openPublicPage}
                                  </p>
                                  <p className="text-sm leading-7 text-zinc-400">
                                    @{profile.handle}
                                  </p>
                                </div>
                                <Link
                                  href={`/u/${profile.handle}`}
                                  className="block w-full sm:w-auto"
                                >
                                  <Button
                                    variant="secondary"
                                    className="w-full sm:min-w-[12rem]"
                                  >
                                    {dictionary.actions.openPublicPage}
                                  </Button>
                                </Link>
                              </div>

                              <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                  <p className="text-base font-medium text-white">
                                    {dictionary.actions.createChargeLink}
                                  </p>
                                  <p className="text-sm leading-7 text-zinc-400">
                                    {dictionary.dashboard.chargeLinkHint}
                                  </p>
                                </div>
                                <Button
                                  variant="secondary"
                                  className="w-full border-[color:var(--accent-line)] text-[color:var(--accent)] sm:min-w-[12rem]"
                                  onClick={() => setManageView("invoice")}
                                >
                                  {dictionary.actions.createChargeLink}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  ) : activeTab === "transactions" ? (
                    <motion.div
                      key="transactions"
                      id="dashboard-panel-transactions"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab-transactions"
                      variants={panelSwap}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <RecentPayments
                        payments={payments}
                        chainId={initialChainId}
                        title={dictionary.dashboard.transactionsSection}
                        isLoading={isLoadingProfile || isLoadingPayments}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="discover"
                      id="dashboard-panel-discover"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab-discover"
                      variants={panelSwap}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <ProfileDiscovery
                        chainId={initialChainId}
                        contractAddress={contractAddress}
                        variant="dashboard"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          ) : account ? (
            <ProfileEditor
              account={account}
              chainId={initialChainId}
              contractAddress={contractAddress}
              profile={profile}
              onSaved={handleSaved}
              onPublishStateChange={setPublishStage}
            />
          ) : null}
        </motion.section>
      )}
    </main>
  );
}
