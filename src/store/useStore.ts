import { create } from 'zustand';
import { Campaign, CreditAction, CreditLedger, Project, User, WorkCard, Workspace, Ticket, TicketMessage, TicketStatus, InteractionPreference, ServiceCategory } from '@/types';

interface AppState {
    user: User | null;
    workspace: Workspace | null;
    projects: Project[];
    workCards: WorkCard[];
    campaigns: Record<string, any>;
    tickets: Ticket[];
    creditLedger: CreditLedger[];

    // Actions
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

    // Legacy / Other
    addCampaign: (campaign: any) => void;
    updateCampaign: (campaignId: string, updates: any) => void;
    deductCredits: (action: CreditAction, cost: number) => boolean;
    addCredits: (amount: number) => void;
}

import { DEMO_CAMPAIGNS, DEMO_PROJECTS, DEMO_USER, DEMO_WORK_CARDS, DEMO_WORKSPACE, DEMO_TICKETS } from '@/lib/demo-data';

// ...

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

    demoArchetype: 'shopify',
    setDemoArchetype: (archetype) => set({ demoArchetype: archetype }),

    toggleWorkspaceStatus: () =>
        set((state) => {
            if (!state.workspace) return {};
            const newStatus = state.workspace.status === 'paused' ? 'active' : 'paused';
            return { workspace: { ...state.workspace, status: newStatus } };
        }),
}));
