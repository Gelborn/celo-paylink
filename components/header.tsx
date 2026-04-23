"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Hex } from "viem";
import { getChainLabel } from "../lib/chains";
import { shortenAddress } from "../lib/format";
import { BrandWordmark } from "./brand-wordmark";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

function WalletGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-zinc-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h9.8a2 2 0 0 0 1.4-.58l.3-.3" />
      <path d="M4 9.5C4 8.12 5.12 7 6.5 7H18a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 15.5z" />
      <path d="M16.75 12h.5" />
    </svg>
  );
}

function AccountVisual({
  name,
  imageUrl
}: {
  name: string;
  imageUrl?: string;
}) {
  if (!imageUrl) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900">
        <WalletGlyph />
      </span>
    );
  }

  return <Avatar name={name} imageUrl={imageUrl} size="xs" />;
}

export function Header({
  account,
  chainId,
  hasProvider,
  isMiniPay,
  isConnecting,
  isDisconnectedByUser,
  connectError,
  profileName,
  profileImageUrl,
  onConnect,
  onDisconnect,
  onClearConnectError,
  showAccountControls = true
}: {
  account: Hex | null;
  chainId: number;
  hasProvider: boolean;
  isMiniPay: boolean;
  isConnecting: boolean;
  isDisconnectedByUser: boolean;
  connectError?: string | null;
  profileName?: string;
  profileImageUrl?: string;
  onConnect: () => Promise<Hex | null> | void;
  onDisconnect: () => void;
  onClearConnectError?: () => void;
  showAccountControls?: boolean;
}) {
  const { dictionary } = useLocale();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!account) {
      setOpen(false);
    }
  }, [account]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }

    panelRef.current?.focus();
  }, [open]);

  return (
    <>
      <header className="mb-10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <BrandWordmark className="text-lg md:text-xl" />
        </div>

        {!showAccountControls ? null : account ? (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-white/10 bg-zinc-950/80 p-1.5 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            aria-label={shortenAddress(account)}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <AccountVisual name={profileName || account} imageUrl={profileImageUrl} />
          </button>
        ) : isMiniPay && !isDisconnectedByUser ? (
          <div className="rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-xs font-medium text-zinc-400">
            {isConnecting ? dictionary.messages.waitingConfirmation : "MiniPay"}
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={isConnecting}
            onClick={() => {
              void onConnect();
            }}
          >
            {isConnecting
              ? dictionary.messages.waitingConfirmation
              : dictionary.actions.connectWallet}
          </Button>
        )}
      </header>

      {connectError ? (
        <div
          role="alert"
          className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        >
          <p>{connectError}</p>
          {onClearConnectError ? (
            <button
              type="button"
              onClick={onClearConnectError}
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:bg-white/5"
            >
              OK
            </button>
          ) : null}
        </div>
      ) : null}

      {open && account
        ? createPortal(
            <div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <div className="flex h-full items-start justify-end p-4 md:p-6">
                <div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  tabIndex={-1}
                  className="w-full max-w-sm rounded-[28px] border border-white/10 bg-zinc-950 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpen(false);
                      return;
                    }

                    if (event.key !== "Tab") {
                      return;
                    }

                    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
                      'button:not([disabled]), [href], select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );

                    if (!focusable || focusable.length === 0) {
                      event.preventDefault();
                      return;
                    }

                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];

                    if (event.shiftKey && document.activeElement === first) {
                      event.preventDefault();
                      last.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                      event.preventDefault();
                      first.focus();
                    }
                  }}
                >
                  <div className="mb-6 flex min-w-0 items-start gap-3">
                    {profileImageUrl ? (
                      <Avatar
                        name={profileName || account}
                        imageUrl={profileImageUrl}
                        size="sm"
                      />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
                        <WalletGlyph />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p id={titleId} className="truncate text-sm font-medium text-white">
                        {profileName || shortenAddress(account)}
                      </p>
                      <p
                        id={descriptionId}
                        className="line-clamp-2 text-xs leading-5 text-zinc-500"
                      >
                        {dictionary.productTagline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {dictionary.labels.connectedWallet}
                      </p>
                      <p className="mt-2 break-all text-sm text-white">{account}</p>
                      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {dictionary.labels.network}
                      </p>
                      <p className="mt-2 text-sm text-zinc-300">{getChainLabel(chainId)}</p>
                    </div>

                    <LanguageSwitcher />

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        onDisconnect();
                        setOpen(false);
                      }}
                    >
                      {dictionary.actions.disconnectWallet}
                    </Button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
