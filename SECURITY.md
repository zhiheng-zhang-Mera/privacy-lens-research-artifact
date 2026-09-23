# Security

## Scope

This repository contains a research prototype that processes permission and activity
evidence **locally on the device**. It is not a service. There is no server component, no
account system, no telemetry and no evidence upload path.

Findings are advisory and non-blocking. The prototype does not determine whether the GDPR
or any other regulation has been infringed, and its output must not be treated as legal
advice or as a compliance determination.

## What the artifact intentionally does not contain

- No production signing key, upload key or store credential.
- No API key, token, service credential or `.env` file.
- No provisioned trust anchor, legal-review attestation or witness release for production
  use. The governance chain is fail-closed precisely because those are absent: the
  application withholds reassuring legal-review states until they exist.
- No redistributed third-party application packages or analysis corpora. The pinned
  receipts record hashes and derived aggregates, not the underlying material.

## Reporting a vulnerability

Report suspected vulnerabilities privately to the repository owner through GitHub's
private vulnerability reporting on this repository. Please do not open a public issue for
a security problem.

Include the affected revision, the command or interaction path, and the observed
behaviour. Because this is a research artifact rather than a supported product, there is
no response-time commitment; reports are handled on a best-effort basis.

## Relevant design properties

The properties below are enforced by the verification pipeline and can be checked with
`npm run reproduce:thesis-core`. They are relevant when assessing a report:

- The release build requests no sensitive runtime permission and no Internet permission.
- Android backup is disabled for the application.
- Evidence admission is fail-closed: malformed, forged or context-incompatible input is
  rejected rather than normalised into a finding.
- Reassurance states are gated on source review, source content, attestation, trust
  anchors and witness receipts, and on rollback and freeze checks.
- The typed policy layer cannot emit a legal verdict.

## Supported versions

Only the current revision of this repository is maintained. The historical development
repository is preserved as evidence and receives no security updates.
