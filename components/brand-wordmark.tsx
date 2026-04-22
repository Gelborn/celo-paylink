import clsx from "clsx";
import Link from "next/link";
import { useId } from "react";

function BrandGlyph({
  className
}: {
  className?: string;
}) {
  const gradientId = useId();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 44"
      className={clsx("h-9 w-9 shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(22 22) rotate(35)">
        <rect
          x="-9"
          y="-15"
          width="13"
          height="30"
          rx="6.5"
          stroke={`url(#${gradientId})`}
          strokeWidth="4.5"
        />
        <rect
          x="2.5"
          y="-15"
          width="13"
          height="30"
          rx="6.5"
          stroke="#F4F4F5"
          strokeOpacity="0.94"
          strokeWidth="4.5"
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="13"
          y1="7"
          x2="13"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#58E7A5" />
          <stop offset="1" stopColor="#1FBF75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BrandWordmark({
  href = "/",
  className
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx("inline-flex items-center gap-2", className)}
    >
      <BrandGlyph className="h-5 w-5 md:h-6 md:w-6" />
      <span className="text-[1.15rem] font-semibold tracking-[-0.05em] text-white md:text-[1.3rem]">
        PayLink
      </span>
    </Link>
  );
}
