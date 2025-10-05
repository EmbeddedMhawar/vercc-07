# Deploying FastAPI + React/Vite Monorepo on Cloudflare (Free PoC Guide)

## Monorepo Structure

Recommended folder layout:
/frontend # React or Vite app
/backend # FastAPI backend

---

## Free Public URLs via Cloudflare

### Frontend (React/Vite)
- **Cloudflare Pages** gives you a free project URL:
  - Format: `https://verifiedcc.pages.dev`
- No domain purchase required. SSL is included.

### Backend (FastAPI)
- **Cloudflare Workers** deploys your API with a free workers.dev subdomain:
  - Format: `https://<workername>.<account>.workers.dev` <-???
- Works for any serverless API (including FastAPI Python Worker).
- SSL & global CDN included. No cost for PoC tier.

---

## Deployment Steps

### 1. Organize your repo as a monorepo.
  - Separate `/frontend` (React/Vite) and `/backend` (FastAPI) folders.

### 2. Deploy frontend to Cloudflare Pages.
  - Connect GitHub repo.
  - Set project root to `/frontend`.
  - Configure build command: `npm install && npm run build`
  - Set output: `/frontend/dist`
  - Get your free `.pages.dev` link.

### 3. Deploy backend to Cloudflare Workers.
  - Set up Python Worker configuration for FastAPI.
  - Configure with `wrangler.toml`.
  - Deploy from `/backend` directory.
  - Get your free `.workers.dev` link.

### 4. (Optional) Map custom domains/subdomains.
  - Purchase or bring your own domain.
  - Map `app.verifiedcc.com` or `api.verifiedcc.com` via DNS or Cloudflare dashboard for branding.

---

## References

- [Monorepos on Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/monorepos/)
- [Deploying React/Vite](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)
- [Deploying FastAPI on Workers](https://developers.cloudflare.com/workers/languages/python/packages/fastapi/)
- [Custom Domains Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Custom Domains Workers](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Cloudflare Free Plan](https://www.cloudflare.com/plans/free/)

---

## Example Free URLs

- Frontend: `https://verifiedcc.pages.dev`
- Backend API: `https://verifiedccapi.<youraccount>.workers.dev`

---

_All core features (hosting, subdomains, SSL, CDN) are free for proof-of-concept!_
