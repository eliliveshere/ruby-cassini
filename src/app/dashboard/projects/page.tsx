'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Folder, Calendar, ArrowRight, MoreHorizontal, Clock, Target } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    const projects = useStore((state) => state.projects);
    const router = useRouter();

    // Group by status
    const activeProjects = projects.filter(p => p.status === 'active');
    const planningProjects = projects.filter(p => p.status === 'planning');
    const completedProjects = projects.filter(p => p.status === 'completed');

    return (
        <div className="max-w-[1600px] mx-auto p-4 lg:p-12 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Projects</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your active campaigns and content series.</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/new-project')}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Folder className="h-4 w-4" />
                    New Project
                </button>
            </header>

            <div className="space-y-12">
                {/* Active Projects */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-500/20" />
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Active</h2>
                        <span className="text-sm text-zinc-500 ml-2">{activeProjects.length}</span>
                    </div>

                    {activeProjects.length === 0 ? (
                        <div className="p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
                            <p className="text-zinc-500">No active projects.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Planning Projects */}
                {planningProjects.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">In Planning</h2>
                            <span className="text-sm text-zinc-500 ml-2">{planningProjects.length}</span>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {planningProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Completed Projects */}
                {completedProjects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Completed</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: any }) {
    return (
        <Link href={`/dashboard/project/${project.id}`} className="group block h-full">
            <article className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-full hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg dark:hover:shadow-indigo-500/5 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors">
                        <Folder className="h-5 w-5" />
                    </div>
                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.name}
                </h3>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 min-h-[40px]">
                    {project.description || project.roiNarrative || "No description provided for this project."}
                </p>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <Target className="h-3.5 w-3.5" />
                            <span>{project.type}</span>
                        </div>
                        {project.targetDate && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(project.targetDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm font-medium">
                        <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">View Details</span>
                        <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
                    </div>
                </div>
            </article>
        </Link>
    );
}
