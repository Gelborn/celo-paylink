"use client";

import { useState } from "react";

type ShareLinkProps = {
  url: string;
};

export function ShareLink({ url }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="rounded-[1.5rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
        Shareable link
      </p>
      <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center">
        <code
          className="overflow-x-auto rounded-2xl bg-[var(--sand)] px-3 py-2 text-sm"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {url}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-[var(--meadow)] px-4 py-2 text-sm font-semibold text-[var(--sand)] transition hover:opacity-90"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
