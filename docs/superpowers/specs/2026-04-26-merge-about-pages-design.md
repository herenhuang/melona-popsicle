# Merge About Pages and Make About the Landing Page

## Goal

Combine `content/pages/about-personal.md` and `content/pages/about-work.md` into a single `content/pages/about.md`, and change the root URL (`helenhuang.io/`) to land on the new about page instead of the latest `/now` note.

## Changes

### 1. New file: `content/pages/about.md`

Frontmatter:

```yaml
---
id: about
title: 🤠 about me
date: 2026-04-26T00:00:00Z
isPinned: true
pinnedOrder: 1
---
```

Body:

```markdown
howdy, I'm Helen! yes there is a lot of text in this website but it's my site so i can do what i want.

# currently
- working on a new company to help us live more authentically in the age of AI: [Trove](https://trove.is/)

# prev stuff
- took an adult gap year and it was both awesome and anxiety-inducing ngl
- cofounder @ co.lab -- wearer of all hats, $30M+ in annual tech industry salaries for our graduates
  - forbes 30 under 30, asu+gsv 150 top startups, hustle fund affies award, and some other [accolades](/recognition)
- program + product management @ microsoft -- msft edge tech evangelism & later windows engineering/azure devops working on pricing models and dev experience
- product manager intern @ zynga -- wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months
- interned @ cibc & scotiabank -- business analyst roles back in university days
- sales -- manchuwok, canada's wonderland, shoe club

# personal pillars
- amor fati: love of fate, embracing all aspects of life, good and bad, as necessary and beautiful
- do good and help others
- variety and change is the spice of life
- happiness is when what you think, what you say, and what you do are in harmony

if anything on my page resonates with you, please feel free to reach out

- email: chat @ this site domain name!
- linkedin: [linkedin.com/in/heyohelen](https://www.linkedin.com/in/heyohelen)
- twitter: [x.com/heyohelen](https://x.com/heyohelen)
- instagram: [instagram.com/heyohelen](https://www.instagram.com/heyohelen)
```

### 2. Delete files

- `content/pages/about-personal.md`
- `content/pages/about-work.md`

The URLs `/about_personal` and `/about_work` will 404 after this. No redirects.

### 3. Update routing in `src/App.tsx`

Replace `defaultNote={nowNote.id}` with `defaultNote="about"` for the `/` route only:

```tsx
<Route path="/" element={
  <Suspense fallback={<PageFallback />}>
    <NowPage defaultNote="about" />
  </Suspense>
} />
```

The `/now` route stays unchanged — it still resolves to `nowNote.id`.

### 4. Sidebar pin order

After the change, pinned items will be:

| pinnedOrder | id | source |
|---|---|---|
| 1 | `about` | new merged file |
| 3 | `projects` | `content/pages/projects.md` |
| 4 | `mar292026` (the current /now note) | auto-pinned in `src/data/now.ts` |

No further pin-order changes needed. The new about page sits at the top of the sidebar.

### 5. SEO / OG tags

`index.html` and any default Helmet tags that describe the homepage should reflect the about page rather than the now note. Confirm `index.html` `<title>`, `<meta name="description">`, and `<meta property="og:*">` defaults are still appropriate; update if they currently reference now-page content specifically.

## Out of scope

- No redirect from old `/about_personal` and `/about_work` URLs (user chose delete-only).
- No design / layout changes to `NowPage` itself.
- No changes to `/baggy` or any journal entries.

## Acceptance

- Visiting `helenhuang.io/` shows the merged about page.
- Visiting `helenhuang.io/now` still shows the latest now note (`mar292026`).
- Visiting `helenhuang.io/about` shows the merged about page.
- `/about_personal` and `/about_work` return 404 (or whatever the SPA's missing-route behavior is).
- Sidebar shows the new "🤠 about me" pinned at the top.
