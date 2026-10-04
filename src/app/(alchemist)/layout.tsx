import { ForgeNavigationWrapper } from "@/components/shared/forge";
import SplashCursor from "@/features/alchemist/shared/effects/SplashCursor";
// import { View } from '@react-three/drei';
// import InfinityLoopScene from '@/features/alchemist/chronicles/scenes/InfinityLoopScene';
import { cookies } from "next/headers";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import ViewCanvas from "@/components/ViewCanvas";
import { AlchemicalFilters } from "@/features/alchemist/shared/effects";
import { GlobalTransitionOverlay } from "@/components/GlobalTransitionOverlay";

export default async function ForgeLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isVisited = cookieStore.has("forge_visited");

  return (
    <div className="w-full h-full">
      <ViewCanvas />
      <AlchemicalFilters />

      {!isVisited && <LoaderWithOverlay />}
      <GlobalTransitionOverlay />

      <ForgeNavigationWrapper>
        <div className="relative">
          <main className="overflow-x-hidden">{children}</main>
          <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
            <SplashCursor />
          </div>
        </div>
      </ForgeNavigationWrapper>
    </div>
  );
}
