const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const adapterPath = path.join(root, 'local-private/timothy/shared-adapter.js');

// Reuse the UI while removing public data and data-specific implementations
// before the browser receives the personal bundle. Missing boundaries fail the build.
function replaceSection(source, from, to, replacement = '') {
  const start = source.indexOf(from);
  const end = source.indexOf(to, start + from.length);
  if (start < 0 || end < 0) throw new Error(`Missing personal bundle boundary: ${from} → ${to}`);
  return source.slice(0, start) + replacement + source.slice(end);
}

function privateApp() {
  let app = fs.readFileSync(path.join(root, 'dist/app.js'), 'utf8');
  const sections = [
    ['const items=', 'const metadataKey=', 'const items = personalItems();\n'],
    ['const outfits=', 'const occasions=', 'const outfits = [0, 1, 2].map(occasion => ({ids: privateIds(privatePick(occasion, false))}));\n'],
    ['// Stable context-keyed catalogue.', 'const state='],
    ['const garmentImages=', 'function btn('],
    ['function current(', '// Small changes'],
    ['function smallChanges(', 'let rackCarousel;'],
    ['function compatible(', 'function complete('],
    ['function shoppingWardrobe(', 'function shopStyle('],
    ['const styleMixPieceTags=', 'function mixBreakdown('],
    ['// Rack-only photographs', 'function railGarments('],
    ['const preloadedModelSources=', 'function preloadRail('],
  ];
  for (const [from, to, replacement] of sections) app = replaceSection(app, from, to, replacement);
  app = app
    .replace("const metadataKey='composed.wardrobe.v1'", "const metadataKey='composed.private.timothy.v1'")
    .replaceAll('Casual afternoon', 'Casual')
    .replaceAll('Everyday / work', 'Everyday')
    .replace('Faceless mannequin wearing', 'Outfit featuring')
    .replace('21-piece demo wardrobe', '11-piece wardrobe')
    .replace('o.sheet||`assets/turn-${turnSheets[state.index]}.png`', 'o.sheet')
    .replace('loadPlan();', 'loadPlan();\ninitialisePrivate();')
    .replace('replacement=shoe===5?17:5;', "replacement=items.find(p=>p.cat==='shoes'&&p.id!==shoe).id;");

  // Personal items already carry named colours. Keep the existing metadata
  // loading code, but skip the public branch's default item normalization.
  app = replaceSection(app, 'items.forEach(p=>', 'try{const saved=');
  if (/assets\/(?:turn-|wardrobe\/|rack\/|clean-outfits\/|look-|mannequin-)|\b(?:turnSheets|cleanOutfitCatalog|lookProfiles|styleMixPieceTags)\b/.test(app)) {
    throw new Error('Public wardrobe data or an image fallback remains in the personal bundle');
  }

  const adapter = fs.readFileSync(adapterPath, 'utf8');
  const imports = "import {items as privateItems, pick as privatePick} from '/__timothy/catalogue.js';\n";
  // Adapter constants must be initialized before shared state and startup run.
  return imports + adapter + '\n' + app;
}

module.exports = { privateApp };
