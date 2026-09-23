# Reproducibility

## The reproduction contract

```bash
npm ci
npm run reproduce:thesis-core
```

The command must exit 0, print the expected summary lines, and leave every tracked
generated file unchanged. `git status --short` is the check for the last condition.

CI runs the same command on a clean Ubuntu runner with Node 20. Two heavier checks run as
a separate job because they recompile or re-render more than the core chain:

```bash
npm run verify:mutation
npm run reproduce:thesis-stress
```

## Environment

| Component | Required | Notes |
|---|---|---|
| Node.js | 20–24 | `engines` contract `>=20 <25`; CI uses 20 |
| npm | lock file version 3 | `packageManager` records `npm@10.8.2` |
| Java | 17 | only for `npm run test:android-unit`. Gradle 8.14.3 refuses to start on Java 26, and `JAVA_HOME` must point at the JDK |
| Android SDK | platform 36, build-tools 36 | only for the Android build and its unit tests |
| TeX distribution | TeX Live 2026 or equivalent | only for `npm run reproduce:thesis-pdf` |

Only Node.js and npm are needed for the core command. No device, emulator, network access,
SDK or TeX installation is involved.

## Byte identity and line endings

The evidence manifest pins receipts by **raw SHA-256 over their committed bytes**. That
makes the checkout itself part of the reproduction contract: if the working tree differs
from the committed blob, the digest cannot match.

`.gitattributes` therefore declares:

```gitattributes
* text eol=lf

*.png  binary
*.pdf  binary
...
```

`eol=lf` is enforced at checkout and overrides `core.autocrlf`; a plain `-text` marker
does not, which is the specific defect that made an earlier revision pass on Linux CI and
fail on a Windows checkout with the platform default `core.autocrlf=true`.

The canonical command runs `npm run verify:line-endings` first. It fails early, with the
repair commands, if a checkout carries converted line endings, and it distinguishes that
from genuine drift in a file that was edited locally.

## Determinism

The pipeline removes the following sources of nondeterminism:

| Source | Treatment |
|---|---|
| Wall-clock date in evaluation | The evaluation instant is injectable. Production stays wall-clock driven and fail-closed; the date-coupled suites pin the pack's own review date (`tests/pinned-evaluation-date.ts`). |
| Randomness in the corpus campaign | Fixed linear-congruential seed per case; the seed is recorded in the suite. |
| Unordered iteration in temporal evaluation | Order-invariant evaluation with an explicitly declared canonical comparator, asserted independently of the engine. |
| Filesystem and iteration order | Sorted inputs before comparison; object keys are read explicitly rather than iterated for ordering-sensitive output. |
| Locale-dependent number formatting | `toLocaleString('en-US')` where grouping is needed; decimal rounding reconciled between the summary generator and the manuscript. |
| PDF render timestamp | `SOURCE_DATE_EPOCH` and `FORCE_SOURCE_DATE` pin the render instant. |

Two environment-dependent fields remain and are reported rather than asserted:

- **PDF creation offset.** The render instant is pinned, but the zone offset of the
  rendering process enters the `CreationDate` string. The digest comparison is printed,
  not enforced, so a reproducer in another time zone sees a difference that does not
  affect content.
- **Release binary hashes.** Release APK and AAB bytes embed path and toolchain metadata.
  Sizes and the packaged permission set reproduce; binary hashes are not published as
  reproducible values.

## What is reproducible, and what is only verifiable

The distinction matters for a research artifact, so it is stated per claim in
[`TRACEABILITY.md`](TRACEABILITY.md).

- **Reproducible:** every deterministic semantic result, every derived metric recomputed
  from a pinned receipt, the generated summaries and LaTeX macros, the mutation score, the
  temporal stress totals, and the source-level thesis checks.
- **Verifiable but not reproducible:** the pinned receipts themselves. Their integrity is
  checked and their derived values are recomputed on every run, but the device campaign,
  the corpus crawl and the analysis invocation that produced them cannot be re-executed
  from this repository.

## Repeat runs

`npm run reproduce:thesis-core` is expected to be repeatable: successive runs produce
identical tracked output. `npm run reproduce:thesis-stress` runs the temporal campaign
twice within one invocation and fails if the two runs disagree on any deterministic field.

## Reporting a reproducibility failure

If the core command fails, the failure output names the gate. The two most likely
first-contact failures and their causes are:

1. **`verify:line-endings` fails.** The checkout was materialised with converted line
   endings. The command prints the repair.
2. **`verify:thesis-evidence` reports hash drift.** Either the checkout is still
   converting line endings (`verify:line-endings` would already have failed) or a pinned
   receipt was modified locally. Compare against the committed blob with
   `git diff --stat` before assuming the evidence moved.
