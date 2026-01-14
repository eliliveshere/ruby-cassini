import { WorkCard, WorkCardStatus } from '@/types';
import { ArrowUpRight, CheckCircle2, Clock, FileText, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface WorkCardProps {
    card: WorkCard;
}

const statusConfig: Record<WorkCardStatus, { label: string; color: string; progress: number }> = {
    draft: { label: 'Draft', color: 'bg-zinc-600', progress: 5 },
    submitted: { label: 'Submitted', color: 'bg-zinc-500', progress: 10 },
    in_progress: { label: 'In Progress', color: 'bg-blue-500', progress: 50 },
    review: { label: 'In Review', color: 'bg-purple-500', progress: 75 },
    delivered: { label: 'Delivered', color: 'bg-green-500', progress: 90 },
    completed: { label: 'Completed', color: 'bg-emerald-500', progress: 100 },
    staged: { label: 'Staged', color: 'bg-indigo-500', progress: 0 },
};

export default function WorkCardComponent({ card }: WorkCardProps) {
    const config = statusConfig[card.status] || statusConfig.submitted;

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                <div
                    className={`h-full ${config.color} transition-all duration-1000`}
                    style={{ width: `${config.progress}%` }}
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{card.serviceCategory}</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium border ${config.color.replace('bg-', 'border-').replace('500', '500/30 text-white')} bg-opacity-10`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
                        {config.label}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {card.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1">{card.serviceType}</p>

                {card.aiSummary && (
                    <div className="mt-4 rounded-lg bg-zinc-950/50 p-3 border border-zinc-800/50">
                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
                            <Sparkles className="h-3 w-3" />
                            Latest Update
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed max-h-20 overflow-hidden text-ellipsis">
                            {card.aiSummary}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                    {/* Mock avatars or assignments */}
                    <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-zinc-800 ring-2 ring-zinc-900 flex items-center justify-center text-[10px] text-zinc-500 cursor-help" title="Human Expert">
                            HE
                        </div>
                        <div className="h-6 w-6 rounded-full bg-indigo-900 ring-2 ring-zinc-900 flex items-center justify-center text-[10px] text-indigo-300 cursor-help" title="AI Assistant">
                            AI
                        </div>
                    </div>
                    <span className="text-xs text-zinc-500">
                        ETA: 2 Days
                    </span>
                </div>
                <Link href={`/dashboard/work/${card.id}`} className="text-xs font-medium text-white hover:text-indigo-400 transition-colors flex items-center">
                    View <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
            </div>
        </div>
    );
}
