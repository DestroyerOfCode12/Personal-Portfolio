# Jacob Mkhwanazi - Portfolio

React + Vite + TypeScript + Tailwind, animated with GSAP/ScrollTrigger and smoothed with Lenis.
See `ANIMATION.md` for the motion architecture and `ASSET_REQUIREMENTS.md` for visuals.

```bash
npm install
npm run dev        # frontend only: http://localhost:5173
npm run dev:full   # frontend + the Netlify contact function (needs .env, see .env.example)
npm run build      # type-check + production build
```

Content is a single file: `src/data/content.ts`. Hero art direction: `src/data/layers.ts`.
The contact form posts to `netlify/functions/contact.mts` (SMTP via env vars, per-IP rate limit).
