import clsx from "clsx";
import type { ReactNode } from "react";
import { Badge } from "./badge";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "border-white/10 bg-zinc-950/45 text-zinc-300",
  accent: "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]",
  success: "border-emerald-300/20 bg-emerald-400/10 text-emerald-300",
  warning: "border-amber-300/20 bg-amber-400/10 text-amber-200",
  danger: "border-red-300/20 bg-red-400/10 text-red-300"
};

export function AccentBadge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge variant="accent" className={className}>
      {children}
    </Badge>
  );
}

export function IconFrame({
  children,
  tone = "neutral",
  className
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] [&>svg]:h-4 [&>svg]:w-4",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DetailTile({
  icon,
  label,
  value,
  valueTitle,
  description,
  tone = "neutral",
  mono = false,
  className
}: {
  icon?: ReactNode;
  label: ReactNode;
  value: ReactNode;
  valueTitle?: string;
  description?: ReactNode;
  tone?: Tone;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "min-w-0 rounded-lg border px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:py-4",
        toneClasses[tone],
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon ? <IconFrame tone={tone} className="h-8 w-8">{icon}</IconFrame> : null}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-normal text-zinc-500 sm:text-[11px] sm:tracking-[0.14em]">
            {label}
          </p>
          <div
            title={valueTitle}
            className={clsx(
              "mt-1.5 min-w-0 break-words text-base font-semibold leading-6 text-white",
              mono && "font-mono text-sm font-medium text-zinc-200"
            )}
          >
            {value}
          </div>
          {description ? (
            <p className="mt-1.5 text-sm leading-6 text-zinc-400">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ActionRow({
  icon,
  title,
  description,
  detail,
  tone = "neutral",
  children,
  className
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  detail?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex min-w-0 flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/45 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon ? <IconFrame tone={tone}>{icon}</IconFrame> : null}
        <div className="min-w-0 space-y-2">
          <p className="text-base font-medium text-white">{title}</p>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              {description}
            </p>
          ) : null}
          {detail ? <div className="min-w-0">{detail}</div> : null}
        </div>
      </div>
      {children ? (
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
