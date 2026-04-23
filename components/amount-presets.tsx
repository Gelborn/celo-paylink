"use client";

type AmountPresetsProps = {
  values: number[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

export function AmountPresets({
  values,
  selectedValue,
  onSelect
}: AmountPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => {
        const active = selectedValue === String(value);

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(String(value))}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] ${
              active
                ? "border-white bg-white text-zinc-950 shadow-[0_12px_32px_rgba(255,255,255,0.08)]"
                : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/20 hover:text-white"
            }`}
          >
            ${value}
          </button>
        );
      })}
    </div>
  );
}
