"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMiniPay } from "../lib/minipay";
import { shortenAddress } from "../lib/format";
import { motionTransitions, softTap, subtleLift } from "../lib/motion";
import { useLocale } from "./locale-provider";
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

export function HomeWalletControls({
  initialChainId,
  targetId
}: {
  initialChainId: number;
  targetId: string;
}) {
  const { dictionary } = useLocale();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const {
    account,
    connect,
    isMiniPay,
    isConnecting,
    isDisconnectedByUser,
    connectError,
    clearConnectError
  } = useMiniPay(initialChainId);

  useEffect(() => {
    setTarget(document.getElementById(targetId));
  }, [targetId]);

  const controls = account ? (
    <Link
      href="/my"
      className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-3 text-sm font-medium text-zinc-100 transition-[background-color,border-color,transform] duration-200 ease-[var(--motion-ease)] hover:-translate-y-0.5 hover:border-white/20 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      aria-label={shortenAddress(account)}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900">
        <WalletGlyph />
      </span>
      <span className="hidden sm:inline">{shortenAddress(account)}</span>
    </Link>
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
        void connect();
      }}
    >
      {isConnecting
        ? dictionary.messages.waitingConfirmation
        : dictionary.actions.connectWallet}
    </Button>
  );

  return (
    <>
      {target ? createPortal(controls, target) : null}
      <AnimatePresence initial={false}>
        {connectError ? (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.998 }}
            transition={motionTransitions.micro}
            className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
          >
            <p>{connectError}</p>
            <motion.button
              type="button"
              onClick={clearConnectError}
              whileHover={subtleLift}
              whileTap={softTap}
              transition={motionTransitions.micro}
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:bg-white/5"
            >
              OK
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
