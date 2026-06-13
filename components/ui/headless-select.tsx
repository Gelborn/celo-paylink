"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useId } from "react";

export type HeadlessSelectOption = {
  value: string;
  label: string;
  description?: string;
  lang?: string;
};

export function HeadlessSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  className,
  triggerClassName,
  invalid = false,
  disabled = false,
  align = "left"
}: {
  label?: string;
  value: string;
  options: HeadlessSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  invalid?: boolean;
  disabled?: boolean;
  align?: "left" | "right";
}) {
  const selectId = useId();
  const selected = options.find((option) => option.value === value);
  const accessibleLabel = label || placeholder || "Select an option";

  return (
    <div className={clsx("min-w-0 space-y-2", className)}>
      {label ? (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500"
        >
          {label}
        </label>
      ) : null}

      <div className="relative min-w-0">
        <select
          id={selectId}
          aria-label={label ? undefined : accessibleLabel}
          aria-disabled={disabled ? true : undefined}
          aria-invalid={invalid ? true : undefined}
          disabled={disabled}
          lang={selected?.lang}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={clsx(
            "min-h-12 min-w-0 w-full appearance-none rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,24,0.9),rgba(11,12,14,0.96))] px-4 py-3 pr-11 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[background-color,border-color,box-shadow] duration-200 hover:border-white/20 focus:border-[color:var(--accent-line)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)] disabled:cursor-not-allowed disabled:opacity-55",
            invalid &&
              "border-red-400/70 focus:border-red-400 focus-visible:ring-red-400/30",
            triggerClassName
          )}
        >
          {!selected && placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} lang={option.lang}>
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
