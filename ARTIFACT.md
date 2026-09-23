# Privacy Lens thesis artifact

This document describes what the artifact reproduces, under which environment, and
where its evidence ends. It is the companion to [`README.md`](README.md) and
[`docs/ARTIFACT_SCOPE.md`](docs/ARTIFACT_SCOPE.md).

## Canonical reproduction command

```bash
npm ci
npm run reproduce:thesis-core
```

This is the only canonical core entry point, and it is the same command CI runs. It
compiles and runs the semantic suites and the temporal stress campaign; checks the
accessibility-source, release-privacy, experiment, TypeScript, lint and delivery
contracts; verifies the nine formal safety properties and the curated mutant catalogue;
validates the mapping-review packet; regenerates the corpus, device and FlowDroid
summaries and the LaTeX result macros; verifies the thesis evidence manifest, the thesis
numbers, the claim boundaries and the cited repository paths; and checks the TeX inputs,
labels, references, citations, bibliography keys, stale markers, figure paths and
duplicate long paragraphs, plus the emitted PDF prose.

Expected terminal summaries include `Thesis results verified: F-Droid N=495, device
N=233, PSS N=98.`, `Thesis evidence verified`, `Thesis numeric consistency verified` and
`Claim-evidence path traceability verified`. A successful run must leave every tracked
generated file unchanged, which `git status --short` confirms.

Two heavy checks are deliberately outside the core entry point and run as their own CI
job:

```bash
npm run verify:mutation          # applies nine registered weakenings and requires detection of each
npm run reproduce:thesis-stress  # runs the fixed-seed campaign twice and requires the runs to agree
```

## Reproducible claims

The artifact reproduces software-semantic conformance, curated mutation detection,
regulation-pack isolation, typed-policy output restrictions, accessibility source
contracts, evidence-manifest hashes, the committed aggregate summaries, FlowDroid
receipt interpretation, and thesis reference integrity. It can verify that a completed
FlowDroid invocation without an XML artifact remains recorded as missing evidence
rather than as zero flows.

## Not reproduced

The artifact does not reproduce the 233-package device campaign, the single-device UI
session, a fresh FlowDroid invocation, independent legal mapping review, participant
comprehension, multi-OEM behaviour, production signing, store acceptance, population
prevalence, or GDPR compliance. Those require hardware, restricted inputs, independent
people, external accounts or authority that the repository does not supply. Their
committed receipts are verified as records; their execution is not re-run.

## Environment lock

| Component | Frozen or recorded value |
|---|---|
| Node.js | 20.x in CI; package contract `>=20 <25` |
| npm | lock file version 3 (`packageManager` records `npm@10.8.2`) |
| Java | 17 (required only for the Android host-JVM unit tests) |
| Gradle wrapper | 8.14.3 |
| Android SDK | compile/target 36; minimum SDK 24 |
| React Native / Expo | 0.81.5 / 54.0.33 family, resolved by the npm lock |
| FlowDroid | 2.15.1 |
| FlowDroid JAR SHA-256 | `51dadead47a173c494c2fa4855b1e8bd3b54e702a2c4b5ed58e60153009ae218` |
| source/sink definition SHA-256 | `34aec214338de48f51d0289a03aaa2a02a06bab22904f697f2ad9e6864d67a49` |
| core CI OS | GitHub-hosted `ubuntu-latest` |
| device evidence | one OPPO PERM00 handset, Android 12 / API 31 |
| device build fingerprint | `OPPO/PERM00/OP4E7F:12/SP1A.210812.016/Q.206711c_1:user/release-keys` |

The `androidPlatformsDirectory` field stored inside the pinned FlowDroid receipt is a
local installation path; it records where the analysis ran, not a portable requirement.
A reproducer may use any SDK installation path that provides the required platform.

## Evidence and hashes

The machine-readable authority is
[`docs/research/thesis-evidence-manifest.json`](docs/research/thesis-evidence-manifest.json).
It pins the F-Droid census, the device aggregate and the FlowDroid receipt by raw
SHA-256 over their committed bytes. [`docs/research/release-identity.json`](docs/research/release-identity.json)
records the package, the frozen historical source baseline and the Android version
metadata. `output/thesis-results/` is generated from the committed summaries, and
`Thesis/Final/generated-results.tex` is generated from the evidence manifest.

Because the manifest pins raw bytes, the checkout must produce the committed bytes.
`.gitattributes` declares `* text eol=lf` for exactly that reason, and
`npm run verify:line-endings` runs first in the canonical command to confirm it and to
report the remedy when a checkout still carries converted line endings.

Hardware evidence is retained under `testing-report/` with denominators, failures, UI
trees, screenshots and explicit limitations. CI verifies these committed receipts and
the transformations applied to them; it does not re-run the hardware study.

## External and restricted artifacts

APK and AAB binaries are deliberately excluded from Git. The F-Droid corpus packages and
the commercial-corpus records are not redistributed. The FlowDroid JAR, Android SDK
platforms, Java runtime, Node and npm distributions, and device firmware are external
dependencies governed by their own licences. The repository carries an
all-rights-reserved notice and grants no redistribution permission; third-party and
externally sourced material remains governed by its own terms.

Production signing keys, store-console declarations, public policy and support
endpoints, independent reviewer records, AndroZoo credentials and packages, and
participant data are unavailable. Their absence is a release or study boundary, not a
negative result.
