import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:bg-zinc-950",
          className
        )}
        {...props}
      />
    );
  }
);
