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
        "text-sm leading-6",
        tone === "muted" && "text-zinc-400",
        tone === "success" && "text-emerald-300",
        tone === "error" && "text-red-300",
        className
      )}
    >
      {children}
    </p>
  );
}
