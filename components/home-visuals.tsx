import Link from "next/link";
import {
  BadgeCheck,
  Coins,
  Link2,
  ReceiptText,
  Send,
  ShieldCheck,
  UserRound
} from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "../lib/i18n";
import { Card, CardContent } from "./ui/card";
import { AccentBadge, IconFrame } from "./ui/patterns";

export { AccentBadge } from "./ui/patterns";

const primaryLinkClass =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 text-base font-medium text-zinc-950 shadow-[0_12px_28px_rgba(57,217,138,0.12)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[var(--motion-ease)] hover:-translate-y-0.5 hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)] sm:w-auto";

const proofIcons = [ShieldCheck, Link2, ReceiptText, Coins];
const stepIcons = [UserRound, Send, BadgeCheck];

export function PrimaryProfileLink({ children }: { children: ReactNode }) {
  return (
    <Link href="/my" className={primaryLinkClass}>
      <UserRound aria-hidden="true" className="h-4 w-4" />
      {children}
    </Link>
  );
}

export function HeroChips({ chips }: { chips: string[] }) {
  return (
    <div className="grid max-w-full grid-cols-1 gap-2.5 sm:flex sm:flex-wrap">
      {chips.map((chip) => (
        <span
          key={chip}
          className="w-fit max-w-full rounded-lg border border-white/10 bg-white/[0.055] px-3.5 py-2 text-sm text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

export function HomeSectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <AccentBadge>{eyebrow}</AccentBadge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-8 text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

export function ProofCard({
  index,
  label
}: {
  index: number;
  label: string;
}) {
  const Icon = proofIcons[index % proofIcons.length];

  return (
    <Card className="h-full compact-card" variant="elevated">
      <CardContent className="flex h-full flex-col px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-4">
          <IconFrame tone="accent">
            <Icon aria-hidden="true" />
          </IconFrame>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-5 text-base leading-7 text-zinc-100">{label}</p>
      </CardContent>
    </Card>
  );
}

export function StepCard({
  index,
  title,
  description
}: {
  index: number;
  title: string;
  description: string;
}) {
  const Icon = stepIcons[index % stepIcons.length];

  return (
    <Card className="h-full compact-card" variant="elevated">
      <CardContent className="h-full space-y-5 px-6 pb-6 pt-6">
        <IconFrame tone="accent">
          <Icon aria-hidden="true" />
        </IconFrame>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="text-sm leading-7 text-zinc-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function HomeProofSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <HomeSectionIntro
        eyebrow={dictionary.home.proofEyebrow}
        title={dictionary.home.proofTitle}
        description={dictionary.home.proofDescription}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dictionary.home.proofChips.map((chip, index) => (
          <ProofCard key={chip} index={index} label={chip} />
        ))}
      </div>
    </>
  );
}

export function HomeStepsSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <HomeSectionIntro
        eyebrow={dictionary.home.stepsEyebrow}
        title={dictionary.home.stepsTitle}
        description={dictionary.home.stepsDescription}
      />
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
    </>
  );
}

export function TrustGrid({ statements }: { statements: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {statements.map((statement) => (
        <div
          key={statement}
          className="rounded-lg border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-200"
        >
          {statement}
        </div>
      ))}
    </div>
  );
}
