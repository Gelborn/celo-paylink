"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function NetworkMismatchModal({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <Card className="w-full max-w-md border-white/12 bg-zinc-950">
        <CardContent className="px-6 py-7 text-center sm:px-8 sm:py-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
          <Button
            size="lg"
            className="mt-8 min-w-[13rem]"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
