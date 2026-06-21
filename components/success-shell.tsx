"use client";

import Link from "next/link";
import { useId } from "react";
import { CheckCircle2, Coins, ExternalLink, FileText, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { getExplorerBaseUrl } from "../lib/chains";
import type { ProfileRecord } from "../lib/contract";
import { useMiniPay } from "../lib/minipay";
import { fadeUp, staggerChildren } from "../lib/motion";
import { Header } from "./header";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { DetailTile, IconFrame } from "./ui/patterns";

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
  const successTitleId = useId();
  const transactionLabelId = useId();
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
        aria-labelledby={successTitleId}
        variants={staggerChildren}
        initial="hidden"
        animate="show"
      >
        {profile ? (
          <motion.div variants={fadeUp}>
            <Card variant="elevated" className="compact-card mx-auto max-w-3xl">
              <CardContent className="px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar
                    name={profile.displayName}
                    imageUrl={profile.avatarUrl}
                    size="lg"
                  />
                  <div className="space-y-2">
                    <Badge variant="accent" title={`@${profile.handle}`}>
                      @{profile.handle}
                    </Badge>
                    <div>
                      <h2 className="text-3xl font-semibold text-white sm:text-[2rem]">
                        {profile.displayName}
                      </h2>
                      {profile.bio ? (
                        <p className="text-sm text-zinc-500">{profile.bio}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <motion.div variants={fadeUp}>
          <Card variant="elevated" className="compact-card mx-auto max-w-3xl">
            <CardContent className="space-y-5 px-5 py-6 text-center sm:px-8">
              <div className="space-y-3">
                <IconFrame tone="success" className="mx-auto h-12 w-12">
                  <CheckCircle2 aria-hidden="true" />
                </IconFrame>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {dictionary.success.eyebrow}
                </p>
                <h1
                  id={successTitleId}
                  className="text-3xl font-semibold tracking-normal text-white sm:text-4xl"
                >
                  {dictionary.success.title}
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-400">
                  {dictionary.success.description}
                </p>
              </div>

              <div
                className="rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-4 text-left sm:px-5 sm:py-5"
                role="group"
                aria-label={dictionary.success.receiptDetails}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {amount && token ? (
                    <DetailTile
                      icon={<Coins aria-hidden="true" />}
                      label={dictionary.fields.amount}
                      value={`${amount} ${token}`}
                      tone="accent"
                    />
                  ) : null}
                  {reference ? (
                    <DetailTile
                      icon={<FileText aria-hidden="true" />}
                      label={dictionary.fields.note}
                      value={reference}
                      valueTitle={reference}
                    />
                  ) : null}
                </div>

                <motion.ul
                  className="trust-list mt-4 border-t border-white/10 pt-4"
                  aria-label={dictionary.home.proofEyebrow}
                >
                  {[dictionary.home.trustStatements[0], dictionary.home.trustStatements[2]].map(
                    (item) => (
                      <motion.li key={item} className="trust-list-item" variants={fadeUp}>
                        <IconFrame tone="accent" className="h-8 w-8 rounded-md">
                          <CheckCircle2 aria-hidden="true" />
                        </IconFrame>
                        <span>{item}</span>
                      </motion.li>
                    )
                  )}
                </motion.ul>

                <div
                  className="mt-4 border-t border-white/10 pt-4"
                  role="group"
                  aria-labelledby={transactionLabelId}
                >
                  <p
                    id={transactionLabelId}
                    className="text-xs uppercase tracking-[0.16em] text-zinc-500"
                  >
                    {dictionary.labels.transaction}
                  </p>
                  <code
                    aria-label={`${dictionary.labels.transaction}: ${
                      txHash || dictionary.labels.checking
                    }`}
                    title={txHash || undefined}
                    className="mt-2 block break-all text-sm text-zinc-300"
                  >
                    {txHash || "—"}
                  </code>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                {txHash ? (
                  <Link
                    href={`${getExplorerBaseUrl(chainId)}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${dictionary.actions.openExplorer}: ${txHash}, ${dictionary.labels.opensInNewTab}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
                  >
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    {dictionary.actions.openExplorer}
                  </Link>
                ) : null}
                {handle ? (
                  <Link
                    href={`/u/${handle}`}
                    aria-label={`${dictionary.actions.viewProfile}: @${handle}`}
                    className="inline-flex h-12 max-w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 text-base font-medium text-zinc-950 shadow-[0_10px_24px_rgba(57,217,138,0.1)] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] hover:shadow-[0_14px_32px_rgba(57,217,138,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
                  >
                    <UserRound aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {dictionary.actions.viewProfile} @{handle}
                    </span>
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
