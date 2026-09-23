#!/usr/bin/env node
/**
 * Preflight check for checkout byte identity.
 *
 * The evidence manifest pins receipts by raw SHA-256 over their committed bytes,
 * so a working tree whose line endings differ from the committed blobs cannot
 * verify. Two different causes produce that symptom, and they need different
 * responses:
 *
 *   1. A text file was materialised with CRLF because the local Git
 *      configuration converted it. This is repaired by re-checking out the file
 *      with the repository's `.gitattributes` policy applied, and it says nothing
 *      about the evidence itself.
 *   2. The working-tree bytes differ from the committed blob for a text file
 *      that already uses LF, which means the file was edited locally. This is
 *      real drift and must be reported as such.
 *
 * Telling those apart here keeps the later manifest verification from reporting
 * the ambiguous "hash drift" message, and keeps a local line-ending artefact
 * from looking like tampered evidence.
 *
 * Run directly, or through `npm run verify:line-endings`, which the canonical
 * reproduction command runs first.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');

/** Files whose raw bytes are pinned by the evidence manifest. */
const MANIFEST = 'docs/research/thesis-evidence-manifest.json';

function git(args, options = {}) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28, ...options });
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const countCrlf = (buffer) => (buffer.toString('latin1').match(/\r\n/g) || []).length;

/**
 * Which paths Git materialises as text under the repository's attribute policy.
 * `--stdin -z` keeps the output unambiguous for paths containing spaces.
 */
function textAttributePaths(paths) {
  const output = execFileSync('git', ['check-attr', '--stdin', '-z', 'text'], {
    cwd: root,
    input: paths.join('\0'),
    maxBuffer: 1 << 28,
  }).toString('utf8');

  const fields = output.split('\0');
  const textPaths = new Set();
  for (let index = 0; index + 2 < fields.length; index += 3) {
    const [file, , value] = [fields[index], fields[index + 1], fields[index + 2]];
    if (!file) continue;
    if (value === 'set' || value === 'auto' || value === 'lf' || value === 'crlf') textPaths.add(file);
  }
  return textPaths;
}

function trackedFiles() {
  return git(['ls-files', '-z']).split('\0').filter(Boolean);
}

const tracked = trackedFiles();
const textPaths = textAttributePaths(tracked);

const crlfOffenders = [];
const undeclared = [];
for (const relative of tracked) {
  const absolute = path.join(root, relative);
  let buffer;
  try {
    buffer = fs.readFileSync(absolute);
  } catch {
    continue;
  }
  if (countCrlf(buffer) === 0) continue;
  if (textPaths.has(relative)) crlfOffenders.push(relative);
  else undeclared.push(relative);
}

if (crlfOffenders.length > 0) {
  const shown = crlfOffenders.slice(0, 10).map((file) => `  - ${file}`).join('\n');
  console.error(
    `Line-ending check failed: ${crlfOffenders.length} file(s) declared as text are checked out with CRLF.\n` +
      `${shown}${crlfOffenders.length > 10 ? `\n  ... and ${crlfOffenders.length - 10} more` : ''}\n\n` +
      'The repository declares `* text eol=lf`, so a correct checkout has LF bytes and the\n' +
      'manifest-pinned receipts hash as committed. This checkout was materialised before that\n' +
      'policy applied, or by a tool that ignored it.\n\n' +
      'Repair it by re-materialising the affected files from the index:\n\n' +
      '  git rm --cached -r . > /dev/null && git reset --hard HEAD\n\n' +
      'or, without touching the index:\n\n' +
      '  git ls-files -z | xargs -0 rm -f && git checkout -- .\n',
  );
  process.exit(1);
}

const manifestPath = path.join(root, MANIFEST);
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const drift = [];
  for (const source of manifest.evidenceSources ?? []) {
    const absolute = path.join(root, source.path);
    if (!fs.existsSync(absolute)) {
      drift.push(`${source.path} (missing)`);
      continue;
    }
    const actual = sha256(fs.readFileSync(absolute));
    if (actual === source.sha256) continue;
    let blob = null;
    try {
      blob = execFileSync('git', ['show', `HEAD:${source.path}`], { cwd: root, maxBuffer: 1 << 28 });
    } catch {
      blob = null;
    }
    const resolvesToBlob = blob !== null && sha256(blob) === source.sha256;
    drift.push(
      resolvesToBlob
        ? `${source.path} (working tree differs from the committed blob but the blob matches the pin; re-checkout required)`
        : `${source.path} (working tree=${actual.slice(0, 16)}…, pinned=${source.sha256.slice(0, 16)}…)`,
    );
  }
  if (drift.length > 0) {
    console.error(
      `Evidence byte-identity check failed for ${drift.length} pinned source(s):\n` +
        drift.map((entry) => `  - ${entry}`).join('\n'),
    );
    process.exit(1);
  }
  console.log(
    `Line endings verified: LF checkout, and ${manifest.evidenceSources.length} manifest-pinned evidence source(s) match their recorded SHA-256.`,
  );
} else {
  console.log(`Line endings verified: LF checkout for ${textPaths.size} text file(s).`);
}
