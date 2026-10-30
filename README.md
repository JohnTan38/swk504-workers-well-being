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
