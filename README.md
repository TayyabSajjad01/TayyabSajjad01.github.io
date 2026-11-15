# Tayyab Sajjad — Accounting Portfolio

Personal portfolio for Tayyab Sajjad, an Islamabad-based accountant with UK practice experience.

Website: https://tayyabsajjad01.github.io

## Run locally

Requires Node.js 20.12 or newer. No dependency installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. `npm run build` generates the static website in `dist/`.

## Update the website

- Identity, contacts, employment and education: `content/profile.json`.
- Service explanations, steps, inputs and quote factors: `content/services.json`.
- Homepage layout: `content/home.mjs`.
- Fictional work samples: `content/samples.mjs`.
- CV: replace `assets/Tayyab-Sajjad-CV.pdf`, retaining the filename.
- Articles: add reviewed writing to `content/articles.json`. Only entries with status `published` and an actual `reviewedOn` date appear. Never claim author review until it has occurred.
- Appearance: `assets/styles.css`.

Keep exact employment dates and accurate part-qualified education wording. Fictional examples must remain clearly labelled. Real client work requires permission and confidentiality checks.

## Publishing

Pushing to `main` runs the GitHub Pages workflow. It tests the optional email handler with mocks, builds with `PUBLIC_BUILD=true` and publishes only `dist/`. The initial browser upload archive is expanded once into normal source files, then removed. No private research, owner notes, credentials or unpublished articles are included.

Local builds disable search indexing. Public builds enable indexing and generate a sitemap using the real `siteUrl`.

## Booking and contact

The free 15-minute call page currently uses email requests. Set `bookingUrl` in `content/profile.json` to Tayyab's own HTTPS booking link to enable calendar booking. Call times are not confirmed by submitting an enquiry.

GitHub Pages hosts static files; it does not run the optional Node email handler. The email-draft fallback works without server credentials.

For a separate Node deployment, copy `.env.example` to `.env.local` on the server and set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender), `CONTACT_TO_EMAIL` and the exact `PUBLIC_ORIGIN`. Never commit `.env.local`. The form enables direct sending only when the same-origin backend is configured. Missing credentials and delivery errors never display a false success message.

Backend tests: `node scripts/test-contact-api.mjs` uses mocked responses and sends no messages. Real email delivery and calendar integration require their own authorised tests after configuration.
