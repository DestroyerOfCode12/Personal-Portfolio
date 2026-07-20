# Jacob Mkhwanazi — Portfolio

Personal portfolio and career site. React 18 + Vite + TypeScript + Tailwind CSS on the
frontend, a small Node.js/Express service for the contact form.

## Structure

```
.
├── src/                # frontend (Vite React-TS app)
│   ├── components/
│   ├── data/
│   │   └── content.ts  # single source of truth for experience/projects/skills
│   └── ...
├── server/              # backend (Express contact API)
│   ├── src/
│   └── .env.example
└── ...
```

## Running locally

Two processes: the Vite dev server (frontend) and the Express API (backend). Requires
Node.js 18+.

### 1. Frontend

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`. Requests to `/api/*` are proxied to the backend
(see `vite.config.ts`).

### 2. Backend

```bash
cd server
npm install
cp .env.example .env   # fill in SMTP credentials
npm run dev
```

Runs at `http://localhost:4000`.

## Building for production

```bash
# frontend
npm run build      # outputs to dist/

# backend
cd server
npm run build       # outputs to server/dist/
npm start
```

## Contact form / SMTP configuration

The contact form is sent by the backend via `nodemailer` using SMTP credentials from
environment variables. See `server/.env.example` for the required variables
(`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`,
`CONTACT_FROM_EMAIL`, `CORS_ORIGIN`). The endpoint is rate-limited per IP in memory.

## Deployment note

The frontend is a static build (`dist/`) that can be hosted anywhere static files are
served. The backend needs a persistent Node process (it is not currently serverless-safe
due to in-memory rate limiting), so deploy it separately (e.g. a small VM or container)
and point `VITE_API_URL` / the frontend's fetch base at it in production.
