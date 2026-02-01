'use client';

import PipelinePage from '@/components/creator/PipelinePage';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PipelinePageRoute() {
    const demoArchetype = useStore((state) => state.demoArchetype);
    const router = useRouter();

    useEffect(() => {
        if (demoArchetype !== 'youtube') {
            router.push('/dashboard');
        }
    }, [demoArchetype, router]);

    return <PipelinePage />;
}
