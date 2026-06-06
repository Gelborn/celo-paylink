import * as motion from "motion/react-client";
import type { Hex } from "viem";
import type { Dictionary } from "../lib/i18n";
import { fadeUp, staggerChildren } from "../lib/motion";
import { Card, CardContent } from "./ui/card";
import { HomeDemo } from "./home-demo";
import {
  AccentBadge,
  HeroChips,
  HomeProofSection,
  HomeStepsSection,
  PrimaryProfileLink,
  TrustGrid
} from "./home-visuals";
import { HomeWalletIsland } from "./home-wallet-island";
import { ProfileCarousel } from "./profile-carousel";
import { StaticHeader } from "./static-header";

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
    <motion.main
      className="space-y-10 pb-14 md:space-y-12 md:pb-20"
      variants={staggerChildren}
      initial="hidden"
      animate="show"
    >
      <StaticHeader
        homeAriaLabel={`${dictionary.productName}: ${dictionary.nav.home}`}
        actions={
          <div
            id="home-wallet-slot"
            className="flex min-h-9 min-w-9 justify-end sm:min-w-[5.5rem]"
            aria-live="polite"
            aria-atomic="true"
          />
        }
      />
      <HomeWalletIsland
        initialChainId={initialChainId}
        contractAddresses={contractAddresses}
      />

      <motion.section className="landing-section" variants={fadeUp}>
        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.78fr)] lg:items-center lg:gap-10">
          <div className="min-w-0 space-y-6 lg:pt-8">
            <div className="space-y-4">
              <AccentBadge>{dictionary.home.eyebrow}</AccentBadge>
              <div className="space-y-4">
                <h1 className="max-w-[21.5rem] text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-white sm:max-w-3xl sm:text-5xl md:text-6xl md:leading-[1.02]">
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

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <PrimaryProfileLink>{dictionary.actions.createProfile}</PrimaryProfileLink>
            </div>

            <HeroChips chips={dictionary.home.heroChips} />

            <p className="max-w-xl text-sm leading-7 text-zinc-500">
              {dictionary.home.connectHint}
            </p>
          </div>

          <div className="min-w-0 overflow-hidden pt-1 lg:pl-2 lg:pt-3">
            <HomeDemo caption={dictionary.home.demoCaption} />
          </div>
        </div>
      </motion.section>

      <ProfileCarousel chainId={initialChainId} dictionary={dictionary} />

      <motion.section
        className="landing-section perf-defer-section space-y-6"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <HomeProofSection dictionary={dictionary} />
      </motion.section>

      <motion.section
        className="landing-section perf-defer-section space-y-6"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <HomeStepsSection dictionary={dictionary} />
      </motion.section>

      <motion.section
        className="landing-section perf-defer-section"
        aria-label={dictionary.home.closingTitle}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
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
                <PrimaryProfileLink>{dictionary.actions.createProfile}</PrimaryProfileLink>
              </div>
            </div>

            <TrustGrid statements={dictionary.home.trustStatements} />
          </CardContent>
        </Card>
      </motion.section>
    </motion.main>
  );
}
