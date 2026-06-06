import type { ReactNode } from "react";
import { BrandWordmark } from "./brand-wordmark";

export function StaticHeader({
  actions,
  actionsLabel,
  homeAriaLabel
}: {
  actions?: ReactNode;
  actionsLabel?: string;
  homeAriaLabel?: string;
}) {
  return (
    <header className="mb-8 flex min-w-0 items-center justify-between gap-3 md:mb-10 md:gap-4">
      <div className="min-w-0">
        <BrandWordmark ariaLabel={homeAriaLabel} className="text-lg md:text-xl" />
      </div>
      {actions ? (
        <div
          className="flex min-w-0 shrink-0 justify-end"
          role={actionsLabel ? "group" : undefined}
          aria-label={actionsLabel}
        >
          {actions}
        </div>
      ) : null}
    </header>
  );
}
