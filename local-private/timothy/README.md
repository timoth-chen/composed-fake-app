# Timothy garments-only branch

Branch: `timothy/garments-only`. Do not merge into master or deploy to Render.

Run `npm install` then `npm run dev:timothy`. Open http://localhost:8000/?wardrobe=timothy. The regular `/` route remains the public demo. The private mode uses the same shared app UI with three personal outfits, 11 pieces, seven rail garments and four pairs of shoes. All four turn sheets show clothing only: no mannequin heads, hands, necks or real faces. Code preserves the outfit choices and full swaps.

Included media is an explicit allowlist: four clothing-only turn sheets, two product cutout atlases and four Archivo font files. No original photos/videos, face images, local screenshots or Before person reference are included.

Built-in imagegen edit prompt set: remove only visible mannequin heads, necks, hands and wrists in all four views; preserve all clothing, shoes, fit, pose, scale, column alignment and transparency; use hollow natural neckline/cuff openings. Previous local references remain outside this branch.

The Node server listens only on loopback; Render still builds/publishes the unchanged public `dist` app. No private assets are copied into `dist`.

## Headless revision
Active sheets now use `*-headless-v1.png`. Mannequin heads are removed; hands, wrists and short neutral neck stumps remain. Built-in imagegen edited only heads while preserving all outfit details and four-view alignment. Previous clothing-only sheets remain historical assets. No real face images are included.

## Separate Render Static Site
Name: composed-timothy. Branch: timothy/garments-only. Root Directory: blank. Build Command: node scripts/build-timothy-static.cjs. Publish Directory: timothy-dist. No environment variables required. This produces a standalone Timothy app at the site root, including headless outfit views, rail, List, Build-a-fit, Log and Toronto weather. It does not modify the existing public dist or Render service. The new site is accessible to anyone with its URL; there is no login. Build output uses an explicit media allowlist, never original personal photos, videos or face images.

## Recording outfit sequence
Fresh load shows Casual / Relaxed (hoodie, light jeans, grey runners) with both day buttons unhighlighted. Choosing Tomorrow selects Date night / Polished (black outfit and plaid jacket); Show me another outfit changes it to the cream henley outfit. Returning to Today selects Casual / Relaxed. Day buttons highlight only after an explicit tap.

## Explicit generation and scrolling
Entry shows only the questions and neutral day buttons, with no outfit or wear bar. Question edits are drafts until a day button is pressed. Another-outfit swaps preserve Today scroll position after the new sheet decodes. The default Today choice remains hoodie; Tomorrow remains black with cream as its alternate.

Latest entry behavior: grey hoodie outfit visible by default, both day buttons unhighlighted. Dropdown edits remain pending until a day button is tapped; alternate swaps keep scroll position.
