import { siteConfig } from "@/lib/site";
import type { FaqItem, InsightArticle, SeoPage } from "@/lib/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.email,
    telephone: siteConfig.phonePlain,
    logo: `${siteConfig.domain}/icon.png`,
    sameAs: [siteConfig.domain],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.domain}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.domain}/icon.png`,
    url: siteConfig.domain,
    telephone: siteConfig.phonePlain,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: "South Africa",
    },
    areaServed: "South Africa",
    priceRange: "$$",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    inLanguage: "en-ZA",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.domain}/insights?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function servicePageSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.pageTitle,
    name: page.heroTitle,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    url: `${siteConfig.domain}/${page.slug}`,
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(article: InsightArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    keywords: article.keywords.join(", "),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.domain}/insights/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: "en-ZA",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}

export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    applicationCategory: input.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: "South Africa",
    url: `${siteConfig.domain}${input.path}`,
  };
}
