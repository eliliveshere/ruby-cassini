
import { Workspace } from '@/types';

interface AgencyConfidenceProps {
    workspace: Workspace | null;
    projectCount: number;
    pendingCount: number;
}

export default function AgencyConfidenceIndicator({ workspace, projectCount, pendingCount }: AgencyConfidenceProps) {
    let status: 'On Track' | 'Needs Attention' | 'Blocked' = 'On Track';
    let color = 'bg-emerald-500';
    let textColor = 'text-emerald-400';
    let message = 'All projects progressing normally';

    if (workspace?.status === 'paused') {
        status = 'Blocked';
        color = 'bg-amber-500';
        textColor = 'text-amber-400';
        message = 'Workspace is paused indefinitely.';
    } else if (pendingCount > 2) {
        status = 'Blocked';
        color = 'bg-red-500';
        textColor = 'text-red-400';
        message = 'Create inputs pending for multiple projects.';
    } else if (pendingCount > 0) {
        status = 'Needs Attention';
        color = 'bg-yellow-500';
        textColor = 'text-yellow-400';
        message = `Waiting for approval on ${pendingCount} item(s).`;
    }

    return (
        <div className="group relative flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg cursor-help transition-colors hover:border-zinc-700">
            <div className={`h-2.5 w-2.5 rounded-full ${color} ${status !== 'Blocked' ? 'animate-pulse' : ''}`} />
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Agency Status</span>
                <span className={`text-sm font-semibold ${textColor}`}>{status}</span>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="text-xs text-zinc-300">{message}</p>
            </div>
        </div>
    );
}
