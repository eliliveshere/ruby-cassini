'use client';

import { useState } from 'react';
import ProductionPipeline, { VideoProject } from './ProductionPipeline';

// Stage Views
import ScriptingView from './stages/ScriptingView';
import FilmingView from './stages/FilmingView';
import EditingView from './stages/EditingView';
import DistributionView from './stages/DistributionView';

export default function PipelinePage() {
    const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);

    // Conditional Rendering for Active Stage
    if (selectedProject) {
        return (
            <div className="max-w-[1600px] mx-auto p-8 lg:p-12">
                {selectedProject.status === 'scripting' && <ScriptingView project={selectedProject} onBack={() => setSelectedProject(null)} />}
                {selectedProject.status === 'filming' && <FilmingView project={selectedProject} onBack={() => setSelectedProject(null)} />}
                {selectedProject.status === 'editing' && <EditingView project={selectedProject} onBack={() => setSelectedProject(null)} />}
                {selectedProject.status === 'distribution' && <DistributionView project={selectedProject} onBack={() => setSelectedProject(null)} />}

                {/* Fallback for other statuses */}
                {!['scripting', 'filming', 'editing', 'distribution'].includes(selectedProject.status) && (
                    <div className="text-white">
                        <button onClick={() => setSelectedProject(null)}>Back</button>
                        <p className="mt-4">Work in progress for status: {selectedProject.status}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-8 lg:p-12 animate-in fade-in duration-700">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Production Pipeline</h1>
                <p className="text-zinc-400">Manage your active content production workflow.</p>
            </header>

            <ProductionPipeline onSelectProject={setSelectedProject} />
        </div>
    );
}
