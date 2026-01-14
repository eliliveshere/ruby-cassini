'use client';

import { useParams, useRouter } from 'next/navigation';
import { ServiceCategory } from '@/types';
import { SERVICE_CATALOG } from '@/constants/services';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ServiceSelectionPage() {
    const params = useParams();
    const router = useRouter();

    // Decode category from URL
    const categoryRaw = decodeURIComponent(params.category as string);
    // Cast to ServiceCategory - in a real app validate against allowed values
    const category = categoryRaw as ServiceCategory;

    const services = SERVICE_CATALOG[category] || [];

    if (!services.length) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500">
                Service category not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-zinc-950">
            <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col justify-center">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-zinc-500 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Categories
                </button>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Select a Service
                    </h1>
                    <p className="text-zinc-400">
                        What specific deliverable do you need within <span className="text-indigo-400 font-medium">{category}</span>?
                    </p>
                </div>

                <div className="grid gap-3">
                    {services.map((service) => (
                        <Link
                            key={service}
                            href={`/requests/new/${encodeURIComponent(category)}/${encodeURIComponent(service)}`}
                            className="flex items-center justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-lg text-zinc-200 group-hover:text-white">
                                    {service}
                                </span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
