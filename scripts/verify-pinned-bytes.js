#!/usr/bin/env node
/**
 * Confirm that the bytes Git will commit are the bytes the evidence manifest
 * pins.
 *
 * `docs/research/thesis-evidence-manifest.json` records raw SHA-256 digests of
 * the evidence receipts, and `scripts/verify-thesis-evidence.js` recomputes them
 * from the working tree. That only holds when the commit filters leave the file
 * unchanged. This check reads each pinned path back through `git hash-object`
 * with the repository's clean filters applied, compares the filter output with
 * the working-tree bytes, and prints both digests.
 *
 * It fails when the repository's line-ending policy and the pinned digests
 * disagree, which is the specific failure that made the canonical reproduction
 * command host-dependent in earlier revisions.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'docs', 'research', 'thesis-evidence-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');

/** Clean-filtered bytes: what `git add` would store for this path. */
function filteredBytes(relative) {
  const absolute = path.join(root, ...relative.split('/'));
  // `--path` applies the path's attributes, so a text/eol filter is honoured.
  return execFileSync('git', ['hash-object', `--path=${relative}`, '-t', 'blob', '-w', '--stdin'], {
    cwd: root,
    input: fs.readFileSync(absolute),
    maxBuffer: 1 << 28,
  });
}

let failures = 0;
for (const source of manifest.evidenceSources ?? []) {
  const absolute = path.join(root, ...source.path.split('/'));
  const working = fs.readFileSync(absolute);
  const workingSha = sha256(working);

  const committed = execFileSync('git', ['hash-object', `--path=${source.path}`, '-t', 'blob', '--stdin'], {
    cwd: root,
    input: working,
    maxBuffer: 1 << 28,
  });
  const committedText = committed.toString('utf8').trim();

  // Reconstruct the stored blob content from its SHA-1 to hash the committed bytes.
  const stored = execFileSync('git', ['cat-file', 'blob', committedText], { cwd: root, maxBuffer: 1 << 28 });
  const storedSha = sha256(stored);

  const row = `${source.sha256.slice(0, 16)}… pinned  ${workingSha.slice(0, 16)}… working  ${storedSha.slice(0, 16)}… committed  ${source.path}`;
  if (workingSha === source.sha256 && storedSha === source.sha256) {
    console.log(`  OK   ${row}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${row}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} pinned source(s) do not survive the commit filters unchanged.`);
  process.exit(1);
}
console.log('\nPinned evidence is byte-stable through the commit filters.');
