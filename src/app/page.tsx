'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/entries/1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      this is the main page
    </main>
  );
}
