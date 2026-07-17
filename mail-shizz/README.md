# Q1 2026 report campaign: final package

All four assets, final copy, hosted image URLs baked in. For Abhishek.

## Files

1. warmup-mail1-FINAL.html: campaign Mail 1. Hosted banner and cover URLs are in. Compliance footer added: Pune address, send me less / update preferences / privacy policy. Sign-off title updated to Founder & CEO.
2. jotform-autoresponder-FINAL.html: post-registration thank-you email for the JotForm autoresponder. Same footer. {name} merge tag to be swapped for the JotForm field tag.
3. thankyou-page-FINAL.html: the on-site thank-you page. Changes vs the live version are listed below.
4. landing-page-FINAL.html: the registration page, institutional register, hosted cover baked in.

## Remaining placeholders

- {{LOGO_URL}} in all files (hosted logo)
- {{UNSUBSCRIBE_LINK}} and {{PREFERENCES_LINK}} in both emails (ESP merge tags)
- {{JOTFORM_EMBED_URL}} in the landing page
- {{LINKEDIN_URL}} on the thank-you page
- {name} in the autoresponder (JotForm first-name tag)

## Thank-you page: what changed vs live and why

1. "Book a demo" is no longer the primary button. Per the July 9 decision, the site is inbound-first: primary CTA is the free GCC tracker, secondary is LinkedIn follow, and the demo stays as a text link for people already in a buying motion. A registrant two seconds after a form fill is not a demo prospect; a tracker user in week two is.
2. Added the add-to-contacts line (sabraham@bambooreports.com). Cheapest deliverability gain available; the whole campaign depends on the release-day email landing in the inbox.
3. Added a footer; the live page ends in dead space.
4. Naming corrected (see below).

## Naming: RESOLVED (2026-07-17)

Final verdict (Dipto): "Q1 2026", per the original locked decision. Applied everywhere: these four files, the live landing and thank-you pages, and the share metadata. One consequence stands: the cover art (hosted webp) still carries "Q1 FY 2026-27" and needs a re-export from design; the share card should be rebuilt from the corrected cover. Brand spelling also corrected throughout: "Research NXT", two words.

## Numbers gate: RESOLVED (2026-07-17)

The count reconciliation is frozen and the figures are confirmed. The live landing page shows the stat band and standfirst numbers (VITE_Q1_REPORT_NUMBERS_CONFIRMED=true; the flag remains as a kill switch and must also be set in the Netlify environment).

## Applied to the live stack (2026-07-17)

- Landing page: live at /reports/india-gcc-report-q1-fy27, v3 structure and copy, share-card OG injection via the page-meta edge function.
- Thank-you page: tracker-first CTA order, LinkedIn secondary, demo as text link, add-to-contacts line, footer. Live LinkedIn URL filled in thankyou-page-FINAL.html.
- Still pending: {{LOGO_URL}} everywhere (no hosted Research NXT logo yet), {{UNSUBSCRIBE_LINK}}/{{PREFERENCES_LINK}} (ESP merge tags), {{JOTFORM_EMBED_URL}} in the reference landing page (live page uses the real embed), {name} JotForm field tag, and loading the mails into JotForm/the workflow.
