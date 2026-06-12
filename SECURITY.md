# Security Policy

## Supported Versions

Only the latest version on the default branch is supported for security fixes.

## Reporting

Please do not open a public GitHub issue for suspected vulnerabilities.

Send a private report to the repository owner with:

- a clear description of the issue
- reproduction steps or a proof of concept
- expected behavior and what happened instead
- the affected route or Celo network, if applicable
- the contract address and chain ID, if the report involves a live contract
- the recipient public handle involved, if safe to share
- deployed URL and commit SHA, when available
- whether it affects preview/demo mode, production payment flows, or both
- whether any wallet prompt was signed, rejected, or never shown
- browser, wallet type (MiniPay or another injected wallet), OS, and device details, if relevant
- screenshots or screen recordings with secrets redacted, if helpful
- approximate date and time observed, including timezone, if it happened on a live deployment
- transaction hashes, PayLink receipt URLs, or explorer links, if applicable and safe to share
- affected token and amount, if funds or receipt display were involved
- impact assessment
- whether funds, profile metadata, or receipt display were affected
- any suggested mitigation or workaround

Do not include private keys, seed or recovery phrases, wallet passphrases, or production RPC secrets in the report.
Do not move live funds or perform destructive tests without coordinating with the repository owner first.

If the report is valid, fixes will be prepared privately and disclosed after a patch is available.
