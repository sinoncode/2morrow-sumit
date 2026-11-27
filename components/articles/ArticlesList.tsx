"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ArticleCategory =
  | "All"
  | "Relocation"
  | "Property"
  | "Lifestyle"
  | "Finance"
  | "Guides";

type ArticlePost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<ArticleCategory, "All">;
  tags: string[];
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const categories: ArticleCategory[] = [
  "All",
  "Relocation",
  "Property",
  "Lifestyle",
  "Finance",
  "Guides",
];

const popularTags = [
  "Portugal",
  "Spain",
  "Retirement",
  "Second home",
  "Property buying",
  "Relocation planning",
  "Tax basics",
  "Cost of living",
  "Remote work",
  "Switzerland",
];

const articlePosts: ArticlePost[] = [
  {
    id: 1,
    slug: "how-to-choose-the-right-country-for-your-next-life",
    title: "How to choose the right country for your next life",
    excerpt:
      "A thoughtful framework for comparing destinations beyond scenery, including healthcare, access, cost, lifestyle fit and long-term flexibility.",
    category: "Relocation",
    tags: ["Relocation planning", "Portugal", "Spain"],
    author: "Elena Martin",
    authorRole: "Relocation Editor",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    date: "Nov 18, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 2,
    slug: "what-to-know-before-buying-property-in-portugal",
    title: "What to know before buying property in Portugal",
    excerpt:
      "From legal checks to local market differences, here is a practical overview for buyers considering Portugal as a long-term base.",
    category: "Property",
    tags: ["Property buying", "Portugal", "Guides"],
    author: "Marco Silva",
    authorRole: "Property Analyst",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    date: "Nov 12, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    slug: "retirement-abroad-a-calmer-way-to-plan",
    title: "Retirement abroad: a calmer way to plan",
    excerpt:
      "Retirement planning becomes easier when lifestyle, healthcare, financial structure and community are considered together from the start.",
    category: "Lifestyle",
    tags: ["Retirement", "Healthcare", "Cost of living"],
    author: "Claire Dubois",
    authorRole: "Lifestyle Writer",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    date: "Nov 08, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    slug: "the-real-cost-of-living-in-southern-europe",
    title: "The real cost of living in Southern Europe",
    excerpt:
      "A clear look at everyday expenses, seasonal differences and the lifestyle trade-offs that matter before making a move.",
    category: "Finance",
    tags: ["Cost of living", "Spain", "Portugal"],
    author: "Jonas Weber",
    authorRole: "Finance Contributor",
    authorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    date: "Nov 02, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    slug: "remote-work-and-the-new-definition-of-home",
    title: "Remote work and the new definition of home",
    excerpt:
      "More people are choosing destinations based on quality of life rather than office location. Here is what to think about first.",
    category: "Lifestyle",
    tags: ["Remote work", "Second home", "Lifestyle"],
    author: "Amelia Hart",
    authorRole: "Editorial Lead",
    authorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    date: "Oct 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    slug: "a-simple-guide-to-buying-property-abroad",
    title: "A simple guide to buying property abroad",
    excerpt:
      "A step-by-step guide to understanding the buying journey, from first research to verification, legal review and final decision.",
    category: "Guides",
    tags: ["Property buying", "Guides", "Legal basics"],
    author: "Daniel Costa",
    authorRole: "Guide Writer",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    date: "Oct 21, 2026",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    slug: "why-second-home-buyers-are-thinking-long-term",
    title: "Why second-home buyers are thinking long-term",
    excerpt:
      "The best second-home decisions balance personal use, maintenance, access and future resale or rental flexibility.",
    category: "Property",
    tags: ["Second home", "Investment", "Lifestyle"],
    author: "Sofia Laurent",
    authorRole: "Property Writer",
    authorImage:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=300&q=80",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    slug: "tax-basics-for-international-buyers",
    title: "Tax basics for international buyers",
    excerpt:
      "A simple introduction to the tax questions that often come up when buying, owning or selling property in another country.",
    category: "Finance",
    tags: ["Tax basics", "Finance", "Guides"],
    author: "Nina Keller",
    authorRole: "Finance Editor",
    authorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    date: "Oct 09, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
  },
];

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow ? (
        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-sky-600">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="mt-2 text-[28px] font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 md:text-[40px]">
        {title}
      </h1>

      {description ? (
        <p className="mt-3 text-[12px] leading-[1.65] text-slate-500 md:text-[13px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ArticleCard({ post }: { post: ArticlePost }) {
  return (
    <article className="group overflow-hidden rounded-[10px] bg-white shadow-[0_8px_28px_rgba(11,29,51,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,29,51,0.08)]">
      <Link href="/articles/article-details" className="block">
        <div className="relative h-[190px] overflow-hidden bg-slate-100">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-700">
            {post.category}
          </span>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h2 className="mt-3 text-[17px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-950 transition group-hover:text-sky-700">
            {post.title}
          </h2>

          <p className="mt-2 text-[12px] leading-[1.65] text-slate-600">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <div className="flex min-w-0 items-center gap-2">
              <img
                src={post.authorImage}
                alt={post.author}
                loading="lazy"
                className="h-7 w-7 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-slate-800">
                  {post.author}
                </p>
                <p className="truncate text-[9px] text-slate-500">
                  {post.authorRole}
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-sky-700">
              Read
              <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function FeaturedPost({ post }: { post: ArticlePost }) {
  return (
    <article className="group grid overflow-hidden rounded-[12px] bg-white shadow-[0_14px_45px_rgba(11,29,51,0.07)] transition duration-300 hover:-translate-y-1 lg:grid-cols-[1.15fr_1fr]">
      <Link href="/articles/article-details" className="relative block min-h-[260px] overflow-hidden bg-slate-100 lg:min-h-[360px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-700">
          <Sparkles className="h-3 w-3" />
          Featured
        </span>
      </Link>

      <div className="flex flex-col justify-center p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-500">
          <span className="rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-bold text-sky-700">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h2 className="mt-4 text-[22px] font-semibold leading-[1.18] tracking-[-0.035em] text-slate-950 md:text-[28px]">
          <Link href="/articles/article-details" className="transition hover:text-sky-700">
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 max-w-[520px] text-[13px] leading-[1.7] text-slate-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div className="flex items-center gap-3">
            <img
              src={post.authorImage}
              alt={post.author}
              loading="lazy"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <p className="text-[11px] font-bold text-slate-900">{post.author}</p>
              <p className="text-[9px] text-slate-500">{post.authorRole}</p>
            </div>
          </div>

          <Link
            href="/articles/article-details"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-sky-700"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ArticlesList() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("All");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return articlePosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const matchesTag =
        !selectedTag ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(selectedTag.toLowerCase()),
        );

      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const featuredPost = articlePosts.find((post) => post.featured) ?? articlePosts[0];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* Header */}
      <section className="bg-sky-50/80 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Articles & guides"
            title="Stories that help you choose with clarity"
            description="Practical articles on relocation, property, lifestyle and planning, written to help you make calm and informed decisions."
          />

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles, topics or destinations"
                className="h-12 w-full rounded-full border border-transparent bg-white pl-11 pr-4 text-[11px] text-slate-700 shadow-[0_10px_30px_rgba(11,29,51,0.05)] outline-none transition placeholder:text-slate-400 focus:border-sky-200 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-600 px-5 text-[12px] font-bold text-white transition hover:bg-sky-700">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FeaturedPost post={featuredPost} />
        </div>
      </section>

      {/* Categories and tags */}
      <section className="bg-white pb-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold transition ${
                      isActive
                        ? "bg-sky-600 text-white shadow-[0_8px_20px_rgba(2,132,199,0.18)]"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="max-w-full lg:max-w-[420px]">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <Tag className="h-3.5 w-3.5" />
                Popular tags
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => {
                  const isActive = selectedTag === tag;

                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isActive ? "" : tag)}
                      className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-sky-700 hover:ring-sky-200"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
                Latest articles
              </p>
              <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[30px]">
                Explore the Articles
              </h2>
            </div>

            <p className="text-[12px] text-slate-500">
              Showing {filteredPosts.length} of {articlePosts.length} articles
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-[12px] bg-slate-50 px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-4 text-[16px] font-bold text-slate-900">
                No articles found
              </h3>
              <p className="mx-auto mt-2 max-w-[420px] text-[10px] leading-[1.6] text-slate-500">
                Try changing your search, category or tag selection to discover more content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-sky-50/80 py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="rounded-[12px] bg-white p-6 shadow-[0_14px_40px_rgba(11,29,51,0.06)] md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
                  Stay informed
                </p>
                <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[28px]">
                  Get thoughtful relocation insights in your inbox
                </h2>
                <p className="mt-2 max-w-[560px] text-[13px] leading-[1.65] text-slate-600">
                  One useful email at a time. No noise, no pressure, only practical guidance for your next chapter.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-[12px] outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100 sm:w-[240px]"
                />
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sky-600 px-5 text-[12px] font-bold text-white transition hover:bg-sky-700">
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}