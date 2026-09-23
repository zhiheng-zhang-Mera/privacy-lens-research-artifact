# Testing evidence index

This directory preserves versioned engineering evidence. Each report must state its device, duration, tested flow, result, and claim boundary.

- Final 1.15.0 device acceptance: [`real-device-9-8-finalize-v1.15.0/`](real-device-9-8-finalize-v1.15.0/)
- Current final thesis evidence: [`final-thesis-evidence-2026-08-21.md`](final-thesis-evidence-2026-08-21.md)
- Current controlled temporal device acceptance: [`real-device-8-21-controlled-temporal/`](real-device-8-21-controlled-temporal/)
- F-Droid static census, device-campaign aggregate and FlowDroid baseline: [`fdroid-open-store-2026-08-22/`](fdroid-open-store-2026-08-22/), [`academic-baseline-2026-08-22/`](academic-baseline-2026-08-22/)
- Per-release accessibility and governance rounds: [`real-device-8-24-v1.15.0-accessibility/`](real-device-8-24-v1.15.0-accessibility/), [`real-device-8-10-v1.14.0-decision-pause/`](real-device-8-10-v1.14.0-decision-pause/)
- Earlier reports are retained as implementation history, not as current release claims. The earliest experimental rounds are not part of this curated artifact.

## Adversarial baselines retained in the evidence chain

- [`version-2/`](version-2/) contains the Chinese attack report, machine-readable adversarial results, and the second-version thesis fragment for temporal evasion, forged windows, runtime type confusion, permission-key mutation, combined attacks, and APK event fuzzing.

Those releases were evaluated on `emulator-5554`, Android 16 / API 36. Emulator timing and frame data are not physical-device battery, long-duration WorkManager, or broad compatibility evidence. The corresponding generated APK was intentionally not committed.

Do not add full logcat, JobScheduler dumps, raw device dumps, intermediate screenshots, secrets, or unnecessary identifiers. Prefer a minimized crash buffer, package/version facts, final UI hierarchy, final screenshots, hashes, and a written limitation statement.
