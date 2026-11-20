# Sample photo provenance
Fetched 21 November 2026 from Unsplash image CDN, resized and background-removed locally. These are demonstration assets, not user testimonials or proof of sales. Device provenance is unknown. Source photographs remain subject to the Unsplash license; software licensing does not relicense third-party photos. See https://unsplash.com/license.

- Bottle: https://images.unsplash.com/photo-1602143407151-7111542de6e8
- Mug: https://images.unsplash.com/photo-1514228742587-6b1558fcca3d
- Backpack: https://images.unsplash.com/photo-1553062407-98eeb64c6a62
- Shoe: https://images.unsplash.com/photo-1542291026-7eec264c27ff
- Skincare: https://images.unsplash.com/photo-1608571423902-eed4a5ad8108

Seed cutouts: rembg 2.0.87 with U2NetP. Inspect their edges before reusing for listings. Reproduce with scripts/seed-photos.py and scripts/finish-samples.ts after obtaining source photos.

ONNX Runtime 1.21.0 is identified as MIT in its npm package metadata. Upstream GitHub license retrieval returned HTTP 404 during this build; the standard Microsoft MIT notice is included in public/ONNX-LICENSE. U2Net's Apache-2.0 license was fetched from its upstream repository. Model source: https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx. Both the seed and browser flows now use U2NetP.
