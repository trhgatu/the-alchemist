"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NavbarForge, ForgeFooter } from "@/components/shared/forge";

export function ForgeNavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Crafting detail pages (/craftings/[slug]) have their own dedicated "The next work"
  // navigation and folio space; the grand home footer is hidden to preserve immersion.
  const isDetailPage = /^\/craftings\/[^/]+\/?$/.test(pathname);

  return (
    <>
      <NavbarForge />
      {children}
      {!isDetailPage && <ForgeFooter />}
    </>
  );
}
