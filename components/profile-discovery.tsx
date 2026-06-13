"use client";

import clsx from "clsx";
import Link from "next/link";
import { type FormEvent, useId, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Hex } from "viem";
import {
  fetchProfileByHandleIfExists,
  type ProfileRecord
} from "../lib/contract";
import { featuredProfiles } from "../lib/featured-profiles";
import { sanitizeHandleInput } from "../lib/format";
import { fadeUp, panelSwap } from "../lib/motion";
import { getTokenByAddress } from "../lib/tokens";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FeedbackMessage } from "./ui/feedback-message";
import { Input } from "./ui/input";
import { useLocale } from "./locale-provider";

type SearchState = "idle" | "loading" | "found" | "too-short" | "not-found" | "error";

type ProfileDiscoveryProps = {
  chainId: number;
  contractAddress?: Hex | null;
  variant: "carousel" | "dashboard";
};

function ProfileLinkCard({
  profile,
  chainId,
  variant = "grid",
  isDuplicate = false
}: {
  profile: ProfileRecord;
  chainId: number;
  variant?: "carousel" | "grid" | "result";
  isDuplicate?: boolean;
}) {
  const { dictionary } = useLocale();
  const token = getTokenByAddress(profile.preferredToken, chainId);
  const profileLabel = profile.displayName
    ? `${profile.displayName} (@${profile.handle})`
    : `@${profile.handle}`;

  return (
    <Link
      href={`/u/${profile.handle}`}
      aria-hidden={isDuplicate ? "true" : undefined}
      aria-label={`${dictionary.profileDiscovery.openProfile}: ${profileLabel}`}
      tabIndex={isDuplicate ? -1 : undefined}
      className={clsx(
        "compact-card group flex h-full min-w-0 flex-col p-5 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:bg-zinc-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]",
        variant === "carousel" && "w-[min(19rem,calc(100vw-2rem))] shrink-0",
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
            <span
              className="max-w-[12rem] truncate rounded-md border border-white/10 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-300"
              title={`@${profile.handle}`}
            >
              @{profile.handle}
            </span>
            {token ? (
              <span
                aria-label={`${dictionary.labels.preferredToken}: ${token.name}`}
                className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                title={token.name}
              >
                {token.symbol}
              </span>
            ) : null}
          </div>
          <h3
            className="truncate text-base font-semibold text-white"
            title={profile.displayName || `@${profile.handle}`}
          >
            {profile.displayName || `@${profile.handle}`}
          </h3>
        </div>
      </div>

      <p
        className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-zinc-400"
        title={profile.bio || profile.paymentMessage || dictionary.productTagline}
      >
        {profile.bio || profile.paymentMessage || dictionary.productTagline}
      </p>

      <span className="mt-5 inline-flex text-sm font-medium text-[color:var(--accent)] transition group-hover:text-[color:var(--accent-strong)]">
        {dictionary.profileDiscovery.openProfile}
        <ArrowUpRight aria-hidden="true" className="ml-1.5 h-4 w-4" />
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
  const searchHintId = useId();
  const searchResultTitleId = useId();
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [searchResult, setSearchResult] = useState<ProfileRecord | null>(null);
  const searchButtonAction =
    searchState === "loading"
      ? dictionary.profileDiscovery.loading
      : dictionary.profileDiscovery.searchTab;
  const searchButtonLabel = query
    ? `${searchButtonAction}: @${query}`
    : `${searchButtonAction}: ${dictionary.fields.handle}`;

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const handle = sanitizeHandleInput(query);
    setQuery(handle);
    setSearchResult(null);

    if (!contractAddress) {
      setSearchState("not-found");
      return;
    }

    if (handle.length < 3) {
      setSearchState("too-short");
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
      <section className="landing-section space-y-6" aria-label={dictionary.profileDiscovery.title}>
        <div className="max-w-3xl space-y-3">
          <Badge variant="accent">
            {dictionary.profileDiscovery.eyebrow}
          </Badge>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
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
                isDuplicate={index >= featuredProfiles.length}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="compact-card px-5 py-5 sm:px-6 sm:py-6"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
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

          <form
            onSubmit={handleSearch}
            className="space-y-3"
            role="search"
            aria-label={dictionary.profileDiscovery.searchTitle}
            aria-busy={searchState === "loading"}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(sanitizeHandleInput(event.target.value));
                  setSearchState("idle");
                  setSearchResult(null);
                }}
                placeholder={dictionary.profileDiscovery.searchPlaceholder}
                disabled={!contractAddress}
                aria-label={`${dictionary.profileDiscovery.searchTitle}: ${dictionary.fields.handle}`}
                aria-describedby={searchHintId}
                aria-invalid={searchState === "too-short" ? "true" : undefined}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                enterKeyHint="search"
                spellCheck={false}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto sm:min-w-[8rem]"
                leftIcon={<Search aria-hidden="true" />}
                disabled={!contractAddress || searchState === "loading"}
                aria-label={searchButtonLabel}
              >
                {searchState === "loading"
                  ? dictionary.profileDiscovery.loading
                  : dictionary.profileDiscovery.searchTab}
              </Button>
            </div>
            <p id={searchHintId} className="text-xs leading-5 text-zinc-500">
              {dictionary.profileDiscovery.exactHint}
            </p>
          </form>
        </div>

        <FeedbackMessage
          tone={searchState === "error" || searchState === "too-short" ? "error" : "muted"}
          className="mt-4"
        >
          {!contractAddress
            ? dictionary.profileDiscovery.unavailable
            : searchState === "too-short"
              ? dictionary.profileDiscovery.tooShort
            : searchState === "not-found"
              ? dictionary.profileDiscovery.notFound
              : searchState === "error"
                ? dictionary.profileDiscovery.error
                : null}
        </FeedbackMessage>
      </motion.div>

      <AnimatePresence initial={false}>
        {searchResult ? (
          <motion.div
            className="space-y-3"
            role="region"
            aria-labelledby={searchResultTitleId}
            aria-live="polite"
            aria-atomic="true"
            variants={panelSwap}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <h3 id={searchResultTitleId} className="text-base font-semibold text-white">
              {dictionary.profileDiscovery.resultTitle}
            </h3>
            <ProfileLinkCard
              profile={searchResult}
              chainId={chainId}
              variant="result"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
