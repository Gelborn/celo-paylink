"use client";

import clsx from "clsx";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Hex } from "viem";
import {
  fetchProfileByHandleIfExists,
  fetchRecentProfiles,
  type ProfileRecord
} from "../lib/contract";
import { sanitizeHandleInput } from "../lib/format";
import { getTokenByAddress } from "../lib/tokens";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FeedbackMessage } from "./ui/feedback-message";
import { Input } from "./ui/input";
import { useLocale } from "./locale-provider";

type LoadState = "idle" | "loading" | "ready" | "error";
type SearchState = "idle" | "loading" | "found" | "not-found" | "error";

type ProfileDiscoveryProps = {
  chainId: number;
  contractAddress?: Hex | null;
  currentOwner?: Hex | null;
  limit?: number;
  variant: "carousel" | "dashboard";
};

function getDisplayNameKey(profile: ProfileRecord) {
  return profile.displayName.trim().toLowerCase();
}

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
        "group flex h-full flex-col rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(11,11,14,0.92))] p-5 transition hover:border-[color:var(--accent-line)] hover:bg-zinc-900/90",
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
            <span className="max-w-[12rem] truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              @{profile.handle}
            </span>
            {token ? (
              <span className="rounded-full border border-white/10 bg-zinc-950 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
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
  currentOwner,
  limit = 24,
  variant
}: ProfileDiscoveryProps) {
  const { dictionary } = useLocale();
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [searchResult, setSearchResult] = useState<ProfileRecord | null>(null);

  const visibleProfiles = useMemo(() => {
    const ownerKey = currentOwner?.toLowerCase();
    if (!ownerKey) return profiles;

    return profiles.filter((profile) => profile.owner.toLowerCase() !== ownerKey);
  }, [currentOwner, profiles]);

  const displayedProfiles = useMemo(() => {
    if (!searchResult) return visibleProfiles;

    const searchOwnerKey = searchResult.owner.toLowerCase();
    const searchNameKey = getDisplayNameKey(searchResult);

    return visibleProfiles.filter((profile) => {
      if (profile.owner.toLowerCase() === searchOwnerKey) return false;
      return !searchNameKey || getDisplayNameKey(profile) !== searchNameKey;
    });
  }, [searchResult, visibleProfiles]);

  useEffect(() => {
    if (!contractAddress) {
      setProfiles([]);
      setLoadState("idle");
      return;
    }

    let cancelled = false;

    async function loadProfiles() {
      setLoadState("loading");

      try {
        const nextProfiles = await fetchRecentProfiles(
          chainId,
          contractAddress,
          limit
        );

        if (!cancelled) {
          setProfiles(nextProfiles);
          setLoadState("ready");
        }
      } catch (error) {
        console.error("Failed to load discovered profiles", error);

        if (!cancelled) {
          setProfiles([]);
          setLoadState("error");
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [chainId, contractAddress, limit]);

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
    if (!contractAddress || loadState !== "ready" || visibleProfiles.length === 0) {
      return null;
    }

    const carouselProfiles = [...visibleProfiles, ...visibleProfiles];

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
      <div className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(11,11,14,0.92))] px-5 py-5 sm:px-6 sm:py-6">
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

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            {dictionary.profileDiscovery.latestTitle}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400">
            {dictionary.profileDiscovery.latestDescription}
          </p>
        </div>

        {loadState === "loading" ? (
          <div className="space-y-3" aria-busy="true">
            <p className="text-sm leading-7 text-zinc-400">
              {dictionary.profileDiscovery.loading}
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/10 bg-zinc-900 px-5 py-5"
                >
                  <div className="flex gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-full bg-white/10" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
                      <div className="h-5 w-36 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>
                  <div className="mt-5 h-16 animate-pulse rounded-lg bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ) : loadState === "error" ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-zinc-900 px-4 py-5 text-sm leading-7 text-zinc-400">
            {dictionary.profileDiscovery.error}
          </div>
        ) : displayedProfiles.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-zinc-900 px-4 py-5 text-sm leading-7 text-zinc-400">
            {contractAddress
              ? dictionary.profileDiscovery.empty
              : dictionary.profileDiscovery.unavailable}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {displayedProfiles.map((profile) => (
              <ProfileLinkCard
                key={profile.owner}
                profile={profile}
                chainId={chainId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
