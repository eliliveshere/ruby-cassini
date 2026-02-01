
import { Ticket, WorkCard, Project, CreatorProfile } from '@/types';

// Helper for dates
const daysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
};

// --- DATA SETS ---

type DemoSet = {
    profile: Partial<CreatorProfile>;
    projects: Project[];
    workCards: WorkCard[];
    tickets: Ticket[];
};

const BASE_PROJECT_ID = 'proj-demo-1';
const BASE_WORKSPACE_ID = 'ws-1';

// 1. TECH & CODING
const TECH_SET: DemoSet = {
    profile: {
        niche: "Tech & Coding",
        channelName: "Dev Mastery",
        primaryPlatform: "youtube",
        audienceLevel: "intermediate",
        tone: "educational",
        primaryGoal: "growth",
        formats: ["Tutorial", "Screen Record"]
    },
    projects: [
        {
            id: BASE_PROJECT_ID,
            workspaceId: BASE_WORKSPACE_ID,
            name: "Next.js 15 Full Course",
            type: "YouTube",
            status: "active",
            createdAt: daysAgo(5),
            updatedAt: daysAgo(1)
        }
    ],
    workCards: [
        // Scripting Bucket
        {
            id: 'card-tech-script-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: BASE_PROJECT_ID,
            serviceCategory: 'Video',
            serviceType: 'Script Writing',
            title: 'Script - Next.js 15 Deep Dive',
            status: 'scripting',
            revisionsAllowed: 1,
            creditsUsed: 10,
            inputs: { topic: 'Server Actions' },
            createdAt: daysAgo(4),
            updatedAt: daysAgo(2),
            aiSummary: 'Outline approved. Generating draft section 2.'
        },
        // Filming Bucket
        {
            id: 'card-tech-film-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: BASE_PROJECT_ID,
            serviceCategory: 'Video',
            serviceType: 'Filming Guidance',
            title: 'Shoot - Intro B-Roll',
            status: 'filming',
            revisionsAllowed: 0,
            creditsUsed: 5,
            inputs: { shotList: ['Desk setup', 'Typing'] },
            createdAt: daysAgo(3),
            updatedAt: daysAgo(1),
            aiSummary: 'Shot list ready for upload.'
        },
        // Editing Bucket
        {
            id: 'card-tech-edit-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: BASE_PROJECT_ID,
            serviceCategory: 'Video',
            serviceType: 'Video Edit',
            title: 'Edit - Part 1: Installation',
            status: 'editing',
            revisionsAllowed: 2,
            creditsUsed: 20,
            inputs: { style: 'Fast paced', assets: 'Drive Link' },
            createdAt: daysAgo(2),
            updatedAt: daysAgo(0),
            aiSummary: 'Rough cut v1 uploaded to Frame.io.'
        },
        // Distribution Bucket
        {
            id: 'card-tech-dist-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: BASE_PROJECT_ID,
            serviceCategory: 'Video',
            serviceType: 'Distribution Optimization',
            title: 'SEO - Title & Description',
            status: 'distribution',
            revisionsAllowed: 1,
            creditsUsed: 5,
            inputs: { keywords: ['Next.js 15', 'React'] },
            createdAt: daysAgo(1),
            updatedAt: daysAgo(0),
            aiSummary: 'Generated 3 title variations with high CTR potential.'
        }
    ],
    tickets: [
        {
            id: 'tick-1',
            workspaceId: BASE_WORKSPACE_ID,
            title: 'Code Snippet Font Size',
            type: 'revision',
            status: 'open',
            priority: 'normal',
            createdAt: daysAgo(1),
            updatedAt: daysAgo(1),
            messages: [{ id: 'm1', senderId: 'user', senderType: 'user', text: 'Can we make the VS Code font 20% larger in the mobile edit?', timestamp: daysAgo(1) }]
        }
    ]
};

