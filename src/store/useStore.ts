import { create } from 'zustand';
import { Campaign, CreditAction, CreditLedger, Project, User, WorkCard, Workspace, Ticket, TicketMessage, TicketStatus, InteractionPreference, ServiceCategory, CreatorProfile } from '@/types';
import { getDemoDataForNiche } from '@/lib/demo-data-sets';
import { DEMO_CAMPAIGNS, DEMO_PROJECTS, DEMO_USER, DEMO_WORK_CARDS, DEMO_WORKSPACE, DEMO_TICKETS } from '@/lib/demo-data';

interface AppState {
    user: User | null;
    workspace: Workspace | null;
    creatorProfile: CreatorProfile | null;
    projects: Project[];
    workCards: WorkCard[];
    tickets: Ticket[];
    creditLedger: CreditLedger[];
    campaigns: Record<string, any>;

    // Actions
    setCreatorProfile: (profile: CreatorProfile) => void;
    getCreatorProfileContext: () => Partial<CreatorProfile> | null;
    onboardingSelections: Record<ServiceCategory, string[]>;

    initializeUser: (brandName: string, website?: string, channels?: string[], brandTone?: string, interactionPreference?: InteractionPreference) => void;
    setOnboardingSelections: (selections: Record<ServiceCategory, string[]>) => void;
    confirmProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    createWorkCard: (card: WorkCard) => void;
    updateWorkCard: (id: string, updates: Partial<WorkCard>) => void;
    createTicket: (ticket: Ticket) => void;
    addTicketMessage: (ticketId: string, message: TicketMessage) => void;
    updateTicketStatus: (ticketId: string, status: string) => void;
    toggleWorkspaceStatus: () => void;
    demoArchetype: 'shopify' | 'youtube' | 'kickstarter' | 'leads';
    setDemoArchetype: (archetype: 'shopify' | 'youtube' | 'kickstarter' | 'leads') => void;
    loadDemoData: (niche: string) => void;

    // Legacy / Other
    addCampaign: (campaign: any) => void;
    updateCampaign: (campaignId: string, updates: any) => void;
    deductCredits: (action: CreditAction, cost: number) => boolean;
    addCredits: (amount: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
    user: DEMO_USER,
    workspace: DEMO_WORKSPACE,
    projects: DEMO_PROJECTS,
    workCards: DEMO_WORK_CARDS,
    campaigns: {
        'proj-1': DEMO_CAMPAIGNS,
    },
    tickets: DEMO_TICKETS,
    creditLedger: [],

    onboardingSelections: {} as Record<ServiceCategory, string[]>,

    initializeUser: (brandName, website, channels, brandTone = 'Professional', interactionPreference = 'balanced') => {
        const workspaceId = 'ws-1';
        const userId = 'user-1';

        const newWorkspace: Workspace = {
            id: workspaceId,
            name: `${brandName} Workspace`,
            brandName,
            website,
            channels,
            brandTone,
            interactionPreference,
            credits: 50, // Welcome bonus
            status: 'active'
        };

        const newUser: User = {
            id: userId,
            name: 'Demo User',
            email: 'demo@impctful.com',
            workspaceId,
        };

        set({
            user: newUser,
            workspace: newWorkspace,
            creditLedger: []
        });
    },

    loadDemoData: (niche: string) => {
        const data = getDemoDataForNiche(niche);

        // Merge partial profile with defaults to satisfy type
        const defaultProfile: CreatorProfile = {
            channelName: "New Channel",
            primaryPlatform: "youtube",
            niche: niche,
            audienceLevel: "intermediate",
            targetAudienceOneLiner: "People interested in specific topics",
            contentTypes: ["Video"],
            formats: ["Talking Head"],
            typicalLength: "8-20m",
            tone: "educational",
            pacing: "medium",
            ctaStyle: "subtle",
            swearing: "never",
            cadenceGoal: "1wk",
            primaryGoal: "growth",
            biggestConstraint: "time",
            integrations: { youtube: true, instagram: false, googleDrive: false, metaAds: false },
            workflow: { pipelineTemplate: 'simple', requireApproval: false },
            ...data.profile, // Overwrite with demo specifics
        } as CreatorProfile;

        set({
            creatorProfile: defaultProfile,
            projects: data.projects,
            workCards: data.workCards,
            tickets: data.tickets,
            // Also update workspace name for immersion
            workspace: get().workspace ? { ...get().workspace!, name: `${defaultProfile.channelName} Workspace` } : get().workspace
        });
    },

    setOnboardingSelections: (selections) => {
        set({ onboardingSelections: selections });
    },

    confirmProjects: (projects) => {
        set({ projects });
    },

    addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),

