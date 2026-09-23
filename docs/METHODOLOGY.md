# Methodology

## Research question

> How can heterogeneous Android privacy evidence be transformed into useful, reproducible
> review prompts while preventing malformed, missing, synthetic, or legally incomplete
> evidence from becoming an unsupported legal conclusion?

The question has two halves. The first is an engineering problem: collect and present
permission and activity evidence for human review. The second is an epistemic problem:
keep the presentation from implying a conclusion the evidence does not support. The
artifact is organised so that the second half constrains the first.

## Design principle: evidence-bounded presentation

Android permission evidence is layered and partly unreachable. A manifest declaration
states a capability, not a use. A runtime observation can indicate activity but carries no
purpose, lawful basis, necessity or proportionality. Recording packages expose only what
the platform chooses to expose, and an empty result is not evidence of absence.

The implementation therefore treats four things as distinct types that cannot be
converted into one another:

| Layer | Meaning | May be produced by |
|---|---|---|
| Admitted evidence | A well-formed, provenance-labelled observation or declaration | the evidence pipeline, after validation |
| Technical signal | A threshold, temporal or analytic result over admitted evidence | the evaluation engine |
| Review obligation | A question a human should answer, with its missing context | the policy layer |
| Legal verdict | A determination that processing is or is not lawful | nothing in this system |

The typed policy layer can express the first three and cannot construct the fourth. A
source-level check enforces that no production code path emits a legal-verdict token, and
the information-flow suite exercises adversarial typed graphs against the same boundary.

## Fail-closed admission

Every input crosses a validation boundary before it can influence a finding. Malformed
identifiers, unsafe integers, non-finite numbers, reversed or implausibly timed windows,
unrecognised provenance labels and incompatible context are rejected. Rejection never
degrades into a normal finding, and missing context is presented as missing rather than as
a negative observation.

The same principle governs governance. Reassurance states are gated on source review,
source content, attestation, trust anchors and witness receipts; if any of those is
absent or invalid, the system withholds the reassuring state instead of assuming it. This
is the property the formal safety catalogue and the mutation harness exist to test.

## Regulation-pack isolation

Jurisdiction-dependent material — rule definitions, temporal windows, source records,
review deadlines and mappings — lives in versioned packs behind a registry. The generic
temporal evaluator does not hard-code a jurisdiction. Mounting another valid pack changes
detection configuration without changing engine code, and findings retain the identity of
the pack that produced them.

A consequence worth stating: a pack's review deadline participates in evaluation, so an
overdue source correctly forces a fail-closed state. That behaviour is what caused the
wall-clock coupling recorded in
[`DEVELOPMENT_EVOLUTION.md`](DEVELOPMENT_EVOLUTION.md); the policy is intentional, and the
tests were corrected to control the evaluation instant rather than the policy.

## Evaluation design

Three kinds of check are used, and they are kept separate:

1. **Semantic suites** over the engine: threshold boundaries, temporal combination and
   ordering, replay and overlap behaviour, restart restoration, governance gates,
   regulation-pack isolation, and typed output restrictions. Each suite prints its
   evidence, including adversarial fixture precision and recall against a declared oracle.
2. **Contract checks** over the artifact: source-text contracts for accessibility and
   release-privacy properties, delivery completeness, evidence-manifest hashes, thesis
   number consistency, claim boundaries and cited repository paths, and LaTeX integrity.
3. **Executed weakening** (mutation): each registered safety property has a corresponding
   source weakening that the suite must detect. A catalogue entry without a detected
   mutant is not evidence, which is why the harness exists and why its first run reported
   survivors rather than a score.

Determinism is treated as a property of the instrument, not a convenience: seeds are
fixed, evaluation instants are injectable, ordering is asserted independently, and the
temporal stress campaign is run twice and required to agree with itself.

## Evidence chain

Every published number is derived from a committed receipt and recomputed on every run:

```text
receipt (pinned by SHA-256)
   -> derived metrics (recomputed each run)
      -> summary JSON and generated LaTeX macros
         -> manuscript prose
            -> consistency checks (numbers, claim boundaries, cited paths)
```

The manifest is the machine-readable authority. If a receipt changes, the manifest pin
fails; if a derived value changes, the metric recomputation fails; if the manuscript
disagrees with the generated macros, the number-consistency suite fails. Nothing in that
chain relies on a value being copied correctly by hand.

## Claim classification

Claims are classified as supported, partially supported, or unsupported, and every
unsupported claim is stated as a limitation rather than omitted. The full matrix is in
[`TRACEABILITY.md`](TRACEABILITY.md); the boundaries are in
[`LIMITATIONS.md`](LIMITATIONS.md).

The classification exists because the honest version of this research is narrower than
its interface suggests: the system can show that it handles evidence in a particular,
auditable way, and it cannot show that its thresholds identify unlawful processing. That
gap is the point of the design, not a shortcoming of the evaluation.

## Scope of the reproduction

The repository reproduces the software-semantic half of the evaluation — engine
behaviour, governance, formal properties, evidence integrity and manuscript consistency.
It does not reproduce the empirical half — the device campaign, the corpus crawl, the
analysis invocation, or any human study — because those depend on hardware, restricted
inputs and independent people. Their receipts are verified as records, and their
limitations are inherited by anything built on them.
