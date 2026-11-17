# Timothy garments-only branch

Branch: `timothy/garments-only`. Do not merge into master or deploy to Render.

Run `npm install` then `npm run dev:timothy`. Open http://localhost:8000/?wardrobe=timothy. The regular `/` route remains the public demo. The private mode uses the same shared app UI with three personal outfits, 11 pieces, seven rail garments and four pairs of shoes. All four turn sheets show clothing only: no mannequin heads, hands, necks or real faces. Code preserves the outfit choices and full swaps.

Included media is an explicit allowlist: four clothing-only turn sheets, two product cutout atlases and four Archivo font files. No original photos/videos, face images, local screenshots or Before person reference are included.

Built-in imagegen edit prompt set: remove only visible mannequin heads, necks, hands and wrists in all four views; preserve all clothing, shoes, fit, pose, scale, column alignment and transparency; use hollow natural neckline/cuff openings. Previous local references remain outside this branch.

The Node server listens only on loopback; Render still builds/publishes the unchanged public `dist` app. No private assets are copied into `dist`.
