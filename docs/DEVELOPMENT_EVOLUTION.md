# Development evolution

## Scope

This document records how the Privacy Lens artifact reached its published state. It is
an evidence-grounded reconstruction: every statement is derived from repository facts —
source changes, test changes, configuration changes, experiment outputs, commit SHAs and
commit dates. Contributor identity, committer identity, host identity and development
tool history are deliberately absent; the record answers *what changed*, not *who
changed it*. This repository is anonymous by construction, so the record can be too.

The historical development repository is preserved as evidence and was not rewritten.
Revision identifiers below (`06c1944`, `10c6481d`, and so on) refer to commits in that
repository and are retained so each statement can be checked against its diff. The
published artifact has a new history; the revision identifiers are provenance, not
ancestry.

Commits were grouped into research events rather than listed one by one. Where a group
of mechanical commits produced one observable change, the event is described once and
its supporting revisions are listed underneath.

The record covers 156 revisions across five stages. Percentages or counts quoted in the
thesis are not repeated here as new claims; every number used in this document is either
a commit count, a file count, or a value already pinned by
[`docs/research/thesis-evidence-manifest.json`](research/thesis-evidence-manifest.json).

---

## Stage 1 — Application prototype

**Revisions:** 30 commits, 15 March – 6 April 2026, mostly on the initial branch.

### State

The repository began as an Expo/React Native application with an Android module. The
first revisions established `package.json`, the Gradle project, the tab-based
navigation shell and a settings surface. Later revisions in this stage added dashboard
and settings components.

### Research capability

At the end of this stage the repository could build and run an Android application. It
had no compliance engine, no regulation data model, no verification pipeline and no
committed evidence. The application reported device information; it did not evaluate
it.

### Known limitations

The stage produced a product shell, not a research instrument. There was no typed
evidence model, so there was no distinction between a capability declaration and an
observed event, and nothing that could refuse a malformed input. The repository carried
no tests.

### Evidence

- Revisions: `dbc6749` (initial commit), `76d4934` and the surrounding component work.
- Files established: `app/`, `components/`, `android/`, `package.json`.

---

## Stage 2 — Governance, regulation packs and offline source verification

**Revisions:** 43 commits, 30 July – 10 August 2026.

### Changes

This stage converted the prototype into a rule-governed system.

- A compliance engine and typed evidence domain were introduced under
  `src/compliance/`, with the engine separated from the interface so evaluation could be
  tested without rendering.
- The regulation pack abstraction appeared (`src/regulations/`). It separates
  jurisdiction-dependent mappings from the generic temporal evaluator, so mounting a
  different valid pack changes detection configuration rather than engine code.
- Governance for legal sources was added incrementally: source lifecycle, signed source
  bundles, offline source-content verification, a signed monotonic trust store with
  rollback and freeze resistance, witnessed trust-store releases, legal attestation, and
  fail-closed behaviour on overdue sources.
- A non-collecting decision pause was added: a private, session-only set of answers that
  clears when the finding that prompted it closes.
- The thesis source was restructured repeatedly while the implementation changed; the
  manuscript revisions in this window are the direct counterpart of the engine changes.
- A backend prototype (`backend/server.js`) was added in one revision and does not
  appear in later revisions; nothing in the final artifact depends on a server.

### Evaluation impact

Each governance feature arrived with its own versioned device acceptance round under
`testing-report/real-device-8-10-v*`, and with assertions in
`tests/runExtendedComplianceTests.ts` or `tests/runGovernanceAndPropertyTests.ts`. The
device rounds are retained in this artifact as historical evidence.

### Remaining limitations

The governance chain was verified structurally and against adversarial fixtures, but no
independent legal reviewer evaluated the mapping in this stage or later, and no
production signing identity or trust anchor was provisioned. Both remain recorded as
boundaries rather than defects.

### Evidence

