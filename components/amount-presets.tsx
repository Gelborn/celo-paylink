"use client";

import { motion } from "motion/react";
import { motionTransitions, softTap, subtleLift } from "../lib/motion";

type AmountPresetsProps = {
  label: string;
  values: number[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

export function AmountPresets({
  label,
  values,
  selectedValue,
  onSelect
}: AmountPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {values.map((value) => {
        const active = selectedValue === String(value);

        return (
          <motion.button
            key={value}
            type="button"
            layout
            whileHover={subtleLift}
            whileTap={softTap}
            transition={motionTransitions.spring}
            onClick={() => onSelect(String(value))}
            aria-label={`${label}: ${value}`}
            aria-pressed={active}
            className={`min-w-12 rounded-lg border px-3.5 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)] ${
              active
                ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-zinc-950 shadow-[0_12px_32px_rgba(57,217,138,0.12)]"
                : "border-white/10 bg-zinc-950/55 text-zinc-300 hover:border-white/20 hover:text-white"
            }`}
          >
            ${value}
          </motion.button>
        );
      })}
    </div>
  );
}
