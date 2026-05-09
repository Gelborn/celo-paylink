"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { motionTransitions } from "../../lib/motion";

export function FeedbackMessage({
  children,
  tone = "muted",
  className
}: {
  children?: ReactNode;
  tone?: "muted" | "success" | "error";
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {children ? (
        <motion.p
          key={String(children)}
          role={tone === "error" ? "alert" : "status"}
          aria-live="polite"
          initial={{ opacity: 0, y: -4, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -3, scale: 0.998 }}
          transition={motionTransitions.micro}
          className={clsx(
            "rounded-lg border px-3 py-2 text-sm leading-6",
            tone === "muted" && "border-white/10 bg-zinc-950/45 text-zinc-400",
            tone === "success" &&
              "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]",
            tone === "error" && "border-red-400/20 bg-red-950/25 text-red-300",
            className
          )}
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
