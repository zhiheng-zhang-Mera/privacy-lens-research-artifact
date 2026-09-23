# Final validation report

Scope: the reconstruction of the historical repository `GDPR-project` into this
publication artifact, `privacy-lens-research-artifact`.

Every row below was executed against this repository. Where a check could not be run in
the reconstruction environment, the row says so and names the deferred condition; nothing
is marked passed on the strength of the historical repository's own claims.

Reconstruction environment: Windows, Node.js 24.14.0, npm 11.9.0, JDK 17.0.20.1 (portable,
obtained for the Android JVM tests), Android SDK with platform 36, Git with the platform
default `core.autocrlf=true`.

## Validation matrix

| Check | Result | Evidence |
|---|---|---|
| Repository created | PASS | 11 commits on `main`, new root history, no inherited ancestry; HEAD `84fb664` |
| Old repository untouched | PASS | Read-only Git commands only; the historical repository was never written to, and HEAD/tag/branches were verified unchanged |
| Canonical source identified | PASS | `10c6481d` — a strict descendant of the tagged commit, 13 commits ahead and 0 behind; see `docs/DEVELOPMENT_EVOLUTION.md` |
| Secrets removed | PASS | No credential-shaped tracked file; no token pattern matched; the only hits were base64 lock-file integrity strings, which are not credentials |
| Machine paths removed | PASS | Host paths replaced with portable placeholders in three pinned receipts, two directory defaults and four documentation sites; device serials redacted; verified by a whole-tree rescan |
| Dependencies minimized | PASS | Every package classified REQUIRED_RUNTIME / REQUIRED_BUILD / REQUIRED_TEST / OPTIONAL with a named importer or peer edge; none is unused, so none was removed |
| Fresh install | PASS | `npm ci` exit 0, 971 packages, in both the working tree and a clean clone |
| Build | PASS | `tsc --noEmit` exit 0; `expo lint` exit 0; Android `:app:testDebugUnitTest` compiles and runs |
| Unit tests | PASS | Compliance, extended, governance, temporal and information-flow runners all pass |
| Integration tests | PASS | Accessibility, release-privacy, native-fixture and experiment contracts pass; delivery verification passes |
| Mutation verification | PASS | 9/9 registered mutants detected by the compiled suite, exit 0 |
| Core reproduction | PASS | `npm run reproduce:thesis-core` exit 0 in the working tree and in a clean clone |
| Repeated reproduction | PASS | Three consecutive runs exit 0; the regenerated JSON summaries, generated macros and release manifest are byte-identical across runs |
| Deterministic artifacts | PASS | Identical SHA-256 for every generated output across runs; the PDF render instant is pinned with `SOURCE_DATE_EPOCH` |
| Result verification | PASS | 12 receipt-derived metrics recomputed from 4 pinned sources; F-Droid N=495, device N=233, PSS N=98 |
| Claim traceability | PASS | Every cited repository path resolves; claim boundaries enforced; 24 macros and the thesis numbers consistent |
| Development evolution verified | PASS | 156 historical revisions analysed; 5 stages plus this reconstruction recorded; each event mapped to revisions and files |
| Contributor attribution omitted | PASS | No author, committer or identity field in any documentation; verified by whole-tree scan |
| Tool/AI contamination absent | PASS | No development-tool reference in any migrated file or document; the disclosure draft and its cross-references were removed |
| Documentation audit | PASS | No TODO/FIXME, no casual notes, no machine paths, no unsupported numbers; publication metadata recorded as unresolved rather than invented |
| Fresh clone qualification | PASS | Clean clone with `core.autocrlf=true`: `npm ci`, `reproduce:thesis-core` and `verify` all exit 0, tree clean |
| Working tree clean | PASS | `git status` clean before and after every verification run; `npm run verify` exit 0 against the committed revision |
| Release candidate ready | PASS | Local annotated tag candidate available; publication deferred to owner approval |

## Detail on the non-trivial checks

### Byte identity across platforms

The evidence manifest pins receipts by raw SHA-256 over committed bytes, so a checkout
that converts line endings cannot verify. The repository declares `* text eol=lf`.

Verification performed: a clean clone materialised with the platform default
`core.autocrlf=true` reproduces all four pinned digests exactly, and
`scripts/verify-pinned-bytes.js` confirms the working-tree bytes, the filtered commit
bytes and the recorded pins agree. The historical revision failed this same condition;
the cause and the fix are recorded in `docs/DEVELOPMENT_EVOLUTION.md` §5.2.

### Android host-JVM tests

The Kotlin mapping suite originally could not be executed in the reconstruction
environment: the only installed JVM was Java 26 and Gradle 8.14.3 refuses to start on it.
A portable JDK 17 was obtained and the suite then ran:

