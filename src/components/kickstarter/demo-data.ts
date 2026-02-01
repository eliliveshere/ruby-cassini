export interface ReferrerData {
    referrer: string;
    type: 'Kickstarter' | 'Custom' | 'External';
    pledged: number;
    pledges: number;
    pledgedPercent?: number; // From CSV import
    date: string; // ISO Date
}

export const KICKSTARTER_DEMO_DATA: ReferrerData[] = [
    // last 7 days simulation
    // Day 1
    { referrer: 'Kickstarter Recommendations', type: 'Kickstarter', pledged: 1200, pledges: 15, date: new Date(Date.now() - 6 * 86400000).toISOString() },
    { referrer: 'Facebook Ads', type: 'Custom', pledged: 3500, pledges: 42, date: new Date(Date.now() - 6 * 86400000).toISOString() },

    // Day 2
    { referrer: 'Kickstarter Project We Love', type: 'Kickstarter', pledged: 2100, pledges: 28, date: new Date(Date.now() - 5 * 86400000).toISOString() },
    { referrer: 'Instagram Organic', type: 'Custom', pledged: 800, pledges: 12, date: new Date(Date.now() - 5 * 86400000).toISOString() },

    // Day 3
    { referrer: 'Kickstarter Email', type: 'Kickstarter', pledged: 4500, pledges: 55, date: new Date(Date.now() - 4 * 86400000).toISOString() },
    { referrer: 'Direct Traffic', type: 'External', pledged: 1200, pledges: 10, date: new Date(Date.now() - 4 * 86400000).toISOString() },

    // Day 4
    { referrer: 'TechCrunch Article', type: 'Custom', pledged: 12500, pledges: 130, date: new Date(Date.now() - 3 * 86400000).toISOString() },
    { referrer: 'Kickstarter Recommendations', type: 'Kickstarter', pledged: 1500, pledges: 18, date: new Date(Date.now() - 3 * 86400000).toISOString() },

    // Day 5
    { referrer: 'Facebook Ads', type: 'Custom', pledged: 4200, pledges: 50, date: new Date(Date.now() - 2 * 86400000).toISOString() },
    { referrer: 'Gadget Flow Newsletter', type: 'Custom', pledged: 3100, pledges: 35, date: new Date(Date.now() - 2 * 86400000).toISOString() },

    // Day 6
    { referrer: 'Kickstarter Project We Love', type: 'Kickstarter', pledged: 1800, pledges: 22, date: new Date(Date.now() - 1 * 86400000).toISOString() },
    { referrer: 'Twitter / X', type: 'Custom', pledged: 900, pledges: 9, date: new Date(Date.now() - 1 * 86400000).toISOString() },

    // Today
    { referrer: 'Kickstarter Recommendations', type: 'Kickstarter', pledged: 2200, pledges: 25, date: new Date().toISOString() },
    { referrer: 'Facebook Ads', type: 'Custom', pledged: 5100, pledges: 60, date: new Date().toISOString() },
    { referrer: 'Product Hunt', type: 'Custom', pledged: 6500, pledges: 75, date: new Date().toISOString() },
];

export const DEMO_NARRATIVE = {
    weeklyReview: {
        whatHappened: "Campaign momentum surged on Day 4 driven by a major press pickup (TechCrunch) and sustained paid acquisition.",
        whatItMeans: "The 'Custom' channel segment is now outperforming platform-native discovery by 2.4x, indicating strong external demand validation.",
        nextSteps: [
            "Scale Facebook Ad spend by 20% to capitalize on high ROAS window.",
            "Send a dedicated 'Thank You' update to TechCrunch backers to encourage sharing.",
            "Prepare a '48 Hours Left' asset pack for the final push."
        ]
    },
    suggestedActions: [
        "Boost the strongest referrer (Facebook Ads) with a coordinated push",
        "Send an email update highlighting the top tier",
        "Plan a 48-hour momentum push"
    ]
};
