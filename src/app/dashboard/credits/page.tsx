'use client';

import { useStore } from '@/store/useStore';
import { CreditCard, History, Plus, Wallet, Sparkles } from 'lucide-react';

export default function CreditsPage() {
    const workspace = useStore((state) => state.workspace);
    const addCredits = useStore((state) => state.addCredits);
    const creditLedger = useStore((state) => state.creditLedger);

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Credits & Billing</h1>
                <p className="text-zinc-400">Operational credits for agency services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Balance Card */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-zinc-500 mb-2">
                            <Wallet className="h-5 w-5" />
                            <span className="text-sm font-medium uppercase tracking-wider">Current Balance</span>
                        </div>
                        <div className="text-5xl font-bold text-white mb-1">{workspace?.credits || 0}</div>
                        <div className="text-sm text-zinc-500">Credits available</div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => addCredits(100)} // Mock purchase
                            className="w-full rounded-md bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add to Balance
                        </button>
                        <p className="text-xs text-center text-zinc-500 mt-3">1 Credit ≈ $1.00 USD</p>
                    </div>
                </div>

                {/* Purchase Options */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Package A */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <span className="px-2 py-1 rounded bg-zinc-950 text-xs font-medium text-zinc-500 border border-zinc-800">$100</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Starter Pack</h3>
                        <p className="text-sm text-zinc-400 mb-4">100 Credits for ad-hoc requests.</p>
                        <div className="text-xs text-indigo-400 group-hover:underline">Add to Balance →</div>
                    </div>

                    {/* Package B */}
                    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">Popular</div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="px-2 py-1 rounded bg-zinc-950 text-xs font-medium text-zinc-500 border border-zinc-800">$450</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Agency Pack</h3>
                        <p className="text-sm text-zinc-400 mb-4">500 Credits (Save 10%).</p>
                        <div className="text-xs text-indigo-400 group-hover:underline">Add to Balance →</div>
                    </div>
                </div>
            </div>

            {/* Usage History */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <History className="h-4 w-4 text-zinc-500" /> Usage History
                    </h3>
                    <span className="text-xs text-zinc-500">Last 30 days</span>
                </div>
                <div className="divide-y divide-zinc-800/50">
                    {creditLedger.length > 0 ? creditLedger.slice(0, 10).map((entry) => (
                        <div key={entry.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-zinc-200 capitalize">{entry.action.replace(/_/g, ' ').toLowerCase()}</p>
                                <p className="text-xs text-zinc-500">{new Date(entry.timestamp).toLocaleDateString()} • {new Date(entry.timestamp).toLocaleTimeString()}</p>
                            </div>
                            <span className="text-sm font-mono text-zinc-400">-{entry.cost}</span>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-zinc-500 text-sm">No transaction history yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
