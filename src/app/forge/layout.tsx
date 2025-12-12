"use client";

import { ForgeFooter, NavbarForge } from '@/components/shared/forge';
import SplashCursor from '@/features/forge/home/components/SplashCursor';
import { View } from '@react-three/drei';
import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene';

export default function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <NavbarForge />
      <div className="relative">
        <main className=" overflow-x-hidden">{children}</main>
        {/* <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
          <InfinityLoopScene />
        </View> */}
        <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
          <SplashCursor />
        </div>
      </div>
      <ForgeFooter />
    </div>
  );
}
