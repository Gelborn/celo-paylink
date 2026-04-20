"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  LOCALE_COOKIE_NAME,
  getDictionary,
  type Dictionary,
  type Locale
} from "../lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      dictionary: getDictionary(locale),
      setLocale(nextLocale) {
        setLocaleState(nextLocale);
        document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(
          nextLocale
        )}; path=/; max-age=31536000; samesite=lax`;
      }
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider.");
  }

  return context;
}
