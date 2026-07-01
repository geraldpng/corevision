# CoreVision™ — AI Workforce Intelligence Platform
### A pitch-ready interactive prototype for Corestaff Singapore

---

## Quick Start

```bash
cd corevision
npm install
npm run dev
```

Open **http://localhost:3000**

---

## Demo Flow

1. **Landing page** — premium hero, animated floating cards, Why/How/Industries sections
2. Click **"Start Assessment"** or use a **one-click demo profile** (top-right panel on step 1)
3. Complete the **8-step assessment** with smooth animated transitions
4. Watch the **AI analysis screen** (6–8 seconds, animated network)
5. Review the **Executive Workforce Intelligence Report** — scores, charts, recommendations
6. Click **"View Consultant Dashboard"** — internal CRM-style panel with lead scoring, discovery questions, cross-sell opportunities

---

## Demo Profiles (one-click autofill)

| Profile | Scenario |
|---|---|
| 🏭 Manufacturing Expansion | High-volume rapid expansion, budget approved |
| 🏥 Healthcare Provider | Critical vacancies, compliance-heavy |
| 💻 Tech Startup (Post Series B) | No HR team, scaling fast |
| 🛍 Retail Expansion | Seasonal hiring, multi-jurisdiction payroll |
| 🏦 Financial Institution | Executive search, high confidentiality |

---

## Stack

- **Next.js 15** — App Router
- **React 19** — with `use client` for interactive components
- **TypeScript** — strict mode
- **Tailwind CSS v4** — utility classes + CSS-first config
- **Framer Motion** — page transitions, floating cards, animated counters
- **Lucide React** — icons
- **Recharts** — data visualisation

## Architecture

- No backend, no database, no auth
- Assessment state saved to `localStorage` between pages
- Rule-based recommendation engine in `lib/engine.ts`
- All data is mock — safe for client demos
