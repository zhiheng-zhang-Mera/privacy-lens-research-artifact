#!/usr/bin/env node
/**
 * Recompute the raw SHA-256 pins of the evidence manifest after redaction.
 *
 * Machine-identifying strings were removed from the pinned receipts before this
 * repository was published, so the digests recorded in the historical manifest
 * no longer describe the published bytes. The pins are recomputed over the
 * published files instead of being carried over. Run with `--write` to update
 * `docs/research/thesis-evidence-manifest.json`; without it, the script only
 * reports the difference.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'docs', 'research', 'thesis-evidence-manifest.json');
const write = process.argv.includes('--write');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');

let changed = 0;
for (const source of manifest.evidenceSources) {
  const absolute = path.join(root, ...source.path.split('/'));
  if (!fs.existsSync(absolute)) {
    console.error(`missing pinned evidence source: ${source.path}`);
    process.exitCode = 1;
    continue;
  }
  const actual = sha256(fs.readFileSync(absolute));
  if (actual === source.sha256) {
    console.log(`unchanged  ${source.sha256.slice(0, 16)}…  ${source.path}`);
    continue;
  }
  console.log(`${write ? 'updated   ' : 'DRIFT     '} ${source.sha256.slice(0, 16)}… -> ${actual.slice(0, 16)}…  ${source.path}`);
  source.sha256 = actual;
  changed += 1;
}

if (write) {
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`\nmanifest rewritten with ${changed} updated pin(s)`);
} else if (changed > 0) {
  console.error(`\n${changed} pin(s) drifted; re-run with --write`);
  process.exitCode = 1;
} else {
  console.log('\nall pins match');
}