- Revisions: `c5d740b`, `a40d865`, `6e54cc2`, `2bd3e02`, `c1174a7`, `23c360d`, `d8dcd7a`,
  `4e49840`, `cdc254a`, `1c5315b`.
- Files: `src/compliance/`, `src/regulations/`, `tests/runExtendedComplianceTests.ts`,
  `testing-report/real-device-8-10-v*/`.

---

## Stage 3 — Evidence expansion: corpus, device, formal and mutation work

**Revisions:** 67 commits, 11 – 31 August 2026.

### Changes

The stage moved the claim structure from "the engine behaves as specified" to "the
engine behaves as specified on evidence that is pinned, and here is what that evidence
cannot support".

- A static census of a hash-pinned open-source app-store corpus was introduced, together
  with the acquisition, filtering, exclusion and selection drivers that produce
  non-overlapping cohorts.
- A bounded physical-device campaign runner was added, together with the batch
  aggregation and telemetry-summary drivers.
- A FlowDroid interoperability path was added: a baseline runner, a converter from
  emitted XML to typed information-flow evidence, a DroidBench scoring driver, and a
  corpus-wide runner.
- A formal policy model and a claim-to-evidence matrix were introduced, and the
  information-flow suite was added.
- The thesis evidence manifest was added, pinning the census, the device aggregate and
  the analysis receipt by raw SHA-256, with `scripts/verify-thesis-evidence.js`
  recomputing every published metric from those receipts on each run.
- The canonical reproduction command `npm run reproduce:thesis-core` was assembled in
  this window, and the first CI workflow was added.

### Evaluation impact

Derived metrics became machine-checked rather than transcribed: the census counts, the
device denominators and failure taxonomy, the memory and timing percentiles, and the
missingness counts are all recomputed from committed receipts on every run.

### Failure modes identified

Three failures in this window are recorded because each changed the artifact:

1. **Installation failures were indistinguishable from package-protection failures.**
   The device runner reported a single failure class. The aggregator was changed to
   distinguish a pre-existing package from an installer failure, and the reported
   taxonomy gained the distinction.
2. **A bounded installer timeout excluded legitimately slow installations.** The runner
   treated a fixed wait as the success boundary, so slow OEM installers were recorded as
   failures. A bounded but longer installer timeout was parameterised, with the bound
   still enforced.
3. **A corpus cohort could overlap a previous cohort.** Follow-up batches could re-attempt
   packages already attempted, which would have inflated the denominators. An exclusion
   driver and a reserved-cohort step were added so later cohorts are provably
   non-overlapping.

### Remaining limitations

The device campaign ran on one handset model in a short window. The corpus is a
purposive open-source sample with no closed-source arm. FlowDroid was executed with a
bounded configuration and one recorded invocation produced no XML artifact, which is
retained as missing evidence rather than as zero flows.

### Evidence

- Revisions: `f16f569`, `83987b3`, `90dc5e3`, `c7280f8`, `3ee8db9`, `42bcd03`,
  `24c8660`, `51c28c0`, `bc2c6f0`, `febdd41`, `862db1d`, `727056c`, `7b6e002`,
  `fc489c5`, `20f87b7`, `2acd63f`, `69a240b`, `ef7f12d`, `b0d4400`.
- Files: `scripts/`, `tests/`, `experiments/`, `testing-report/fdroid-open-store-2026-08-22/`,
  `docs/research/`.
- Pinned values: `docs/research/thesis-evidence-manifest.json`.

---

## Stage 4 — Thesis finalisation

**Revisions:** 4 commits, 8 September 2026, on the then-default branch.

### Changes

- The final device acceptance round for version 1.15.0 was recorded.
- The thesis was finalised against the frozen evidence: chapter split into
  `Thesis/Final/chapter-01.tex` … `chapter-07.tex`, with `formal-evidence-model.tex`,
  `generated-results.tex` and `reference.bib`.
- A chapter-split submission package and a delivery verifier were added, so the packaged
  thesis source and the canonical source could not silently diverge.
