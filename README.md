# Virtual Number Service

A secure, responsive virtual phone number platform designed to support multiple countries and permitted SMS and voice services.

## Planned Features

- Customer registration and login
- Browse numbers by country and supported capabilities
- Request free trials
- Admin review and approval of trial requests
- Customer dashboard with number and usage information
- Trial expiry and usage limits
- SMS and voice integration through an approved provider
- Administrative tools for users, service status, and support
- Secure server-side handling of provider credentials

## Technology Plan

- Frontend: React and Vite
- Hosting: Cloudflare Pages
- Backend: Cloudflare Workers
- Database and authentication: to be selected and configured
- Communications provider: Twilio, subject to account eligibility and provider terms

## Development Stages

1. Build and test the website interface.
2. Add secure authentication and a database.
3. Build the backend and admin permissions.
4. Connect a communications provider.
5. Test number availability, SMS, voice, usage limits, and webhooks.
6. Deploy after security, compliance, and billing checks.

## Security

Never commit API secrets, passwords, private keys, customer messages, or verification codes to the repository. Keep provider credentials in an appropriate server-side secrets manager.

## Service Limitations

Number availability, SMS, voice, supported countries, and third-party verification compatibility depend on the provider, account eligibility, local regulations, and the individual number's capabilities.

The initial website may use clearly labeled demonstration data only. Demo data does not represent live inventory or a working phone number.

## Quickstart (development)

1. Install dependencies:

   npm install

2. Run the dev server:

   npm run dev

3. Open the site locally at http://localhost:5173

## Where to go next

- Add a secure backend (Cloudflare Workers) and a database.
- Integrate a communications provider (Twilio) only after verifying account eligibility and provider terms.
- Keep all runtime secrets out of the repo and in a server-side secret manager.

---

This README was added and populated following the project's onboarding guide.
