"use client";

import { useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp } from "../lib/motion";
import { copyTextToClipboard, shareOrCopyUrl } from "../lib/share";
import { useLocale } from "./locale-provider";
import { FeedbackMessage } from "./ui/feedback-message";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ShareLinkProps = {
  label: string;
  url: string;
  copyLabel?: string;
  embedded?: boolean;
};

export function ShareLink({ label, url, copyLabel, embedded = false }: ShareLinkProps) {
  const [status, setStatus] = useState<
    "idle" | "copied" | "shared" | "copy-error" | "share-error"
  >("idle");
  const [pendingAction, setPendingAction] = useState<"copy" | "share" | null>(null);
  const { dictionary } = useLocale();
  const copyActionLabel = copyLabel || dictionary.actions.copyLink;
  const copyButtonLabel =
    pendingAction === "copy"
      ? `${dictionary.messages.copyingLink}: ${label}`
      : status === "copied"
      ? `${dictionary.labels.copied}: ${label}`
      : status === "shared"
        ? `${dictionary.labels.shared}: ${label}`
        : `${copyActionLabel}: ${label}`;
  const shareButtonLabel =
    pendingAction === "share"
      ? `${dictionary.messages.sharingLink}: ${label}`
      : status === "shared"
      ? `${dictionary.labels.shared}: ${label}`
      : `${dictionary.actions.shareLink}: ${label}`;
  const copyButtonText =
    pendingAction === "copy"
      ? dictionary.messages.copyingLink
      : status === "copied"
      ? dictionary.labels.copied
      : status === "shared"
        ? dictionary.labels.shared
        : copyActionLabel;
  const shareButtonText =
    pendingAction === "share"
      ? dictionary.messages.sharingLink
      : dictionary.actions.shareLink;

  async function handleCopy() {
    setPendingAction("copy");
    try {
      await copyTextToClipboard(url);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("copy-error");
      window.setTimeout(() => setStatus("idle"), 2200);
    } finally {
      setPendingAction(null);
    }
  }

  async function handleShare() {
    setPendingAction("share");
    try {
      const nextStatus = await shareOrCopyUrl(url, label);
      setStatus(nextStatus);
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setStatus("share-error");
      window.setTimeout(() => setStatus("idle"), 2200);
    } finally {
      setPendingAction(null);
    }
  }

  const content = (
    <motion.div
      className="rounded-lg border border-white/10 bg-zinc-950/45 p-3"
      role="group"
      aria-label={label}
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <code
        aria-label={`${label}: ${url}`}
        className="block max-w-full overflow-hidden whitespace-normal break-all rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm leading-6 text-zinc-300"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {url}
      </code>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          onClick={handleCopy}
          variant="primary"
          className="w-full sm:w-auto"
          leftIcon={<Copy aria-hidden="true" />}
          disabled={pendingAction !== null}
          aria-busy={pendingAction === "copy" ? true : undefined}
          aria-label={copyButtonLabel}
        >
          {copyButtonText}
        </Button>
        <Button
          onClick={() => {
            void handleShare();
          }}
          variant="outline"
          className="w-full sm:w-auto"
          leftIcon={<Share2 aria-hidden="true" />}
          disabled={pendingAction !== null}
          aria-busy={pendingAction === "share" ? true : undefined}
          aria-label={shareButtonLabel}
        >
          {shareButtonText}
        </Button>
      </div>
      <FeedbackMessage
        tone={status === "copy-error" || status === "share-error" ? "error" : "success"}
        className="mt-3"
      >
        {status === "copied"
          ? dictionary.messages.linkCopied
          : status === "shared"
            ? dictionary.messages.shareOpened
            : status === "copy-error"
              ? dictionary.messages.copyFailed
              : status === "share-error"
              ? dictionary.messages.shareFailed
              : null}
      </FeedbackMessage>
    </motion.div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Card variant="elevated" className="compact-card">
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{content}</CardContent>
    </Card>
  );
}
