import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(23,23,26,0.92),rgba(14,15,17,0.96))] px-4 text-base text-white outline-none transition placeholder:text-zinc-500 hover:border-white/15 focus:border-[color:var(--accent-line)] focus:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]",
          className
        )}
        {...props}
      />
    );
  }
);
