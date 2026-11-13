# Asset requirements

## Currently in the project
| File | Status |
| --- | --- |
| `public/projects/malika-cakes.png` | **Real** (1280x800 screenshot of the live site) |
| `public/objects/workflow-card.svg` | Authored illustration (final unless you want a restyle) |
| `public/objects/terminal.svg` | Authored illustration |
| `public/objects/integration-node.svg` | Authored illustration |
| `public/portrait/` | **Empty - no portrait yet** (hero is intentionally work-led) |

## Optional: portrait cutout - `public/portrait/jacob-cutout.png`
Only add this from a real photo of you. Do not use stock photos or a generated likeness.
- Framing: head and shoulders to waist, facing slightly off-camera, ~4:5 portrait
- Size: 1600x2000 px, exported as PNG (or WebP) under ~400 KB
- Lighting: soft, even studio/window light, no hard shadows; neutral clothing
- Transparency: clean cutout on a transparent background, no halo (cut out with
  remove.bg / Photoshop "Select Subject" and check the edge on a dark and a light background)
- Wire-up: add a layer to `heroLayers` in `src/data/layers.ts` (role `anchor`, `size: [1600, 2000]`,
  `alt: "Portrait of Jacob Mkhwanazi"`) with its own `desktop` / `tablet` / `mobile` placements.

## Optional: more work screenshots - `public/projects/*.png`
1280x800, PNG/WebP, real captures only (e.g. ResumeEngine once it has a live URL).
