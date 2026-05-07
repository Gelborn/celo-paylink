import type { ReactNode } from "react";
import { BrandWordmark } from "./brand-wordmark";

export function StaticHeader({
  actions
}: {
  actions?: ReactNode;
}) {
  return (
    <header className="mb-10 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <BrandWordmark className="text-lg md:text-xl" />
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
