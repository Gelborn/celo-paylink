"use client";

export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(text);
}

export async function shareOrCopyUrl(url: string): Promise<"shared" | "copied"> {
  if (navigator.share) {
    await navigator.share({ url });
    return "shared";
  }

  await copyTextToClipboard(url);
  return "copied";
}
