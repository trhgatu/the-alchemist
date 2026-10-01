import { useEffect, useState } from "react";
import { useAppStore, Language } from "./useAppStore";

export const useLang = (): Language => {
  const storeLang = useAppStore((state) => state.lang);
  const setLang = useAppStore((state) => state.setLang);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("lang");
    if (stored === "vi" || stored === "en") {
      if (stored !== storeLang) {
        setLang(stored as Language);
      }
    }
  }, [setLang, storeLang]);

  useEffect(() => {
    document.documentElement.lang = storeLang;
  }, [storeLang]);

  if (!isMounted) return "en";
  return storeLang;
};
