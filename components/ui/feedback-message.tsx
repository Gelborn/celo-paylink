import clsx from "clsx";
import type { ReactNode } from "react";

export function FeedbackMessage({
  children,
  tone = "muted",
  className
}: {
  children?: ReactNode;
  tone?: "muted" | "success" | "error";
  className?: string;
}) {
  if (!children) {
    return null;
  }

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
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
    </p>
  );
}
