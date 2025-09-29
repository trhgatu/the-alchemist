// app/forge/page.tsx
import CraftingsPage from '@/features/forge/craftings/pages/page';

export const revalidate = 60;

export default function Page() {
  return <CraftingsPage />;
}
