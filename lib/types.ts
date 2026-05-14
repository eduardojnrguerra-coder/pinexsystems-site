export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export interface IndustryCard {
  title: string;
  subtitle: string;
  highlights: string[];
}

export interface DemoCard {
  title: string;
  summary: string;
  features: string[];
}

export interface ServiceDetail {
  title: string;
  description: string;
  problem: string;
  benefit: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface SeoPage {
  slug: string;
  pageTitle: string;
  metaDescription: string;
  purpose: string;
  targetKeywords: string[];
  heroTitle: string;
  heroSummary: string;
  comparisonPoints: {
    heading: string;
    content: string;
  }[];
  comparisonTable?: {
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  whoThisIsFor?: string[];
  whoThisIsNotFor?: string[];
  practicalSections: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
  }[];
  ownerBenefits: string[];
  ctaHeading: string;
  ctaBody: string;
  faqs: FaqItem[];
}

export interface ArticleBlock {
  heading: string;
  paragraphs: string[];
  subSections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  bullets?: string[];
}

export interface InsightArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  keywords: string[];
  middleCta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  endCta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
  };
  blocks: ArticleBlock[];
  faq: FaqItem[];
  relatedLinks: {
    label: string;
    href: string;
  }[];
}
