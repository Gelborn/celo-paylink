import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 max-w-3xl space-y-3">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h1 className="max-w-full text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-3" role="group" aria-label={title}>
          {actions}
        </div>
      ) : null}
    </div>
  );
}
