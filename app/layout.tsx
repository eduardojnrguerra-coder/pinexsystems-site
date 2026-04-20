import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SchemaScript } from "@/components/ui/schema-script";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const headingFont = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title:
    "Pine X Systems | Custom Business Systems & Automation South Africa",
  description: siteConfig.description,
  keywords: [
    "Custom business systems South Africa",
    "Business automation South Africa",
    "Custom CRM South Africa",
    "Business dashboard systems",
    "Operations management system",
    "Dealership management system South Africa",
    "Workshop management system",
    "Lead management system",
    "Business process automation",
    "Custom software for small businesses",
    "Owner dashboard for business",
    "Business systems builder",
  ],
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: "Pine X Systems | Custom Business Systems & Automation South Africa",
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Pine X Systems digital operations dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pine X Systems | Custom Business Systems & Automation South Africa",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F7F7F2] text-[#111111]">
        <SchemaScript
          data={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
        />
        <div className="site-grid-overlay" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileStickyCta />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
