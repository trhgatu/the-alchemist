import ForgeHome from '@/features/forge/home/pages/page';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const isVisited = cookieStore.has('forge_visited');

  return (
    <>
      <ForgeHome isVisited={isVisited} />
    </>
  );
}
