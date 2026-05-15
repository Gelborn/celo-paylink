import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={clsx(
        "inline-flex max-w-full items-center gap-1.5 rounded-md border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        variant === "neutral" &&
          "border-white/10 bg-zinc-950/55 text-zinc-400",
        variant === "accent" &&
          "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]",
        variant === "success" &&
          "border-emerald-300/20 bg-emerald-400/10 text-emerald-300",
        variant === "warning" &&
          "border-amber-300/20 bg-amber-400/10 text-amber-200",
        variant === "danger" &&
          "border-red-300/20 bg-red-400/10 text-red-300",
        className
      )}
      {...props}
    />
  );
}
