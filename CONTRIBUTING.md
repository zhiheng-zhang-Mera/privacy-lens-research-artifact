# Contributing

This repository is a curated publication artifact for a completed thesis. It is not an
open-source project and no external contributions are being accepted. The rights notice in
[`LICENSE.md`](LICENSE.md) applies: no permission is granted to copy, modify or
redistribute the material here.

The guidance below is therefore for anyone extending the work **in their own fork**, and
for reviewers who want to know what this repository holds itself to.

## Before changing anything

```bash
npm ci
npm run reproduce:thesis-core
```

The core command must be green before and after a change. If it fails on the unmodified
tree, fix the environment first — the failure output names the gate, and
[`docs/REPRODUCIBILITY.md`](docs/REPRODUCIBILITY.md) covers the two most likely causes
(line-ending conversion, and local modification of a pinned receipt).

## Rules this repository follows

**Claim discipline.** Every quantitative statement in the documentation and the thesis
must be derived from a pinned receipt or produced by a command in the repository. Do not
add numbers that a run cannot reproduce. The checks that enforce this are
`npm run verify:thesis-evidence`, `npm run test:thesis-numbers`,
`npm run verify:claim-boundaries` and `npm run verify:claim-paths`.

**Evidence integrity.** The manifest pins receipts by raw SHA-256 over committed bytes. If
a pinned receipt changes, its pin must be recomputed deliberately and the derived metrics
re-verified; never edit a receipt to make a check pass. `npm run verify:line-endings`
fails early if the checkout itself is the problem.

**Limitations stay visible.** If a change narrows what the artifact can support, record it
in [`docs/LIMITATIONS.md`](docs/LIMITATIONS.md) and in
[`docs/TRACEABILITY.md`](docs/TRACEABILITY.md). Do not delete an unsupported claim; state
that it is unsupported.

**Errors fail closed.** New validation paths must reject malformed or ambiguous input
rather than degrade into a reassuring result. A new safety property belongs in the
catalogue with an executable weakening registered in
`scripts/verify-mutation-detection.js`; a catalogued property with no detected mutant is
not evidence.

**Determinism.** No wall-clock date, unseeded randomness, locale-dependent formatting, or
iteration-order-dependent output in anything a check compares. Where a value legitimately
depends on the environment, report it rather than assert it.

**Attribution policy.** Documentation describes changes to the artifact, not the people,
machines or tools involved. Contributor identity, host names, machine identifiers and
development-tool history are absent from this repository's documentation by design; keep
them out of additions. Host paths do not belong in committed files or receipts — use
environment variables, documented parameters, or relative paths.

**Naming.** Avoid development-process naming in files, scripts, tests and results:
no `final`, `final2`, `new`, `latest`, `temp`, `backup`, `copy` or version-suffix
directories. Names should state what the artifact is.

## Style

- Match the surrounding code. Comments explain *why*, not *what*.
- Do not leave commented-out implementation, debug prints, temporary flags, or
  machine-specific paths.
- Documentation is factual and neutral. No narrative framing, no marketing, no
  development diary in the README.
- Finish with `npm run verify` (the mutation-enabled superset of the core command) and a
  clean `git status --short`.

## Reporting problems

Use the repository issue tracker for reproducibility failures, documentation errors, or
claim-traceability problems. Report security issues as described in
[`SECURITY.md`](SECURITY.md), not in a public issue.