- The publication governance record was finalised and an annotated tag
  `v1.15.0-thesis-final` was created at `acffee1e`.

### Research consequence

The state tagged `v1.15.0-thesis-final` was treated as the finished thesis revision. It
later turned out not to be the final state of the repository: a subsequent branch
carried verification and reproducibility work that never merged back, and the tagged
thesis PDF predated two corrections. That divergence is recorded in Stage 5 because it
determines which revision this artifact distils.

### Evidence

- Revisions: `73e9b9f`, `acffee1`, `0ef733a`, `f03ea0a`.
- Tag: `v1.15.0-thesis-final` → `acffee1e29f1d450aeaa92113cda59cfd309417e`.
- Files: `Thesis/Final/`, `release/submission-final/`, `scripts/verify-delivery.js`.

---

## Stage 5 — Reproducibility hardening

**Revisions:** 13 commits, 20 September 2026, on a branch 13 commits ahead of the tagged
state and 0 behind it.

This stage exists because the tagged state did not reproduce on a second host. Each
finding below was reproduced, traced to a cause, corrected, and re-verified. The
corrected state is the canonical source of this artifact.

### 5.1 Reproduction was coupled to the wall clock

**Observed behaviour.** `npm run reproduce:thesis-core` failed in the compliance suite
with a message about processing after withdrawal under consent. The failure was
date-dependent: the same revision passed or failed according to the date it was run.

**Cause.** The suite did not pin the evaluation instant, so the rule-pack engine read
the host clock. The EU GDPR pack records a source-review deadline for two consultation
sources; once the wall clock passed that deadline, the fail-closed source-review gate
correctly forced an insufficient-evidence state, which contradicted a fixture that
asserted escalation.

**Correction.** The evaluation instant was made injectable and forwarded through the
engine. The wall-clock-coupled suites pin the pack's own `lastReviewedAt`, and the
overdue branch is still asserted directly at a later date. Production behaviour is
unchanged: the runtime gate remains wall-clock driven and fail-closed.

**Verification.** The suite passes on any date, and the overdue branch remains covered
by its own assertion. `tests/pinned-evaluation-date.ts` holds the shared constant.

**Research significance.** A latent environment-dependent defect had been masked by the
date on which the checks happened to be run. The correction separates the *policy*
(which must react to the current date) from the *fixture* (which must not).

### 5.2 Checkout bytes depended on the reproducer's Git configuration

**Observed behaviour.** After the clock fix, verification failed with an evidence source
hash drift on every pinned receipt, while the files themselves were unmodified.

**Cause.** The manifest pins raw SHA-256 digests over the committed bytes. The
repository had no `.gitattributes`, so a Windows checkout with `core.autocrlf=true`
materialised LF content as CRLF. The digest was computed over the converted bytes, so it
could not match. The committed blobs held LF; the working tree held CRLF.

**Correction and its residual limit.** A `.gitattributes` file was added declaring
`* -text`. That declaration stops Git normalising the files, but it does not override
`core.autocrlf`, so it did not remove the dependence it was meant to remove. The
published artifact therefore declares `* text eol=lf` instead, with explicit `binary`
markers for binary assets. The `eol=lf` setting is enforced at checkout and does
override `core.autocrlf`.

**Verification.** A checkout materialised with `core.autocrlf=true` now produces bytes
identical to the committed blobs, the pinned digests verify, and
`npm run verify:line-endings` fails early with an actionable message if a checkout ever
diverges again. The git-level byte stability of the pinned files is asserted by
`scripts/verify-pinned-bytes.js`.

**Research significance.** Pinning raw bytes makes a manifest sensitive to every
transformation between blob and working tree. Declaring the transformation policy inside
the repository is what makes such a manifest portable.

### 5.3 The mutation score was catalogued, not executed

