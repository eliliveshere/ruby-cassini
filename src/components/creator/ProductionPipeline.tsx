import { Video, FileText, Upload, MonitorPlay, CheckCircle2, MessageSquare, Share2, MoreHorizontal, Filter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { WorkCard } from '@/types';
import { useState, useMemo } from 'react';

// Map WorkCard to the visual interface if needed, or just use WorkCard directly.
// We will simply render WorkCards in the columns.

interface ProductionPipelineProps {
    onSelectProject: (project: any) => void;
}

export default function ProductionPipeline({ onSelectProject }: ProductionPipelineProps) {
    const workCards = useStore((state) => state.workCards);
    const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

    // Derive unique projects from workCards
    const projects = useMemo(() => {
        const uniqueIds = Array.from(new Set(workCards.map(c => c.projectId)));
        return uniqueIds.map(id => {
            const card = workCards.find(c => c.projectId === id);
            // Heuristic: Extract Project Name from "Service - Project Name" if possible
            let name = card?.title || id;
            if (name.includes(' - ')) {
                name = name.split(' - ').slice(1).join(' - ').trim();
            }
            return { id, name };
        }).filter(p => p.id); // Ensure valid
    }, [workCards]);

    // Filter cards based on selection
    const filteredCards = useMemo(() => {
        return selectedProjectId === 'all'
            ? workCards
            : workCards.filter(c => c.projectId === selectedProjectId);
    }, [workCards, selectedProjectId]);

    // Helper to bucket cards into columns based on their service type or status
    const getColumnCards = (columnType: 'scripting' | 'filming' | 'editing' | 'distribution') => {
        return filteredCards.filter(card => {
            // Filter out completed or non-active if desired, but for now show all "active"
            if (card.status === 'completed' || card.status === 'archived') return false;

            const lowerType = card.serviceType.toLowerCase();
            const lowerTitle = card.title.toLowerCase();

            // Safe status check as string
            const status = card.status as string;

            switch (columnType) {
                case 'scripting':
                    return lowerType.includes('script') || lowerTitle.includes('script') || status === 'scripting';
                case 'filming':
                    return lowerType.includes('footage') || lowerType.includes('shoot') || status === 'filming';
                case 'editing':
                    return lowerType.includes('edit') || lowerType.includes('design') || lowerType.includes('thumbnail') || status === 'editing';
                case 'distribution':
                    return lowerType.includes('optimiz') || lowerType.includes('post') || lowerType.includes('caption') || status === 'distribution';
                default:
                    return false;
            }
        });
    };

    return (
        <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg">
                        <Video className="h-4 w-4" />
                    </span>
                    Production Pipeline
                </h2>

                {/* Project Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                    <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none min-w-[200px]"
                    >
                        <option value="all">All Active Projects</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[500px]">
                {/* COLUMN 1: Scripting */}
                <PipelineColumn title="Scripting" icon={FileText} color="blue">
                    {getColumnCards('scripting').map(card => (
                        <VideoCard key={card.id} card={card} onClick={() => onSelectProject(card)} />
                    ))}
                    <button className="w-full py-3 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium flex items-center justify-center gap-2 mt-2">
                        <FileText className="h-4 w-4" /> Generate Script
                    </button>
                </PipelineColumn>

                {/* COLUMN 2: Filming / Upload */}
                <PipelineColumn title="Filming & Upload" icon={Upload} color="orange">
                    {getColumnCards('filming').map(card => (
                        <VideoCard key={card.id} card={card} onClick={() => onSelectProject(card)} />
                    ))}
                    <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                        <button className="w-full py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" className="h-4 w-4" alt="Drive" />
                            Connect Drive Folder
                        </button>
                    </div>
                </PipelineColumn>

                {/* COLUMN 3: Editing / Review */}
                <PipelineColumn title="Editing (Frame.io)" icon={MonitorPlay} color="purple">
                    {getColumnCards('editing').map(card => (
                        <VideoCard key={card.id} card={card} onClick={() => onSelectProject(card)} />
                    ))}
                    <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg">
                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                            <MessageSquare className="h-3 w-3" />
                            New Comments
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">"Cut at 02:30 is too jumpy, fix audio fade..."</p>
                    </div>
                </PipelineColumn>

                {/* COLUMN 4: Distribution */}
                <PipelineColumn title="Distribution" icon={Share2} color="green">
                    {getColumnCards('distribution').map(card => (
                        <VideoCard key={card.id} card={card} onClick={() => onSelectProject(card)} />
                    ))}
                    <button className="w-full py-2 mt-2 bg-green-900/10 border border-green-900/20 rounded-lg text-green-400 text-xs font-medium hover:bg-green-900/20 transition-colors">
                        Auto-Generate Captions
                    </button>
                </PipelineColumn>
            </div>
        </section>
    );
}

function PipelineColumn({ title, icon: Icon, color, children }: any) {
    const colorStyles = {
        blue: "text-blue-400 bg-blue-500/10",
        orange: "text-orange-400 bg-orange-500/10",
        purple: "text-purple-400 bg-purple-500/10",
        green: "text-green-400 bg-green-500/10"
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/50 rounded-xl flex flex-col p-4 h-full">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800/50">
                <span className={`p-1.5 rounded ${colorStyles[color as keyof typeof colorStyles]}`}>
                    <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{title}</span>
            </div>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
                {children}
            </div>
        </div>
    );
}

function VideoCard({ card, onClick }: { card: WorkCard, onClick?: () => void }) {
    return (
        <div onClick={onClick} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group cursor-pointer active:scale-[0.98] shadow-sm dark:shadow-none">
            <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-zinc-500 px-1.5 py-0.5 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800">
                    {card.status.replace('_', ' ')}
                </span>
                <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1 leading-snug">{card.title}</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <CheckCircle2 className="h-3 w-3" />
                {new Date(card.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
}
