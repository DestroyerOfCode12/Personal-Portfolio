# Jacob Mkhwanazi — Portfolio

Personal portfolio and career site. React 18 + Vite + TypeScript + Tailwind CSS,
with a Netlify serverless function handling the contact form (nodemailer over SMTP,
validation, per-IP rate limiting via Netlify Blobs).

## Structure

```
.
├── src/                     # frontend (Vite React-TS app)
│   ├── components/
│   ├── data/
│   │   └── content.ts       # single source of truth for experience/projects/skills
│   └── ...
├── netlify/functions/
│   └── contact.mts          # contact form API (POST /api/contact)
├── netlify.toml
└── .env.example
```

## Running locally

Requires Node.js 18+ and the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
(installed as a dev dependency).

```bash
npm install
cp .env.example .env   # fill in SMTP credentials
npm run dev
```

This runs `netlify dev`, which serves the Vite frontend and executes
`netlify/functions/contact.mts` locally (including Netlify Blobs emulation for rate
limiting), so `/api/contact` works exactly as it does in production. Runs at
`http://localhost:8888` by default.

If you only need the frontend (no contact form testing), `npm run dev:vite` runs plain
Vite without the Netlify layer.

## Building for production

```bash
npm run build      # outputs to dist/
```

Netlify builds and deploys automatically on push to `main` (see `netlify.toml`).

## Contact form / SMTP configuration

The contact form is sent by `netlify/functions/contact.mts` via `nodemailer` using SMTP
credentials from environment variables. See `.env.example` for the required variables
(`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). In production these are set as Netlify site
environment variables, not committed to the repo.
