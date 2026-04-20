"use client";

import Link from "next/link";
import type { Hex } from "viem";
import { buildShareUrl } from "../lib/format";
import { useOwnerState } from "../lib/use-owner-state";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { EmptyState } from "./ui/empty-state";
import { Header } from "./header";
import { useLocale } from "./locale-provider";

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
    profile,
    isLoadingProfile
  } = useOwnerState({
    initialChainId,
    contractAddresses
  });

  const publicUrl = profile ? buildShareUrl(appUrl, profile.handle) : null;

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
      {account && profile ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <CardContent className="space-y-8 px-8 py-8">
              <div className="flex items-center gap-4">
                <Avatar
                  name={profile.displayName}
                  imageUrl={profile.avatarUrl}
                  size="xl"
                />
                <div className="space-y-2">
                  <Badge>{dictionary.labels.profileLive}</Badge>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                      {dictionary.home.summaryTitle}
                    </h1>
                    <p className="text-sm text-zinc-400">
                      @{profile.handle} · {profile.displayName}
                    </p>
                  </div>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                {dictionary.home.summaryDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/my">
                  <Button>{dictionary.actions.openDashboard}</Button>
                </Link>
                {publicUrl ? (
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await navigator.clipboard.writeText(publicUrl);
                    }}
                  >
                    {dictionary.actions.copyProfile}
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dictionary.dashboard.quickActions}</CardTitle>
              <CardDescription>{dictionary.productTagline}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  {dictionary.fields.publicLink}
                </p>
                <p className="mt-2 break-all text-sm text-zinc-300">
                  {publicUrl}
                </p>
              </div>
              <div className="grid gap-3">
                <Link href={`/u/${profile.handle}`}>
                  <Button variant="secondary" className="w-full">
                    {dictionary.actions.openPublicPage}
                  </Button>
                </Link>
                <Link href="/my">
                  <Button variant="outline" className="w-full">
                    {dictionary.actions.createChargeLink}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <CardContent className="space-y-8 px-8 py-8 md:px-10 md:py-10">
              <Badge>{dictionary.home.eyebrow}</Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {dictionary.home.title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-zinc-400">
                  {dictionary.home.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/my">
                  <Button size="lg">{dictionary.actions.createProfile}</Button>
                </Link>
                {hasProvider && !account && (!isMiniPay || isDisconnectedByUser) ? (
                  <Button
                    variant="outline"
                    size="lg"
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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.productName}</CardTitle>
                <CardDescription>{dictionary.home.connectHint}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dictionary.home.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-sm text-zinc-300"
                  >
                    {point}
                  </div>
                ))}
              </CardContent>
            </Card>

            {isLoadingProfile ? (
              <EmptyState
                title={dictionary.labels.checking}
                description={dictionary.messages.profileLoading}
              />
            ) : !hasProvider ? (
              <EmptyState
                title={dictionary.actions.createProfile}
                description={dictionary.home.connectHint}
                actions={
                  <Link href="/my">
                    <Button>{dictionary.actions.createProfile}</Button>
                  </Link>
                }
              />
            ) : null}
          </div>
        </section>
      )}
    </main>
  );
}
