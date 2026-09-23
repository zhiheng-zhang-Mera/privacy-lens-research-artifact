# Thesis PDF archive

The archival PDF is [`Privacy-Lens-Thesis-Final.pdf`](Privacy-Lens-Thesis-Final.pdf), compiled from `Thesis/Final` on 1 September 2026. The render timestamp is pinned with `SOURCE_DATE_EPOCH`, so the PDF is byte-reproducible: `npm run reproduce:thesis-pdf` rebuilds it and reports whether the result matches the published digest. That digest is recorded in `release/SUBMISSION_MANIFEST.json` and in the checksum list beside it, and `npm run verify:pdf` runs on every `reproduce:thesis-core` to confirm the PDF's prose still matches the corrected source and contains no retracted figure.

Earlier compiled PDFs are not part of this repository. They remain available in the historical development repository, which is preserved as evidence; their source revisions and Git history were not rewritten.
