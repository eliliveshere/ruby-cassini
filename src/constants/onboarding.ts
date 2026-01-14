
import { ServiceCategory } from "@/types";
import { SERVICE_CATALOG } from "./services";

export interface DiagnosticStep {
    id: number;
    category: ServiceCategory;
    title: string;
    description: string;
    services: string[];
}

export const ONBOARDING_STEPS: DiagnosticStep[] = [
    {
        id: 1,
        category: 'Video & Production',
        title: 'Video & Production',
        description: 'Do you need help creating or editing video content?',
        services: SERVICE_CATALOG['Video & Production']
    },
    {
        id: 2,
        category: 'Paid Growth',
        title: 'Paid Growth (Ads)',
        description: 'Are you running or planning to run paid advertising?',
        services: SERVICE_CATALOG['Paid Growth']
    },
    {
        id: 3,
        category: 'Social & Content',
        title: 'Social Media & Content',
        description: 'Do you need consistent posting or content strategy?',
        services: SERVICE_CATALOG['Social & Content']
    },
    {
        id: 4,
        category: 'Strategy & Planning',
        title: 'Strategy & Planning',
        description: 'Do you need high-level direction or roadmaps?',
        services: SERVICE_CATALOG['Strategy & Planning']
    },
    {
        id: 5,
        category: 'Conversion & Funnels',
        title: 'Conversion & Funnels',
        description: 'Do you need to improve your website or sales funnel?',
        services: SERVICE_CATALOG['Conversion & Funnels']
    },
    {
        id: 6,
        category: 'Launch Support',
        title: 'Launch Support',
        description: 'Are you launching a new product or feature soon?',
        services: SERVICE_CATALOG['Launch Support']
    }
];

export const INTRO_COPY = {
    title: "Welcome to IMPCTFUL",
    subtitle: "Let’s build your initial roadmap.",
    body: "This guided diagnostic helps us understand exactly where you need support right now. It replaces a traditional kickoff call and ensures we can start working immediately.",
    bullets: [
        "We’ll go through 6 core areas.",
        "Select strictly what you need.",
        "We’ll automatically set up your workspace based on your answers."
    ]
};
