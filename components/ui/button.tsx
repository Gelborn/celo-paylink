"use client";

import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_12px_28px_rgba(57,217,138,0.14)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)]",
        variant === "secondary" &&
          "border-white/10 bg-zinc-900/90 text-zinc-100 hover:border-white/20 hover:bg-zinc-800",
        variant === "outline" &&
          "border-white/10 bg-zinc-950/20 text-zinc-100 hover:border-white/20 hover:bg-white/5",
        variant === "ghost" &&
          "border-transparent bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
        className
      )}
      {...props}
    />
  );
});
