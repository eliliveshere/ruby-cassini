'use client';

import CategorySelection from '@/components/CategorySelection';
import { useRouter } from 'next/navigation';
import { ServiceCategory } from '@/types';

export default function CategoryPage() {
    const router = useRouter();

    const handleSelect = (category: ServiceCategory) => {
        // Navigate to Service Selection
        // URL encode the category just in case, though Next.js handles it mostly
        router.push(`/requests/new/${encodeURIComponent(category)}`);
    };

    return (
        <div className="min-h-screen w-full bg-zinc-950">
            <div className="flex flex-col items-center justify-center min-h-screen p-8 max-w-7xl mx-auto">
                <div className="w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            What kind of help do you need right now?
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Choose the area you want to work on. You’ll select specific services next.
                        </p>
                    </div>

                    <CategorySelection onSelect={handleSelect} />
                </div>
            </div>
        </div>
    );
}
