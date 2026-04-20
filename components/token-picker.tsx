"use client";

import { HeadlessSelect } from "./ui/headless-select";

type TokenOption = {
  address: string;
  symbol: string;
  name: string;
};

type TokenPickerProps = {
  label: string;
  selectedAddress: string;
  options: TokenOption[];
  className?: string;
  onChange: (address: string) => void;
};

export function TokenPicker({
  label,
  selectedAddress,
  options,
  className,
  onChange
}: TokenPickerProps) {
  return (
    <HeadlessSelect
      label={label}
      className={className}
      value={selectedAddress}
      onChange={onChange}
      options={options.map((token) => ({
        value: token.address,
        label: token.symbol,
        description: token.name
      }))}
    />
  );
}
