# Week-one metrics
Run `node scripts/metrics.mjs` for the trailing seven calendar days (database UTC dates). It prints:
- Free images successfully processed: target 100.
- Paid packs settled by verified webhook: target 10.
- Gross pack revenue: target ₹1,990; excludes refunds, tax and provider fees.

These are targets, not traction claims. Counters are transactionally incremented alongside successful image inserts and first payment settlement, survive image retention cleanup, and contain no customer identifiers. Local preview tests do not increment production metrics. Cloud smoke tests use disposable records and must clear their own metric deltas. Revenue is a gross proxy; reconcile to Razorpay before reporting financial results.
