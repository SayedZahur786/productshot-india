# Decisions
- 2026-11-21: isolated repository; root ignore already excludes all project folders. Shared kit unchanged.
- Use browser-side IMG.LY segmentation; model download can be slow on first use. Project license must remain compatible with its AGPL dependency, so use AGPL-3.0-only.
- Use two square export presets: Amazon 2000 px and Meesho 1080 px. These are practical export sizes, not a promise of marketplace acceptance or category compliance.
- Three fixed scenes: white, warm studio and mint shelf. No custom generation.
- Anonymous secure cookie accounts: no email collection. Lost cookies lose account access; clearly disclose before purchase. Durable identity is needed before commercial launch.
- Use a real Playwright walkthrough with system TTS and burned-in captions for the demo; this demonstrates actual UI behavior and avoids representing marketing animation as product evidence.
- GitHub authentication initially reports invalid credentials. Retry once with permitted network before classifying as an account blocker.
