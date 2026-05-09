"use client";

import { useState } from "react";
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
  embedded?: boolean;
};

export function ShareLink({ label, url, embedded = false }: ShareLinkProps) {
  const [status, setStatus] = useState<
    "idle" | "copied" | "shared" | "copy-error" | "share-error"
  >("idle");
  const { dictionary } = useLocale();

  async function handleCopy() {
    try {
      await copyTextToClipboard(url);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("copy-error");
      window.setTimeout(() => setStatus("idle"), 2200);
    }
  }

  async function handleShare() {
    try {
      const nextStatus = await shareOrCopyUrl(url);
      setStatus(nextStatus);
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setStatus("share-error");
      window.setTimeout(() => setStatus("idle"), 2200);
    }
  }

  const content = (
    <motion.div
      className="rounded-lg border border-white/10 bg-zinc-950/45 p-3"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <code
        className="block max-w-full overflow-hidden whitespace-normal break-all rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm leading-6 text-zinc-300"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {url}
      </code>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          onClick={handleCopy}
          variant="primary"
          className="w-full bg-[color:var(--accent)] text-black hover:bg-[color:var(--accent-strong)] sm:w-auto"
        >
          {status === "copied"
            ? dictionary.labels.copied
            : status === "shared"
              ? dictionary.labels.shared
              : dictionary.actions.copyLink}
        </Button>
        <Button
          onClick={() => {
            void handleShare();
          }}
          variant="outline"
          className="w-full sm:w-auto"
        >
          {dictionary.actions.shareLink}
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
    <Card className="compact-card">
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{content}</CardContent>
    </Card>
  );
}
