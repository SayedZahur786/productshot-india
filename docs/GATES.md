# Validation evidence
Date: 21 November 2026. Local lab evidence is not production field performance.

- Unit tests: 5 passing (image crop/pad, invalid input, pack counter, webhook signature, streamed body bounds).
- End-to-end: 4 passing (real model upload and isolated signed settlement, denials, desktop and mobile routes).
- Real cloud smoke: passed database credit changes, cross-owner denial, private uploads, signed downloads, unsigned denial, duplicate payment settlement; disposable records removed.
- Shared performance gate: PASS, cold mobile LCP 672 / 624 / 724 ms, worst 724 ms. Unmodified gate, 4× CPU, 1.6 Mbps / 150 ms.

Final hosted header, policy, source scan, dependency and secret-scan evidence is appended after deployment. No live Razorpay payment has been made. The simulated webhook is only an isolated local test.

- Frozen install: PASS (`npm ci --ignore-scripts --offline`).
- Dependency audit: PASS, 0 vulnerabilities across 438 audited packages.
- Typecheck: PASS. Lint: PASS with 4 image-optimization advisory warnings; sample JPGs are pre-sized, and measured LCP is below the gate.
- Hosted header gate: PASS on home, privacy and terms, including one-year HSTS.
- Hosted policy gate: PASS; legal adequacy remains manual.
- Hosted full upload: PASS, real browser segmentation, production Neon debit, private storage, signed download and self-service deletion. Its metric increment was removed.
- Model asset: hosted U2NetP file responds HTTP 200 with 4,574,861 bytes.
- Production deployment: https://productshot-india.vercel.app (Vercel deployment dpl_2eeSFHfdQP7CKK2FqadDHCxCLMdG).
- Gitleaks history scan: PASS on the implementation commit, no secrets found. Final scan follows documentation commit.

- Final shared performance rerun: PASS, LCP 612 / 564 / 584 ms; worst 612 ms.
- Placeholder scan: PASS, 81 authored text files (before final evidence append).
- Demo media: PASS, 57.000 seconds, H.264 video plus non-silent AAC narration; caption frame visually inspected at 31 seconds.
- Source isolation: project has its own Git repository; root already excludes project folders. Shared launch kit was not modified.
