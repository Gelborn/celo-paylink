"use client";

import clsx from "clsx";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import type { Hex } from "viem";
import {
  fetchProfileByHandleIfExists,
  type ProfileRecord
} from "../lib/contract";
import { featuredProfiles } from "../lib/featured-profiles";
import { sanitizeHandleInput } from "../lib/format";
import { getTokenByAddress } from "../lib/tokens";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FeedbackMessage } from "./ui/feedback-message";
import { Input } from "./ui/input";
import { useLocale } from "./locale-provider";

type SearchState = "idle" | "loading" | "found" | "not-found" | "error";

type ProfileDiscoveryProps = {
  chainId: number;
  contractAddress?: Hex | null;
  variant: "carousel" | "dashboard";
};

function ProfileLinkCard({
  profile,
  chainId,
  variant = "grid"
}: {
  profile: ProfileRecord;
  chainId: number;
  variant?: "carousel" | "grid" | "result";
}) {
  const { dictionary } = useLocale();
  const token = getTokenByAddress(profile.preferredToken, chainId);

  return (
    <Link
      href={`/u/${profile.handle}`}
      className={clsx(
        "compact-card group flex h-full flex-col p-5 transition hover:border-[color:var(--accent-line)] hover:bg-zinc-950/70",
        variant === "carousel" && "w-[19rem] shrink-0",
        variant === "result" && "border-[color:var(--accent-line)]"
      )}
    >
      <div className="flex min-w-0 items-start gap-4">
        <Avatar
          name={profile.displayName || profile.handle}
          imageUrl={profile.avatarUrl}
          size="md"
        />
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="max-w-[12rem] truncate rounded-md border border-white/10 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-300">
              @{profile.handle}
            </span>
            {token ? (
              <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
                {token.symbol}
              </span>
            ) : null}
          </div>
          <h3 className="truncate text-base font-semibold text-white">
            {profile.displayName || `@${profile.handle}`}
          </h3>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-zinc-400">
        {profile.bio || profile.paymentMessage || dictionary.productTagline}
      </p>

      <span className="mt-5 inline-flex text-sm font-medium text-[color:var(--accent)] transition group-hover:text-[color:var(--accent-strong)]">
        {dictionary.profileDiscovery.openProfile}
      </span>
    </Link>
  );
}

export function ProfileDiscovery({
  chainId,
  contractAddress,
  variant
}: ProfileDiscoveryProps) {
  const { dictionary } = useLocale();
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [searchResult, setSearchResult] = useState<ProfileRecord | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const handle = sanitizeHandleInput(query);
    setQuery(handle);
    setSearchResult(null);

    if (!contractAddress || handle.length < 3) {
      setSearchState("not-found");
      return;
    }

    setSearchState("loading");

    try {
      const profile = await fetchProfileByHandleIfExists(
        handle,
        chainId,
        contractAddress
      );

      setSearchResult(profile);
      setSearchState(profile ? "found" : "not-found");
    } catch (error) {
      console.error("Failed to search profile", error);
      setSearchState("error");
    }
  }

  if (variant === "carousel") {
    const carouselProfiles = [...featuredProfiles, ...featuredProfiles];

    return (
      <section className="landing-section space-y-6">
        <div className="max-w-3xl space-y-3">
          <Badge className="border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
            {dictionary.profileDiscovery.eyebrow}
          </Badge>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {dictionary.profileDiscovery.title}
            </h2>
            <p className="text-base leading-8 text-zinc-400">
              {dictionary.profileDiscovery.description}
            </p>
          </div>
        </div>

        <div className="profile-carousel">
          <div className="profile-carousel-track">
            {carouselProfiles.map((profile, index) => (
              <ProfileLinkCard
                key={`${profile.owner}-${index}`}
                profile={profile}
                chainId={chainId}
                variant="carousel"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="compact-card px-5 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_minmax(18rem,0.72fr)] lg:items-end">
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              {dictionary.profileDiscovery.searchTab}
            </p>
            <h3 className="text-xl font-semibold text-white">
              {dictionary.profileDiscovery.searchTitle}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              {dictionary.profileDiscovery.searchDescription}
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(sanitizeHandleInput(event.target.value));
                  setSearchState("idle");
                  setSearchResult(null);
                }}
                placeholder={dictionary.profileDiscovery.searchPlaceholder}
                disabled={!contractAddress}
                aria-label={dictionary.fields.handle}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto sm:min-w-[8rem]"
                disabled={!contractAddress || searchState === "loading"}
              >
                {searchState === "loading"
                  ? dictionary.profileDiscovery.loading
                  : dictionary.profileDiscovery.searchTab}
              </Button>
            </div>
            <p className="text-xs leading-5 text-zinc-500">
              {dictionary.profileDiscovery.exactHint}
            </p>
          </form>
        </div>

        <FeedbackMessage
          tone={searchState === "error" ? "error" : "muted"}
          className="mt-4"
        >
          {!contractAddress
            ? dictionary.profileDiscovery.unavailable
            : searchState === "not-found"
              ? dictionary.profileDiscovery.notFound
              : searchState === "error"
                ? dictionary.profileDiscovery.error
                : null}
        </FeedbackMessage>
      </div>

      {searchResult ? (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">
            {dictionary.profileDiscovery.searchTitle}
          </h3>
          <ProfileLinkCard
            profile={searchResult}
            chainId={chainId}
            variant="result"
          />
        </div>
      ) : null}
    </div>
  );
}
