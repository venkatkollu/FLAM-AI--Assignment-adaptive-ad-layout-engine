# Adaptive Ad Layout Engine

Frontend R&D assignment: a polished editor-style workspace for composing one ad creative and adapting it across multiple surfaces.

## What it demonstrates

- Four surface presets: social feed, story/reels, web billboard, and app placement.
- Live copy editing for campaign name, headline, supporting copy, and CTA.
- Brand token controls with accent palette switching.
- Safe-zone and layout-grid overlays.
- Fit/100% preview modes and zoom control.
- Adaptive composition preview with surface-specific reflow.
- Preflight status for contrast, safe areas, and text overflow.
- Exportable JSON layout spec for handoff.
- Responsive layout for desktop, tablet, and mobile.

## Run locally

```bash
pnpm install
pnpm dev
```

## Validate

```bash
pnpm check
pnpm build
```

Built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons.
