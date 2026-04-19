"use client";

type TokenOption = {
  address: string;
  symbol: string;
  name: string;
};

type TokenPickerProps = {
  selectedAddress: string;
  options: TokenOption[];
  onChange: (address: string) => void;
};

export function TokenPicker({
  selectedAddress,
  options,
  onChange
}: TokenPickerProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:rgba(23,50,40,0.7)]">
        Token
      </span>
      <select
        value={selectedAddress}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--meadow)]"
      >
        {options.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol} · {token.name}
          </option>
        ))}
      </select>
    </label>
  );
}
