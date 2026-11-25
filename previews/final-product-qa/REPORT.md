# Public app QA · November 24, 2026

| Check | Result | Evidence |
| --- | --- | --- |
| Change a piece | PASS | Select a garment, choose a same-category alternative, preview the garments and transfer the draft to Wardrobe. The original photograph remains visible as the original outfit. |
| Occasion and impression | PASS | All 26 available combinations open a photographed outfit. Work / Polished, Work / Approachable and Date night / Confident use three different fixtures. |
| Shopping scores | PASS | All four products across six supported aesthetics, plus No preference and a custom aesthetic. Equal scores come from explicit tier assignments. The custom aesthetic has no meter. |
| Alt text | PASS | The Work side view identifies the angle and the garments shown. |
| Navigation | PASS | Today, Wardrobe, Shopping and Log show the correct active tab. |
| Responsive usability | PASS | 1440×900, 768×1024, 390×844 and 360×800. The swap control was tapped in Playwright touch emulation at the three smaller sizes. Real-device coverage was unavailable. |
| Style preference | PASS | Workwear persisted after reload. Fresh browser contexts start at No preference. |

See [the full matrix](qa-matrix.json), [Work side view](occasion-impression-alt-text.png), [Shopping result](shopping-all-aesthetics.png), and the swap previews for [desktop](desktop-swap-preview.png), [tablet](tablet-swap-preview.png), [390 px](mobile-390-swap-preview.png) and [360 px](mobile-360-swap-preview.png). The navigation captures show Log selected after cycling through the tabs.

Work fixtures come from the existing catalogue and are intended for relaxed office dress codes.

## Production follow-up

The live browser suite passed against `app.a6d48300a76e.js` from public release `5425688`. The separate `tests/public-visitor-regression.cjs` suite passed at 390 × 844 in a fresh touch-enabled browser context. It verified the Back to Composed destination and the pilot application dialog without submitting the form. It also verified the alternate outfit, all four image angle labels, swap cancellation and draft persistence, wear and undo, Rack and List, shoe filtering, saving a fit, JSON export from Settings, Shopping save and purchase recording, adding a purchase to Wardrobe, dark mode persistence, and planning and reopening an outfit from Log.

The demo supports local outfit drafts and purchase records. Garment replacements use a clothing-only preview. Shopping example scores use fixture data, and photo upload and try-on provide a preview. The run checked accessible DOM labels and used browser touch emulation. Real-device and assistive-technology sessions were outside this run.
