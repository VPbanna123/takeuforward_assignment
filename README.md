# Interactive Wall Calendar (Next.js)

A polished, responsive React/Next.js implementation of the Frontend Engineering Challenge inspired by a physical wall calendar aesthetic.

## What This Delivers

- Wall-calendar visual style with spiral top, hero artwork, month stamp, and paper-like card layout
- Interactive date range selector (start, end, in-between visual states)
- Integrated notes panel with two scopes:
  - Month-level memo
  - Selection-level memo tied to selected range
- Client-side persistence using `localStorage` (no backend required)
- Fully responsive behavior:
  - Desktop: segmented calendar + notes layout
  - Mobile: stacked, touch-friendly panels
- Extra UX details:
  - Month navigation
  - Holiday markers
  - Out-of-month date click handling

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS (utility-first styling)

## Folder Structure

```text
.
├── public/
│   └── images/
│       └── calendar-hero.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── HeroPanel.tsx
│   │   │   ├── MonthNavigator.tsx
│   │   │   ├── NotesPanel.tsx
│   │   │   └── WallCalendar.tsx
│   │   └── layout/
│   │       └── AppShell.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── date.ts
│   │   └── holidays.ts
│   └── types/
│       └── calendar.ts
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Useful Scripts

- `npm run dev` - start local dev server
- `npm run lint` - run lint checks
- `npm run typecheck` - run TypeScript checks
- `npm run build` - production build verification

## Interaction Notes

- Click one day to set `start`
- Click another day after start to set `end`
- Click again after a complete range to begin a new range
- Switch between `Month Memo` and `Selection Memo` for note context
- Notes persist in `localStorage`

## Submission Checklist

- Push this project to a public GitHub/GitLab repo
- Record a short demo video showing:
  - Date range selection
  - Notes behavior
  - Desktop + mobile responsiveness
- Optional: Deploy on Vercel/Netlify and add a live link
