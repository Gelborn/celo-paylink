"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-full border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "border-white/10 bg-white text-zinc-950 hover:bg-zinc-200",
        variant === "secondary" &&
          "border-white/10 bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
        variant === "outline" &&
          "border-white/10 bg-transparent text-zinc-100 hover:bg-white/5",
        variant === "ghost" &&
          "border-transparent bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
        className
      )}
      {...props}
    />
  );
}
