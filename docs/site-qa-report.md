# Pine X Systems — Site QA Report

## Pages Checked

| Page | Status |
|------|--------|
| `/` (Home) | ✅ Pass |
| `/services` | ✅ Pass |
| `/industries` | ✅ Pass |
| `/about` | ✅ Pass |
| `/contact` | ✅ Pass |
| `/demos` | ✅ Pass |
| `/demos/[slug]` (12 demo pages) | ✅ Pass |
| `/insights` | ✅ Pass |
| `/insights/[slug]` (17 insight pages) | ✅ Pass |
| `/business-loss-calculator` | ✅ Pass |
| `/[slug]` (34 SEO pages) | ✅ Pass |
| `/case-studies` | ✅ Pass |
| `/business-systems` | ✅ Pass |
| `/custom-software-vs-off-the-shelf-crm` | ✅ Pass |
| `/how-much-does-a-custom-business-system-cost-south-africa` | ✅ Pass |
| `/best-business-systems-south-africa` | ✅ Pass |
| `/sitemap.xml` | ✅ Pass |

---

## Navigation Links

| Location | Issue | Fix | Remaining |
|----------|-------|-----|-----------|
| Desktop header nav | None — all 8 links valid | — | — |
| Mobile header nav | None — all 8 links valid, menu closes on click | — | — |
| Header WhatsApp | None — correct number, opens in new tab | — | — |
| Header CTA | None — links to `/contact#lead-form` | — | — |

---

## Footer Links

| Location | Issue | Fix | Remaining |
|----------|-------|-----|-----------|
| Navigation column | None — all 8 links valid | — | — |
| Systems column | None — all 11 links valid | — | — |
| Phone link | None — `tel:+27638035628` | — | — |
| Email link | None — `mailto:eddy@pinexsystems.co.za` | — | — |

---

## CTA Buttons

| Location | Text | Href | data-event | Issue | Fix |
|----------|------|------|------------|-------|-----|
| Home hero | Get My Free System Audit | `/contact#lead-form` | `free_audit_click` | ✅ | — |
| Home hero | View Live Demo Systems | `/demos` | `demo_click` | ✅ | — |
| Home final CTA | View Live Demo Systems | `/demos` | `demo_click` | ✅ | — |
| Home final CTA | Get My Free System Audit | `/contact#lead-form` | `free_audit_click` | ✅ | — |
| Services page | Get My Free System Audit | `/contact#lead-form` | `free_audit_click` | ✅ | — |
| Services page | View Live Demo Systems | `/demos` | `demo_click` | ✅ | — |
| SEO pages | Get My Free System Audit | `/contact#lead-form` | `free_audit_click` | ✅ | — |
| SEO pages | View Live Demo Systems | `/demos` | `demo_click` | ✅ | — |
| SEO pages CTA heading | "Want this mapped to your business?" | — | — | ✅ | — |
| Demo cards | Request This For My Business | `/contact?demo_slug={slug}&lead_intent=demo_page#lead-form` | `request_demo_version_click` | ✅ | — |
| Demo cards | Open System Demo | `/demos/{slug}` | `open_demo_click` | ✅ | — |
| Demos page | Get My Free System Audit | `/contact#lead-form` | `free_audit_click` | ✅ | — |
| Calculator result panel | Find The Gaps In My Business | `/contact#lead-form` | `calculator_submit` | ✅ | — |

---

## WhatsApp Links

| Location | Href | Prefilled Message | Issue | Fix |
|----------|------|-------------------|-------|-----|
| Floating WhatsApp | `wa.me/27638035628?text=...` | "Hi Eddy, I'd like to discuss a custom business system for my business." | ❌ Missing message | ✅ Added `?text=` via `waUrl()` in `site.ts` |
| Header desktop | `wa.me/27638035628?text=...` | Same default | ❌ Missing message | ✅ Now uses `waUrl()` |
| Header mobile | `wa.me/27638035628?text=...` | Same default | ❌ Missing message | ✅ Now uses `waUrl()` |
| Mobile sticky bar | `wa.me/27638035628?text=...` | Same default | ❌ Missing message | ✅ Now uses `waUrl()` |
| Contact page direct | `wa.me/27638035628?text=...` | "Hi Eddy, I'd like to discuss..." | ❌ Missing message | ✅ Now uses `waUrl()` |
| LeadForm error fallback | `wa.me/27638035628?text=...` | "Hi Eddy, I tried to submit a contact form on your website but it failed." | ❌ Missing message | ✅ Added contextual message |
| Calculator error fallback | `wa.me/27638035628?text=...` | "Hi Eddy, I calculated my business leakage on your site but the submission failed." | ❌ Missing message | ✅ Added contextual message |
| ShortAuditForm error fallback | `wa.me/27638035628?text=...` | "Hi Eddy, I tried to submit a form on your website but it failed." | ❌ Missing entirely | ✅ Added contextual message |

