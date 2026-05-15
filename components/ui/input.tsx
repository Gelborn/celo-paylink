import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,24,0.94),rgba(11,12,14,0.96))] px-4 text-base text-white outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-zinc-500 hover:border-white/20 focus:border-[color:var(--accent-line)] focus:bg-zinc-950/95 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus-visible:ring-red-400/30",
          className
        )}
        {...props}
      />
    );
  }
);
