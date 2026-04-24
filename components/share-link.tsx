"use client";

import { useState } from "react";
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
    <div className="space-y-4">
      <code
        className="block max-w-full overflow-hidden whitespace-normal break-all rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm leading-6 text-zinc-300"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {url}
      </code>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button onClick={handleCopy} variant="primary" className="w-full sm:w-auto">
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
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{content}</CardContent>
    </Card>
  );
}
