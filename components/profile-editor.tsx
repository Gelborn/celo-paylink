"use client";

import { useEffect, useState } from "react";
import type { Hex } from "viem";
import { fetchProfileByHandle, type ProfileRecord } from "../lib/contract";
import { normalizeImageUrl, sanitizeHandleInput } from "../lib/format";
import { getSupportedTokens } from "../lib/tokens";
import { setProfileTx, waitForTransaction } from "../lib/wallet";
import { useLocale } from "./locale-provider";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FeedbackMessage } from "./ui/feedback-message";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TokenPicker } from "./token-picker";

type FormState = {
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  paymentMessage: string;
  preferredToken: Hex | "";
};

type HandleAvailability =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "owned"
  | "invalid";

type InvalidFields = {
  handle: boolean;
  displayName: boolean;
  avatarUrl: boolean;
  bio: boolean;
  paymentMessage: boolean;
  preferredToken: boolean;
};

export type PublishStage = "wallet" | "confirming" | "syncing";

export function ProfileEditor({
  account,
  chainId,
  contractAddress,
  profile,
  onSaved,
  onPublishStateChange
}: {
  account: Hex | null;
  chainId: number;
  contractAddress: Hex | null;
  profile: ProfileRecord | null;
  onSaved: () => Promise<void>;
  onPublishStateChange?: (value: PublishStage | null) => void;
}) {
  const { dictionary } = useLocale();
  const [form, setForm] = useState<FormState>({
    handle: "",
    displayName: "",
    avatarUrl: "",
    bio: "",
    paymentMessage: "",
    preferredToken: ""
  });
  const [status, setStatus] = useState<string | null>(null);
  const [handleAvailability, setHandleAvailability] =
    useState<HandleAvailability>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalidFields, setInvalidFields] = useState<InvalidFields>({
    handle: false,
    displayName: false,
    avatarUrl: false,
    bio: false,
    paymentMessage: false,
    preferredToken: false
  });
  const tokens = getSupportedTokens(chainId);
  const defaultTokenAddress = tokens[0]?.address || "";

  useEffect(() => {
    const nextToken = profile?.preferredToken || defaultTokenAddress;

    setForm({
      handle: profile?.handle || "",
      displayName: profile?.displayName || "",
      avatarUrl: profile?.avatarUrl || "",
      bio: profile?.bio || "",
      paymentMessage: profile?.paymentMessage || "",
      preferredToken: nextToken
    });
    setInvalidFields({
      handle: false,
      displayName: false,
      avatarUrl: false,
      bio: false,
      paymentMessage: false,
      preferredToken: false
    });
  }, [
    defaultTokenAddress,
    profile?.avatarUrl,
    profile?.bio,
    profile?.displayName,
    profile?.handle,
    profile?.paymentMessage,
    profile?.preferredToken
  ]);

  useEffect(() => {
    if (profile) {
      setHandleAvailability("owned");
      return;
    }

    if (!contractAddress || !form.handle) {
      setHandleAvailability("idle");
      return;
    }

    if (form.handle.length < 3) {
      setHandleAvailability("invalid");
      return;
    }

    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        setHandleAvailability("checking");

        const existingProfile = await fetchProfileByHandle(
          form.handle,
          chainId,
          contractAddress
        );

        if (cancelled) return;

        if (!existingProfile) {
          setHandleAvailability("available");
          return;
        }

        if (
          account &&
          existingProfile.owner.toLowerCase() === account.toLowerCase()
        ) {
          setHandleAvailability("owned");
          return;
        }

        setHandleAvailability("taken");
      })();
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [account, chainId, contractAddress, form.handle, profile]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const nextInvalidFields: InvalidFields = {
        handle: !form.handle,
        displayName: !form.displayName,
        avatarUrl: false,
        bio: !form.bio,
        paymentMessage: false,
        preferredToken: !form.preferredToken
      };

      setInvalidFields(nextInvalidFields);

      if (handleAvailability === "checking") {
        throw new Error(dictionary.messages.handleChecking);
      }

      if (handleAvailability === "taken") {
        throw new Error(dictionary.messages.handleTaken);
      }

      if (handleAvailability === "invalid") {
        throw new Error(dictionary.messages.handleInvalid);
      }

      if (!account) {
        throw new Error(dictionary.messages.connectBeforeSave);
      }

      if (!contractAddress) {
        throw new Error(dictionary.messages.missingContract);
      }

      if (
        !form.handle ||
        !form.displayName ||
        !form.bio ||
        !form.preferredToken
      ) {
        throw new Error(dictionary.messages.fillAllFields);
      }

      if (form.avatarUrl && !normalizeImageUrl(form.avatarUrl)) {
        setInvalidFields((current) => ({
          ...current,
          avatarUrl: true
        }));
        throw new Error(dictionary.messages.invalidImage);
      }

      if (!profile) {
        const existingProfile = await fetchProfileByHandle(
          form.handle,
          chainId,
          contractAddress
        );

        if (
          existingProfile &&
          existingProfile.owner.toLowerCase() !== account.toLowerCase()
        ) {
          throw new Error(dictionary.messages.handleTaken);
        }
      }

      onPublishStateChange?.("wallet");

      const hash = await setProfileTx({
        contractAddress,
        handle: form.handle,
        displayName: form.displayName,
        avatarUrl: form.avatarUrl,
        bio: form.bio,
        paymentMessage: form.paymentMessage || "",
        preferredToken: form.preferredToken,
        chainId
      });

      onPublishStateChange?.("confirming");
      setStatus(dictionary.messages.waitingConfirmation);
      await waitForTransaction(hash, chainId);
      onPublishStateChange?.("syncing");
      await onSaved();
      onPublishStateChange?.(null);
      setStatus(dictionary.messages.profilePublished);
    } catch (error) {
      onPublishStateChange?.(null);
      setStatus(
        error instanceof Error ? error.message : dictionary.messages.noProfile
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const footerMessage =
    status ||
    (!contractAddress
      ? dictionary.messages.missingContract
      : !account
        ? dictionary.messages.connectBeforeSave
        : dictionary.messages.contractReady);

  const handleStatusText = profile
    ? dictionary.messages.handleLocked
    : handleAvailability === "checking"
      ? dictionary.messages.handleChecking
      : handleAvailability === "available"
        ? dictionary.messages.handleAvailable
        : handleAvailability === "taken"
          ? dictionary.messages.handleTaken
          : handleAvailability === "invalid"
            ? dictionary.messages.handleInvalid
            : dictionary.messages.handleDefault;

  const handleStatusClassName = profile
    ? "text-zinc-500"
    : handleAvailability === "available"
      ? "text-zinc-200"
      : handleAvailability === "taken" || handleAvailability === "invalid"
        ? "text-red-300"
        : "text-zinc-500";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.dashboard.profileSection}</CardTitle>
        <CardDescription>
          {profile
            ? dictionary.dashboard.descriptionWithProfile
            : dictionary.dashboard.descriptionNoProfile}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                {dictionary.fields.handle}
              </span>
              <Input
                value={form.handle}
                readOnly={Boolean(profile)}
                aria-invalid={invalidFields.handle}
                className={invalidFields.handle ? "border-red-400/70 focus:border-red-400" : undefined}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    handle: sanitizeHandleInput(event.target.value)
                  }))
                }
                placeholder={dictionary.placeholders.handle}
              />
              <p className={`text-xs ${handleStatusClassName}`}>{handleStatusText}</p>
            </label>

            <label className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                {dictionary.fields.displayName}
              </span>
              <Input
                value={form.displayName}
                aria-invalid={invalidFields.displayName}
                className={invalidFields.displayName ? "border-red-400/70 focus:border-red-400" : undefined}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    displayName: event.target.value
                  }))
                }
                placeholder={dictionary.placeholders.displayName}
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.fields.avatarUrl}
            </span>
            <Input
              value={form.avatarUrl}
              aria-invalid={invalidFields.avatarUrl}
              className={invalidFields.avatarUrl ? "border-red-400/70 focus:border-red-400" : undefined}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  avatarUrl: event.target.value
                }))
              }
              placeholder={dictionary.placeholders.avatarUrl}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.fields.bio}
            </span>
            <Textarea
              value={form.bio}
              aria-invalid={invalidFields.bio}
              className={invalidFields.bio ? "border-red-400/70 focus:border-red-400" : undefined}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  bio: event.target.value
                }))
              }
              placeholder={dictionary.placeholders.bio}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {dictionary.fields.paymentMessage}
            </span>
            <Textarea
              value={form.paymentMessage}
              aria-invalid={invalidFields.paymentMessage}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  paymentMessage: event.target.value
                }))
              }
              placeholder={dictionary.placeholders.paymentMessage}
            />
          </label>

          <TokenPicker
            label={dictionary.fields.preferredToken}
            selectedAddress={form.preferredToken}
            options={tokens}
            className={invalidFields.preferredToken ? "rounded-2xl ring-1 ring-red-400/70" : undefined}
            onChange={(address) =>
              setForm((current) => ({
                ...current,
                preferredToken: address as Hex
              }))
            }
          />

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
            <FeedbackMessage
              tone={
                status === dictionary.messages.profilePublished
                  ? "success"
                  : status && !isSubmitting
                    ? "error"
                    : "muted"
              }
            >
              {footerMessage}
            </FeedbackMessage>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? dictionary.messages.waitingConfirmation
                : profile
                  ? dictionary.actions.updateProfile
                  : dictionary.actions.saveProfile}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
