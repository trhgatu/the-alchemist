"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ScrollControllerContextType {
  isControlled: boolean;
  triggerElement: HTMLElement | null;
  registerTimeline?: (name: string, timeline: gsap.core.Timeline) => void;
  scrollProgress?: React.MutableRefObject<number>;
}

const ScrollControllerContext = createContext<ScrollControllerContextType>({
  isControlled: false,
  triggerElement: null,
});

/**
 * Accesses the current scroll controller context value.
 *
 * @returns The current ScrollControllerContext value containing:
 * - `isControlled`: whether scrolling is controlled,
 * - `triggerElement`: the HTMLElement used as the scroll trigger or `null`,
 * - `registerTimeline?`: optional function to register a timeline by name,
 * - `scrollProgress?`: optional `MutableRefObject<number>` tracking progress
 */
export function useScrollController() {
  return useContext(ScrollControllerContext);
}

interface ScrollControllerProviderProps {
  children: ReactNode;
  controlled?: boolean;
  triggerElement?: HTMLElement | null;
  onTimelineRegister?: (name: string, timeline: gsap.core.Timeline) => void;
  scrollProgress?: React.MutableRefObject<number>;
}

/**
 * Supplies scroll controller state and callbacks to descendant components via context.
 *
 * @param children - React nodes that will receive the context value
 * @param controlled - When true, marks the scroll controller as controlled by an external owner
 * @param triggerElement - The HTMLElement used as the scroll trigger, or `null` when none
 * @param onTimelineRegister - Optional callback to register a named GSAP timeline
 * @param scrollProgress - Optional mutable ref to track scroll progress (0 to 1)
 * @returns The provider element that injects the scroll controller context into its children
 */
export function ScrollControllerProvider({
  children,
  controlled = false,
  triggerElement = null,
  onTimelineRegister,
  scrollProgress,
}: ScrollControllerProviderProps) {
  return (
    <ScrollControllerContext.Provider
      value={{
        isControlled: controlled,
        triggerElement,
        registerTimeline: onTimelineRegister,
        scrollProgress,
      }}
    >
      {children}
    </ScrollControllerContext.Provider>
  );
}