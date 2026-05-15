import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Card({
  variant = "default",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "elevated" | "inset" | "accent";
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]",
        variant === "default" &&
          "border-white/10 bg-[linear-gradient(180deg,rgba(18,19,22,0.96),rgba(10,11,13,0.94))] shadow-[0_14px_36px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.025)]",
        variant === "elevated" &&
          "border-white/15 bg-[linear-gradient(180deg,rgba(22,23,26,0.98),rgba(10,11,13,0.95))] shadow-[0_24px_62px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.035)]",
        variant === "inset" &&
          "border-white/10 bg-zinc-950/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]",
        variant === "accent" &&
          "border-[color:var(--accent-line)] bg-[linear-gradient(180deg,rgba(17,22,20,0.98),rgba(9,11,12,0.94))] shadow-[var(--accent-shadow),0_18px_46px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.035)]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-5 pt-5 sm:px-6 sm:pt-6", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-5 pb-5 sm:px-6 sm:pb-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={clsx("text-lg font-semibold tracking-tight text-white sm:text-xl", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm leading-7 text-zinc-400", className)} {...props} />
  );
}
