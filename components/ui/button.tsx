"use client";

import clsx from "clsx";
import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef, type ReactNode } from "react";
import { motionTransitions, softTap, subtleLift } from "../../lib/motion";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    type = "button",
    disabled,
    children,
    leftIcon,
    rightIcon,
    whileHover,
    whileTap,
    transition,
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : whileHover || subtleLift}
      whileTap={disabled ? undefined : whileTap || softTap}
      transition={transition || motionTransitions.micro}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)] disabled:cursor-not-allowed disabled:opacity-55",
        size === "sm" && "h-9 px-3.5 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-5 text-base",
        variant === "primary" &&
          "border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_10px_24px_rgba(57,217,138,0.12)] hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)]",
        variant === "secondary" &&
          "border-white/10 bg-white/[0.07] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-white/20 hover:bg-white/[0.1]",
        variant === "outline" &&
          "border-white/15 bg-zinc-950/10 text-zinc-100 hover:border-white/25 hover:bg-white/[0.06]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white",
        className
      )}
      {...props}
    >
      {leftIcon ? (
        <span className="pointer-events-none inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className="pointer-events-none inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
          {rightIcon}
        </span>
      ) : null}
    </motion.button>
  );
});
