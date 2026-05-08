import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border border-white/10 bg-zinc-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        className
      )}
      {...props}
    />
  );
}
