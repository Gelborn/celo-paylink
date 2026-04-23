"use client";

import clsx from "clsx";
import { useId } from "react";

export type HeadlessSelectOption = {
  value: string;
  label: string;
  description?: string;
};

export function HeadlessSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  className,
  triggerClassName,
  align = "left"
}: {
  label?: string;
  value: string;
  options: HeadlessSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  align?: "left" | "right";
}) {
  const selectId = useId();
  const selected = options.find((option) => option.value === value);
  const accessibleLabel = label || placeholder || "Select an option";

  return (
    <div className={clsx("space-y-2", className)}>
      {label ? (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          aria-label={accessibleLabel}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={clsx(
            "min-h-12 w-full appearance-none rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(24,24,27,0.92),rgba(15,15,18,0.94))] px-4 py-3 pr-11 text-sm text-white transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]",
            triggerClassName
          )}
        >
          {!selected && placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.description
                ? `${option.label} — ${option.description}`
                : option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b border-r border-zinc-500"
        />
      </div>
    </div>
  );
}
