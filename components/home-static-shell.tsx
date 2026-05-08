import Link from "next/link";
import type { Hex } from "viem";
import type { ReactNode } from "react";
import type { Dictionary } from "../lib/i18n";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { HomeDemo } from "./home-demo";
import { HomeWalletIsland } from "./home-wallet-island";
import { ProfileCarousel } from "./profile-carousel";
import { StaticHeader } from "./static-header";

const primaryButtonClass =
  "inline-flex h-12 w-full items-center justify-center rounded-lg border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 text-base font-medium text-zinc-950 shadow-[0_18px_42px_rgba(54,214,126,0.18)] transition hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] sm:w-auto";

function AccentBadge({
  children
}: {
  children: ReactNode;
}) {
  return (
    <Badge className="border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
      {children}
    </Badge>
  );
}

function ProofCard({
  index,
  label
}: {
  index: number;
  label: string;
}) {
  return (
    <Card className="h-full border-white/10 compact-card">
      <CardContent className="flex h-full flex-col px-5 pb-5 pt-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-5 text-base leading-7 text-zinc-100">{label}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  index,
  title,
  description
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full border-white/10 compact-card">
      <CardContent className="h-full space-y-5 px-6 pb-6 pt-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="text-sm leading-7 text-zinc-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function HomeStaticShell({
  dictionary,
  initialChainId,
  contractAddresses
}: {
  dictionary: Dictionary;
  initialChainId: number;
  contractAddresses: {
    celo: Hex | null;
    celoSepolia: Hex | null;
  };
}) {
  return (
    <main className="space-y-12 pb-14 md:space-y-14 md:pb-20">
      <StaticHeader
        actions={
          <div
            id="home-wallet-slot"
            className="flex min-h-9 min-w-[5.5rem] justify-end"
            aria-live="polite"
          />
        }
      />
      <HomeWalletIsland
        initialChainId={initialChainId}
        contractAddresses={contractAddresses}
      />

      <section className="landing-section">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-start">
          <div className="min-w-0 space-y-7 lg:pt-20">
            <div className="space-y-5">
              <AccentBadge>{dictionary.home.eyebrow}</AccentBadge>
              <div className="space-y-4">
                <h1 className="max-w-[21rem] text-[2.2rem] font-semibold leading-[1.08] tracking-tight text-white sm:max-w-3xl sm:text-5xl md:text-6xl md:leading-[1.02]">
                  {dictionary.home.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg md:text-xl md:leading-8">
                  {dictionary.home.description}
                </p>
                <p className="max-w-xl text-sm leading-7 text-zinc-500">
                  {dictionary.home.heroSupport}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/my" className={primaryButtonClass}>
                {dictionary.actions.createProfile}
              </Link>
            </div>

            <div className="grid max-w-full grid-cols-1 gap-2.5 sm:flex sm:flex-wrap">
              {dictionary.home.heroChips.map((chip) => (
                <span
                  key={chip}
                  className="w-fit max-w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-zinc-200"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="max-w-xl text-sm leading-7 text-zinc-500">
              {dictionary.home.connectHint}
            </p>
          </div>

          <div className="min-w-0 overflow-hidden pt-2 lg:pl-3">
            <HomeDemo caption={dictionary.home.demoCaption} />
          </div>
        </div>
      </section>

      <ProfileCarousel chainId={initialChainId} dictionary={dictionary} />

      <section className="landing-section perf-defer-section space-y-6">
        <div className="max-w-3xl space-y-3">
          <AccentBadge>{dictionary.home.proofEyebrow}</AccentBadge>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {dictionary.home.proofTitle}
            </h2>
            <p className="text-base leading-8 text-zinc-400">
              {dictionary.home.proofDescription}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dictionary.home.proofChips.map((chip, index) => (
            <ProofCard key={chip} index={index} label={chip} />
          ))}
        </div>
      </section>

      <section className="landing-section perf-defer-section space-y-6">
        <div className="max-w-3xl space-y-3">
          <AccentBadge>{dictionary.home.stepsEyebrow}</AccentBadge>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {dictionary.home.stepsTitle}
            </h2>
            <p className="text-base leading-8 text-zinc-400">
              {dictionary.home.stepsDescription}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {dictionary.home.steps.map((step, index) => (
            <StepCard
              key={step.title}
              index={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </section>

      <section className="landing-section perf-defer-section">
        <Card className="landing-cta-surface overflow-hidden border-[color:var(--accent-line)] shadow-[var(--accent-shadow),0_22px_64px_rgba(0,0,0,0.28)]">
          <CardContent className="space-y-8 px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-4">
                <AccentBadge>{dictionary.home.closingEyebrow}</AccentBadge>
                <div className="space-y-3">
                  <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    {dictionary.home.closingTitle}
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-zinc-300">
                    {dictionary.home.closingDescription}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/my" className={primaryButtonClass}>
                  {dictionary.actions.createProfile}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {dictionary.home.trustStatements.map((statement) => (
                <div
                  key={statement}
                  className="rounded-lg border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-200"
                >
                  {statement}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
