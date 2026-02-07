"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type gsap from "gsap";

interface ScrollControllerContextType {
  isControlled: boolean;
  triggerElement: HTMLElement | null;
  registerTimeline?: (name: string, timeline: gsap.core.Timeline) => void;
  unregisterTimeline?: (name: string) => void;
  scrollProgress?: React.MutableRefObject<number>;
}

const ScrollControllerContext = createContext<ScrollControllerContextType>({
  isControlled: false,
  triggerElement: null,
});

export function useScrollController() {
  return useContext(ScrollControllerContext);
}

interface ScrollControllerProviderProps {
  children: ReactNode;
  controlled?: boolean;
  triggerElement?: HTMLElement | null;
  onTimelineRegister?: (name: string, timeline: gsap.core.Timeline) => void;
  onTimelineUnregister?: (name: string) => void;
  scrollProgress?: React.MutableRefObject<number>;
}

export function ScrollControllerProvider({
  children,
  controlled = false,
  triggerElement = null,
  onTimelineRegister,
  onTimelineUnregister,
  scrollProgress,
}: ScrollControllerProviderProps) {
  return (
    <ScrollControllerContext.Provider
      value={{
        isControlled: controlled,
        triggerElement,
        registerTimeline: onTimelineRegister,
        unregisterTimeline: onTimelineUnregister,
        scrollProgress,
      }}
    >
      {children}
    </ScrollControllerContext.Provider>
  );
}
