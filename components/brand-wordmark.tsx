import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

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
      className={clsx(
        "inline-flex items-center",
        className
      )}
    >
      <Image
        src="/logo.svg"
        alt="MiniPay PayLink"
        width={512}
        height={128}
        priority
        className="h-auto w-[180px] md:w-[220px]"
      />
    </Link>
  );
}
