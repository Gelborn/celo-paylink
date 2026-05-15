"use client";

import Link from "next/link";
import { Copy, Eye, FileText, LayoutDashboard, Wallet } from "lucide-react";
import { useState } from "react";
import type { Hex } from "viem";
import { buildShareUrl } from "../lib/format";
import { copyTextToClipboard } from "../lib/share";
import { useOwnerState } from "../lib/use-owner-state";
import { Header } from "./header";
import { HomeDemo } from "./home-demo";
import {
  AccentBadge,
  HeroChips,
  HomeProofSection,
  HomeStepsSection,
  PrimaryProfileLink,
  TrustGrid
} from "./home-visuals";
import { ProfileDiscovery } from "./profile-discovery";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FeedbackMessage } from "./ui/feedback-message";
import { ActionRow, DetailTile } from "./ui/patterns";

export function HomeShell({
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
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const {
    account,
    chainId,
    connect,
    disconnect,
    hasProvider,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    connectError,
    clearConnectError,
    contractAddress,
    profile
  } = useOwnerState({
    initialChainId,
    contractAddresses
  });

  const publicUrl = profile ? buildShareUrl(appUrl, profile.handle) : null;
  const showConnectAction =
    hasProvider && !account && (!isMiniPay || isDisconnectedByUser);

  return (
    <main className="space-y-12 pb-14 md:space-y-16 md:pb-20">
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

      {account && profile ? (
        <section className="landing-section space-y-6">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Card variant="accent" className="overflow-hidden">
              <CardContent className="space-y-8 px-8 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap items-center gap-3">
                  <AccentBadge>{dictionary.labels.profileLive}</AccentBadge>
                  <Badge>@{profile.handle}</Badge>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Avatar
                    name={profile.displayName}
                    imageUrl={profile.avatarUrl}
                    size="xl"
                  />
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                      {dictionary.home.summaryTitle}
                    </h1>
                    <p className="text-base text-zinc-300">
                      {profile.displayName}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="max-w-2xl text-base leading-8 text-zinc-300">
                    {dictionary.home.summaryDescription}
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-zinc-500">
                    {dictionary.dashboard.profileShareHint}
                  </p>
                </div>

                <DetailTile
                  icon={<Copy aria-hidden="true" />}
                  label={dictionary.fields.publicLink}
                  value={publicUrl}
                  tone="accent"
                  mono
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/my" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={<LayoutDashboard aria-hidden="true" />}
                    >
                      {dictionary.actions.openDashboard}
                    </Button>
                  </Link>
                  <Link href={`/u/${profile.handle}`} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={<Eye aria-hidden="true" />}
                    >
                      {dictionary.actions.openPublicPage}
                    </Button>
                  </Link>
                  {publicUrl ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={<Copy aria-hidden="true" />}
                      onClick={async () => {
                        try {
                          await copyTextToClipboard(publicUrl);
                          setCopyStatus("copied");
                          window.setTimeout(() => setCopyStatus("idle"), 1600);
                        } catch {
                          setCopyStatus("error");
                          window.setTimeout(() => setCopyStatus("idle"), 2200);
                        }
                      }}
                    >
                      {dictionary.actions.copyProfile}
                    </Button>
                  ) : null}
                </div>

                <FeedbackMessage tone={copyStatus === "error" ? "error" : "success"}>
                  {copyStatus === "copied"
                    ? dictionary.messages.linkCopied
                    : copyStatus === "error"
                      ? dictionary.messages.copyFailed
                      : null}
                </FeedbackMessage>

                <TrustGrid statements={dictionary.home.trustStatements} />
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader className="px-7 pt-7">
                <CardTitle>{dictionary.dashboard.quickActions}</CardTitle>
                <CardDescription>{dictionary.productTagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-7 pb-7">
                <ActionRow
                  icon={<FileText aria-hidden="true" />}
                  title={dictionary.actions.createChargeLink}
                  description={dictionary.dashboard.quickActionChargeDescription}
                  tone="accent"
                />

                <ActionRow
                  icon={<LayoutDashboard aria-hidden="true" />}
                  title={dictionary.dashboard.transactionsSection}
                  description={dictionary.dashboard.quickActionTransactionsDescription}
                />

                <div className="grid gap-3">
                  <Link href="/my">
                    <Button
                      variant="secondary"
                      className="w-full"
                      leftIcon={<FileText aria-hidden="true" />}
                    >
                      {dictionary.actions.createChargeLink}
                    </Button>
                  </Link>
                  <Link href={`/u/${profile.handle}`}>
                    <Button
                      variant="outline"
                      className="w-full"
                      leftIcon={<Eye aria-hidden="true" />}
                    >
                      {dictionary.actions.viewProfile}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <>
          <section className="landing-section">
            <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-center">
              <div className="min-w-0 space-y-7">
                <div className="space-y-5">
                  <AccentBadge>{dictionary.home.eyebrow}</AccentBadge>
                  <div className="space-y-4">
                    <h1 className="max-w-3xl text-[2.65rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02]">
                      {dictionary.home.title}
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg md:text-xl md:leading-8">
                      {dictionary.home.description}
                    </p>
                    <p className="max-w-xl text-sm leading-7 text-zinc-500">
                      {dictionary.home.heroSupport}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <PrimaryProfileLink>{dictionary.actions.createProfile}</PrimaryProfileLink>
                  {showConnectAction ? (
                    <Button
                      variant="outline"
                      size="lg"
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
                </div>

                <HeroChips chips={dictionary.home.heroChips} />

                <p className="max-w-xl text-sm leading-7 text-zinc-500">
                  {dictionary.home.connectHint}
                </p>
              </div>

              <div className="min-w-0 overflow-hidden pt-2 lg:pl-3">
                <HomeDemo caption={dictionary.home.demoCaption} />
              </div>
            </div>
          </section>

          <ProfileDiscovery
            chainId={initialChainId}
            contractAddress={contractAddress}
            variant="carousel"
          />

          <section className="landing-section space-y-6">
            <HomeProofSection dictionary={dictionary} />
          </section>

          <section className="landing-section space-y-6">
            <HomeStepsSection dictionary={dictionary} />
          </section>

          <section className="landing-section">
            <Card className="landing-cta-surface overflow-hidden border-[color:var(--accent-line)] shadow-[var(--accent-shadow),0_22px_64px_rgba(0,0,0,0.28)]">
              <CardContent className="space-y-8 px-6 py-8 md:px-10 md:py-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div className="space-y-4">
                    <AccentBadge>{dictionary.home.closingEyebrow}</AccentBadge>
                    <div className="space-y-3">
                      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        {dictionary.home.closingTitle}
                      </h2>
                      <p className="max-w-2xl text-base leading-8 text-zinc-300">
                        {dictionary.home.closingDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <PrimaryProfileLink>{dictionary.actions.createProfile}</PrimaryProfileLink>
                    {showConnectAction ? (
                      <Button
                        variant="outline"
                        size="lg"
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
                  </div>
                </div>

                <TrustGrid statements={dictionary.home.trustStatements} />
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </main>
  );
}
