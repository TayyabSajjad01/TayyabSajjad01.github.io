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
- Portrait: replace the 320px and 640px square JPEGs named `assets/tayyab-sajjad-portrait-320.jpg` and `assets/tayyab-sajjad-portrait-640.jpg`. The homepage applies the circular frame; retain natural headroom and keep the face centred. Use only an owner-approved real portrait.
- Articles: add reviewed writing to `content/articles.json`. Only entries with status `published` and an actual `reviewedOn` date appear. Never claim author review until it has occurred.
- Appearance: `assets/styles.css`.

Keep exact employment dates and accurate part-qualified education wording. Fictional examples must remain clearly labelled. Real client work requires permission and confidentiality checks.

## Confirmed details and current setup

The owner confirmed current employment, current study status and the existing contact details on **16 November 2026**. Keep the CV-supported role dates and part-qualified CMA wording; do not add an experience counter, exam count or completed qualification without evidence.

Keep **tayyabsajjad018@gmail.com** and the current email-request setup unchanged until the owner explicitly asks for a change. The owner's personal Calendly link will be supplied separately. Do not substitute a dummy calendar, another business's booking link or invented available times.

Confirmation of employment, education and contacts does not establish technical review or authorship of the fictional work samples. Record Tayyab's actual review separately for each example.

## Work-sample review and collection checklist

Start by asking Tayyab to inspect the three existing fictional demonstrations. He can identify corrections, approve an example after checking it, or prepare a replacement using fictional data. Record whether he reviewed an existing demonstration or prepared the replacement himself; use accurate attribution on the website.

For **every sample**, ask him to confirm:

- The approach, calculations and explanations are correct, or list the changes needed.
- The assumptions and missing information are clear.
- Which decisions or corrections require a senior reviewer's approval.
- He understands the work and can explain it in an interview.
- He permits public display as a fictional demonstration.
- The actual review date.

### Bank reconciliation

[Review the current example](https://tayyabsajjad01.github.io/work-samples/bank-reconciliation/).

Ask him to check the statement and ledger extracts, matching references, outstanding items, evidence for the missing £50 bank fee, proposed correction and the reconciliation to £13,800. Ask what further evidence he would obtain before treating the two timing items as cleared. Zero arithmetic difference must not imply that every item is resolved.

For a replacement, request an editable Excel workbook with:

- Fictional bank statement and cashbook/ledger extracts covering the same period.
- Dates, references, descriptions, amounts and opening/closing balances.
- Matched and unmatched items with traceable references.
- An investigated discrepancy and a supported proposed correction.
- A reconciliation summary, query log and reviewer notes.

### Month-end working-paper pack

[Review the current example](https://tayyabsajjad01.github.io/work-samples/month-end-pack/).

Ask him to check the close checklist, supporting references, £800 closing insurance prepayment, £240 estimated electricity accrual, £4,200 creditors reconciliation and proposed journals. Ask whether the reviewer can clearly distinguish completed checks, estimates and unresolved questions.

For a replacement, request:

- A close checklist and relevant fictional trial-balance extract.
- An accrual schedule and a prepayment schedule, including formulas and assumptions.
- At least one balance-sheet reconciliation.
- Proposed journals with explanations and source references.
- A supporting-document register, reviewer handover and open query list.

### Construction project profitability

[Review the current example](https://tayyabsajjad01.github.io/work-samples/construction-profitability/).

Ask him to check the project assumptions, cost categories, budget-versus-actual calculations and variance explanations. Check the £80,000 revenue, £63,000 costs, £17,000 project contribution, 21.25% contribution margin and separate £5,000 net project cash. Ask him to confirm the explanation of project contribution versus company net profit and cash, and the questions raised for management.

For a replacement, request:

- A fictional project description, reporting period and stated assumptions.
- Budget and actual costs by category with variance calculations.
- Revenue figures and the basis used for the report.
- Profitability calculations and plain-language commentary.
- Receipts, payments and outstanding balances if a cash comparison is included.
- Supporting references, missing information and management questions.

### Files and approval to collect

For each new example, request the editable Excel file with formulas, a PDF preview, the software actually used and a short explanation of the task, checks, findings and unresolved questions. Check that the exported website preview and downloads match the reviewed version before replacing the current sample.

Use fictional business names and records. Actual employer/client material requires appropriate written permission before sharing; removing names alone is insufficient. Check sheets, comments, hidden rows/tabs, external links and file properties for confidential information. Exclude bank details, tax identifiers, payroll information, credentials and other private records.

Use this review record for each sample:

```text
Sample name:
Approved / changes needed:
Corrections or comments:
Prepared by Tayyab / existing demonstration reviewed by Tayyab:
Review date:
Permission to display publicly: Yes / No
```

A VAT/CIS demonstration is optional and remains deferred until its technical content has been reviewed. Any date-sensitive tax content requires verification against current official guidance before use. Three well-explained examples are enough to start.

## Publishing

Pushing to `main` runs the GitHub Pages workflow. It tests the optional email handler with mocks, builds with `PUBLIC_BUILD=true` and publishes only `dist/`. The initial browser upload archive is expanded once into normal source files, then removed. No private research, owner notes, credentials or unpublished articles are included.

Local builds disable search indexing. Public builds enable indexing and generate a sitemap using the real `siteUrl`.

## Booking and contact

The free 15-minute call page currently uses email requests. Set `bookingUrl` in `content/profile.json` to Tayyab's own HTTPS booking link to enable calendar booking. Call times are not confirmed by submitting an enquiry.

GitHub Pages hosts static files; it does not run the optional Node email handler. The email-draft fallback works without server credentials.

For a separate Node deployment, copy `.env.example` to `.env.local` on the server and set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender), `CONTACT_TO_EMAIL` and the exact `PUBLIC_ORIGIN`. Never commit `.env.local`. The form enables direct sending only when the same-origin backend is configured. Missing credentials and delivery errors never display a false success message.

Backend tests: `node scripts/test-contact-api.mjs` uses mocked responses and sends no messages. Real email delivery and calendar integration require their own authorised tests after configuration.
