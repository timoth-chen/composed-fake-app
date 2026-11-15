// Canonical source stays in dist/app.js and the original CSS files.
// Content hashes avoid stale Render CDN assets. Keep previously published bundles
// because cached HTML can still reference them.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const directory = path.join(__dirname, '..', 'dist');
const entryPath = path.join(directory, 'index.html');
const sources = [
  'app.js',
  'style.css',
  'landing-reference.css',
  'source-rail.css',
  'app-shell.css',
  'today-first.css',
];
let html = fs.readFileSync(entryPath, 'utf8');
const assets = sources.map(source => {
  const bytes = fs.readFileSync(path.join(directory, source));
  const extension = path.extname(source);
  const stem = path.basename(source, extension);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const filename = `${stem}.${hash}${extension}`;
  const escapedStem = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reference = source === 'app.js'
    ? /src="app(?:[.-][a-zA-Z0-9-]+)?\.js(?:\?[^\"]*)?"/
    : new RegExp(`href="${escapedStem}(?:\\.[a-f0-9]{12})?\\${extension}(?:\\?[^\"]*)?"`);

  if (!reference.test(html)) throw new Error(`Entry reference missing: ${source}`);
  html = html.replace(reference, `${source === 'app.js' ? 'src' : 'href'}="${filename}"`);
  return { filename, bytes };
});

// Validate every reference before writing anything.
for (const { filename, bytes } of assets) {
  fs.writeFileSync(path.join(directory, filename), bytes);
}
fs.writeFileSync(entryPath, html);
console.log('Prepared browser assets:\n' + assets.map(asset => `  dist/${asset.filename}`).join('\n'));
