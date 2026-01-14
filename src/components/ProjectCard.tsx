import { Project } from '@/types';
import { ArrowUpRight, BarChart3, Radio } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={`/dashboard/project/${project.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-indigo-500/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                            {project.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400 line-clamp-1">{project.description}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${project.status === 'active'
                        ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                        : 'bg-zinc-400/10 text-zinc-400 ring-zinc-400/20'
                        }`}>
                        {project.status === 'active' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />}
                        {project.status}
                    </span>
                </div>

                <div className="mt-6 flex items-end justify-between">
                    <div>
                        {project.servicesIncluded && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.servicesIncluded.slice(0, 3).map(service => (
                                    <span key={service} className="inline-flex items-center rounded-md bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700/50">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Assigned Team</div>
                            <div className="flex -space-x-2">
                                {/* Simplified visual placeholder for team members since we don't have them on the project object in the list view yet. 
                                    In a real app, we'd pull these from relations. For now, using generic avatars to visually represent the design. */}
                                <div className="h-6 w-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center text-[9px] text-white">AI</div>
                                <div className="h-6 w-6 rounded-full bg-indigo-500/20 border border-zinc-900 flex items-center justify-center text-[9px] text-indigo-300">PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-zinc-800/50 pt-4">
                <div className="flex items-center text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <BarChart3 className="mr-2 h-3.5 w-3.5" />
                    View Performance
                </div>
                <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
            </div>
        </Link >
    );
}