**Observed behaviour.** The safety-property catalogue recorded a mutation score of 9/9,
but the canonical reproduction command only checked that the catalogue named existing
test evidence. Nothing applied a mutation, so the score was an assertion about the
catalogue rather than a measurement.

**Cause.** The score was recorded by hand as evidence accompanying the property
catalogue. The verification step checked the catalogue's internal consistency and
reported that it was a structural check only.

**Correction.** An executable harness was added
(`scripts/verify-mutation-detection.js`) that applies each registered weakening to an
isolated recompiled tree and requires the suite to detect it.

**Verification and result.** The first executions reported survivors, not a clean score:

| Mutant | First result | Cause | Resolution |
|---|---|---|---|
| Verdict escalation | survived | detection was scoped to the property's catalogued test file, while the witnessing assertion lives in the main compliance runner | detection now runs the whole compiled suite |
| Synthetic promotion | survived | the candidate mutation was behaviourally equivalent; the simulator guard covers the cross-window signal, not the observation source | re-targeted at the actual guard |
| Replay increment | survived | the candidate mutation was behaviourally equivalent; replay is protected by the window-replacement filter, not the deduplication key | re-targeted at the replacement filter |
| Order sensitivity | survived | the permutation loop compared each permutation against a reference computed by the same engine, so it was self-consistent rather than order-invariant | added an independently anchored canonical-ordering assertion and re-targeted the mutation |
| History rewrite | survived | the first formulation was a no-op cast | re-modelled as hard-coding the jurisdiction in the generic evaluator |

After correction the score is a genuine 9/9 produced by execution. The originally
catalogued score was not accepted as evidence, and the thesis records that the first
execution found survivors.

**Research significance.** A recorded score that no command can reproduce is not
evidence. Two of the survivors also exposed test weaknesses rather than implementation
weaknesses, which is the more useful outcome.

### 5.4 The high-volume temporal campaign lived outside the repository

**Observed behaviour.** The thesis cited a campaign total that no command in the
repository could produce. The driver lived outside the project and used a different
harness from the committed suites.

**Cause.** The campaign was run as an external experiment and its result was written into
the evidence record without a committed driver.

**Correction.** An in-repository campaign driver was added
(`tests/runTemporalStressCampaign.ts`) with a fixed seed, a stated total and a
non-vacuity guard that fails if any registered rule goes unmatched. The external figure
is retained as a historical note and is no longer cited as the reproducible figure.

**Verification.** `npm run reproduce:thesis-stress` runs the campaign twice and requires
both runs to agree on every deterministic field. The measured total is written into the
evidence manifest and into the generated LaTeX macros, so the thesis cites a number the
repository produces.

**Research significance.** The original figure was not reproducible and was therefore not
evidence, however correct it may have been. Reimplementation from the same specification
produced a different but verifiable total.

### 5.5 Native bridge behaviour was asserted structurally, not executed

**Observed behaviour.** The Kotlin mapping from platform API names to typed observations
was covered by a source-text contract only. A change that preserved the text but broke
the mapping would not have been detected.

**Cause.** No JVM test harness existed for the native layer; the Android unit-test task
was not wired into the pipeline.

**Correction.** A JVM unit-test source set and a mapper test suite were added alongside a
refactor of the mapper, and the Android unit-test task was registered as its own CI job.

**Verification.** `npm run test:android-unit` executes 24 JVM tests, of which 11 cover
the controlled-fixture validator. The thesis number-consistency suite also pins the
values the manuscript states.

**Research significance.** The claim moved from "the source contains this text" to "the
mapping behaves this way when executed", which is the difference between a structural
proxy and a behavioural check.

### 5.6 Two thesis numbers drifted from the measured output

**Observed behaviour.** Independent review found a decimal-formatted figure in the
manuscript that did not match the measured summary, and a release-identity pointer that
referred to a superseded revision.

**Cause.** The manuscript carried transcribed values, and rounding was applied
inconsistently between the summary generator and the prose.

