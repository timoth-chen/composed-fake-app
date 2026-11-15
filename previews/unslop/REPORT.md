# Composed — light polish

Approved direction: calm, precise, personal. Keep cream paper, burgundy ink, photographic clothing and restrained selection lines. Product: everyday outfit decisions using your own wardrobe. The outfit model and rail remain the visual focus.

## Audit and result

- Today: tiny model hints, labels and garment names; supporting header spacing crowded the model. Increased supporting text and combined the existing heading/greeting row. Kept stacked 52px fields and all control copy.
- Wardrobe: 7–10px rail labels and metadata; compact heart/arrow targets. Raised labels and details to 11–14px, used 44px minimum touch targets and tightened introductory spacing. Kept the rail and all photos intact.
- Shopping: 9–10px photo and explanation labels. Raised labels to 11–12px and advice to 14px; standardized toolbar spacing. Photo size and crop unchanged.
- Log: excessive gaps between empty sections; 40px source controls and small chart labels. Reduced empty-section spacing, used 44px controls, and enlarged chart callouts. Same pies, percentages, totals, lists and default visibility.

## Passes

1. Spacing: consistent 8/12/16/20/24px group rhythm; tighter empty states.
2. Colour: preserved the existing cream, charcoal and burgundy palette, including dark mode.
3. Icons: retained existing brand and action symbols; no icon or action replacements.
4. Copy: unchanged throughout, including requested uppercase field labels.
5. Type: larger metadata, garment labels, advice labels and chart callouts.
6. Layout: retained tabs and section order; compacted header and empty blocks.
7. Details: larger touch targets and explicit focus outlines; existing disclosure behavior preserved.
8. Visuals: no generated images or image prompts. No clothing asset, crop, sizing rule, or model-view changes.
9. Motion: removed the page entrance fade; retained rack movement and model turning.

## Verification

- `dist/app.js` and all 177 files under `dist/assets` match pre-change SHA-256 hashes (see protected-files.json).
- Atomic model swap tests: delayed image loads, three alternate/back cycles, all four views, occasion/come-across and morning reveal; normal and Clean recording.
- Recording tests: blank first entry, preserved later state, scheduling labels, hidden demo text, Shopping photos and empty Worn handling.
- Rack tests: All 16 / Tops 7 / Bottoms 5 / Layers 4; five shoes separate; Rack/List parity and turning.
- Protected data/picking functions, photos, outfit copy, verdicts and interactions unchanged. No horizontal overflow on 390px and 1440px layouts.

Method: [unslop by Damir Sokolovsky (@heydamir)](https://heydamir.design/unslop), CC BY 4.0. This pass adapts its audit and craft workflow to Composed's existing identity.