```text
com.zhihengzhang.privacylens.privacy.ObservationMapperTest: tests=24 failures=0 errors=0 skipped=0
BUILD SUCCESSFUL in 6m 29s
```

`android/app/build` is ignored by `android/.gitignore`, and `git status` remained clean
after the build.

### Reproducibility of the published numbers

```text
Thesis results verified: F-Droid N=495, device N=233, PSS N=98.
Thesis evidence verified: 12 receipt-derived metrics, 4 pinned sources, release 1.15.0.
Thesis numeric consistency verified: 24 generated macros, 9 formal properties, 8 cross-references.
PDF prose consistency verified: 85 pages, 22 required fragments present, 6 retracted fragments absent.
Temporal stress reproduction verified: 112236 assertions, 6 rules matched, two runs agreed.
Mutation verification passed: 9/9 registered mutants detected.
```

Generated-output digests, identical across three consecutive runs:

| Output | SHA-256 (first 16) |
|---|---|
| `output/thesis-results/fdroid-summary.json` | `7e6fe6bb22881d26` |
| `output/thesis-results/device-summary.json` | `e5611aae52377dad` |
| `output/thesis-results/flowdroid-summary.json` | `c6cfd53440c3ccdf` |
| `output/thesis-results/missingness-summary.json` | `1d67ab1f69c003dc` |
| `Thesis/Final/generated-results.tex` | `5db78d897c2f1acc` |
| `output/pdf/Privacy-Lens-Thesis-Final.pdf` | `8aeb170c69e4530c` |

### Corrections applied during reconstruction

The migration is not a copy. These changes were required to make the artifact reproduce,
and each is recorded with its evidence:

| Change | Reason |
|---|---|
| `.gitattributes` changed from `* -text` to `* text eol=lf` with explicit `binary` markers | `-text` does not override `core.autocrlf`, so the pinned digests still failed on a Windows checkout |
| `scripts/verify-line-endings.js` and `scripts/verify-pinned-bytes.js` added | Turn an ambiguous hash-drift failure into an actionable one, and assert commit-filter stability |
| `scripts/verify-claim-paths.js` build-output patterns corrected | The check reported two citations of Gradle's build directory as broken, and only passed when a build happened to have been run |
| `tests/runThesisNumberConsistencyTests.js` packaged-tex assertion replaced | The packaged duplicate of the TeX tree is excluded, so the assertion now compares the derivative macro file against the authoritative one |
| `scripts/write-submission-manifest.js` release layer rewritten | The submission package directory is excluded; checksums now derive from the published PDF, the reproduction contract and the canonical TeX sources |
| `scripts/verify-delivery.js` required-file list and link checks rewritten | It asserted the excluded package layout; it now asserts this repository's layout and that `ARTIFACT.md` documents the scripts that exist |
| `scripts/rebuild-thesis-pdf.js` host-specific TeX path removed | A hard-coded local toolchain directory is not a portable fallback |
| `scripts/count-thesis-words.ps1` default input repointed | Its default pointed at a superseded manuscript file that is not in this artifact |
| `scripts/verify-stress-determinism.js` receipt directory renamed | The default receipt directory was the host name, which recorded machine identity in attachable local files |
| Machine identifiers redacted from pinned receipts and documentation | Absolute host paths and device serials were replaced with portable placeholders; the derived metrics were re-verified and did not change |

### Deferred, non-blocking

| Item | Status | Why it does not block |
|---|---|---|
| Repository publication on GitHub | `AWAITING_OWNER_APPROVAL` | Construction and local qualification are complete; publication is an owner decision |
| Local release tag `v1.0.0` | `NOT_CREATED` | Deferred with publication |
| DOI, venue, release date | `UNRESOLVED` | Recorded as absent in `CITATION.cff`; no value was invented |
| PDF re-render verification on this host | `NOT_RUN` | No TeX distribution is installed. The committed PDF was rendered from the corrected source and its prose is checked against that source on every run. `npm run reproduce:thesis-pdf` performs the byte comparison when a TeX distribution is present |
| Independent legal mapping review | `NOT_RUN` | Requires an independent reviewer; recorded as unsupported in `docs/TRACEABILITY.md` and `docs/LIMITATIONS.md` |
| Device campaign and analysis re-execution | `NOT_REPRODUCIBLE` | Requires the handset, the restricted corpus and the analysis distribution; receipts are hash-verified and their derived metrics are recomputed |

## Verdict

```text
FINAL_STATUS = PUBLICATION_ARTIFACT_READY_WITH_DEFERRED_METADATA
```

Deferred metadata: repository publication, DOI, venue, release date, and the optional
PDF re-render check on a host with a TeX distribution.
