import { Video, FileText, Upload, MonitorPlay, CheckCircle2, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

export interface VideoProject {
    id: string;
    title: string;
    status: 'idea' | 'scripting' | 'filming' | 'editing' | 'distribution';
    thumbnail?: string;
    date: string;
}

const MOCK_PIPELINE: VideoProject[] = [
    { id: '1', title: 'My Coding Setup 2024', status: 'editing', date: 'Due Tomorrow' },
    { id: '2', title: 'Why I Stopped Using React', status: 'scripting', date: 'Idea Drafted' },
    { id: '3', title: 'Day in the Life of a SWE', status: 'distribution', date: 'Ready' },
    { id: '4', title: 'Next.js 15 Tutorial', status: 'filming', date: 'Assets Missing' },
];

interface ProductionPipelineProps {
    onSelectProject: (project: VideoProject) => void;
}

export default function ProductionPipeline({ onSelectProject }: ProductionPipelineProps) {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg">
                    <Video className="h-4 w-4" />
                </span>
                Production Pipeline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
                {/* COLUMN 1: Scripting */}
                <PipelineColumn title="Scripting" icon={FileText} color="blue">
                    {MOCK_PIPELINE.filter(v => v.status === 'scripting').map(video => (
                        <VideoCard key={video.id} video={video} onClick={() => onSelectProject(video)} />
                    ))}
                    <button className="w-full py-3 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium flex items-center justify-center gap-2 mt-2">
                        <FileText className="h-4 w-4" /> Generate Script
                    </button>
                </PipelineColumn>

                {/* COLUMN 2: Filming / Upload */}
                <PipelineColumn title="Filming & Upload" icon={Upload} color="orange">
                    {MOCK_PIPELINE.filter(v => v.status === 'filming').map(video => (
                        <VideoCard key={video.id} video={video} onClick={() => onSelectProject(video)} />
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
                    {MOCK_PIPELINE.filter(v => v.status === 'editing').map(video => (
                        <VideoCard key={video.id} video={video} onClick={() => onSelectProject(video)} />
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
                    {MOCK_PIPELINE.filter(v => v.status === 'distribution').map(video => (
                        <VideoCard key={video.id} video={video} onClick={() => onSelectProject(video)} />
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

function VideoCard({ video, onClick }: { video: VideoProject, onClick?: () => void }) {
    return (
        <div onClick={onClick} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group cursor-pointer active:scale-[0.98] shadow-sm dark:shadow-none">
            <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-zinc-500 px-1.5 py-0.5 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800">
                    {video.status}
                </span>
                <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1 leading-snug">{video.title}</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <CheckCircle2 className="h-3 w-3" />
                {video.date}
            </div>
        </div>
    );
}