**Correction.** The manuscript was regenerated from the evidence manifest, the
formatting was reconciled with the generator, and the pointers were corrected. A
number-consistency suite (`tests/runThesisNumberConsistencyTests.js`) and a claim-path
check (`scripts/verify-claim-paths.js`) were added so the manuscript and the machine
record cannot diverge silently again.

**Verification.** The consistency suite checks 24 generated macros against the manifest
and the implementation constants, and the claim-path check resolves every repository path
the thesis and the claim matrix cite.

**Research significance.** The correction did not change any result; it removed a
transcription error between two representations of the same measurement.

### 5.7 The tagged state is not the canonical state

**Observed behaviour.** The default branch and its tag `v1.15.0-thesis-final` resolve to
`acffee1e`. A branch 13 commits ahead of that commit, and 0 behind it, carries the
reproducibility hardening above. The tagged thesis PDF also predates two chapter-5
corrections and contains a retracted figure.

**Cause.** The hardening work was developed on a branch and the tag was created before
that branch was reconciled with the release branch.

**Correction applied by this artifact.** The canonical source state for the
reconstruction is the later revision `10c6481d`, a strict descendant of the tagged
commit on a branch whose name records a development-environment label rather than
research content. The tag remains in the historical repository, unmodified, as the
record of what was finished first.

**Research significance.** "Latest" and "default" are not the same property, and a tag
records a decision, not an endpoint. Determining the canonical state required reading
diffs rather than trusting either the branch name or the tag.

### Evidence

- Revisions: `06c1944`, `e2ae8b7`, `cacccfa`, `6a4c8a5`, `e9826b4`, `45c4d8b`,
  `9c61abd`, `5cc1bc3`, `77e5714`, `1e545da`, `fdad9c6`, `7f5cff2`, `10c6481d`.
- Files: `.gitattributes`, `tests/pinned-evaluation-date.ts`,
  `tests/runTemporalStressCampaign.ts`, `tests/runThesisNumberConsistencyTests.js`,
  `android/app/src/test/`, `scripts/verify-mutation-detection.js`,
  `scripts/verify-stress-determinism.js`, `scripts/verify-claim-paths.js`,
  `scripts/lib/android-sdk-paths.js`.
- Branch relationship: `merge-base(9-8-Finalize, dev/thesis-finalization-alien) = acffee1e`;
  the branch is 13 ahead and 0 behind.

---

## Stage 6 — Publication artifact (this repository)

The reconstruction applies one further class of change that the historical revisions did
not: removal of machine-identifying material.

- Absolute host paths recorded inside pinned receipts were replaced with portable
  placeholders such as `<ANDROID_SDK>` and `<CORPUS_TOOLS>`; device serial numbers were
  replaced with `<DEVICE_SERIAL_REDACTED>`; directory names that carried a development
  tool's name were replaced with a neutral name in the default configuration paths of the
  corpus drivers.
- The affected receipts are the same three files the manifest pins. Their digests were
  recomputed over the published bytes, and `npm run verify:thesis-evidence` recomputes
  the published metrics from those receipts, so no derived value changed. The redaction
  record is retained locally with the reconstruction notes, not in this repository.
- Reports that described the same technical work in terms of named hosts were not
  migrated. Their verified content is re-expressed here, in
  [`docs/REPRODUCIBILITY.md`](REPRODUCIBILITY.md) and in this document, without host
  attribution.
- Line endings were normalised to LF before the first commit, so the committed bytes and
  a correct checkout are identical from the outset.

### Remaining limitations

This record covers what the repository can prove. Revision subjects that describe work
without a corresponding diff-level change are not treated as events, several early
thesis iterations are summarised rather than itemised, and decisions that left no
repository trace — for example why a particular threshold was chosen — are not
reconstructed. Those gaps are recorded in
[`docs/LIMITATIONS.md`](LIMITATIONS.md) rather than filled by inference.
