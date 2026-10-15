# Virtual Number Service

A secure, responsive virtual phone number platform designed to support multiple countries and permitted SMS and voice services.

## Quickstart (development)

1. Install dependencies:

   npm install

2. Run the dev server:

   npm run dev

3. Open the site locally at http://localhost:5173

## Local demo features

- Client-side mock authentication (no real user database)
- Browse demo numbers and submit trial requests (stored in localStorage)
- Admin page to approve demo requests (client-side)
- Cloudflare Workers skeleton in `functions/worker/index.js` with example API routes for trials and admin actions (demo only)

## Deploying the backend

The `functions/` folder contains a Cloudflare Worker skeleton. When you deploy to Cloudflare Pages (or Workers), replace the in-memory storage with a proper database or KV store and secure any provider credentials.

## Security

Never commit API secrets, passwords, private keys, customer messages, or verification codes to the repository. Use Cloudflare secrets or another secret manager for runtime credentials.

## Next steps I can help with

- Replace client-side mock auth with a secure backend and database.
- Connect the worker to durable storage (Cloudflare KV or a database).
- Add Twilio integration guides and secure webhook handling.
- Improve UI/UX and accessibility.
