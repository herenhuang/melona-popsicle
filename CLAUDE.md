# Helen Huang's Personal Website (helenhuang.io)

## Quick Start
```bash
npm run dev      # Start dev server (Vite)
npm run build    # tsc && vite build
npm run preview  # Preview production build
```

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 + custom CSS
- **Routing**: react-router-dom v6
- **Markdown**: react-markdown + rehype-raw + remark-gfm + gray-matter (frontmatter)
- **Animations**: framer-motion
- **Icons**: lucide-react
- **Other**: react-helmet-async (SEO), react-masonry-css, canvas-confetti

## Content System (the "CMS")
Content lives in markdown files with YAML frontmatter, loaded at build time via a custom Vite plugin.

### How it works
1. **`content/`** directory has markdown files organized by category
2. **`src/utils/vite-plugin-content.ts`** — custom Vite plugin that reads all `content/**/*.md` files, parses frontmatter with `gray-matter`, and exposes them as `virtual:content` module
3. **`src/utils/contentLoader.ts`** — provides `getNotesByCategory()` and `getNoteById()` to query the virtual module
4. **`src/data/`** — thin wrappers that export notes by category:
   - `now.ts` — exports latest "now" note (picks first from `content/now/`)
   - `journal.ts` — exports all `content/journal/` notes
   - `static.ts` — exports all `content/pages/` notes

### Content categories
```
content/
├── pages/          # Pinned/static pages (about, projects, etc.)
│   ├── about-personal.md
│   ├── about-work.md
│   └── projects.md
├── journal/        # Blog-like journal entries
│   ├── aug42025.md
│   ├── bingo.md
│   ├── feb182025.md
│   ├── june92025.md
│   ├── mar172025.md
│   ├── recognition.md
│   └── whatdis.md
└── now/            # /now page entries (latest one auto-selected)
    └── aug222025.md
```

### Frontmatter schema (all fields required unless noted)
```yaml
---
id: about_work           # URL slug — site routes to /:id
title: "👩🏻‍💼 about me"      # Display title (emojis welcome)
date: 2025-06-09T15:03:00Z  # ISO date, used for sorting
isPinned: true           # (optional) Show in "Pinned" section
pinnedOrder: 1           # (optional) Sort order within pinned (1 = top)
---
```

### To add/edit content
- **Add a new note**: Create a `.md` file in the appropriate `content/` subdirectory with valid frontmatter. It auto-loads — no code changes needed.
- **Edit content**: Just edit the markdown file. Vite HMR picks up changes in dev.
- **Pin a note**: Set `isPinned: true` and `pinnedOrder: N` in frontmatter.
- **The "now" page**: Whatever file is in `content/now/` with the most recent date automatically becomes the current /now page and gets pinned in the sidebar. Old now files automatically get unpinned and appear in "Older Notes". No need to set `isPinned` or `pinnedOrder` in now page frontmatter — the system handles it. To post a new update, just create a new file in `content/now/` with a newer date.

### Note type definition (`src/data/types.ts`)
```ts
interface Note {
  id: string;           // URL slug
  title: string;
  date: string;         // ISO date
  content: string;      // Markdown body
  isPinned?: boolean;
  pinnedOrder?: number; // 1 = top
}
```

## Site Structure

### Routes (`src/App.tsx`)
| Route | What it shows |
|-------|--------------|
| `/` | NowPage with latest now note selected (same as /now) |
| `/now` | NowPage with latest now note selected |
| `/:noteId` | NowPage with that note selected |
| `/baggy` | Standalone BAGGY fashion show page (separate design) |

### Main UI: NowPage (`src/components/NowPage.tsx`)
Apple Notes-inspired layout:
- **Desktop**: Sidebar (320px) with pinned + older notes list, main content area
- **Mobile**: List view → tap note → detail view with back button
- Sidebar sections: "Pinned" (sorted by `pinnedOrder`) and "Older Notes" (sorted by date desc)
- Search filters notes by title and content
- Yellow highlight (`#FFE484`) for selected note

### Key components
- `NowPage.tsx` — Main layout, note selection, search, sidebar
- `MarkdownContent.tsx` — Renders markdown with react-markdown
- `LoadingScreen.tsx` — Initial loading animation
- `BaggySSPage.tsx` — Standalone /baggy page (fashion show project)
- `BaggyLayout.tsx`, `BaggyMusicPlayer.tsx`, `BaggyFooter.tsx` — Baggy sub-components

## Styling
- Tailwind config in `tailwind.config.js`
- Fonts: Sora (headings), Inter (body), Cormorant Garamond (baggy serif)
- Color palette: `#f7f7f7` sidebar bg, `#464646` text, `#969696` muted, `#FFE484` selection, `#ff6b35` primary/theme
- Custom CSS: `src/styles/grid.css`, `src/styles/baggy.css`, `src/index.css`

## Deployment
- Hosted on Netlify (based on `_redirects` files in `public/`)
- Domain: helenhuang.io
- GitHub repo: `herenhuang/melona-popsicle` (referenced in OG image URL) — NOTE: local directory is called "bangalore"

## Images & Assets
- `public/images/` — Site images (photos, etc.)
- `public/images/baggy/` — BAGGY fashion project assets (photos, videos, logos)
- `public/files/` — PDFs and other downloadable files
- `images/` (root) — appears to be source/unoptimized images

## Content Editing Workflow (for agents)
When the user asks to update content, the workflow is:
1. Edit the relevant markdown file in `content/`
2. For new images: run `npm run add-image <path-to-image> [optional-name]` — this optimizes to WebP and puts it in `public/images/`, then prints the markdown reference to use
3. Commit and push

### Image helper
```bash
npm run add-image ~/Downloads/photo.jpg          # → public/images/photo.webp
npm run add-image ~/Downloads/photo.jpg my-photo  # → public/images/my-photo.webp
```
Converts to WebP, resizes to max 1200px wide, prints markdown snippet to paste.

## Important Notes
- The `@` path alias maps to `./src/` (configured in vite.config.ts)
- No test framework is set up
- No database — everything is static markdown + git
- The Baggy page (`/baggy`) is a completely separate design from the main Notes UI
