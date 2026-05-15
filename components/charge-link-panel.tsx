"use client";

import { useEffect, useMemo, useState } from "react";
import { Coins } from "lucide-react";
import { buildShareUrl, sanitizeCurrencyInput } from "../lib/format";
import { getSupportedTokens, getTokenByAddress, type SupportedTokenSymbol } from "../lib/tokens";
import { useLocale } from "./locale-provider";
import { AmountPresets } from "./amount-presets";
import { ShareLink } from "./share-link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { IconFrame } from "./ui/patterns";
import { TokenPicker } from "./token-picker";
import type { ProfileRecord } from "../lib/contract";

export function ChargeLinkPanel({
  appUrl,
  profile,
  chainId,
  embedded = false
}: {
  appUrl: string;
  profile: ProfileRecord;
  chainId: number;
  embedded?: boolean;
}) {
  const { dictionary } = useLocale();
  const tokens = getSupportedTokens(chainId);
  const [amount, setAmount] = useState("25");
  const [note, setNote] = useState("");
  const [tokenAddress, setTokenAddress] = useState<string>(profile.preferredToken);

  useEffect(() => {
    setTokenAddress(profile.preferredToken);
  }, [profile.preferredToken]);

  const tokenSymbol = useMemo<SupportedTokenSymbol | undefined>(() => {
    return getTokenByAddress(tokenAddress, chainId)?.symbol;
  }, [chainId, tokenAddress]);

  const chargeUrl = buildShareUrl(
    appUrl,
    profile.handle,
    amount,
    note,
    tokenSymbol
  );

  const content = (
    <div className="space-y-5 overflow-hidden">
      <div className="rounded-lg border border-white/10 bg-zinc-950/45 px-4 py-4">
        <div className="mb-3 flex items-center gap-3">
          <IconFrame tone="accent" className="h-8 w-8 rounded-md">
            <Coins aria-hidden="true" />
          </IconFrame>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            {dictionary.fields.suggestedAmounts}
          </p>
        </div>
        <AmountPresets
          values={[5, 15, 25, 50]}
          selectedValue={amount}
          onSelect={setAmount}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            {dictionary.fields.amount}
          </span>
          <Input
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(sanitizeCurrencyInput(event.target.value))}
            placeholder={dictionary.placeholders.amount}
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            {dictionary.fields.note}
          </span>
          <Input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={dictionary.placeholders.note}
          />
        </label>
      </div>

      <TokenPicker
        label={dictionary.fields.token}
        selectedAddress={tokenAddress}
        options={tokens}
        onChange={(address) => setTokenAddress(address)}
      />

      <ShareLink
        label={dictionary.fields.chargeLink}
        url={chargeUrl}
        embedded
      />
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Card variant="elevated" className="compact-card">
      <CardHeader className="space-y-2">
        <CardTitle>{dictionary.dashboard.chargeSection}</CardTitle>
        <CardDescription>{dictionary.dashboard.chargeLinkHint}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">{content}</CardContent>
    </Card>
  );
}
