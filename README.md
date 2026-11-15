# Composed

A phone-first wardrobe prototype using HTML, CSS and vanilla JavaScript. It runs as a static site, without a backend or database.

## Run locally

```sh
npm install
npm run build
npm run dev
```

Open http://localhost:4173. A phone on the same Wi-Fi can use the computer's LAN IP instead of localhost. Installed Google Chrome is used by the browser checks.

## Source and generated files

- `dist/app.js` and the six unversioned HTML/CSS files in `dist/` are the app source.
- `dist/assets/` contains the clothing photography, four-view model sheets, fonts and provenance records. Keep these assets intact.
- `scripts/prepare-static.cjs` writes hashed JS/CSS copies and updates `dist/index.html`. Run `npm run build` after editing source, before testing or publishing.
- New hashed bundles are ignored to keep intermediate edits out of Git status. For a release, explicitly add only the generated files referenced by `dist/index.html` using `git add -f <paths>`, plus the canonical source and index. The build command prints the active paths.
- Previously committed hashed bundles remain available because cached browser pages may still reference them. Do not remove them merely because the newest index uses another hash.
- Browser checks write disposable captures into ignored `.cache/qa/`. Set `CAPTURE_DIR` to another directory when needed. `previews/` retains deliberately published historical evidence and audit reports; tests no longer overwrite those by default.

## Current behavior

- **Today:** continuous Outfit → Wear → Why flow; occasion and come-across pickers; first pick and one full-outfit alternate; four model views. A complete next outfit is decoded before the model, pieces, labels and advice commit together. The wear bar is pinned above navigation for today's outfit, and hidden on tomorrow previews.
- **Tomorrow:** choose occasion/come-across, explicitly lock, then Change to edit. Normal mode includes the testing-only morning preview. Normal fresh load remains Right now with the outfit visible.
- **Clean recording:** the first entry from untouched Today starts with neutral timing buttons and a disabled schedule action. Once chosen, timing/plans/outfits survive entering and exiting recording. The action reads Show my outfit for Right now and Lock it in for tomorrow for tomorrow. Demo annotations, the morning testing button, text selection and empty Worn charts are hidden; navigation remains available.
- **Wardrobe:** 21 pieces: Tops 7, Bottoms 5, Layers 4, Shoes 5. Sixteen garments appear on the photographic rail; shoes stay in their five-pair drawer. Rack/List, filters, turning, editing, JSON export and Build-a-fit use the same item records.
- **Shopping:** three qualitative checks for Jacket, Overshirt and Slip-ons. All three photographs preload. Verdicts describe existing wardrobe overlap; no live analysis or purchase links.
- **Log:** session wears/rejections, closet use, piece wear counts, and Owned/Worn/Liked Style Mix. Three full pies show style, colour and clothing type, with outside percentages. Piece-count lists are collapsed initially. Counts derive from the same wardrobe and log records; Worn counts garment occurrences in logged wears.

Light and dark modes use the existing cream/charcoal/burgundy palette. Clothing edits persist in browser localStorage. Logs, likes and saved fits reset on reload. The weather is a prepared 17°C cool-day example, not live weather. Model views are four photographs, not continuous 3D geometry. There is no account sync or AI service.

## Checks

With the local server running:

```sh
npm test
npm run test:browser
```

The maintained browser suite checks atomic delayed-image swaps in normal/Clean modes, all four views, alternate/back cycles, recording state and scheduling, preview behavior, Shopping images, Log empty states, rack turning and filters, five shoes and Rack/List parity on phone and desktop.

`APP_URL` targets a deployed app; `CAPTURE_DIR` changes the evidence directory; `PLAYWRIGHT_MODULE` optionally selects another Playwright installation. Older scripts and fixtures in `tests/` document previous milestones; their historical UI expectations may differ from the current product.

## Deploy to Render

Use a Static Site connected to this repository:

- Build command: `npm run build` (or `node scripts/prepare-static.cjs`; no dependencies are needed for the static build).
- Publish directory: `dist`.
- No server, environment variables or persistent disk required.

`render.yaml` declares the static service. Deployment remains separate from the landing-page service. Content-hashed filenames prevent stale CDN JS/CSS from mixing versions.

## Assets and attribution

The visual reference and original garment photography come from the Composed landing-page project. Photo provenance and generation records remain in:

- `dist/clean-outfits.json` and `dist/assets/clean-outfits/generation.json`
- `dist/assets/runner-generation.json` and `dist/assets/grey-runner-generation.json`
- `dist/assets/rack/side/generation.json`

Retained third-party artifacts and MIT notices are documented in `dist/vendor/README.md`. The active rail uses the landing-page implementation; Embla is no longer loaded.

The light visual polish follows [unslop by Damir Sokolovsky (@heydamir)](https://heydamir.design/unslop), CC BY 4.0. Its audit and before/after report are in `previews/unslop/REPORT.md`.
