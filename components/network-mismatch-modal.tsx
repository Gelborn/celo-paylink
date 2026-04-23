"use client";

import { useEffect, useId, useRef } from "react";
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
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    actionRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-md border-transparent bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(12,12,15,0.94))] ring-1 ring-black/40"
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            actionRef.current?.focus();
          }
        }}
      >
        <CardContent className="px-6 py-7 text-center sm:px-8 sm:py-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
          <h2 id={titleId} className="mt-4 text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p id={descriptionId} className="mt-4 text-sm leading-7 text-zinc-400">
            {description}
          </p>
          <Button
            ref={actionRef}
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
