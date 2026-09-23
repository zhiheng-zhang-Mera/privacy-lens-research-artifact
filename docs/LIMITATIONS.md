# Limitations

This artifact is bounded by design. The boundaries below are the ones the evidence
supports; each is stated rather than worked around. None of them is a defect that further
code changes could close.

## Evidence limitations

**The physical-device evidence cannot be re-executed here.** The 233-package campaign, the
interaction sessions, and the accessibility rounds ran on one handset model in short
windows. The repository carries their receipts, and the published metrics are recomputed
from those receipts on every run, but a reproducer cannot repeat the campaign: it requires
the handset and the corpus packages, which are not redistributed.

**The static analysis baseline cannot be re-invoked.** The analysis tool and its
source/sink definition are recorded by version and SHA-256, and one recorded invocation
completed without producing an XML artifact. That outcome is retained as missing evidence
rather than interpreted as zero flows. Re-running the analysis requires the tool
distribution and the restricted corpus.

**The corpus is purposive.** The open-source app-store sample was selected for
verifiability, not representativeness. It has no closed-source arm, so no prevalence claim
about Android applications in general follows from it.

**One recorded campaign total is not reproducible.** An early high-volume campaign was
executed by a driver that lived outside the repository. Its total is retained as a
historical note and is not cited as a reproducible figure; the thesis cites the
in-repository campaign instead, which is a reimplementation from the same specification
and reports its own measured total.

## Method limitations

**Detection accuracy is not established.** The corpus labels are generated from the same
published threshold model the engine implements. Agreement with that oracle measures
internal consistency, not whether the threshold identifies unlawful processing.

**Missing telemetry is reported as missing.** Memory and timing gaps are counted and
published; they are never filled by imputation. Percentiles are therefore computed over
the observed subset only, and the subset size is published beside them.

**The regulation mapping has not been independently reviewed.** A structured review packet
exists and the claim matrix records its status as not run. No legal validity,
jurisdictional completeness or review agreement statistic is claimed.

**No participant study was conducted.** Comprehension, trust calibration and reliance were
not measured. The accessibility rounds recorded UI structure and a large-text attempt, and
one font-scale change could not be applied on the test device; no accessibility-service
conformance was established.

**Multi-device and long-run behaviour is unknown.** One handset, one Android version, one
short observation window, and no multi-OEM replication.

## Artifact limitations

**Release binaries are host-dependent.** Release APK and AAB bytes embed path and
toolchain metadata, so their hashes differ between machines. The repository publishes
sizes and the packaged permission set, which reproduce, and does not publish binary hashes
as reproducible values.

**The thesis PDF is a rendered derivative.** Its content is verified against the corrected
source on every run, and its render timestamp is pinned so that identical sources give
identical bytes in a fixed time zone. A reproducer in another time zone may render the
same instant with a different offset, so the digest comparison is reported rather than
asserted as identical everywhere.

**Production deployment is not established.** No production signing identity, store
declaration, hosted policy endpoint or support contact is provisioned. The evaluated build
and the distributed product are not the same object until those exist.

**The reconstruction record is not exhaustive.** It describes what repository facts
support. Decisions that left no diff-level trace are not reconstructed, early manuscript
iterations are summarised rather than itemised, and commit subjects are not treated as
evidence on their own.

## Explicit non-claims

This artifact does not claim, and must not be read as claiming: that any application
infringes the GDPR or any other regulation; that the mapping is legally valid in any
jurisdiction; that the tool is a substitute for legal assessment; that the thresholds are
calibrated against ground truth; that the accessibility, security or privacy properties
extend beyond the evaluated build; or that the prototype is production-ready or
store-approved.
