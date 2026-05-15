import clsx from "clsx";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "min-h-[120px] w-full rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,24,0.94),rgba(11,12,14,0.96))] px-4 py-3 text-base text-white outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-zinc-500 hover:border-white/20 focus:border-[color:var(--accent-line)] focus:bg-zinc-950/95 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus-visible:ring-red-400/30",
        className
      )}
      {...props}
    />
  );
});
