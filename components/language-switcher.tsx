"use client";

import { useRouter } from "next/navigation";
import { getDictionary, locales } from "../lib/i18n";
import { useLocale } from "./locale-provider";
import { HeadlessSelect } from "./ui/headless-select";

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, dictionary, setLocale } = useLocale();

  return (
    <HeadlessSelect
      label={dictionary.labels.language}
      value={locale}
      onChange={(option) => {
        setLocale(option as (typeof locales)[number]);
        router.refresh();
      }}
      options={locales.map((option) => ({
        value: option,
        label: getDictionary(option).languageName,
        description: option
      }))}
    />
  );
}
