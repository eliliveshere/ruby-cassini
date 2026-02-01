import { ArrowLeft, Upload, CheckCircle2, Film, Folder } from 'lucide-react';

interface FilmingViewProps {
    project: any;
    onBack: () => void;
}

export default function FilmingView({ project, onBack }: FilmingViewProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">Filming & Upload</span>
                        <span>•</span>
                        <span>2/8 Scenes Shot</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        Move to Editing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shot List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <Film className="h-4 w-4 text-orange-400" />
                                Shot List
                            </h3>
                            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">Add Shot +</button>
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {[
                                { id: 1, type: 'A-Roll', desc: 'Intro Hook (Talking Head)', status: 'done' },
                                { id: 2, type: 'B-Roll', desc: 'Slow pan of mechanical keyboard', status: 'pending' },
                                { id: 3, type: 'A-Roll', desc: 'Section 1: The Chair', status: 'pending' },
                                { id: 4, type: 'Screen', desc: 'VS Code Extension demo', status: 'pending' },
                            ].map((shot) => (
                                <div key={shot.id} className="p-4 flex items-center gap-4 hover:bg-zinc-900/50 transition-colors group">
                                    <button className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${shot.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-700 hover:border-zinc-500'}`}>
                                        {shot.status === 'done' && <CheckCircle2 className="h-3.5 w-3.5" />}
                                    </button>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${shot.type === 'A-Roll' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    shot.type === 'B-Roll' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                        'bg-zinc-800 text-zinc-400 border-zinc-700'
                                                }`}>{shot.type}</span>
                                            <span className={`text-sm font-medium ${shot.status === 'done' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{shot.desc}</span>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-white text-xs">Edit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Integration Card */}
                <div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 sticky top-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                                <Folder className="h-5 w-5 text-zinc-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Assets Folder</h3>
                                <p className="text-xs text-zinc-500">Google Drive • 1.2 GB Used</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm p-2 rounded bg-zinc-900 border border-zinc-800">
                                <span className="text-zinc-300 truncate">A_Roll_Cam1_001.mp4</span>
                                <span className="text-xs text-zinc-500">450MB</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-2 rounded bg-zinc-900 border border-zinc-800">
                                <span className="text-zinc-300 truncate">Screen_Rec_Demo.mov</span>
                                <span className="text-xs text-zinc-500">120MB</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                            <Upload className="h-4 w-4" />
                            Open Drive Folder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
