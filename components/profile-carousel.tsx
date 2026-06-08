import clsx from "clsx";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as motion from "motion/react-client";
import type { ProfileRecord } from "../lib/contract";
import { featuredProfiles } from "../lib/featured-profiles";
import type { Dictionary } from "../lib/i18n";
import { fadeUp } from "../lib/motion";
import { getTokenByAddress } from "../lib/tokens";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";

function ProfileLinkCard({
  profile,
  chainId,
  dictionary,
  isDuplicate = false
}: {
  profile: ProfileRecord;
  chainId: number;
  dictionary: Dictionary;
  isDuplicate?: boolean;
}) {
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
        "compact-card group flex h-full w-[min(19rem,calc(100vw-2rem))] shrink-0 flex-col p-5 transition-[background-color,border-color,transform] duration-200 ease-[var(--motion-ease)] hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:bg-zinc-950/70"
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

export function ProfileCarousel({
  chainId,
  dictionary
}: {
  chainId: number;
  dictionary: Dictionary;
}) {
  const carouselProfiles = [...featuredProfiles, ...featuredProfiles];

  return (
    <motion.section
      className="landing-section perf-defer-section space-y-5 md:space-y-6"
      aria-label={dictionary.profileDiscovery.title}
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">
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
              dictionary={dictionary}
              isDuplicate={index >= featuredProfiles.length}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
