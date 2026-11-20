# Security self-audit
Reviewer: implementation agent. Date: 21 November 2026. This is a self-audit, not an independent penetration test.

| Shared-kit item | Result and evidence |
| --- | --- |
| Protected entry points | Session creation requires same-origin requests. Images, checkout and deletion require the HTTP-only session. Download validates the image UUID and owner. Cleanup requires a server secret; webhook requires HMAC. Browser tests deny signed-out downloads, wrong origins and forged signatures. Cloud smoke verifies cross-owner denial. No roles exist. |
| Input and database validation | Streaming request bounds precede multipart parsing. JPEG/PNG/WebP magic is validated with Sharp; decoded pixel count and page count are bounded. Original EXIF metadata is stripped by re-encoding. Presets and scenes use allowlists. Queries are parameterized. Versioned migrations are applied to the dedicated database. The application uses a restricted role with data-only permissions; schema-owner credentials remain migration-only. |
| Secrets and history | Environment files, local artifacts and Vercel state are ignored. Secrets are sent to Vercel over stdin and never placed in client environment variables. Gitleaks results are recorded in GATES.md. No raw provider errors are exposed by API handlers. |
| Limits, costs and payments | Durable Neon hourly counters bound session creation and account mutations; unknown or unavailable storage fails closed. The provider-verified Vercel forwarding header is used for signup limits, not arbitrary client headers. Browser inference avoids metered image APIs. Razorpay signatures cover exact raw bytes; only fully paid INR 19,900-paise events qualify. SQL first-settlement guards duplicate delivery. Live provider checkout is unverified and disabled. |
| Sessions and CSRF | 256-bit random cookie, server-side SHA-256 identity, HTTP-only, SameSite Strict, secure in hosted production, 30-day browser lifetime. Exact production origin required. Local preview supports its local Host header only and cannot run on Vercel. Deletion removes objects before account rows so transient storage errors can be retried. No arbitrary redirects; checkout host is allowlisted. Account recovery is intentionally unavailable and blocks commerce. |
| Headers and CSP | Nonce-based script and style policy, no inline scripts or broad HTTPS wildcard; WASM execution permitted only for the model runtime. Same-origin model files, object/base/frame restrictions, restrictive referrer and feature policies. HTTPS HSTS gate recorded separately. |
| Dependencies | Removed the dependency that pulled vulnerable legacy Zod. Frozen lockfile committed; current audit results in GATES.md. ONNX model/runtime have separate license notices. |
| Policies and retention | Shared policy templates resolved with actual operator and preview details. Analytics is off. Owner-authorized downloads expire after 24 hours; signed URLs after 60 seconds. Daily cron removes up to 500 expired rows and corresponding objects per run; monitor backlog/failures. A private support contact and final refund/tax details block commercial launch. |
| Error handling and accessibility | Generic server errors, async UI status, route/global boundaries, keyboard-operable slider, responsive layouts and screenshot tests. Model memory limits bound photos to 24 MP and downsample long edge to 1400 px. Browser results require human edge inspection. |

## Residual risks and release boundary
The free preview is not a paid launch. Interrupted reservations older than ten minutes are refunded idempotently by the daily cleanup. Recovery can take until the next cleanup run. Anonymous cookie identities can be lost and can be farmed across IPs. Rate limits reduce but do not eliminate abuse. A daily cleanup failure can retain files longer than the normal 48-hour window and requires retry. No claim of perfect removal, legal compliance or marketplace acceptance is made.

## Evidence map
- `tests/core.test.ts`: crop/pad pixels, invalid files, credit bounds, signature tampering.
- `tests/happy.spec.ts`: actual local model upload, comparison, export, signed settlement replay; origin and input denials.
- `tests/shots.spec.ts`: all main routes on desktop/mobile, no horizontal overflow, active template controls.
- `scripts/cloud-smoke.ts`: real Neon and private storage with disposable records.

The public policies link to the maintainer’s public profile, not a private-repository issue form. Self-service deletion is verified on the live site; a private support channel remains a merchant-launch requirement.

Final review fixes: unknown/deleted session-cookie tokens are rejected on protected routes instead of creating accounts; only rate-limited session creation can mint identities. Server-side account lookup enforces the 30-day lifetime. Cleanup deletes objects associated with interrupted jobs before idempotent credit refunds, including uploads interrupted before the image row was committed.
