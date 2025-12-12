import { ForgeFooter, NavbarForge } from '@/components/shared/forge';
import SplashCursor from '@/features/forge/home/components/SplashCursor';
// import { View } from '@react-three/drei';
// import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene';
import { cookies } from 'next/headers';
import LoaderWithOverlay from '@/components/PreLoaderOverlay';

export default async function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isVisited = cookieStore.has('forge_visited');

  return (
    <div className="w-full h-full">
      {/* Render Loader at the root level to cover everything if not visited */}
      {!isVisited && <LoaderWithOverlay />}

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
