"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LogOut, Wallet, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Hex } from "viem";
import { getChainLabel } from "../lib/chains";
import { shortenAddress } from "../lib/format";
import {
  modalBackdrop,
  modalPanel,
  motionTransitions,
  softTap,
  subtleLift
} from "../lib/motion";
import { BrandWordmark } from "./brand-wordmark";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

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
        <Wallet aria-hidden="true" className="h-4 w-4 text-zinc-200" />
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
  const panelId = useId();
  const connectedWalletLabel = account
    ? profileName
      ? `${dictionary.labels.walletControls}: ${dictionary.labels.connectedWallet}: ${profileName}, ${account}`
      : `${dictionary.labels.walletControls}: ${dictionary.labels.connectedWallet}: ${account}`
    : dictionary.labels.walletControls;

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
      <header className="mb-8 flex min-w-0 items-center justify-between gap-3 md:mb-10 md:gap-4">
        <div className="min-w-0">
          <BrandWordmark
            ariaLabel={`${dictionary.productName}: ${dictionary.nav.home}`}
            className="text-lg md:text-xl"
          />
        </div>

        {!showAccountControls ? null : (
          <div
            className="flex min-w-0 shrink-0 justify-end"
            role="group"
            aria-label={dictionary.labels.walletControls}
          >
            {account ? (
              <motion.button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((current) => !current)}
                whileHover={subtleLift}
                whileTap={softTap}
                transition={motionTransitions.micro}
                className="rounded-full border border-white/10 bg-zinc-950/80 p-1.5 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
                aria-label={connectedWalletLabel}
                title={account}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
              >
                <AccountVisual name={profileName || account} imageUrl={profileImageUrl} />
              </motion.button>
            ) : isMiniPay && !isDisconnectedByUser ? (
              <div
                role="status"
                aria-label={`${dictionary.labels.walletControls}: ${
                  isConnecting ? dictionary.messages.waitingConfirmation : "MiniPay"
                }`}
                aria-live="polite"
                aria-atomic="true"
                className="rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-xs font-medium text-zinc-400"
              >
                {isConnecting ? dictionary.messages.waitingConfirmation : "MiniPay"}
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-9 w-9 px-0 sm:w-auto sm:px-3.5"
                leftIcon={<Wallet aria-hidden="true" />}
                disabled={isConnecting}
                aria-busy={isConnecting ? true : undefined}
                aria-label={`${isConnecting ? dictionary.messages.waitingConfirmation : dictionary.actions.connectWallet}: ${dictionary.labels.walletControls}`}
                onClick={() => {
                  void onConnect();
                }}
              >
                <span className="sr-only sm:not-sr-only">
                  {isConnecting
                    ? dictionary.messages.waitingConfirmation
                    : dictionary.actions.connectWallet}
                </span>
              </Button>
            )}
          </div>
        )}
      </header>

      <AnimatePresence initial={false}>
        {connectError ? (
          <motion.div
            role="alert"
            aria-atomic="true"
            initial={{ opacity: 0, y: -8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.998 }}
            transition={motionTransitions.micro}
                className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
          >
            <p>{connectError}</p>
            {onClearConnectError ? (
              <motion.button
                type="button"
                onClick={onClearConnectError}
                whileHover={subtleLift}
                whileTap={softTap}
                transition={motionTransitions.micro}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
                aria-label={`${dictionary.actions.dismissMessage}: ${dictionary.labels.walletControls}`}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </motion.button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {typeof document === "undefined"
        ? null
        : createPortal(
            <AnimatePresence>
              {open && account ? (
                <motion.div
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  variants={modalBackdrop}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex h-full items-start justify-end p-4 md:p-6">
                    <motion.div
                      id={panelId}
                      ref={panelRef}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby={titleId}
                      aria-describedby={descriptionId}
                      tabIndex={-1}
                      className="w-full max-w-sm rounded-lg border border-white/10 bg-zinc-950 p-5 shadow-[0_24px_72px_rgba(0,0,0,0.42)]"
                      variants={modalPanel}
                      initial="hidden"
                      animate="show"
                      exit="exit"
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
                      <div className="mb-6 flex min-w-0 items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          {profileImageUrl ? (
                            <Avatar
                              name={profileName || account}
                              imageUrl={profileImageUrl}
                              size="sm"
                            />
                          ) : (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
                              <Wallet aria-hidden="true" className="h-4 w-4 text-zinc-200" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <p
                              id={titleId}
                              className="truncate text-sm font-medium text-white"
                              title={profileName || account}
                            >
                              {profileName || shortenAddress(account)}
                            </p>
                            <p
                              id={descriptionId}
                              className="line-clamp-2 text-xs leading-5 text-zinc-500"
                              title={dictionary.productTagline}
                            >
                              {dictionary.productTagline}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => setOpen(false)}
                          whileHover={subtleLift}
                          whileTap={softTap}
                          transition={motionTransitions.micro}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
                          aria-label={`${dictionary.actions.cancel}: ${dictionary.labels.walletControls}`}
                        >
                          <X aria-hidden="true" className="h-4 w-4" />
                        </motion.button>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-4">
                          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                            {dictionary.labels.connectedWallet}
                          </p>
                          <p className="mt-2 break-all text-sm text-white">{account}</p>
                          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                            {dictionary.labels.network}
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            {getChainLabel(chainId)}
                          </p>
                        </div>

                        <LanguageSwitcher />

                        <Button
                          variant="outline"
                          className="w-full"
                          leftIcon={<LogOut aria-hidden="true" />}
                          onClick={() => {
                            onDisconnect();
                            setOpen(false);
                          }}
                          aria-label={`${dictionary.actions.disconnectWallet}: ${account}`}
                        >
                          {dictionary.actions.disconnectWallet}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )}
    </>
  );
}
