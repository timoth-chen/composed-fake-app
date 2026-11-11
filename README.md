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
