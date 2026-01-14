import { ServiceCategory } from "@/types";

export const SERVICE_CATALOG: Record<ServiceCategory, string[]> = {
    'Video & Production': [
        'Short-form video edit',
        'YouTube video editing',
        'UGC-style ad edit',
        'Script review & improvement',
        'Thumbnail concept & design',
        'Video repurposing',
        'Shot list & creative direction',
        'Audio cleanup & color pass'
    ],
    'Paid Growth': [
        'Ad creative pack',
        'Creative testing plan',
        'Campaign launch plan',
        'Weekly optimization & reporting',
        'Funnel audit',
        'Retargeting strategy',
        'Scaling recommendations'
    ],
    'Social & Content': [
        'Weekly content plan',
        'Captions & hooks pack',
        'Posting cadence strategy',
        'Content repurposing plan',
        'Community engagement templates',
        'Platform optimization',
        'Monthly content review'
    ],
    'Strategy & Planning': [
        'Creative strategy',
        'Content roadmap',
        'Channel audit',
        'Competitive analysis',
        'Brand positioning',
        'Growth experiments plan',
        'KPI definition'
    ],
    'Conversion & Funnels': [
        'Landing page review',
        'Conversion audit',
        'Homepage rewrite',
        'Funnel mapping',
        'Email flow strategy',
        'Offer positioning',
        'CRO recommendations'
    ],
    'Launch Support': [
        'Launch strategy & timeline',
        'Campaign video & assets',
        'Kickstarter / launch page copy',
        'Pre-launch content plan',
        'Influencer seeding plan',
        'Launch ad strategy',
        'Post-launch optimization plan'
    ]
};

export const CATEGORY_DESCRIPTIONS: Record<ServiceCategory, string> = {
    'Video & Production': 'High-impact video editing and production for all platforms.',
    'Paid Growth': 'Scalable ad creatives and campaign management.',
    'Social & Content': 'Organic growth strategies and consistent content flow.',
    'Strategy & Planning': 'Foundational direction and growth roadmaps.',
    'Conversion & Funnels': 'Optimizing the journey from click to customer.',
    'Launch Support': 'End-to-end support for product or feature launches.'
};
