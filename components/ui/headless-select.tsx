"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
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
            "min-h-12 w-full appearance-none rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,24,0.94),rgba(11,12,14,0.96))] px-4 py-3 pr-11 text-base text-white transition-[background-color,border-color,box-shadow] duration-200 hover:border-white/20 focus:border-[color:var(--accent-line)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]",
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
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        />
      </div>
    </div>
  );
}
