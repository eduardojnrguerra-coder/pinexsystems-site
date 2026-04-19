"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { InsightArticle } from "@/lib/types";

interface InsightsExplorerProps {
  articles: InsightArticle[];
}

export function InsightsExplorer({ articles }: InsightsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(articles.map((article) => article.category))];
  }, [articles]);

  const filtered = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "All" || article.category === activeCategory;

      const textMatch =
        !normalized ||
        article.title.toLowerCase().includes(normalized) ||
        article.description.toLowerCase().includes(normalized) ||
        article.keywords.join(" ").toLowerCase().includes(normalized);

      return categoryMatch && textMatch;
    });
  }, [activeCategory, articles, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="glass-card p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
          <label className="relative">
            <span className="sr-only">Search insights</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6c70]"
              aria-hidden="true"
            />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="form-input form-input-light pl-10"
              placeholder="Search articles, systems, and topics"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-[8px] border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-[#111111]/10 bg-white text-[#555962] hover:border-[#111111]/25 hover:text-[#111111]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((article) => (
          <article key={article.slug} className="glass-card p-6">
            <p className="text-xs font-medium text-[var(--accent)]">
              {article.category}
            </p>
            <h2 className="mt-3 font-heading text-xl font-semibold text-[#111111]">
              {article.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555962]">
              {article.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#6b6c70]">
              <span>{article.readingTime}</span>
              <span>Updated {article.updatedAt}</span>
            </div>
            <Link className="inline-link mt-5 inline-flex" href={`/insights/${article.slug}`}>
              Read Article
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-6 text-center text-[#555962]">
          No matching articles found. Try a different keyword or category.
        </div>
      ) : null}
    </div>
  );
}
