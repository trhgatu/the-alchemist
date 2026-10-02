// src/hooks/useAppStore.ts
import { create } from "zustand";
import { ScenePhase } from "@/constants/ScenePhase";

export type Language = "vi" | "en";

/** "ink": dark text for light backgrounds (washi paper), "light": light text for dark backgrounds */
export type NavTone = "ink" | "light";

interface AppState {
  scenePhase: ScenePhase;
  setScenePhase: (phase: ScenePhase) => void;

  emptySlotRef: HTMLDivElement | null;
  setEmptySlotRef: (ref: HTMLDivElement | null) => void;

  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;

  lang: Language;
  setLang: (lang: Language) => void;

  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
  transitionHref: string | null;
  setTransitionHref: (href: string | null) => void;

  navTone: NavTone;
  setNavTone: (tone: NavTone) => void;
}

const getStoredLang = (): Language => {
  return "en";
};

export const useAppStore = create<AppState>((set) => ({
  scenePhase: ScenePhase.LOADING,
  setScenePhase: (phase: ScenePhase) => set({ scenePhase: phase }),
  emptySlotRef: null,
  setEmptySlotRef: (ref: HTMLDivElement | null) => set({ emptySlotRef: ref }),
  loadingProgress: 0,
  setLoadingProgress: (progress: number) => set({ loadingProgress: progress }),
  lang: getStoredLang(),
  setLang: (lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    set({ lang });
  },
  isTransitioning: false,
  setIsTransitioning: (v) => set({ isTransitioning: v }),
  transitionHref: null,
  setTransitionHref: (href) => set({ transitionHref: href }),
  navTone: "light",
  setNavTone: (tone) => set({ navTone: tone }),
}));
