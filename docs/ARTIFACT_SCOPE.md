# Artifact scope

This repository is a curated research artifact derived from the final validated
implementation. Intermediate, experimental and superseded development material is
intentionally excluded. Nothing was deleted from the historical development repository,
and its history was not rewritten; this artifact was assembled from it rather than
carved out of it.

## What is included

| Area | Why it is here |
|---|---|
| Application source (`src/`, `app/`, `components/`, `constants/`) | The evaluated implementation. The thesis claims are claims about this code. |
| Android module (`android/`) | The native capability layer, the audit bridge, the workers, the manifest and Gradle configuration, and the JVM unit tests. |
| Reproduction and verification pipeline (`scripts/`, `tests/`) | The instrument that makes the claims checkable. This is the primary deliverable for reproducibility review. |
| Canonical experiment configuration (`experiments/`) | The mapping-review packet, the information-flow definition used by the analysis baseline, and the redacted per-sample device metrics the published percentiles are recomputed from. |
| Pinned evidence receipts (`testing-report/`) | The census, device aggregate and analysis receipt the manifest pins, plus the versioned device rounds the thesis and the claim matrix cite. |
| Generated results (`output/`) | The summaries and LaTeX macros produced from the receipts, and the compiled thesis PDF. |
| Thesis source (`Thesis/Final/`) | The manuscript the claims are made in, as LaTeX. |
| Documentation (`docs/`) | Methodology, reproducibility, scope, limitations, traceability and this reconstruction record. |
| Continuous verification (`.github/workflows/`) | The gate that keeps the commands above green on a clean machine. |

## What is excluded, and why

| Excluded material | Classification | Reason |
|---|---|---|
| Early thesis iterations and the word-processor manuscripts | archive only | Superseded by `Thesis/Final/`; they duplicate content and describe earlier revision rounds. |
| The chapter-split submission package and its checksum list | archive only | A packaging of the same `Thesis/Final/` sources for a specific submission route; the canonical sources and the compiled PDF are here. |
| Superseded result rounds under `testing-report/` | archive only | Earlier versioned rounds that no current claim cites; retained in the historical repository as implementation history. |
| Generated corpus catalogues and per-run execution reports | exclude | Their every record embeds the local path of the machine that produced them, and they are regenerable from the drivers in `scripts/`. |
| Development notes and internal planning documents | exclude | They record how the project was run, not what it established. |
| Editor, IDE and OS-specific state | exclude | Machine state with no research value. |
| Build outputs and binaries (APK, AAB, compiled artifacts) | exclude | Reproducible from source and excluded by policy; their absence is stated in the thesis. |
| Local submission material, private metadata and identifiers | exclude | Not intended for publication. |

## Why the repository is curated

A verification pipeline is only useful if a reader can tell which revision it describes.
Carrying several superseded implementations, several result rounds and several manuscript
revisions in one tree makes every claim ambiguous about which of them it refers to. The
curation rule applied here is narrow: content stays if the current claim chain depends on
it, or if it is the current implementation of something the claims name. Everything else
is left where it is, unmodified.

## What the artifact reproduces

Software-semantic conformance, curated mutation detection, regulation-pack isolation,
typed-policy output restrictions, accessibility source contracts, evidence-manifest hash
verification, the committed aggregate summaries, the derived metric recomputation,
FlowDroid receipt interpretation, and thesis reference and number integrity. All of it is
covered by `npm run reproduce:thesis-core`.

## What it does not claim to reproduce

The 233-package device campaign, the one-device interaction session, a fresh FlowDroid
invocation, independent legal mapping review, participant comprehension, multi-OEM
behaviour, production signing, store acceptance, population prevalence, and GDPR
compliance. Each requires hardware, restricted inputs, independent people, external
accounts or authority that the repository does not carry. See
[`LIMITATIONS.md`](LIMITATIONS.md).

## Attribution policy

The development-evolution record and the rest of the documentation describe changes to
the artifact, not the people or machines that made them. Contributor names, committer
identities, host names, machine identifiers and development-tool history are absent from
this repository's documentation by design: the research record is intended to stand on
verifiable repository facts alone. The historical repository is the place where that
information remains, and it was not modified.