---

## Email Links

| Location | Href | Issue | Fix |
|----------|------|-------|-----|
| Footer | `mailto:eddy@pinexsystems.co.za` | ✅ | — |
| Contact page | `mailto:eddy@pinexsystems.co.za` | ✅ | — |
| LeadForm error fallback | `mailto:eddy@pinexsystems.co.za` | ✅ | — |
| Calculator error fallback | `mailto:eddy@pinexsystems.co.za` | ✅ | — |
| ShortAuditForm error fallback | `mailto:eddy@pinexsystems.co.za` | ❌ Missing entirely | ✅ Added alongside WhatsApp fallback |

---

## Forms

### ShortAuditForm (homepage + contact page)
| Check | Status | Notes |
|-------|--------|-------|
| POSTs to `/api/contact` | ✅ | |
| Shows loading state | ✅ | "Sending..." button text, disabled |
| Success only after API success | ✅ | Green confirmation with checkmark |
| Error fallback with WhatsApp + Email | ❌ Was missing | ✅ Added WhatsApp and Email buttons |
| No redirect | ✅ | Stays on page |
| Reads `demo_slug` from URL | ✅ | via `getQueryContext()` |
| data-event on start | ✅ | `short_form_start` |
| data-event on submit | ✅ | `short_form_submit` |

### LeadForm (contact page)
| Check | Status | Notes |
|-------|--------|-------|
| POSTs to `/api/contact` | ✅ | |
| Shows loading state | ✅ | |
| Success only after API success | ✅ | |
| Error fallback with WhatsApp + Email | ✅ | but missing prefilled message → fixed |
| No redirect | ✅ | |
| data-event on submit | ✅ | |

### Calculator Lead Capture (business-loss-calculator)
| Check | Status | Notes |
|-------|--------|-------|
| POSTs to `/api/contact` | ✅ | |
| Shows loading state | ✅ | "Sending..." animation |
| Success only after API success | ✅ | Green checkmark card |
| Error fallback with WhatsApp + Email | ✅ | but missing prefilled message → fixed |
| No redirect | ✅ | |
| Includes calculator data in payload | ✅ | All leakage amounts, preset, category |
| data-event on start | ✅ | `calculator_lead_start` |
| data-event on submit | ✅ | `calculator_lead_submit` |
| data-event on error | ✅ | `calculator_lead_error` |

---

## Mobile Layout

| Component | Issue | Fix | Remaining |
|-----------|-------|-----|-----------|
| Header | None — sticky, burger menu works, backdrop blur | — | — |
| Floating WhatsApp | None — positioned at `bottom-24 md:bottom-6` clears sticky bar | — | — |
| Mobile sticky bar | None — `bottom-0`, `pb-20` on `<main>` prevents overlap | — | — |
| Demo cards | None — single column, `w-full` buttons, `text-sm` body | — | — |
| Calculator | None — grid collapses to single column | — | — |
| ShortAuditForm | None — responsive 2-column grid | — | — |
| LeadForm | None — responsive 2-column grid | — | — |
| Footer | None — 4-column → stacked on mobile | — | — |
| SEO page sections | None — grids collapse, `sm:` breakpoints adjust text | — | — |

---

## Summary of Fixes Made

1. **`lib/site.ts`** — Added `whatsappMessage` field to `siteConfig`; added `waUrl()` helper that builds WhatsApp URLs with encoded prefilled messages; updated `whatsappCta.href` to use `waUrl()`.

2. **`components/layout/mobile-sticky-cta.tsx`** — Updated WhatsApp href from raw URL to `waUrl()` (includes prefilled message).

3. **`app/contact/page.tsx`** — Updated direct WhatsApp link to use `waUrl()` with a general business enquiry message; added `waUrl` import.

4. **`components/ui/short-audit-form.tsx`** — Added `siteConfig` import; replaced plain `<p>` error state with a `<div>` containing WhatsApp and Email fallback buttons with contextual prefilled message.

5. **`components/ui/lead-form.tsx`** — Added `?text=` parameter with contextual message to error fallback WhatsApp link.

6. **`components/home/leak-estimator.tsx`** — Added `?text=` parameter with contextual message to calculator error fallback WhatsApp link.

## Remaining Notes

- No broken internal links found
- All 80+ pages compile and generate without errors
- All forms POST to `/api/contact`, show loading, success, and error states
- All WhatsApp links now include prefilled messages
- All email links use `mailto:eddy@pinexsystems.co.za`
- No redirects on form submission
- Mobile layout is consistent across all page types
