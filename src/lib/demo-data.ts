import { Project, WorkCard, Campaign, User, Workspace } from '@/types';

export const DEMO_USER: User = {
    id: 'demo-user-1',
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    workspaceId: 'ws-demo-1',
};

export const DEMO_WORKSPACE: Workspace = {
    id: 'ws-demo-1',
    name: 'Cyberdyne Systems',
    brandName: 'Cyberdyne',
    website: 'https://cyberdyne.com',
    channels: ['LinkedIn', 'YouTube', 'Meta'],
    brandTone: 'Futuristic & Professional',
    interactionPreference: 'balanced',
    credits: 1250,
    status: 'active',
};

export const DEMO_PROJECTS: Project[] = [
    {
        id: 'proj-1',
        workspaceId: 'ws-demo-1',
        name: 'Q1 Growth Scaling',
        description: 'Aggressive user acquisition via Paid Social and Search.',
        type: 'Paid Ads',
        status: 'active',
        servicesIncluded: ['Meta Ads', 'Google Search', 'Creative Testing'],
        roiNarrative: 'This project has reduced CPA by 18% and improved lead quality, resulting in 45 qualified demos last month.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-2',
        workspaceId: 'ws-demo-1',
        name: 'Rebranding Video Series',
        description: 'High-production value brand manifesto and product showcases.',
        type: 'YouTube',
        status: 'active',
        servicesIncluded: ['Video Editing', 'Motion Graphics', 'Scripting'],
        roiNarrative: 'The Brand Manifesto has been viewed 12k times by stakeholders, securing 3 major partnerships.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-3',
        workspaceId: 'ws-demo-1',
        name: 'Content Strategy 2026',
        description: 'Long-term organic growth roadmap and pillar content.',
        type: 'Strategy',
        status: 'planning',
        servicesIncluded: ['Market Research', 'Content Calendar', 'SEO Audit'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const DEMO_CAMPAIGNS: Campaign[] = [
    {
        id: 'camp-1',
        projectId: 'proj-1',
        platform: 'Facebook',
        objective: 'Conversions',
        status: 'Active',
        dateRange: { start: '2026-01-01' },
        metrics: {
            spend: 12450,
            impressions: 450000,
            clicks: 8500,
            ctr: 1.88,
            cpc: 1.46,
            cpa: 24.50,
            roas: 4.2,
        },
        aiSummary: 'Top performing campaign this week. "Lookalike 1%" audience is driving 60% of conversions. Creative "Video_Variant_A" has fatigue; recommend rotating in new static assets.',
        nextWeekSteps: ['Rotate creatives', 'Increase budget by 10%', 'Launch retargeting layer'],
    },
    {
        id: 'camp-2',
        projectId: 'proj-1',
        platform: 'Google',
        objective: 'Brand Search',
        status: 'Active',
        dateRange: { start: '2026-01-01' },
        metrics: {
            spend: 5200,
            impressions: 12000,
            clicks: 4500,
            ctr: 37.5,
            cpc: 1.15,
            cpa: 12.20,
            roas: 8.5,
        },
        aiSummary: 'Brand defense is stable. Impression share is >90%. No major competitor conquests detected.',
        nextWeekSteps: ['Maintain current bid strategy'],
    }
];

export const DEMO_WORK_CARDS: WorkCard[] = [
    {
        id: 'card-1',
        workspaceId: 'ws-demo-1',
        projectId: 'proj-1',
        serviceCategory: 'Paid Growth',
        serviceType: 'Meta Ads Management',
        title: 'Meta Ads - Q1 Scale',
        status: 'in_progress',
        eta: 'Ongoing',
        revisionsAllowed: 99,
        inputs: {
            budget: '$50k/month',
            target: 'North America',
            offering: 'SaaS Subscription'
        },
        metrics: {
            spend: 17650,
            roas: 5.1
        },
        aiSummary: 'We are currently scaling the "Founders" ad set. Performance is exceeding targets (ROAS 5.1 vs 4.0 target). Next week, we will introduce the new user testimonial videos.',
        nextSteps: ['Scale "Founders" ad set', 'Launch "Testimonial" creative', 'Weekly sync on Friday'],
        creditsUsed: 150,
        team: [
            { name: 'Sarah C.', role: 'Growth Lead', type: 'human' },
            { name: 'Atlas AI', role: 'Campaign Manager', type: 'ai' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'card-2',
        workspaceId: 'ws-demo-1',
        projectId: 'proj-2',
        serviceCategory: 'Video & Production',
        serviceType: 'Brand Manifesto Video',
        title: 'Cyberdyne Brand Manifesto',
        status: 'review',
        eta: 'Jan 20th',
        revisionsAllowed: 2,
        inputs: {
            duration: '90s',
            tone: 'Epic, Cinematic',
            assets: 'Raw footage provided'
        },
        aiSummary: 'First cut delivered. The pacing feels improved. Please review the color grading in the second half, as requested.',
        nextSteps: ['Client feedback on V1', 'Color correction', 'Final sound mix'],
        creditsUsed: 50,
        team: [
            { name: 'Marcus W.', role: 'Creative Director', type: 'human' },
            { name: 'Lucas F.', role: 'Senior Editor', type: 'human' },
            { name: 'Vision AI', role: 'Colorist', type: 'ai' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const DEMO_TICKETS: any[] = [
    {
        id: 'tick-1',
        workspaceId: 'ws-demo-1',
        linkedCardId: 'card-1',
        title: 'Budget increase approval',
        type: 'request',
        status: 'open',
        priority: 'high',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'tick-2',
        workspaceId: 'ws-demo-1',
        linkedCardId: 'card-2',
        title: 'Review V1 Draft',
        type: 'revision',
        status: 'waiting_on_client',
        priority: 'normal',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
