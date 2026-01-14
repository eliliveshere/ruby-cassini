'use client';

import { Check, Play } from 'lucide-react';
import Link from 'next/link';

export default function ProjectSuccessView() {
    return (
        <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-500 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="text-center mb-12">
                <div className="inline-flex h-16 w-16 rounded-full bg-green-500/10 items-center justify-center text-green-500 mb-6 border border-green-500/20">
                    <Check className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Your project is live</h1>
                <p className="text-lg text-zinc-400">Here is exactly how we will move forward.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">1</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">Brief Finalization</h3>
                            <p className="text-sm text-zinc-400">AI drafts a clear brief. If clarification is needed, we'll open a Ticket.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">2</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">Production Stages</h3>
                            <p className="text-sm text-zinc-400">Selected services appear as active Work Cards on your dashboard.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">3</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">Review & Approval</h3>
                            <p className="text-sm text-zinc-400">You'll approve work at each stage. Request revisions directly on the card.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">4</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">Completion</h3>
                            <p className="text-sm text-zinc-400">Final assets are delivered with a posting checklist.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-950/50 rounded-xl p-4 mb-8 border border-zinc-800/50 flex items-start gap-3">
                <Play className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-medium text-zinc-200">You’ll never need a meeting to know what’s happening.</p>
                    <p className="text-xs text-zinc-500 mt-1">Check your dashboard anytime for real-time status.</p>
                </div>
            </div>

            <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl text-center transition-colors">
                    View Dashboard
                </Link>
                <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl text-center transition-colors">
                    Upload Assets
                </button>
            </div>
        </div>
    );
}
