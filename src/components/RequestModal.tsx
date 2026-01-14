'use client';

import { useStore } from '@/store/useStore';
import { ServiceCategory, WorkCard } from '@/types';
import { X, ChevronRight, Zap, Target, Video, Globe, Rocket, Instagram } from 'lucide-react';
import { useState } from 'react';

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TemplateId = 'ad_creative' | 'ad_opt' | 'ad_launch' | 'social_plan' | 'social_caps' | 'social_repurpose' | 'vid_edit' | 'vid_ugc' | 'vid_yt' | 'strat' | 'landing_page' | 'brand_kit';

interface Template {
    id: TemplateId;
    label: string;
    credits: number;
    description: string;
    deliverables: string[];
    inputs: string[];
}

const TEMPLATES: Record<ServiceCategory, Template[]> = {
    'Paid Growth': [
        { id: 'ad_creative', label: 'Create Ad Creative Pack', credits: 15, description: 'High-performance ad assets.', deliverables: ['10 Hooks', '5 Primary Copies', '3 Angles', 'Storyboard'], inputs: ['Platform', 'Objective', 'Offer', 'Audience', 'Refs'] },
        { id: 'ad_opt', label: 'Weekly Ad Optimization', credits: 5, description: 'Audit and optimization plan.', deliverables: ['Weekly Summary', 'Hypothesis Log', 'Budget Recs'], inputs: ['Platform', 'Goals', 'CSV (Optional)'] },
        { id: 'ad_launch', label: 'Launch New Campaign', credits: 25, description: 'Full campaign setup from scratch.', deliverables: ['Campaign Plan', 'Setup Checklist', 'Creative Strategy'], inputs: ['Platform', 'Goal', 'Geo', 'Budget', 'Offer'] },
    ],
    'Social & Content': [
        { id: 'social_plan', label: 'Weekly Posting Plan', credits: 5, description: 'Content calendar and strategy.', deliverables: ['Post Calendar', 'Captions', 'Hooks'], inputs: ['Platforms', 'Frequency', 'Goals'] },
        { id: 'social_caps', label: 'Caption + Hook Pack', credits: 2, description: 'Engaging text assets.', deliverables: ['30 Hooks', '30 Captions'], inputs: ['Topic', 'Tone'] },
        { id: 'social_repurpose', label: 'Repurpose Content', credits: 8, description: 'Turn long-form into clips.', deliverables: ['Repurpose Plan', 'Cut List'], inputs: ['Source Link', 'Target Platforms'] },
    ],
    'Video & Production': [
        { id: 'vid_edit', label: 'Short-form Video Edit', credits: 10, description: 'Professional editing for Reels/TikTok.', deliverables: ['Edit V1', 'Captions', 'Export Specs'], inputs: ['Footage Link', 'Style Refs', 'Deadline'] },
        { id: 'vid_ugc', label: 'UGC Ad Edit', credits: 15, description: 'Direct response style edit.', deliverables: ['3 Variants'], inputs: ['Hook Angle', 'Offer', 'Footage'] },
        { id: 'vid_yt', label: 'YouTube Video Package', credits: 20, description: 'Long-form edit support.', deliverables: ['Script Review', 'Title/Desc', 'Thumbnail Brief'], inputs: ['Topic', 'Goal', 'Footage Length'] },
    ],
    'Strategy & Planning': [
        { id: 'strat', label: 'Creative Strategy', credits: 10, description: 'Deep dive into brand direction.', deliverables: ['Strategy Deck'], inputs: ['Current Challenge', 'Goals'] }
    ],
    'Conversion & Funnels': [
        { id: 'landing_page', label: 'Landing Page Rewrite', credits: 15, description: 'Copy and flow optimization.', deliverables: ['Wireframe Copy', 'Headline Tests'], inputs: ['Current URL', 'Goal'] }
    ],
    'Launch Support': [
        { id: 'brand_kit', label: 'Launch Strategy', credits: 20, description: 'Go-to-market plan.', deliverables: ['Timeline', 'Channel Strategy'], inputs: ['Product', 'Launch Date'] }
    ]
};

const ICONS: Record<ServiceCategory, any> = {
    'Paid Growth': Target,
    'Social & Content': Instagram,
    'Video & Production': Video,
    'Strategy & Planning': Zap,
    'Conversion & Funnels': Globe,
    'Launch Support': Rocket
};

