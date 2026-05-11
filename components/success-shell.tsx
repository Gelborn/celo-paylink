"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getExplorerBaseUrl } from "../lib/chains";
import type { ProfileRecord } from "../lib/contract";
import { useMiniPay } from "../lib/minipay";
import { fadeUp, staggerChildren } from "../lib/motion";
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
      <motion.section
        className="space-y-5"
        variants={staggerChildren}
        initial="hidden"
        animate="show"
      >
        {profile ? (
          <motion.div variants={fadeUp}>
            <Card className="compact-card mx-auto max-w-3xl">
              <CardContent className="px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar
                    name={profile.displayName}
                    imageUrl={profile.avatarUrl}
                    size="lg"
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
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <motion.div variants={fadeUp}>
          <Card className="compact-card mx-auto max-w-3xl">
            <CardContent className="space-y-5 px-5 py-6 text-center sm:px-8">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {dictionary.success.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {dictionary.success.title}
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-400">
                  {dictionary.success.description}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-4 text-left sm:px-5 sm:py-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {amount && token ? (
                    <div className="rounded-lg border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        {dictionary.fields.amount}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-[color:var(--accent)]">
                        {amount} {token}
                      </p>
                    </div>
                  ) : null}
                  {reference ? (
                    <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        {dictionary.fields.note}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">
                        {reference}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="trust-list mt-4 border-t border-white/10 pt-4">
                  {[dictionary.home.trustStatements[0], dictionary.home.trustStatements[2]].map(
                    (item) => (
                      <motion.div key={item} className="trust-list-item" variants={fadeUp}>
                        <span className="trust-list-dot" aria-hidden="true" />
                        <span>{item}</span>
                      </motion.div>
                    )
                  )}
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

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                {txHash ? (
                  <Link
                    href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]"
                  >
                    {dictionary.actions.openExplorer}
                  </Link>
                ) : null}
                {handle ? (
                  <Link href={`/u/${handle}`}>
                    <Button size="lg">
                      {dictionary.actions.viewProfile} @{handle}
                    </Button>
                  </Link>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </main>
  );
}
