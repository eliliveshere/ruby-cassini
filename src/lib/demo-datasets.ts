
import { Project, ServiceCategory, TeamMember, WorkspaceStatus } from '@/types';

// ============================================================================
// ARCHETYPE 1: SHOPIFY + PAID ADS (E-COMMERCE)
// ============================================================================
export const SHOPIFY_PROJECTS: Project[] = [
    {
        id: 'proj-shop-1',
        workspaceId: 'ws-shop',
        name: 'Paid Growth Experiments',
        description: 'Testing new Meta & TikTok creative angles for Q1 scale.',
        type: 'Paid Ads',
        status: 'active',
        servicesIncluded: ['Meta Ads', 'TikTok Ads', 'Creative Testing'],
        roiNarrative: 'Creative fatigue detected after Day 18 — new variants increased CTR by 22%.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-shop-2',
        workspaceId: 'ws-shop',
        name: 'Creative Refresh',
        description: 'Producing 10 UGC-style videos and 5 static banners.',
        type: 'Social Media',
        status: 'active',
        servicesIncluded: ['Video Production', 'Graphic Design'],
        roiNarrative: 'Fresh UGC assets launched last week reduced CPA by $8.50.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-shop-3',
        workspaceId: 'ws-shop',
        name: 'Conversion Optimization',
        description: 'Landing page A/B tests to improve add-to-cart rate.',
        type: 'Other',
        status: 'planning',
        servicesIncluded: ['CRO Audit', 'Landing Page Design'],
        roiNarrative: 'Initial audit identified friction at checkout; fixes prioritized.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const SHOPIFY_METRICS = {
    revenue: '$128,400',
    revenueDiff: '+12%',
    spend: '$42,300',
    roas: '3.03',
    roasTrend: 'up',
    cpa: '$38',
    cpaTrend: 'down'
};

// ============================================================================
// ARCHETYPE 2: YOUTUBE CREATOR
// ============================================================================
export const YOUTUBE_PROJECTS: Project[] = [
    {
        id: 'proj-yt-1',
        workspaceId: 'ws-yt',
        name: 'Weekly Long-Form Content',
        description: 'End-to-end production for main channel uploads.',
        type: 'YouTube',
        status: 'active',
        servicesIncluded: ['Video Editing', 'Thumbnail Design', 'Scripting'],
        roiNarrative: 'Minimal text thumbnails outperform stylized designs by 18% CTR.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-yt-2',
        workspaceId: 'ws-yt',
        name: 'Shorts Repurposing',
        description: 'Turning long-form wins into viral Shorts.',
        type: 'Social Media',
        status: 'active',
        servicesIncluded: ['Shorts Editing', 'Captioning'],
        roiNarrative: 'Shorts drove 8,000 new subscribers in the last 14 days.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-yt-3',
        workspaceId: 'ws-yt',
        name: 'Channel Optimization',
        description: 'SEO and playlist updates for evergreen views.',
        type: 'Strategy',
        status: 'completed',
        servicesIncluded: ['SEO Audit', 'Metadata Optimization'],
        roiNarrative: 'Old library views up 15% after metadata refresh.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const YOUTUBE_METRICS = {
    views: '412,000',
    viewsDiff: '+8%',
    ctr: '7.2%',
    avgViewDuration: '6:14',
    uploadConsistency: '92%'
};

// ============================================================================
// ARCHETYPE 3: KICKSTARTER / LAUNCH
// ============================================================================
export const KICKSTARTER_PROJECTS: Project[] = [
    {
        id: 'proj-ks-1',
        workspaceId: 'ws-ks',
        name: 'Campaign Assets',
        description: 'Hero video, product photography, and page layout.',
        type: 'Other',
        status: 'completed',
        servicesIncluded: ['Video Production', 'Copywriting', 'Design'],
        roiNarrative: 'Page conversion rate holding steady at 4.8% (Category avg: 2.1%).',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-ks-2',
        workspaceId: 'ws-ks',
        name: 'Launch Ads',
        description: 'Aggressive meta ads to drive Day 1 backers.',
        type: 'Paid Ads',
        status: 'active',
        servicesIncluded: ['Meta Ads', 'Audience Building'],
        roiNarrative: 'Momentum slowed after Day 4 — urgency messaging restored conversion rate.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-ks-3',
        workspaceId: 'ws-ks',
        name: 'Influencer Seeding',
        description: 'Sending prototype units to tech reviewers.',
        type: 'Strategy',
        status: 'active',
        servicesIncluded: ['Influencer Outreach', 'PR'],
        roiNarrative: 'Top tier review dropped yesterday, resulting in $12k pledge spike.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];


// ============================================================================
// ARCHETYPE 4: LEADS / SALES FUNNEL
// ============================================================================
export const LEADS_PROJECTS: Project[] = [
    {
        id: 'proj-leads-1',
        workspaceId: 'ws-leads',
        name: 'Lead Capture System',
        description: 'High-converting VSL funnel setup and automation.',
        type: 'Strategy',
        status: 'active',
        servicesIncluded: ['Funnel Build', 'Automation', 'Copywriting'],
        roiNarrative: 'Instagram DM leads close 2.1x higher than landing page leads.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-leads-2',
        workspaceId: 'ws-leads',
        name: 'Follow-Up Optimization',
        description: 'Email and SMS sequences to nurture prospects.',
        type: 'Other',
        status: 'active',
        servicesIncluded: ['Email Marketing', 'SMS Automation'],
        roiNarrative: 'Re-engagement sequence recovered 12 "lost" deals this month.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'proj-leads-3',
        workspaceId: 'ws-leads',
        name: 'Sales Enablement',
        description: 'Assets to help closers sign deals faster.',
        type: 'Other',
        status: 'planning',
        servicesIncluded: ['Case Studies', 'Sales Decks'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const DEMO_DATASETS = {
    shopify: {
        projects: SHOPIFY_PROJECTS,
        metrics: SHOPIFY_METRICS,
        insights: [
            "Creative fatigue detected after Day 18 — new variants increased CTR by 22%.",
            "Checkout drop-off improved by 5% after implementing One-Click Upsell."
        ],
        team: [
            { name: "Alex", role: "Media Buyer", type: 'human' },
            { name: "Sarah", role: "Designer", type: 'human' },
            { name: "IMPCTFUL AI", role: "Planning & Analysis", type: 'ai' }
        ]
    },
    youtube: {
        projects: YOUTUBE_PROJECTS,
        metrics: YOUTUBE_METRICS,
        insights: [
            "Minimal text thumbnails outperform stylized designs by 18% CTR.",
            "Viewer retention drops at 0:45 - consider tightening the intro hook."
        ],
        team: [
            { name: "Mike", role: "Editor", type: 'human' },
            { name: "Jess", role: "Thumbnail Artist", type: 'human' },
            { name: "IMPCTFUL AI", role: "Topic Research", type: 'ai' }
        ]
    },
    kickstarter: {
        projects: KICKSTARTER_PROJECTS,
        metrics: {
            funds: '$286,000',
            goal: '190%',
            backers: '3,412',
            daysLeft: '6'
        },
        insights: [
            "Momentum slowed after Day 4 — urgency messaging restored conversion rate.",
            "Email list conversion is 3x higher than cold traffic."
        ],
        team: [
            { name: "David", role: "Campaign Manager", type: 'human' },
            { name: "Lisa", role: "PR Specialist", type: 'human' },
            { name: "IMPCTFUL AI", role: "Community Mod", type: 'ai' }
        ]
    },
    leads: {
        projects: LEADS_PROJECTS,
        metrics: {
            leads: '1,240',
            qualified: '420',
            booked: '96',
            closeRate: '29%'
        },
        insights: [
            "Instagram DM leads close 2.1x higher than landing page leads.",
            "Weekend leads need faster follow-up (under 15 mins) to convert."
        ],
        team: [
            { name: "Ryan", role: "Funnel Builder", type: 'human' },
            { name: "Emma", role: "Copywriter", type: 'human' },
            { name: "IMPCTFUL AI", role: "Lead Scoring", type: 'ai' }
        ]
    }
};
