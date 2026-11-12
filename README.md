# Composed

A phone-first static wardrobe prototype built with HTML, CSS and vanilla JavaScript. No build step, backend, account or database.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. To use a phone on the same Wi-Fi, replace localhost with the computer's LAN IP.

## App

- **Today:** one continuous Outfit → Wear → Why flow, occasion and “How you come across” controls, one context-preserving alternate, wear logging, and faceless mannequin turn views.
- **Wardrobe:** photographic rail adapted from the Composed landing page, shoe drawer, list view, outfit builder, clothing tags and editing, and JSON export.
- **Shopping:** three illustrative purchase checks with qualitative matches, photographs and styling advice. No purchase links or percentages.
- **Log:** wears and rejections, logging streak, closet use, illustrative cost-per-wear and Owned/Worn/Liked style mix.

Light/dark themes apply to the app, model canvas and controls. Record mode hides the prototype labels and footer; the Record control reappears on hover or keyboard focus to exit.

Clothing edits save in this browser's localStorage. Logs, likes and saved fits reset on reload. There is no account sync, live weather, live photo analysis or AI service. Weather and advice are prepared demo content. The model viewer cycles through four generated views (front, right, back, left), not continuous 3D geometry. Google Fonts has system-font fallbacks.

## Deploy to Render

Create a separate **Static Site** connected to this repository:

- Build command: leave blank.
- Publish directory: `dist`.
- No environment variables, persistent disk or server required.

`render.yaml` also declares the static service. Deployment is separate from the landing-page service.

## Checks

```sh
node --check dist/app.js
node tests/flows.cjs
```

Browser checks require Playwright and installed Chrome, with the local server running:

```sh
npm install --no-save playwright
node tests/context-turn-browser.cjs
node tests/today-browser.cjs
node tests/theme-controls-browser.cjs
```

Set `PLAYWRIGHT_MODULE` to an existing Playwright module path if using an installation outside the project. These checks cover phone/desktop layouts, first-screen actions, alternate/back, preserved weather/style/occasion, model turning, Record mode, themes and dropdown sizing. Screenshots are in `previews/`.

## Assets and references

The visual reference and original garment photography come from the Composed landing-page project. The app ships its active faceless mannequin cutouts, generated turn sheets, garment fronts/sides and shopping photographs. Obsolete local image iterations are excluded from Git.

Retained third-party artifacts and their MIT license notices are documented in `dist/vendor/README.md`. The active rail uses the landing-page implementation; Embla is no longer loaded.

## Today full-outfit selection and uninterrupted images

The existing How you come across options select wardrobe-based looks per occasion, each with its own Why and wear steps. The original Confident picks preserve the Denim / Casual shorts / Date night order. Every alternate changes the top, bottom and shoes and toggles back to its first pick. All pieces come from the same 20-piece demo wardrobe.

Today keeps the previous model element mounted until the complete replacement image set has decoded. A revision guard discards stale image loads during rapid changes. No tabs, options or buttons were added.

`tests/full-outfit-browser.cjs` deliberately delays image requests for How you come across, alternate and occasion changes, checks that the old model remains mounted, and records `previews/today-full-outfit-swaps.webm`. The recorded check sampled 408 frames without a blank model. Comparison screenshots: `previews/today-confident-full.png`, `previews/today-relaxed-full.png`, `previews/today-alternate-full.png`.

## Live consistency fixes

Stone suede loafers remain in the 20-piece owned wardrobe. Shopping's third candidate is now **Light grey canvas slip-ons**, which are not owned. The owned stone loafers use a photographic thumbnail with visible suede detail and a dark sole in both Rack and List. The olive overshirt has a **Good** match and is skipped because it is already owned, consistent with its Date night use. Bomber copy explains the duplicate directly.

Today tags name the actual shown outfit. Wore it derives its checked state from that outfit's in-memory log, avoids duplicate taps, and resets with Log on reload. An embedded preview of the original model is visible on first load/reload while full-size model images decode; it uses the same retained-model swap mechanism as later outfit changes.

`tests/consistency-browser.cjs` supports `APP_URL` and `CAPTURE_DIR` to verify the deployed app directly. It delays first-load, reload and swap images and records screenshots and a video covering the nine requested fixes.
