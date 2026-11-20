# ProductShot India plan

## Primary seller and job
An India-based solo home-and-accessory seller photographing 5–20 SKUs on a phone, then listing on Meesho and Instagram. Job: turn a cluttered photo into a consistent, exportable listing image without learning an editor or subscribing. The smallest lovable version is upload, removal, three fixed backgrounds, two size presets, before/after and a 20-image pack. No generative backgrounds, video product features or mobile app.

## Research — 21 November 2026
- Photoroom: removal, staging and batch exports. Its pricing is regional and dynamic; independent November review lists Pro at US$13/month billed annually. The review reports intermittent failed requests and subscription fatigue. Gap hypothesis: transparent INR packs and a narrow export workflow. Sources: https://www.photoroom.com/pricing and https://www.techradar.com/pro/software-services/photoroom-ai-photo-editor-review
- Pixelcut: removal, upscaling and batch editing; official page shows US$10 monthly / US$8 monthly billed annually for Pro, 1,000 monthly batch exports. BBB publishes individual complaints, including billing issues; these are allegations, not representative survey evidence. Gap: no recurring billing. Sources: https://www.pixelcut.ai/pricing and https://www.bbb.org/us/ca/oakland/profile/photography-equipment/pixelcut-inc-1116-967404/complaints
- remove.bg: specialist removal and API; free previews up to 0.25 MP, one initial high-resolution credit and paid credit options. The current pricing page did not expose purchasable numeric rates in the retrieved text, so no price is inferred. Resolution limits are a documented friction; no verified representative complaint sample was obtained. Gap: included marketplace formatting and fixed lifestyle templates. Sources: https://www.remove.bg/pricing and https://www.remove.bg/uk/help/a/what-is-the-difference-between-the-free-plan-subscription-and-pay-as-you-go

## Riskiest assumption
Sellers will pay ₹199 for 20 exports when free editors exist. Cheapest test: show ten sellers their own before/after, offer a clearly priced non-recurring pack, and record purchase decisions. Do not claim improved sales before an experiment.

## Architecture and data
Next.js App Router, TypeScript, Tailwind; browser segmentation avoids per-image API spend. Server verifies and recomposites PNG cutouts using Sharp, strips metadata, and controls credits. Neon stores anonymous hashed sessions, balances, image jobs, payment orders and rate limits. Private S3-compatible objects use short-lived signed downloads. Original and output object paths are random and owner-scoped. Razorpay orders and signed webhook settlement unlock exactly 20 images once. Local-only preview storage supports development when accounts are absent; production fails closed.

## Routes and states
/ introduction, examples and pricing; /studio upload, queue, preset/template selection, slider and downloads; /privacy and /terms; /api/session identity and balance; /api/images guarded processing; /api/download owner-authorized downloads; /api/checkout payment order; /api/webhook verified settlement; /api/account self-service deletion. Empty explains first upload; loading shows model progress and queue position; errors preserve files and offer retry without charging on processing failure. A 404 links home.

## Validation
Unit-test alpha crop/padding/dimensions and credit idempotency. Playwright covers the real upload/export UI and isolated payment webhook verification; test payment adapters are never enabled in production. Record gaps where live credentials prevent provider integration. Run all shared launch gates unmodified, audit dependencies, inspect actual desktop/mobile screenshots and record deployment evidence.
