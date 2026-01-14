'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const workspace = useStore((state) => state.workspace);
  const router = useRouter();

  useEffect(() => {
    if (workspace) {
      router.push('/dashboard');
    } else {
      router.push('/onboarding');
    }
  }, [workspace, router]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
    </div>
  );
}
