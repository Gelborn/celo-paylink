import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
        <input
          ref={ref}
          className={clsx(
          "h-12 w-full rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.92),rgba(15,15,18,0.94))] px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]",
          className
        )}
        {...props}
      />
    );
  }
);
