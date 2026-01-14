export type User = {
  id: string;
  name: string;
  email: string;
  workspaceId: string;
};

export type WorkspaceStatus = 'active' | 'paused';

export type Workspace = {
  id: string;
  name: string;
  brandName: string;
  brandTone?: string;
  website?: string;
  goals?: string[];
  channels?: string[];
  credits: number;
  interactionPreference?: InteractionPreference;
  status: WorkspaceStatus;
}

export type ProjectType = 'YouTube' | 'Paid Ads' | 'Social Media' | 'Strategy' | 'Other';
export type ReviewPreference = 'consolidated' | 'stage_by_stage';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'paused';
export type InteractionPreference = 'minimal' | 'balanced' | 'hands_on';

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  reviewPreference?: ReviewPreference;
  targetDate?: string;
  servicesIncluded?: string[];
  roiNarrative?: string; // Feature 8
  createdAt: string;
  updatedAt: string;
}

// Legacy Campaign type - might deprecate or map to WorkCards
export type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Ended';
export type Campaign = {
  id: string;
  projectId: string;
  platform: 'Facebook' | 'Google' | 'TikTok' | 'LinkedIn' | 'Other';
  objective: string;
  status: CampaignStatus;
  dateRange: {
    start: string;
    end?: string;
  };
  metrics?: {
    spend: number;
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
  };
  aiSummary?: string;
  nextWeekSteps?: string[];
};

// IMPCTFUL NEW TYPES
export type ServiceCategory =
  | 'Video & Production'
  | 'Paid Growth'
  | 'Social & Content'
  | 'Strategy & Planning'
  | 'Conversion & Funnels'
  | 'Launch Support'
  | 'Paid Ads';
export type WorkCardStatus = 'draft' | 'submitted' | 'in_progress' | 'review' | 'delivered' | 'completed' | 'staged' | 'in_production';

export type TeamMember = {
  name: string;
  role: string;
  avatarUrl?: string;
  type: 'human' | 'ai';
};

export type SuggestedAction = {
  id: string;
  title: string;
  owner: 'client' | 'agency';
  status: 'pending' | 'completed';
  trigger?: string;
};

export type WorkCard = {
  id: string;
  workspaceId: string;
  projectId: string; // Parent container
  serviceCategory: ServiceCategory;
  serviceType: string; // e.g., "Short-form Video Edit"
  title: string;
  status: WorkCardStatus;
  eta?: string; // Delivery estimate
  revisionsAllowed: number;
  inputs: Record<string, any>; // Flexible JSON for brief
  deliverables?: Record<string, { status: 'pending' | 'ready', url?: string }>; // Checklist format
  metrics?: Record<string, any>; // Flexible JSON for performance data
  aiSummary?: string; // "Senior Strategist" tone
  nextSteps?: string[];
  team?: TeamMember[];
  suggestedActions?: SuggestedAction[];
  creditsUsed: number;
  createdAt: string;
  updatedAt: string;
};

export type CreditAction = 'GENERATE_SUMMARY' | 'DRAFT_NEXT_STEPS' | 'DRAFT_AD_SCRIPTS' | 'VIDEO_EDIT_REQUEST' | 'NEW_REQUEST';

export type CreditLedger = {
  id: string;
  workspaceId: string;
  action: CreditAction;
  cost: number;
  timestamp: string;
};

// TICKET SYSTEM
export type TicketType = 'clarification' | 'revision' | 'issue' | 'request' | 'announcement';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_client' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high';

export type TicketMessage = {
  id: string;
  senderId: string;
  senderType: 'user' | 'agent' | 'ai';
  text: string;
  timestamp: string;
  attachments?: string[];
};

export type Ticket = {
  id: string;
  workspaceId: string;
  linkedCardId?: string;
  title: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
};
