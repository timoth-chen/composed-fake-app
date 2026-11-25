# Personal wardrobe QA

| Area | Result |
| --- | --- |
| Catalogue | Twelve records with named colours, valid categories, and decoding front thumbnails. Seven have separate side artwork. The black polo uses its front artwork in the rail, and the four shoes appear in the shoe drawer. |
| Outfit integrity | All 26 occasion/impression contexts loaded four approved views. All displayed garment names resolved to the personal catalogue. The casual photo includes a disclosed white undershirt outside the catalogue. |
| Ranking | Three approved looks constrain variety. Everyday, Casual and Date night rank their primary and alternate by the selected aesthetic. Impression changes guidance within the selected look. Work uses the Barbour fixture with distinct office advice for each offered impression. |
| Replacement | The original handler navigated straight into a Wardrobe draft. The new panel lets visitors select a garment, preview another owned garment in its category, cancel, or carry the preview into Wardrobe. A category with one owned garment shows an empty state. The recommendation photograph represents the original outfit. |
| Shopping | The four example candidates were tested across six aesthetics and No preference. Candidate tiers describe style affinity. The Timothy adapter separately determines wardrobe overlap. At 92%, the overshirt still gets a skip verdict because the Barbour covers its layering role. The 85% canvas slip-ons also get a skip verdict because the personal wardrobe already covers light casual shoes. Save, purchase recording and adding a purchase passed in disposable browser profiles. |
| Responsive and state | The browser suite passed at 1440 × 900, 768 × 1024, 390 × 844 and 360 × 800. It exercised four-angle touch and keyboard interactions, plans, wear logging, Rack/List, filters, draft and saved fits, favourites, export and theme persistence. Touch was emulated. |

The personal build strips the public wardrobe data and supplies its own catalogue, advice, view sets, Shopping overlap rules and storage namespace. The shared changes adapted from master are the garment preview, clearer score explanations, and the pre-acceptance arrow. The personal frame viewer now describes actual garments in its image labels. Public outfit rankings and wardrobe data were not imported.

Run `npm run build:timothy`, then `npm run test:browser` and `node tests/timothy-qa-matrix.cjs`. Set `CAPTURE_DIR` to an existing directory for screenshots and the JSON matrix. Set `APP_URL` for a production matrix run.
