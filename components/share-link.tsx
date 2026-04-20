"use client";

import { useState } from "react";
import { useLocale } from "./locale-provider";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ShareLinkProps = {
  label: string;
  url: string;
  embedded?: boolean;
};

export function ShareLink({ label, url, embedded = false }: ShareLinkProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");
  const { dictionary } = useLocale();

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setStatus("copied");
    window.setTimeout(() => setStatus("idle"), 1600);
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        setStatus("shared");
        window.setTimeout(() => setStatus("idle"), 1600);
        return;
      }

      await handleCopy();
    } catch {}
  }

  const content = (
    <div className="space-y-4">
      <code
        className="block max-w-full overflow-hidden whitespace-normal break-all rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm leading-6 text-zinc-300"
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
