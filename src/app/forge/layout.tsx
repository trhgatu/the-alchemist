import { ForgeFooter, NavbarForge } from '@/components/shared/forge';
import SplashCursor from '@/features/forge/home/components/SplashCursor';

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
        <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
          <SplashCursor/>
        </div>
      </div>
      <ForgeFooter />
    </div>
  );
}
