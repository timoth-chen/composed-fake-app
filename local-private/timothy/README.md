# Timothy garments-only branch

Branch: `timothy/garments-only`. Do not merge into master or deploy to Render.

Run `npm install` then `npm run dev:timothy`. Open http://localhost:8000/?wardrobe=timothy. The regular `/` route remains the public demo. The private mode uses the same shared app UI with three personal outfits, 11 pieces, seven rail garments and four pairs of shoes. All four turn sheets show clothing only: no mannequin heads, hands, necks or real faces. Code preserves the outfit choices and full swaps.

Included media is an explicit allowlist: four clothing-only turn sheets, two product cutout atlases and four Archivo font files. No original photos/videos, face images, local screenshots or Before person reference are included.

Built-in imagegen edit prompt set: remove only visible mannequin heads, necks, hands and wrists in all four views; preserve all clothing, shoes, fit, pose, scale, column alignment and transparency; use hollow natural neckline/cuff openings. Previous local references remain outside this branch.

The Node server listens only on loopback; Render still builds/publishes the unchanged public `dist` app. No private assets are copied into `dist`.

## Headless revision
Active sheets now use `*-headless-v1.png`. Mannequin heads are removed; hands, wrists and short neutral neck stumps remain. Built-in imagegen edited only heads while preserving all outfit details and four-view alignment. Previous clothing-only sheets remain historical assets. No real face images are included.

## Local recording

Run `npm run dev:timothy` and open http://localhost:8000/?wardrobe=timothy&recording=1.
This opens the cream henley with dark indigo trousers and black clogs. Select
**Show me another outfit** for the black polo, black trousers, open Barbour plaid
jacket and cream/navy Onitsuka sneakers. The model, wardrobe thumbnails and
styling explanation update together. Scroll to **Why it works** for the short
reason. The normal entry still opens the Casual hoodie.

The personal page uses the approved headless four-view illustrations. Original
photos, videos and face images stay local and are excluded from the build.

`npm run build:timothy` creates a separate `timothy-dist` for local verification.
The bundle contains the personal catalogue and shared interface code. Public
wardrobe definitions, outfit imagery and fallback paths are removed before it
is served. The standalone output includes only its allowlisted media and shared
branding.
