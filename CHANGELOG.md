# Changelog

All notable changes to this artifact are recorded here. The development history that led
to this state is documented separately in
[`docs/DEVELOPMENT_EVOLUTION.md`](docs/DEVELOPMENT_EVOLUTION.md); it is not a changelog
and is not reproduced here.

## [1.15.0] — publication artifact

Initial publication-grade release of this repository. It distils the final validated
implementation of the Privacy Lens research prototype into a reproducible artifact.

### Added

- Curated application source, Android module, verification and reproduction pipeline.
- Canonical reproduction entry point `npm run reproduce:thesis-core`, plus the heavy
  `verify:mutation` and `reproduce:thesis-stress` checks.
- Pinned evidence receipts with recomputed derived metrics on every run.
- Repository-level line-ending policy (`* text eol=lf`) so the pinned evidence digests
  verify on any platform regardless of the reproducer's `core.autocrlf` setting.
- `npm run verify:line-endings`, which fails early and actionably when a checkout does not
  produce the committed bytes.
- Executable mutation detection, an in-repository temporal stress campaign with a
  two-run agreement requirement, and Kotlin host-JVM unit tests.
- Documentation set: methodology, reproducibility, artifact scope, limitations,
  traceability and development evolution.
- Continuous verification: core reproduction, research reproduction, Android unit tests,
  and a byte-identity job that materialises the tree with `core.autocrlf=true`.
