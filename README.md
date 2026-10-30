# SWK504 — Migrant Workers’ Well-being (React / Vite)

## Windows PowerShell — run locally

Copy the project files into `C:\Users\admin\swk504-migrant-workers-well-being`.

```powershell
cd C:\Users\admin\swk504-migrant-workers-well-being
npm install
npm run dev
```

Open the `Local:` address printed by Vite (normally `http://localhost:5173/`).

## Build and smoke test

```powershell
npm run build
npx playwright install chromium
npm test
```

## What was repaired

- Renamed the uploaded `main.js` to `src/main.jsx` (contains JSX).
- Renamed the uploaded `App.js` to `src/App.jsx` (contains JSX).
- Renamed `post.css.js` to `postcss.config.js` and supplied Tailwind configuration.
- Removed 128 invalid `[cite: ...]` placeholders that caused compile or runtime errors. The existing prose and APA reference entries remain, but sources and numerical claims have **not** been independently verified.
- Supplied compatible React 18, Vite, Tailwind 3, PostCSS, Lucide, and Playwright config files.
- Corrected countdown timer to show MM:SS and reset to the selected slide’s time target.
- Added a small Playwright smoke test; this is **not** a claim of 100% coverage.

The included `public/swk504-mark.svg` is a neutral **project placeholder**, not an official SUSS identity asset. If you have the authorized SUSS logo at `public/suss-logo.svg`, the app displays it; otherwise it falls back to the project mark.

**If existing source files already exist in your Windows project**, back them up before overwriting; preserve any existing test suite and asset files that were not uploaded here.

## Takeaway PDF download

The **Download Takeaway** link downloads the included `public/SWK504_Men_At_Work.pdf` file. Vite serves public files at the site root, so the PDF is accessible at `http://localhost:5173/SWK504_Men_At_Work.pdf` when the development server is running. The file in `public/` is the user-supplied seven-page PDF, unchanged.

To replace the document later, overwrite `public/SWK504_Men_At_Work.pdf` with your updated PDF using the same filename. There is no Markdown download generator.

## Interactive tile inspector — reference portfolio

The hover pop-up is adapted from the tile behavior on `john-tan-data-analyst-cleverly-sg.vercel.app`. It uses a navy/red glassmorphism panel with category, metric, short description, practice relevance and topic tags. The popup follows the mouse, adjusts to screen edges, hides on mouse leave and appears when a tile is keyboard-focused. Press Escape to dismiss it.

**Changed source files:**

- `src/App.jsx` — adds `HoverTooltipArea` around the main content and `data-tooltip-*` text to 23 cards and presentation tiles. Edit these data attributes to change individual tooltip content.
- `src/components/HoverTooltipArea.jsx` — reusable React event delegation, accessibility and floating inspector renderer.
- `src/index.css` — hover elevation/glow styling and popup theme.
- `tests/smoke.spec.ts` — browser tests for popup contents, viewport positioning, hover hide and focus.

The uploaded `public/SWK504_Men_At_Work.pdf` remains unchanged and the Download Takeaway link still downloads it. The app does not require any new runtime packages for the popup.

## Academic Audit (APA 7) — QR code and course texts

The **Academic Audit (APA 7)** tab now displays the supplied `public/qr-code-men-at-work.png` near the audit heading. The image is bundled unchanged, and an adjacent link separately opens the SWK504 project website. The provided QR image decodes to `https://swk504-workers-well-being.vercel.app/`; the original image bytes are unchanged. White visual padding around the image helps camera scanning.

The **Core Groupwork Texts** section contains these APA 7-formatted book references:

- Northen, H., & Kurland, R. (2001). *Social work with groups* (3rd ed.). Columbia University Press.
- Toseland, R. W., & Rivas, R. F. (2022). *An introduction to group work practice*. Pearson Education Limited.

The original research, theory, and Singapore-context reference entries remain displayed. New textbook tiles use the existing keyboard-accessible hover inspector. The full application and PDF download are otherwise unchanged.

**Files changed:** `src/App.jsx`, `src/index.css`, `tests/smoke.spec.ts`, `README.md`; **asset added:** `public/qr-code-men-at-work.png`.
