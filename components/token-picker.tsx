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
  invalid?: boolean;
  disabled?: boolean;
  onChange: (address: string) => void;
};

export function TokenPicker({
  label,
  selectedAddress,
  options,
  className,
  invalid = false,
  disabled = false,
  onChange
}: TokenPickerProps) {
  return (
    <HeadlessSelect
      label={label}
      className={className}
      invalid={invalid}
      disabled={disabled || options.length === 0}
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