export default function RequestModal({ isOpen, onClose }: RequestModalProps) {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [formInputs, setFormInputs] = useState<Record<string, string>>({});

    const createWorkCard = useStore((state) => state.createWorkCard);
    const deductCredits = useStore((state) => state.deductCredits);
    const workspace = useStore((state) => state.workspace);

    if (!isOpen) return null;

    const handleCategorySelect = (cat: ServiceCategory) => {
        setSelectedCategory(cat);
        setStep(2);
    };

    const handleTemplateSelect = (temp: Template) => {
        setSelectedTemplate(temp);
        setStep(3);
        // Reset inputs
        setFormInputs({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory || !selectedTemplate || !workspace) return;

        const cost = selectedTemplate.credits;
        if (workspace.credits < cost) {
            alert("Insufficient credits. Please add more to proceed.");
            return;
        }

        // Deduct credits
        deductCredits('NEW_REQUEST', cost);

        // Create Deliverables Map
        const deliverablesMap: Record<string, { status: 'pending' | 'ready', url?: string }> = {};
        selectedTemplate.deliverables.forEach(d => {
            deliverablesMap[d] = { status: 'pending' };
        });

        // Create Card
        const newCard: WorkCard = {
            id: `card-${Date.now()}`,
            workspaceId: workspace.id,
            projectId: 'proj-q1-growth', // Default container
            serviceCategory: selectedCategory,
            serviceType: selectedTemplate.label,
            title: selectedTemplate.label, // Or use a generated name based on inputs
            status: 'submitted',
            revisionsAllowed: 1,
            creditsUsed: cost,
            inputs: formInputs,
            deliverables: deliverablesMap,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Add default AI summary
            aiSummary: "Request received. Our strategy agents are analyzing your inputs to route this to the best creative team.",
            nextSteps: ["Team to review brief", "Confirm delivery timeline"]
        };

        createWorkCard(newCard);
        onClose();
        // Reset state
        setStep(1);
        setSelectedCategory(null);
        setSelectedTemplate(null);
        setFormInputs({});
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                    <div>
                        <h2 className="text-xl font-bold text-white">Create New Request</h2>
                        <div className="flex items-center text-xs text-zinc-500 mt-1 space-x-2">
                            <span className={step >= 1 ? 'text-indigo-400' : ''}>Category</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className={step >= 2 ? 'text-indigo-400' : ''}>Template</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className={step >= 3 ? 'text-indigo-400' : ''}>Brief</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-zinc-950/50">

                    {/* Step 1: Categories */}
                    {step === 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {(Object.keys(TEMPLATES) as ServiceCategory[]).map((cat) => {
                                const Icon = ICONS[cat];
                                const count = TEMPLATES[cat].length;
                                if (count === 0) return null;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategorySelect(cat)}
                                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 hover:bg-zinc-800 transition-all group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-zinc-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-zinc-800 group-hover:border-indigo-500/30">
                                            <Icon className="h-6 w-6 text-zinc-400 group-hover:text-indigo-400" />
                                        </div>
                                        <span className="font-medium text-zinc-200">{cat}</span>
                                        <span className="text-xs text-zinc-500 mt-1">{count} Templates</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Step 2: Templates */}
                    {step === 2 && selectedCategory && (
                        <div className="space-y-3">
                            {TEMPLATES[selectedCategory].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleTemplateSelect(t)}
                                    className="w-full flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 hover:bg-zinc-800 transition-all text-left group"
                                >
                                    <div>
                                        <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{t.label}</h3>
                                        <p className="text-sm text-zinc-400">{t.description}</p>
                                        <div className="flex gap-2 mt-2">
                                            {t.deliverables.slice(0, 2).map((d, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-500">{d}</span>
                                            ))}
                                            {t.deliverables.length > 2 && <span className="text-[10px] px-2 py-0.5 text-zinc-600">+{t.deliverables.length - 2} more</span>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-white">{t.credits}</span>
                                        <span className="text-xs text-zinc-500 uppercase">Credits</span>
                                    </div>
                                </button>
                            ))}
                            <button onClick={() => setStep(1)} className="text-sm text-zinc-500 hover:text-white mt-4 flex items-center">
                                <ChevronRight className="h-3 w-3 rotate-180 mr-1" /> Back to Categories
                            </button>
                        </div>
                    )}

                    {/* Step 3: Brief Form */}
                    {step === 3 && selectedTemplate && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-indigo-200">{selectedTemplate.label}</h4>
                                    <p className="text-xs text-indigo-300/70">Includes 1 Revision • {selectedTemplate.credits} Credits</p>
                                </div>
                                <div className="text-2xl font-bold text-indigo-400">-{selectedTemplate.credits}</div>
                            </div>

                            <div className="space-y-4">
                                {selectedTemplate.inputs.map((label) => (
                                    <div key={label}>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">{label}</label>
                                        <input
                                            required
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                            placeholder={`Enter ${label}...`}
                                            value={formInputs[label] || ''}
                                            onChange={(e) => setFormInputs({ ...formInputs, [label]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Additional Notes</label>
                                    <textarea
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        rows={3}
                                        placeholder="Any specific constraints or ideas?"
                                        value={formInputs['Notes'] || ''}
                                        onChange={(e) => setFormInputs({ ...formInputs, ['Notes']: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <button type="button" onClick={() => setStep(2)} className="text-sm text-zinc-500 hover:text-white">
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-lg shadow-indigo-900/20"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
