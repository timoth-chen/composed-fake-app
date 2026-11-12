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

## Demo audit corrections

The 21 occasion / How you come across contexts now have 42 distinct first picks and alternates. Original Confident picks retain their order. New combinations reuse the existing photographed mannequin top, bottom and shoe components in all four views; they do not introduce new garments. Every alternate changes all three slots. Small-change controls are explicitly **notes**, not outfit mutations, and cannot change what Wore it records. Logging waits until replacement model images decode.

Log shows every worn piece and its wear count, with no cost figures. Both entry types use occasion headings and derive their pressed state from the same session log. Weather is the stable 17° cool-day demo condition; greeting uses the browser's local time. Wardrobe metadata persists locally; log and saved fits reset on reload.

Clean recording hides prototype labels and the footer without changing viewport width or hiding navigation. Export produces the wardrobe JSON download and confirmation. Nigel critique remains in a dismissible panel. Build-a-fit retains List order and updates the active saved fit after piece changes from either Rack or List. Shopping uses consistent ordered sections and identifies duplicate items as “Good style match, already owned”.

Run `node tests/flows.cjs`, `node tests/rack-complete.cjs`, and `node tests/demo-audit-browser.cjs` (with `PLAYWRIGHT_MODULE` if needed). The audit browser check supports `APP_URL` and `CAPTURE_DIR`, exercises all 42 selections, delays image loading, verifies downloads, and captures desktop/phone evidence. Earlier screenshots and browser scripts document prior versions; the audit suite covers the current selection and recording behavior.

## Grey New Balance 996 runner

Wardrobe contains 21 pieces: the original 16 rail garments and five pairs in the Shoe drawer. The new runner is Everyday, making Style Mix Owned 8 Everyday / 7 Considered / 6 Relaxed. Both wardrobe and Log totals derive from the item count. Existing piece IDs, first picks, Shopping and the other 40 outfit selections are unchanged. Only the Everyday / Relaxed and Casual afternoon / Relaxed alternates receive the runner; Date night, Polished and Sharp selections retain their shoes. Build-a-fit marks the runner compatible with casual denim, tees, shirts, shorts and relaxed trousers, rather than Date night layers or smart pleated-trouser fits.

`node tests/runner.cjs` checks preservation against the previous wardrobe and catalogue. `node tests/runner-browser.cjs` verifies desktop/phone drawer, List, outfit, four model views, Build-a-fit and counts. It supports `APP_URL` / `CAPTURE_DIR` for live evidence.

The new product image and two coherent four-view runner outfits were made with the built-in image generation tool. Asset paths, references and prompts are recorded in `dist/assets/runner-generation.json`. Existing image files remain unchanged.

The former Off-white minimal runner is now Grey New Balance 996 runner, at the same item ID and shoe-drawer position with the same Everyday tag. The grey suede/mesh, side N logo and thicker sole distinguish it from the unchanged white leather sneaker photo. Only its two existing casual outfit images receive the new shoes; all outfit IDs and counts remain unchanged. Desktop shoe drawers show the five pairs together. Old browser-saved default runner names and cream colour migrate without clearing other edits. Current image-generation prompts and assets: `dist/assets/grey-runner-generation.json`.

## Today runner first pick

Casual afternoon / Relaxed now starts with Black crewneck knit, Dark indigo straight jeans and Grey New Balance 996 runner. Its Why, wear steps and Nigel note describe that outfit. The alternate is Sage cotton shirt, Olive fatigue trousers and Stone suede loafers: the old first pick with a different shoe, and all three slots differ from the new first pick. Everyday / Relaxed retains Black crewneck knit, Slate pleated trousers and Grey New Balance 996 runner as its alternate. These are the runner’s only two catalogue uses.

All 42 looks remain unique. All piece data, image bytes, counts, Wardrobe filters, Shopping and Log remain unchanged. `node tests/runner-first-pick.cjs` verifies those invariants; `node tests/runner-first-browser.cjs` captures the first pick and alternate on desktop/phone and writes the complete runner-use list. The browser check accepts `APP_URL` and `CAPTURE_DIR` for live verification.

## Complete outfit photos and cool-day audit

Today uses one complete four-view photograph per look. The former top/trouser/shoe image-slice compositor has been removed, so an unrelated waistband, trouser fragment or shoe cannot leak into another outfit. Eight existing complete photos are retained and 34 formerly assembled looks have new complete photos. Wardrobe product photos, all 21 item records, five shoe pairs, Shopping and Log are unchanged.

The weather basis is the app’s displayed **17°C · Cool day**, not a live weather service. All 42 looks now use full-length trousers. Sixteen combinations were adjusted: shorts became trousers and tee-only looks received an existing light layer (navy chore jacket, oatmeal cardigan or olive overshirt). Their Why, wear steps and Nigel notes describe the actual layer and trousers shown. The Casual / Relaxed grey-runner first pick and Everyday / Relaxed grey-runner alternate retain their pieces and photographs. All 42 looks remain unique and every alternate changes the top, bottom and shoes.

`dist/clean-outfits.json` records the complete catalogue, reused/new photo paths and weather changes. The exact built-in image-generation prompts and references are in `dist/assets/clean-outfits/generation.json`. Model preloading is limited to the current first pick and alternate; the previous complete model stays visible until its replacement decodes.

Run `node tests/clean-models.cjs` for catalogue/weather and unchanged-surface checks. `node tests/clean-model-browser.cjs` inspects all **42 looks / 168 rendered views**, checks transparent backgrounds, writes contact sheets and an audit JSON, and verifies dark-mode phone rendering and slow-swap continuity. It accepts `APP_URL` / `CAPTURE_DIR` for live evidence.

## Rounded natural rack side views

Seven pieces formerly used their front photo rotated with CSS, making them appear flat and stretched. Sage cotton shirt, Black crewneck knit, Oatmeal cardigan, Washed denim shirt, Navy chore jacket, Grey cotton sweatshirt and Stone straight trousers now use dedicated natural side/three-quarter product photos with rounded volume, matching the black bomber's display style. No simulated side-view flattening remains.

Original front photographs, List thumbnails, all 42 Today outfits, piece data, shoe drawer, names and counts remain unchanged. Prompt/asset records: `dist/assets/rack/side/generation.json`. `tests/rack-depth.cjs` checks those invariants, and `tests/rack-depth-browser.cjs` checks transparent side-photo silhouettes without horizontal squashing, front selection, all rail filters and phone/desktop views.
