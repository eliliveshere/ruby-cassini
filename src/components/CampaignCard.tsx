import { Campaign } from '@/types';
import { ArrowUpRight, BrainCircuit, FileText, Play, TrendingUp, Zap } from 'lucide-react';

interface CampaignCardProps {
    campaign: Campaign;
    onGenerateSummary: (id: string) => void;
    onDraftNextSteps: (id: string) => void;
    onUploadVideo: (id: string) => void;
}

export default function CampaignCard({ campaign, onGenerateSummary, onDraftNextSteps, onUploadVideo }: CampaignCardProps) {
    const { metrics } = campaign;

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-sm transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${campaign.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-zinc-500'}`} />
                    <h3 className="font-semibold text-zinc-100">{campaign.platform} - {campaign.objective}</h3>
                </div>
                <span className="text-xs text-zinc-500 font-mono">ID: {campaign.id.slice(0, 8)}</span>
            </div>

            <div className="p-6 space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-zinc-950/50 p-3 ring-1 ring-inset ring-white/5">
                        <p className="text-xs font-medium text-zinc-500">Spend</p>
                        <p className="mt-1 text-lg font-semibold text-white">${metrics?.spend?.toLocaleString() ?? '0'}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/50 p-3 ring-1 ring-inset ring-white/5">
                        <p className="text-xs font-medium text-zinc-500">Impressions</p>
                        <p className="mt-1 text-lg font-semibold text-white">{metrics?.impressions?.toLocaleString() ?? '0'}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/50 p-3 ring-1 ring-inset ring-white/5">
                        <p className="text-xs font-medium text-zinc-500">CTR</p>
                        <p className="mt-1 text-lg font-semibold text-emerald-400">{metrics?.ctr ?? '0.00'}%</p>
                    </div>
                    <div className="rounded-lg bg-zinc-900 p-3 ring-1 ring-inset ring-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent">
                        <p className="text-xs font-medium text-indigo-400">ROAS</p>
                        <p className="mt-1 text-lg font-bold text-indigo-300">{metrics?.roas ?? '0.00'}x</p>
                    </div>
                </div>

                {/* AI Section */}
                <div className="space-y-4 rounded-xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 p-5 ring-1 ring-white/5">
                    <div className="flex items-center items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                            <SparklesIcon className="h-4 w-4 text-purple-400" />
                            AI Analysis
                        </div>
                        {!campaign.aiSummary && (
                            <button
                                onClick={() => onGenerateSummary(campaign.id)}
                                className="text-xs flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                <Zap className="mr-1 h-3 w-3" />
                                Generate (5 credits)
                            </button>
                        )}
                    </div>

                    {campaign.aiSummary ? (
                        <div className="text-sm text-zinc-400 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                            {campaign.aiSummary}
                        </div>
                    ) : (
                        <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-zinc-700/50 bg-black/20">
                            <span className="text-xs text-zinc-600">No analysis generated yet</span>
                        </div>
                    )}

                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Recommended Next Steps</h4>
                            <button
                                onClick={() => onDraftNextSteps(campaign.id)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                        {campaign.nextWeekSteps && campaign.nextWeekSteps.length > 0 ? (
                            <ul className="space-y-2">
                                {campaign.nextWeekSteps.map((step, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-zinc-300">
                                        <span className="flex-none mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-zinc-600 italic">No steps drafted.</p>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-2">
                    <button className="flex-1 flex items-center justify-center rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors">
                        <FileText className="mr-2 h-3.5 w-3.5" />
                        Draft Ad Copy
                    </button>
                    <button
                        onClick={() => onUploadVideo(campaign.id)}
                        className="flex-1 flex items-center justify-center rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                        <Play className="mr-2 h-3.5 w-3.5" />
                        Upload Video
                    </button>
                </div>
            </div>
        </div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    )
}
