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
