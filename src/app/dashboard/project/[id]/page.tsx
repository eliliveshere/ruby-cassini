'use client';

import CampaignCard from '@/components/CampaignCard';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import CsvImporter from '@/components/CsvImporter';
import VideoUploadModal from '@/components/VideoUploadModal';

import { Campaign, TeamMember } from '@/types';
import WorkCardComponent from '@/components/WorkCard';
import NextStepButton from '@/components/NextStepButton';
import TeamSection from '@/components/TeamSection';

import { DEMO_DATASETS } from '@/lib/demo-datasets';

export default function ProjectPage() {
    const params = useParams();
    const projectId = params.id as string;

    const [mounted, setMounted] = useState(false);

    // Hooks must be unconditional
    const projects = useStore((state) => state.projects);
    const hasDemoArchetype = useStore((state) => !!state.demoArchetype);
    const demoArchetype = useStore((state) => state.demoArchetype);

    // Derived finding logic - safe to run inside render as strict calculation
    // We check real projects first, then fall back to seeking in demo datasets
    // This allows deep-linking to demo projects even if not "in" demo mode globally, 
    // or ensures demo links work if we are in demo mode.

    let project = projects.find((p) => p.id === projectId);

    if (!project) {
        // Try to find in curret demo archetype
        if (DEMO_DATASETS[demoArchetype]) {
            project = DEMO_DATASETS[demoArchetype].projects.find(p => p.id === projectId);
        }
        // Fallback: search all archetypes if deep linking
        if (!project) {
            Object.values(DEMO_DATASETS).forEach(ds => {
                if (!project) project = ds.projects.find(p => p.id === projectId);
            });
        }
    }
    const campaigns = useStore((state) => state.campaigns[projectId] || []) as Campaign[];
    const updateCampaign = useStore((state) => state.updateCampaign);
    const deductCredits = useStore((state) => state.deductCredits);

    // Fetch work cards for this project
    const workCardsStore = useStore((state) => state.workCards);

    // MOCK GENERATOR FOR DEMO PROJECTS
    const getMockCampaigns = (p: typeof project): Campaign[] => {
        if (!p) return [];
        return [
            {
                id: `demo-camp-${p.id}-1`, projectId: p.id,
                platform: (p.type === 'Paid Ads' ? 'Facebook' : 'Google'),
                objective: 'Conversions', status: 'Active',
                metrics: { spend: 12400, impressions: 45000, clicks: 1200, ctr: 2.1, cpc: 10.33, cpa: 45.0, roas: 3.4 },
                aiSummary: 'Performing above benchmark. Creative refresh suggested for next week.',
                nextWeekSteps: ['Scale ad set 2', 'Test new headline'],
                dateRange: { start: 'Jan 1', end: 'Jan 14' }
            },
            {
                id: `demo-camp-${p.id}-2`, projectId: p.id,
                platform: (p.type === 'Social Media' ? 'TikTok' : 'LinkedIn'),
                objective: 'Awareness', status: 'Active',
                metrics: { spend: 4200, impressions: 120000, clicks: 600, ctr: 0.9, cpc: 7.00, cpa: 30.0, roas: 1.2 },
                aiSummary: 'Top of funnel volume is healthy. Retargeting pool is growing.',
                nextWeekSteps: [],
                dateRange: { start: 'Jan 1', end: 'Jan 14' }
            }
        ];
    };

    // If real campaigns exist, use them. If not, generate mocks based on project type.
    const effectiveCampaigns = campaigns.length > 0 ? campaigns :
        (project ? getMockCampaigns(project) : []);

    // MOCK WORK CARDS GENERATOR
    const getMockWorkCards = (p: typeof project) => {
        if (!p) return [];
        return [
            {
                id: `demo-card-${p.id}-1`, projectId: p.id,
                title: p.type === 'Paid Ads' ? 'Q1 New Creatives' : p.type === 'YouTube' ? 'Video #14 Editing' : 'Landing Page Updates',
                status: 'review', type: 'Creative', priority: 'high',
                members: [], team: [],
                dueDate: new Date().toISOString(), updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            },
            {
                id: `demo-card-${p.id}-2`, projectId: p.id,
                title: 'Analytics Review',
                status: 'in-progress', type: 'Strategy', priority: 'medium',
                members: [], team: [],
                dueDate: new Date().toISOString(), updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            }
        ];
    };

    const projectWorkCards = (workCardsStore.filter((c) => c.projectId === projectId && c.status !== 'staged').length > 0)
        ? workCardsStore.filter((c) => c.projectId === projectId && c.status !== 'staged')
        : (project ? getMockWorkCards(project) : []) as any[]; // Cast to match WorkCard[] implicitly for demo

    // Sort logic
    const displayWorkCards = [...projectWorkCards].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Aggregate Team Members from WorkCards OR Demo Config
    const projectTeam: TeamMember[] = [];
    const seenMembers = new Set();

    // 1. Try WorkCards (Real App Logic)
    projectWorkCards.forEach(card => {
        card.team?.forEach(member => {
            if (!seenMembers.has(member.name)) {
                projectTeam.push(member);
                seenMembers.add(member.name);
            }
        });
    });

    // 2. Demo Fallback (If no work cards/team found, use Archetype team)
    if (projectTeam.length === 0 && DEMO_DATASETS[demoArchetype]) {
        DEMO_DATASETS[demoArchetype].team.forEach((member: any) => {
            projectTeam.push(member as TeamMember);
        });
    }

    // Local state for modals
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [videoModalCampaignId, setVideoModalCampaignId] = useState<string | null>(null);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="p-8 min-h-screen bg-zinc-950" />;
    if (!project) return <div className="p-8 text-zinc-400">Project not found</div>;

    const handleGenerateSummary = (campaignId: string) => {
        const success = deductCredits('GENERATE_SUMMARY', 5);
        if (!success) {
            alert('Insufficient credits!');
            return;
        }

        // Simulate AI delay
        setTimeout(() => {
            updateCampaign(campaignId, {
                aiSummary: 'Updated: AI Analysis shows this campaign is highly effective. Creative A/B testing recommended for next sprint.'
            });
        }, 1000);
    };

    const handleDraftNextSteps = (campaignId: string) => {
        const success = deductCredits('DRAFT_NEXT_STEPS', 3);
        if (!success) {
            alert('Insufficient credits!');
            return;
        }

        updateCampaign(campaignId, {
            nextWeekSteps: [
                'Increase budget on "Lookalike" audience by 15%',
                'Pause underperforming "Video_v2" creative',
                'Launch retargeting campaign for cart abandoners'
            ]
        });
    };

    return (
        <div className="p-8 min-h-screen bg-zinc-950">
            <div className="mb-8">
                <Link href="/dashboard" className="mb-4 inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>

                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">{project.name}</h1>
                            <div className="mt-2 flex items-center gap-4 text-sm text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                    <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-zinc-500'}`} />
                                    {project.status}
                                </span>
                                <span>•</span>
                                <span>{project.description}</span>
                            </div>
                        </div>

                        {/* FEATURE 8: ROI Narrative */}
                        {project.roiNarrative && (
                            <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border-l-2 border-indigo-500 pl-4 py-2">
                                <p className="text-sm text-zinc-300 italic">
                                    "{project.roiNarrative}"
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-4">
                        <TeamSection team={projectTeam} />
                        <div className="flex items-center gap-3">
                            <NextStepButton />
                            <button className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                                <Plus className="mr-2 h-4 w-4" />
                                New Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                title="Import Campaign Metrics"
            >
                <CsvImporter onComplete={() => setIsImportModalOpen(false)} />
            </Modal>

            <Modal
                isOpen={!!videoModalCampaignId}
                onClose={() => setVideoModalCampaignId(null)}
                title="AI Video Editor"
            >
                {videoModalCampaignId && (
                    <VideoUploadModal
                        campaignId={videoModalCampaignId}
                        onClose={() => setVideoModalCampaignId(null)}
                    />
                )}
            </Modal>

            {displayWorkCards.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Active Work
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {displayWorkCards.map(card => (
                            <WorkCardComponent key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                {effectiveCampaigns.map((campaign) => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onGenerateSummary={handleGenerateSummary}
                        onDraftNextSteps={handleDraftNextSteps}
                        onUploadVideo={setVideoModalCampaignId}
                    />
                ))}

                {effectiveCampaigns.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                        <p className="text-zinc-500">No campaigns launched yet.</p>
                        {displayWorkCards.length > 0 && (
                            <p className="text-sm text-zinc-600 mt-2">Check 'Active Work' above for ongoing production tasks.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
