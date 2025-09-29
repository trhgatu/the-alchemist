// src/hooks/useAppStore.ts
import { create } from "zustand";
import { ScenePhase } from "@/constants/ScenePhase";

interface AppState {
  scenePhase: ScenePhase;
  setScenePhase: (phase: ScenePhase) => void;

  emptySlotRef: HTMLDivElement | null;
  setEmptySlotRef: (ref: HTMLDivElement | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scenePhase: ScenePhase.LOADING,
  setScenePhase: (phase) => {
    console.log("🔁 Switching to:", phase);
    set({ scenePhase: phase });
  },
  emptySlotRef: null,
  setEmptySlotRef: (ref) => set({ emptySlotRef: ref }),
}));