// 2. LIFESTYLE & VLOG
const LIFESTYLE_SET: DemoSet = {
    profile: {
        niche: "Lifestyle & Vlog",
        channelName: "Daily Sarah",
        primaryPlatform: "instagram",
        audienceLevel: "beginner",
        tone: "inspirational",
        primaryGoal: "brand",
        formats: ["Vlog", "Cinematic"]
    },
    projects: [
        {
            id: 'proj-life-1',
            workspaceId: BASE_WORKSPACE_ID,
            name: "NYC Weekend Vlog",
            type: "YouTube",
            status: "active",
            createdAt: daysAgo(3),
            updatedAt: daysAgo(0)
        }
    ],
    workCards: [
        {
            id: 'card-life-script-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-life-1',
            serviceCategory: 'Video',
            serviceType: 'Script Strategy',
            title: 'Story Arc - NYC Trip',
            status: 'scripting',
            revisionsAllowed: 1,
            creditsUsed: 10,
            inputs: { theme: 'Urban Exploration' },
            createdAt: daysAgo(4),
            updatedAt: daysAgo(3),
            aiSummary: 'Narrative arc proposed: Departure -> Arrival -> Conflict -> Resolution.'
        },
        {
            id: 'card-life-film-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-life-1',
            serviceCategory: 'Video',
            serviceType: 'Filming Guidance',
            title: 'Shoot - City Shots',
            status: 'filming',
            revisionsAllowed: 0,
            creditsUsed: 5,
            inputs: { location: 'SoHo' },
            createdAt: daysAgo(3),
            updatedAt: daysAgo(2),
            aiSummary: 'Shot list checked off.'
        },
        {
            id: 'card-life-edit-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-life-1',
            serviceCategory: 'Video',
            serviceType: 'Video Edit',
            title: 'Edit - NYC Vlog',
            status: 'editing',
            revisionsAllowed: 1,
            creditsUsed: 20,
            inputs: { style: 'Cinematic', music: 'Lo-fi' },
            createdAt: daysAgo(3),
            updatedAt: daysAgo(0),
            aiSummary: 'Color grading completed. Reviewing transition pacing.'
        },
        {
            id: 'card-life-dist-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-life-1',
            serviceCategory: 'Video',
            serviceType: 'Post Scheduling',
            title: 'IG Reels Cut',
            status: 'distribution',
            revisionsAllowed: 0,
            creditsUsed: 5,
            inputs: { platform: 'Instagram' },
            createdAt: daysAgo(1),
            updatedAt: daysAgo(0),
            aiSummary: 'Scheduled for 6pm EST peak time.'
        }
    ],
    tickets: [
        {
            id: 'tick-life-1',
            workspaceId: BASE_WORKSPACE_ID,
            title: 'Music Licensing Check',
            type: 'clarification',
            status: 'resolved',
            priority: 'high',
            createdAt: daysAgo(2),
            updatedAt: daysAgo(1),
            messages: [{ id: 'm1', senderId: 'agent', senderType: 'agent', text: 'Confirmed the jazz track is cleared for monetization.', timestamp: daysAgo(1) }]
        }
    ]
};

// 3. FINANCE
const FINANCE_SET: DemoSet = {
    profile: {
        niche: "Finance & Business",
        channelName: "Market Movers",
        primaryPlatform: "youtube",
        audienceLevel: "expert",
        tone: "analytical",
        primaryGoal: "leads",
        formats: ["Talking Head", "Data Vis"]
    },
    projects: [
        {
            id: 'proj-fin-1',
            workspaceId: BASE_WORKSPACE_ID,
            name: "Q1 Market Outlook",
            type: "YouTube",
            status: "active",
            createdAt: daysAgo(4),
            updatedAt: daysAgo(2)
        }
    ],
    workCards: [
        {
            id: 'card-fin-script-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-fin-1',
            serviceCategory: 'Video',
            serviceType: 'Script Writing',
            title: 'Script - Q1 Market Outlook',
            status: 'scripting',
            revisionsAllowed: 2,
            creditsUsed: 10,
            inputs: { topic: 'Interest Rates' },
            createdAt: daysAgo(4),
            updatedAt: daysAgo(2),
            aiSummary: 'Draft 1 ready. Includes data from Fed report.'
        },
        {
            id: 'card-fin-film-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-fin-1',
            serviceCategory: 'Video',
            serviceType: 'Teleprompter Setup',
            title: 'Shoot - Studio A',
            status: 'filming',
            revisionsAllowed: 0,
            creditsUsed: 0,
            inputs: {},
            createdAt: daysAgo(2),
            updatedAt: daysAgo(2),
            aiSummary: 'Script loaded to prompter.'
        },
        {
            id: 'card-fin-edit-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-fin-1',
            serviceCategory: 'Video',
            serviceType: 'Video Edit',
            title: 'Edit - Market Data Vis',
            status: 'editing',
            revisionsAllowed: 1,
            creditsUsed: 15,
            inputs: { style: 'Data Heavy' },
            createdAt: daysAgo(1),
            updatedAt: daysAgo(0),
            aiSummary: 'Animating charts.'
        },
        {
            id: 'card-fin-dist-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-fin-1',
            serviceCategory: 'Video',
            serviceType: 'LinkedIn Repurpose',
            title: 'LinkedIn - Key Takeaways',
            status: 'distribution',
            revisionsAllowed: 1,
            creditsUsed: 5,
            inputs: { tone: 'Professional' },
            createdAt: daysAgo(0),
            updatedAt: daysAgo(0),
            aiSummary: 'Draft text generated.'
        }
    ],
    tickets: []
};

