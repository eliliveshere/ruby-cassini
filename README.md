# AI Marketing Agency Dashboard

An AI-assisted dashboard for marketing agencies to manage projects, campaigns, and creatives.

## Features

- **Onboarding**: Create a new agency workspace.
- **Projects & Campaigns**: Visualize performance metrics across platforms (Facebook, Google, etc.).
- **AI Actions**:
    - Generative Summaries (consumes 5 credits).
    - Draft Next Steps (consumes 3 credits).
    - Video Edit Requests (consumes 20 credits).
- **CSV Import**: Update campaign metrics by uploading standardized CSV reports.
- **Credit System**: Track usage of AI features.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## usage Guide

### 1. Onboarding
Enter your Brand Name to start. This initializes a workspace with 50 credits.

### 2. Dashboard
View your active projects. Click on a project (e.g., "Q1 Growth") to see campaigns.

### 3. Campaign Management
- **View Metrics**: See live Spend, CTR, ROAS.
- **AI Summary**: Click the lightning icon to generate a performance summary.
- **Next Steps**: Click "Refresh" to draft next week's action items.
- **Video Upload**: Click "Upload Video" to submit raw clips for AI editing.

### 4. CSV Import
To update metrics, click "Import CSV" inside a project.
**Supported Key Columns**:
- `Campaign ID` (Required)
- `Spend`
- `Impressions`
- `Clicks`
- `CTR`
- `ROAS`

**Example CSV Content**:
```csv
Campaign ID,Spend,Impressions,Clicks,CTR,ROAS
camp-1,1500,50000,900,1.8,3.5
```
*(Note: Use `camp-1` to update the seeded demo campaign)*

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Icons**: Lucide React
- **CSV Parsing**: PapaParse
