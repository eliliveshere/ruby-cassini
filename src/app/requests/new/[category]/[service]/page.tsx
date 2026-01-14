'use client';

import { useParams, useRouter } from 'next/navigation';
import { ServiceCategory, WorkCard } from '@/types';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';

export default function BriefingPage() {
    const params = useParams();
    const router = useRouter();
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const category = decodeURIComponent(params.category as string) as ServiceCategory;
    const service = decodeURIComponent(params.service as string);

    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // In a real app, we'd fetch specific input requirements for 'service'
    // For now, we use a generic "Brief" text area for all services to satisfy the architecture.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!workspace) return;
        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const projectId = `proj-${Date.now()}`; // Ideally we select an existing project or create one

        const newCard: WorkCard = {
            id: `card-${Date.now()}`,
            workspaceId: workspace.id,
            projectId: projectId,
            serviceCategory: category,
            serviceType: service,
            title: service,
            status: 'submitted',
            revisionsAllowed: 1,
            creditsUsed: 10, // Placeholder cost
            inputs: {
                brief: notes
            },
            deliverables: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            aiSummary: "Request submitted. Assigning best-fit team.",
            nextSteps: ["Team Assignment", "Kickoff"]
        };

        createWorkCard(newCard);

        // Redirect to Dashboard (or the new project/card if we had a page for it)
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-zinc-950">
            <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-zinc-500 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Services
                </button>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-10">
                    <div className="mb-8 border-b border-zinc-800 pb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
                            {category}
                        </span>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {service}
                        </h1>
                        <p className="text-zinc-400">
                            Please provide the details for this request. Our team will review and start working immediately.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Project Brief / Instructions
                            </label>
                            <textarea
                                required
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-zinc-700 resize-none"
                                placeholder="Describe what you need... (e.g. target audience, style preferences, links to assets)"
                            />
                        </div>

                        <div className="flex items-center justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-900/20 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Create Request
                                        <Send className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
