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
        "min-h-[120px] w-full rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.92),rgba(15,15,18,0.94))] px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)]",
        className
      )}
      {...props}
    />
  );
});