// 4. EDUCATION
const EDUCATION_SET: DemoSet = {
    profile: {
        niche: "Education",
        channelName: "History Explained",
        primaryPlatform: "youtube",
        audienceLevel: "beginner",
        tone: "educational",
        primaryGoal: "growth",
        formats: ["Documentary", "Voiceover"]
    },
    projects: [
        {
            id: 'proj-edu-1',
            workspaceId: BASE_WORKSPACE_ID,
            name: "The Industrial Revolution",
            type: "YouTube",
            status: "active",
            createdAt: daysAgo(10),
            updatedAt: daysAgo(1)
        }
    ],
    workCards: [
        {
            id: 'card-edu-script-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-edu-1',
            serviceCategory: 'Video',
            serviceType: 'Script Research',
            title: 'Research - Fact Check',
            status: 'scripting',
            revisionsAllowed: 1,
            creditsUsed: 10,
            inputs: { topic: 'Coal Mining' },
            createdAt: daysAgo(6),
            updatedAt: daysAgo(5),
            aiSummary: 'Sources compiled.'
        },
        {
            id: 'card-edu-film-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-edu-1',
            serviceCategory: 'Video',
            serviceType: 'Voiceover Recording',
            title: 'Record - Section 1',
            status: 'filming',
            revisionsAllowed: 0,
            creditsUsed: 5,
            inputs: { mic: 'Shure SM7B' },
            createdAt: daysAgo(5),
            updatedAt: daysAgo(5),
            aiSummary: 'Script ready for read.'
        },
        {
            id: 'card-edu-edit-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-edu-1',
            serviceCategory: 'Video',
            serviceType: 'Video Edit',
            title: 'Edit - Industrial Revolution',
            status: 'editing',
            revisionsAllowed: 2,
            creditsUsed: 25,
            inputs: { style: 'Documentary' },
            createdAt: daysAgo(5),
            updatedAt: daysAgo(1),
            aiSummary: 'Animating map sequences.'
        },
        {
            id: 'card-edu-dist-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-edu-1',
            serviceCategory: 'Video',
            serviceType: 'Blog Post',
            title: 'Blog - The Industrial Revolution',
            status: 'distribution',
            revisionsAllowed: 1,
            creditsUsed: 5,
            inputs: { tone: 'Educational' },
            createdAt: daysAgo(0),
            updatedAt: daysAgo(0),
            aiSummary: 'Draft text generated.'
        }
    ],
    tickets: []
};

// 5. ENTERTAINMENT
const ENTERTAINMENT_SET: DemoSet = {
    profile: {
        niche: "Entertainment",
        channelName: "Laugh Lounge",
        primaryPlatform: "instagram", // Changed from tiktok to fit type
        audienceLevel: "beginner",
        tone: "comedic",
        primaryGoal: "growth",
        formats: ["Skit", "Reaction"]
    },
    projects: [
        {
            id: 'proj-ent-1',
            workspaceId: BASE_WORKSPACE_ID,
            name: "Viral Skit Batch 1",
            type: "Social Media",
            status: "active",
            createdAt: daysAgo(2),
            updatedAt: daysAgo(0)
        }
    ],
    workCards: [
        {
            id: 'card-ent-script-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-ent-1',
            serviceCategory: 'Video',
            serviceType: 'Skit Writing',
            title: 'Script - "POV: Your Boss"',
            status: 'scripting',
            revisionsAllowed: 1,
            creditsUsed: 5,
            inputs: { tone: 'Funny' },
            createdAt: daysAgo(2),
            updatedAt: daysAgo(1),
            aiSummary: 'Drafting punchlines.'
        },
        {
            id: 'card-ent-film-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-ent-1',
            serviceCategory: 'Video',
            serviceType: 'Filming Guidance',
            title: 'Shoot - Costume Change',
            status: 'filming',
            revisionsAllowed: 0,
            creditsUsed: 5,
            inputs: { props: ['Wig', 'Glasses'] },
            createdAt: daysAgo(1),
            updatedAt: daysAgo(1),
            aiSummary: 'Scene blocked.'
        },
        {
            id: 'card-ent-edit-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-ent-1',
            serviceCategory: 'Video',
            serviceType: 'Video Edit',
            title: 'Edit - Rough Cut',
            status: 'editing',
            revisionsAllowed: 2,
            creditsUsed: 15,
            inputs: { style: 'Fast' },
            createdAt: daysAgo(1),
            updatedAt: daysAgo(0),
            aiSummary: 'Added sound effects.'
        },
        {
            id: 'card-ent-dist-1',
            workspaceId: BASE_WORKSPACE_ID,
            projectId: 'proj-ent-1',
            serviceCategory: 'Video',
            serviceType: 'Hashtag Strategy',
            title: 'Trend Jacking - Tags',
            status: 'distribution',
            revisionsAllowed: 0,
            creditsUsed: 2,
            inputs: { platform: 'TikTok' },
            createdAt: daysAgo(0),
            updatedAt: daysAgo(0),
            aiSummary: 'Identified 3 trending sounds.'
        }
    ],
    tickets: []
};


export const DEMO_SETS: Record<string, DemoSet> = {
    "Tech & Coding": TECH_SET,
    "Lifestyle & Vlog": LIFESTYLE_SET,
    "Finance & Business": FINANCE_SET,
    "Education": EDUCATION_SET,
    "Entertainment": ENTERTAINMENT_SET
};

export const getDemoDataForNiche = (niche: string): DemoSet => {
    return DEMO_SETS[niche] || TECH_SET;
};
