
import { ServiceCategory } from "@/types";

export interface ProjectTemplate {
    title: string;
    description: string;
    category: ServiceCategory;
}

export const PROJECT_TEMPLATES: Record<ServiceCategory, ProjectTemplate[]> = {
    'Video & Production': [
        { title: 'Weekly Video Content', description: 'Consistent production for YT/Socials', category: 'Video & Production' },
        { title: 'Brand Story & Assets', description: 'Core foundational video assets', category: 'Video & Production' }
    ],
    'Paid Growth': [
        { title: 'Paid Growth Experiments', description: 'Testing new angles and creatives', category: 'Paid Growth' },
        { title: 'Scale & Optimization', description: 'Managing high-spend campaigns', category: 'Paid Growth' }
    ],
    'Social & Content': [
        { title: 'Social Media Management', description: 'Daily/Weekly organic growth', category: 'Social & Content' },
        { title: 'Thought Leadership', description: 'Executive presence and writing', category: 'Social & Content' }
    ],
    'Strategy & Planning': [
        { title: 'Quarterly Strategic Plan', description: 'Roadmapping and KPI setting', category: 'Strategy & Planning' },
        { title: 'Market Research', description: 'Deep dive into competitors', category: 'Strategy & Planning' }
    ],
    'Conversion & Funnels': [
        { title: 'Funnel Optimization', description: 'Improving conversion rates', category: 'Conversion & Funnels' },
        { title: 'Website Overhaul', description: 'Redesigning core site pages', category: 'Conversion & Funnels' }
    ],
    'Launch Support': [
        { title: 'Product Launch Prep', description: 'Go-to-market execution', category: 'Launch Support' }
    ]
};