    createWorkCard: (card) =>
        set((state) => ({ workCards: [card, ...state.workCards] })),

    updateWorkCard: (id, updates) =>
        set((state) => ({
            workCards: state.workCards.map((c: WorkCard) => (c.id === id ? { ...c, ...updates } : c)),
        })),

    addCampaign: (campaign) =>
        set((state) => {
            const existing = state.campaigns[campaign.projectId] || [];
            return {
                campaigns: {
                    ...state.campaigns,
                    [campaign.projectId]: [...existing, campaign],
                },
            };
        }),

    updateCampaign: (campaignId, updates) =>
        set((state) => {
            const newCampaigns = { ...state.campaigns };
            for (const projId in newCampaigns) {
                const idx = newCampaigns[projId].findIndex((c: Campaign) => c.id === campaignId);
                if (idx !== -1) {
                    newCampaigns[projId][idx] = { ...newCampaigns[projId][idx], ...updates };
                    break;
                }
            }
            return { campaigns: newCampaigns };
        }),

    deductCredits: (action, cost) => {
        const { workspace, creditLedger } = get();
        if (!workspace || workspace.credits < cost) return false;

        const newLedgerEntry: CreditLedger = {
            id: `led-${Date.now()}`,
            workspaceId: workspace.id,
            action,
            cost,
            timestamp: new Date().toISOString(),
        };

        set({
            workspace: { ...workspace, credits: workspace.credits - cost },
            creditLedger: [newLedgerEntry, ...creditLedger],
        });
        return true;
    },

    addCredits: (amount) =>
        set((state) => state.workspace ? ({
            workspace: { ...state.workspace, credits: state.workspace.credits + amount }
        }) : {}),

    createTicket: (ticket) =>
        set((state) => ({ tickets: [ticket, ...state.tickets] })),

    addTicketMessage: (ticketId, message) =>
        set((state) => ({
            tickets: state.tickets.map(t =>
                t.id === ticketId
                    ? { ...t, messages: [...t.messages, message], updatedAt: new Date().toISOString() }
                    : t
            )
        })),

    updateTicketStatus: (ticketId, status) =>
        set((state) => {
            // Cast status to TicketStatus if needed, or assume validation happens upstream
            return {
                tickets: state.tickets.map(t =>
                    t.id === ticketId
                        ? { ...t, status: status as TicketStatus, updatedAt: new Date().toISOString() }
                        : t
                )
            };
        }),

    demoArchetype: 'youtube',
    setDemoArchetype: (archetype) => set({ demoArchetype: archetype }),



    toggleWorkspaceStatus: () =>
        set((state) => {
            if (!state.workspace) return {};
            const newStatus = state.workspace.status === 'paused' ? 'active' : 'paused';
            return { workspace: { ...state.workspace, status: newStatus } };
        }),

    // Default null
    creatorProfile: null,

    setCreatorProfile: (profile) => set({ creatorProfile: profile }),

    getCreatorProfileContext: () => {
        const { creatorProfile } = get();
        if (!creatorProfile) return null;
        return {
            niche: creatorProfile.niche,
            audienceLevel: creatorProfile.audienceLevel,
            contentTypes: creatorProfile.contentTypes,
            formats: creatorProfile.formats,
            typicalLength: creatorProfile.typicalLength,
            tone: creatorProfile.tone,
            cadenceGoal: creatorProfile.cadenceGoal,
            primaryGoal: creatorProfile.primaryGoal,
            biggestConstraint: creatorProfile.biggestConstraint,
            integrations: creatorProfile.integrations
        };
    },
}));
