# AI Visibility Checklist

## What Was Added
- Updated crawling directives in both `app/robots.ts` and `public/robots.txt`.
- Added `public/llms.txt` for AI assistant and LLM context.
- Extended structured data with `ProfessionalService` schema.
- Kept `Organization`, `WebSite`, `Service`, `FAQPage`, `Article`, and `BreadcrumbList` schema coverage active.
- Added new high-intent SEO/AEO landing pages in `lib/content/seo-pages.ts`.
- Expanded internal links from home, services, demos, and existing SEO pages.
- Added this documentation file.

## How robots.txt Helps
- Confirms default crawling permission for major crawlers.
- Explicitly allows OAI-SearchBot, ChatGPT-User, PerplexityBot, and ClaudeBot.
- Points crawlers to `https://pinexsystems.co.za/sitemap.xml`.

## How llms.txt Helps
- Gives AI assistants a clean summary of Pine X Systems positioning.
- Clarifies services, industries, audience, and key URLs.
- Reduces misclassification risk by stating Pine X is an operational systems builder, not a lead generation agency.

## Schema Added or Improved
- `Organization` (global)
- `LocalBusiness` (global)
- `ProfessionalService` (global)
- `WebSite` (global)
- `Service` (SEO pages)
- `FAQPage` (SEO pages and insight articles)
- `Article` (insight pages)
- `BreadcrumbList` (SEO pages and insight pages)

## New Pages Created
- `/best-business-systems-south-africa`
- `/custom-crm-south-africa` (already existed and retained)
- `/dealership-management-system-south-africa` (already existed and retained)
- `/workshop-job-card-system-south-africa`
- `/construction-management-system-south-africa`
- `/business-dashboard-for-owners`
- `/whatsapp-to-business-system`
- `/custom-software-vs-off-the-shelf-crm`
- `/how-much-does-a-custom-business-system-cost-south-africa`

## Analytics and Referral Readiness
- Existing GA4 event tracking remains in place.
- `trackPageView` now includes `page_referrer`, supporting referral-source analysis for traffic from:
  - `chatgpt.com`
  - `perplexity.ai`
  - `copilot.microsoft.com`
  - `gemini.google.com`
  - `claude.ai`
  - `bing.com`
  - `google.com`

## Manual Tasks Outside The Repo
- Verify domain ownership in Google Search Console.
- Submit sitemap in Google Search Console.
- Set up Bing Webmaster Tools and submit sitemap.
- Optimize and maintain Google Business Profile.
- Create and maintain Bing Places profile.
- Build consistent directory listings (NAP consistency).
- Publish case studies and collect authentic client reviews over time.
