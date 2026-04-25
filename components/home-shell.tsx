"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Hex } from "viem";
import { buildShareUrl } from "../lib/format";
import { copyTextToClipboard } from "../lib/share";
import { useOwnerState } from "../lib/use-owner-state";
import { Header } from "./header";
import { HomeDemo } from "./home-demo";
import { ProfileDiscovery } from "./profile-discovery";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FeedbackMessage } from "./ui/feedback-message";

function AccentBadge({
  children
}: {
  children: ReactNode;
}) {
  return (
    <Badge className="border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
      {children}
    </Badge>
  );
}

function ProofCard({
  index,
  label
}: {
  index: number;
  label: string;
}) {
  return (
    <Card className="h-full border-white/10 bg-[linear-gradient(180deg,rgba(23,24,26,0.94),rgba(14,15,17,0.88))]">
      <CardContent className="flex h-full flex-col px-5 pb-5 pt-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-6 text-base leading-7 text-zinc-100">{label}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  index,
  title,
  description
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full border-white/10 bg-[linear-gradient(180deg,rgba(23,24,26,0.94),rgba(14,15,17,0.88))]">
      <CardContent className="h-full space-y-5 px-6 pb-6 pt-6">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="text-sm leading-7 text-zinc-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

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
            <Card className="overflow-hidden border-[color:var(--accent-line)] bg-[linear-gradient(180deg,rgba(18,20,22,0.98),rgba(11,12,14,0.92))] shadow-[var(--accent-shadow),0_22px_64px_rgba(0,0,0,0.28)]">
              <CardContent className="space-y-8 px-8 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap items-center gap-3">
                  <AccentBadge>{dictionary.labels.profileLive}</AccentBadge>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    @{profile.handle}
                  </span>
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

                <div className="rounded-lg border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] px-5 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {dictionary.fields.publicLink}
                  </p>
                  <p className="mt-3 break-all text-sm leading-7 text-white">
                    {publicUrl}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/my" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_18px_42px_rgba(54,214,126,0.18)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] sm:w-auto"
                    >
                      {dictionary.actions.openDashboard}
                    </Button>
                  </Link>
                  <Link href={`/u/${profile.handle}`} className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      {dictionary.actions.openPublicPage}
                    </Button>
                  </Link>
                  {publicUrl ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
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

                <div className="grid gap-3 md:grid-cols-3">
                  {dictionary.home.trustStatements.map((statement) => (
                    <div
                      key={statement}
                      className="rounded-lg border border-white/10 bg-zinc-950/70 px-4 py-4 text-sm text-zinc-200"
                    >
                      {statement}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[linear-gradient(180deg,rgba(22,24,25,0.94),rgba(14,15,17,0.88))]">
              <CardHeader className="px-7 pt-7">
                <CardTitle>{dictionary.dashboard.quickActions}</CardTitle>
                <CardDescription>{dictionary.productTagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-7 pb-7">
                <div className="rounded-lg border border-white/10 bg-zinc-950/80 px-5 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {dictionary.actions.createChargeLink}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {dictionary.dashboard.quickActionChargeDescription}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-zinc-950/80 px-5 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {dictionary.dashboard.transactionsSection}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {dictionary.dashboard.quickActionTransactionsDescription}
                  </p>
                </div>

                <div className="grid gap-3">
                  <Link href="/my">
                    <Button variant="secondary" className="w-full">
                      {dictionary.actions.createChargeLink}
                    </Button>
                  </Link>
                  <Link href={`/u/${profile.handle}`}>
                    <Button variant="outline" className="w-full">
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
                  <Link href="/my" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_18px_42px_rgba(54,214,126,0.18)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] sm:w-auto"
                    >
                      {dictionary.actions.createProfile}
                    </Button>
                  </Link>
                  {showConnectAction ? (
                    <Button
                      variant="outline"
                      size="lg"
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
                </div>

                <div className="flex max-w-full flex-wrap gap-2.5">
                  {dictionary.home.heroChips.map((chip) => (
                    <span
                      key={chip}
                      className="max-w-full rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-zinc-200"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

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
            <div className="max-w-3xl space-y-3">
              <AccentBadge>{dictionary.home.proofEyebrow}</AccentBadge>
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {dictionary.home.proofTitle}
                </h2>
                <p className="text-base leading-8 text-zinc-400">
                  {dictionary.home.proofDescription}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dictionary.home.proofChips.map((chip, index) => (
                <ProofCard key={chip} index={index} label={chip} />
              ))}
            </div>
          </section>

          <section className="landing-section space-y-6">
            <div className="max-w-3xl space-y-3">
              <AccentBadge>{dictionary.home.stepsEyebrow}</AccentBadge>
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {dictionary.home.stepsTitle}
                </h2>
                <p className="text-base leading-8 text-zinc-400">
                  {dictionary.home.stepsDescription}
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {dictionary.home.steps.map((step, index) => (
                <StepCard
                  key={step.title}
                  index={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
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
                    <Link href="/my" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_18px_42px_rgba(54,214,126,0.18)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] sm:w-auto"
                      >
                        {dictionary.actions.createProfile}
                      </Button>
                    </Link>
                    {showConnectAction ? (
                      <Button
                        variant="outline"
                        size="lg"
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
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {dictionary.home.trustStatements.map((statement) => (
                    <div
                      key={statement}
                      className="rounded-lg border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-200"
                    >
                      {statement}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </main>
  );
}
