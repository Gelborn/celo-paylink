"use client";

import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, motionTransitions } from "../lib/motion";

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user" transition={motionTransitions.base}>
      <motion.div
        key={pathname}
        className="app-frame"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
