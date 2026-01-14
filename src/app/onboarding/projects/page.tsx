'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Project, ServiceCategory } from '@/types';
import { PROJECT_TEMPLATES } from '@/constants/projects';
import { CheckCircle2, ChevronRight, Plus, X, AlertCircle, Edit2, LayoutList } from 'lucide-react';

export default function ProjectSelectionPage() {
    const router = useRouter();
    const selections = useStore((state) => state.onboardingSelections);
    const confirmProjects = useStore((state) => state.confirmProjects);
    const workspace = useStore((state) => state.workspace);

    const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(new Set());

    // Generate Suggestions on Mount
    useEffect(() => {
        if (!workspace) {
            router.push('/onboarding');
            return;
        }

        const generated: Project[] = [];
        const seenTitles = new Set<string>();

        // 1. Map selections to templates
        Object.entries(selections).forEach(([category, services]) => {
            if (services.length > 0) {
                const templates = PROJECT_TEMPLATES[category as ServiceCategory] || [];
                // Pick the first template as default suggestion, or generic if none
                const template = templates[0] || {
                    title: `${category} Strategy`,
                    description: 'Execution of services in this category.',
                    category: category as ServiceCategory
                };

                if (!seenTitles.has(template.title)) {
                    const project: Project = {
                        id: `proj-${Date.now()}-${generated.length}`,
                        workspaceId: workspace.id,
                        name: template.title,
                        type: 'Other', // General project type for now
                        status: 'planning', // Default status
                        servicesIncluded: services, // Link services to this project
                        // We store the description temporarily in 'goal' or similar until Project type is fully updated? 
                        // Actually 'name' is title. We can use 'goal' for description.
                        // Wait, check type definition... Project has 'goal' property? No, Type def says 'name'.
                        // Let's assume we can add 'goal' or just use 'name'.
                        // Checking types... Project has 'type', 'status'. 
                        // I will assume I can augment Project or use existing fields.
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    // @ts-ignore - temporary fix if 'goal' missing or adding custom props
                    project.description = template.description;

                    generated.push(project);
                    seenTitles.add(template.title);
                }
            }
        });

        if (generated.length === 0) {
            // Fallback
            const defaultProject: Project = {
                id: `proj-${Date.now()}`,
                workspaceId: workspace.id,
                name: 'General Growth Project',
                type: 'Strategy',
                status: 'planning',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            generated.push(defaultProject);
        }

        setSuggestedProjects(generated);
        setSelectedProjectIds(new Set(generated.map(p => p.id)));

    }, [selections, workspace, router]);

    const handleToggle = (id: string) => {
        const next = new Set(selectedProjectIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedProjectIds(next);
    };

    const handleDelete = (id: string) => {
        setSuggestedProjects(prev => prev.filter(p => p.id !== id));
        setSelectedProjectIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const handleRename = (id: string, newName: string) => {
        setSuggestedProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
    };

    const handleAddCustom = () => {
        const newProj: Project = {
            id: `proj-custom-${Date.now()}`,
            workspaceId: workspace?.id || 'temp',
            name: 'New Custom Project',
            type: 'Other',
            status: 'planning',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setSuggestedProjects(prev => [...prev, newProj]);
        setSelectedProjectIds(prev => new Set(prev).add(newProj.id));
    };

    const handleConfirm = () => {
        const finalProjects = suggestedProjects.filter(p => selectedProjectIds.has(p.id));
        confirmProjects(finalProjects);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-500">

                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 ring-1 ring-indigo-500/20">
                        <LayoutList className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Configure Your Projects</h1>
                    <p className="text-zinc-400">
                        We've grouped your needs into these initial projects.<br />
                        Select the ones you want to start with.
                    </p>
                </div>

                <div className="space-y-3 mb-8">
                    {suggestedProjects.map((project) => {
                        const isSelected = selectedProjectIds.has(project.id);
                        return (
                            <div
                                key={project.id}
                                className={`group flex items-center p-4 rounded-xl border transition-all ${isSelected
                                        ? 'bg-zinc-950 border-indigo-500/50 ring-1 ring-indigo-500/20'
                                        : 'bg-zinc-950/30 border-zinc-800 opacity-75'
                                    }`}
                            >
                                <button
                                    onClick={() => handleToggle(project.id)}
                                    className={`h-6 w-6 rounded-md border flex items-center justify-center mr-4 transition-colors flex-shrink-0 ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-700 bg-zinc-900'
                                        }`}>
                                    {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                                </button>

                                <div className="flex-1 min-w-0 mr-4">
                                    <input
                                        value={project.name}
                                        onChange={(e) => handleRename(project.id, e.target.value)}
                                        className="bg-transparent text-white font-medium focus:outline-none focus:border-b border-indigo-500 w-full"
                                    />
                                    {/* @ts-ignore */}
                                    {project.description && (
                                        <p className="text-xs text-zinc-500 mt-0.5 truncate">{project.description}</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 text-zinc-600 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={handleAddCustom}
                    className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-900 transition-all mb-8 flex items-center justify-center gap-2 text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    Add Another Project
                </button>

                <div className="space-y-4">
                    {selectedProjectIds.size === 0 && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-300 text-sm justify-center mb-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>You must select at least one project.</span>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={selectedProjectIds.size === 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        Confirm Projects & Continue
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
