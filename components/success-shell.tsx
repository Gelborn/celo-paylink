"use client";

import Link from "next/link";
import { getExplorerBaseUrl } from "../lib/chains";
import type { ProfileRecord } from "../lib/contract";
import { useMiniPay } from "../lib/minipay";
import { Header } from "./header";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function SuccessShell({
  chainId,
  txHash,
  handle,
  profile,
  amount,
  token,
  reference,
  previewMode = false
}: {
  chainId: number;
  txHash?: string;
  handle?: string;
  profile?: ProfileRecord | null;
  amount?: string;
  token?: string;
  reference?: string;
  previewMode?: boolean;
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
    clearConnectError
  } = useMiniPay(chainId);

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
        showAccountControls={!previewMode}
      />
      <section className="space-y-6">
        {profile ? (
          <Card className="mx-auto max-w-3xl">
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
            </CardContent>
          </Card>
        ) : null}

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
                {amount && token ? (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {dictionary.fields.amount}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {amount} {token}
                    </p>
                  </div>
                ) : null}
                {reference ? (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {dictionary.fields.note}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      {reference}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  {dictionary.labels.transaction}
                </p>
                <code className="mt-2 block break-all text-sm text-zinc-300">
                  {txHash || "—"}
                </code>
              </div>
            </div>

            <div className="space-y-3">
              {txHash ? (
                <Link
                  href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                  target="_blank"
                  className="inline-flex text-sm text-zinc-300 underline underline-offset-4"
                >
                  {dictionary.actions.openExplorer}
                </Link>
              ) : null}
              {handle ? (
                <div>
                  <Link href={`/u/${handle}`}>
                    <Button size="lg">
                      {dictionary.actions.viewProfile} @{handle}
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
