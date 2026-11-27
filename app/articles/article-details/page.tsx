"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Link2,
  Quote,
  Search,
  Share2,
  Tag,
  User,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type Article = {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  heroImage: string;
  sections: ArticleSection[];
  quote: string;
};

type RelatedArticle = {
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const article: Article = {
  title: "How to choose the right country for your next life",
  excerpt:
    "A thoughtful framework for comparing destinations beyond scenery, including healthcare, access, cost, lifestyle fit and long-term flexibility.",
  category: "Relocation",
  tags: ["Relocation planning", "Portugal", "Spain", "Lifestyle"],
  author: "Elena Martin",
  authorRole: "Relocation Editor",
  authorImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  date: "Nov 18, 2026",
  readTime: "8 min read",
  heroImage:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
  quote:
    "The right destination is rarely the one that looks best in a photo. It is the one that supports your everyday life with clarity and confidence.",
  sections: [
    {
      id: "start-with-life-not-location",
      heading: "Start with life, not location",
      paragraphs: [
        "Many relocation journeys begin with a country name. A better starting point is the life you want to live. Think about pace, community, climate, access to services, and how often you want to travel. These details shape the destination far more than a beautiful coastline ever will.",
        "When you begin with lifestyle, your shortlist becomes more honest. Some places are wonderful for holidays but less practical for year-round living. Others may feel less glamorous at first, yet offer better healthcare, easier administration and stronger long-term stability.",
      ],
    },
    {
      id: "compare-the-real-factors",
      heading: "Compare the real factors",
      paragraphs: [
        "A strong destination comparison should go beyond property prices. Healthcare access, residency pathways, language, transport links, local bureaucracy and seasonal rhythms all affect quality of life.",
      ],
      bullets: [
        "Healthcare quality and proximity",
        "Cost of living in everyday terms",
        "Ease of travel back to Switzerland or family",
        "Legal and administrative clarity",
        "Community, language and integration",
      ],
    },
    {
      id: "look-beyond-the-postcard",
      heading: "Look beyond the postcard",
      paragraphs: [
        "A destination can be attractive in summer and challenging in winter. It can be lively in tourist areas and quiet in residential neighbourhoods. That is why local insight matters. Real places come with trade-offs, and understanding them early prevents disappointment later.",
        "The goal is not to find a perfect country. It is to find the country whose compromises you are happy to live with.",
      ],
    },
    {
      id: "think-in-phases",
      heading: "Think in phases",
      paragraphs: [
        "A good relocation decision usually happens in stages. First, define the life you want. Second, compare countries against practical criteria. Third, test the reality with local insight and professional guidance. Only then should property become the main focus.",
        "This phased approach keeps the process calm and reduces the risk of making a permanent decision from a temporary emotion.",
      ],
    },
    {
      id: "make-the-decision-with-clarity",
      heading: "Make the decision with clarity",
      paragraphs: [
        "The best destination is the one that aligns with your finances, lifestyle and future plans. When those three are aligned, the move feels less like a leap and more like a natural next step.",
        "That is the real value of destination intelligence: replacing guesswork with understanding.",
      ],
    },
  ],
};

const relatedArticles: RelatedArticle[] = [
  {
    title: "What to know before buying property in Portugal",
    category: "Property",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85",
    date: "Nov 12, 2026",
    readTime: "6 min read",
  },
  {
    title: "Retirement abroad: a calmer way to plan",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85",
    date: "Nov 08, 2026",
    readTime: "5 min read",
  },
  {
    title: "The real cost of living in Southern Europe",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    date: "Nov 02, 2026",
    readTime: "7 min read",
  },
];

const popularArticles = [
  "What to know before buying property in Portugal",
  "The real cost of living in Southern Europe",
  "Remote work and the new definition of home",
  "A simple guide to buying property abroad",
];

const sidebarTags = [
  "Relocation",
  "Property",
  "Retirement",
  "Portugal",
  "Spain",
  "Finance",
  "Lifestyle",
  "Guides",
];

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-sky-500 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
        <nav className="flex items-center gap-2 overflow-x-auto text-[11px] font-medium text-slate-600">
          <Link href="/" className="transition hover:text-sky-600">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href="/articles" className="transition hover:text-sky-600">
            Articles
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="whitespace-nowrap text-slate-800">{article.category}</span>
        </nav>
      </div>
    </div>
  );
}

function ArticleHero() {
  return (
    <section className="bg-white pt-10 md:pt-14">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-sky-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-700">
            {article.category}
          </span>
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-3.5 py-2 text-[10px] font-semibold text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="mt-5 text-[28px] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-950 md:text-[42px]">
          {article.title}
        </h1>

        <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-[1.75] text-slate-600 md:text-[16px]">
          {article.excerpt}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 border-y border-slate-100 py-4">
          <div className="flex items-center gap-3">
            <img
              src={article.authorImage}
              alt={article.author}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-[12px] font-bold text-slate-900">{article.author}</p>
              <p className="text-[10px] text-slate-500">{article.authorRole}</p>
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-200 sm:block" />

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[14px] bg-slate-100 shadow-[0_18px_50px_rgba(11,29,51,0.1)]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="h-[260px] w-full object-cover md:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}

function TableOfContents() {
  return (
    <div className="rounded-[10px] bg-slate-50 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Table of contents
      </p>
      <div className="mt-3 space-y-2">
        {article.sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-start gap-2 text-[11px] font-medium text-slate-600 transition hover:text-sky-700"
          >
            <span className="mt-0.5 text-[10px] font-bold text-sky-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{section.heading}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ShareCard() {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-[0_8px_28px_rgba(11,29,51,0.045)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Share article
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { icon: FacebookIcon, label: "Facebook" },
          { icon: XIcon, label: "X" },
          { icon: LinkedInIcon, label: "LinkedIn" },
          { icon: Link2, label: "Copy link" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-3 text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-[9px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchCard() {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-[0_8px_28px_rgba(11,29,51,0.045)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Search articles
      </p>

      <div className="relative mt-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search articles"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[12px] outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
        />
      </div>
    </div>
  );
}

function PopularArticlesCard() {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-[0_8px_28px_rgba(11,29,51,0.045)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Popular articles
      </p>

      <div className="mt-4 space-y-3">
        {popularArticles.map((article, index) => (
          <Link
            key={article}
            href="/articles"
            className="group flex items-start gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
          >
            <span className="text-[12px] font-bold text-sky-200">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-[11px] font-semibold leading-[1.5] text-slate-700 transition group-hover:text-sky-700">
              {article}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TagsCard() {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-[0_8px_28px_rgba(11,29,51,0.045)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Tags
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {sidebarTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function AuthorBox() {
  return (
    <div className="mt-10 rounded-[12px] bg-sky-50/80 p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={article.authorImage}
          alt={article.author}
          loading="lazy"
          className="h-14 w-14 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">
            Written by
          </p>
          <h3 className="mt-1 text-[14px] font-bold text-slate-950">{article.author}</h3>
          <p className="mt-1 max-w-[620px] text-[12px] leading-[1.65] text-slate-600">
            Elena writes about relocation, lifestyle planning and international living with a focus on clarity, practical detail and calm decision-making.
          </p>
        </div>

        <button className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-sky-600 px-4 text-[11px] font-bold text-white transition hover:bg-sky-700">
          <User className="h-3.5 w-3.5" />
          View profile
        </button>
      </div>
    </div>
  );
}

function RelatedArticles() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
              Keep reading
            </p>
            <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[30px]">
              Related articles
            </h2>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 transition hover:text-sky-700"
          >
            View all articles
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden rounded-[10px] bg-white shadow-[0_8px_28px_rgba(11,29,51,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,29,51,0.08)]"
            >
              <Link href="/articles" className="block">
                <div className="relative h-[160px] overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-700">
                    {article.category}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-2.5 text-[15px] font-bold leading-[1.4] tracking-[-0.015em] text-slate-950 transition group-hover:text-sky-700">
                    {article.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-sky-700">
                    Read article
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="bg-sky-50/80 py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[12px] bg-white p-6 text-center shadow-[0_14px_40px_rgba(11,29,51,0.06)] md:p-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-600">
            Plan with more clarity
          </p>

          <h2 className="mx-auto mt-2 max-w-[720px] text-[24px] font-semibold leading-[1.15] tracking-[-0.04em] text-slate-950 md:text-[32px]">
            Not sure which destination fits your next chapter?
          </h2>

          <p className="mx-auto mt-3 max-w-[620px] text-[13px] leading-[1.65] text-slate-600">
            Explore destination guides, compare countries and take the next step with a calmer, more informed approach.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/destinations"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-sky-600 px-5 text-[12px] font-bold text-white transition hover:bg-sky-700"
            >
              Explore destinations
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/articles"
              className="inline-flex h-11 items-center rounded-full border border-slate-200 px-5 text-[12px] font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
            >
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ArticleDetailsPage() {
  const toc = useMemo(() => article.sections, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <ReadingProgress />
      <Breadcrumbs />

      <ArticleHero />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Article body */}
          <article className="max-w-[820px]">
            <div className="space-y-10">
              {toc.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-slate-950 md:text-[26px]">
                    {section.heading}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-[1.85] text-slate-700 md:text-[16px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <div className="mt-5 rounded-[10px] bg-slate-50 p-4">
                      <div className="space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <p
                            key={bullet}
                            className="flex items-start gap-2 text-[13px] font-medium text-slate-700"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
                            {bullet}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {index === 1 ? (
                    <div className="mt-8 rounded-[12px] bg-sky-50/80 p-5 md:p-6">
                      <Quote className="h-5 w-5 text-sky-500" />
                      <p className="mt-3 font-serif text-[15px] italic leading-[1.7] text-slate-700 md:text-[17px]">
                        {article.quote}
                      </p>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                <Tag className="h-3.5 w-3.5" />
                Tags
              </div>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-50 px-3.5 py-2 text-[10px] font-semibold text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-slate-100 bg-white p-4 shadow-[0_8px_28px_rgba(11,29,51,0.045)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <Share2 className="h-4 w-4 text-sky-600" />
                Share this article
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">
                  Facebook
                </button>
                <button className="rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">
                  Twitter
                </button>
                <button className="rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">
                  LinkedIn
                </button>
                <button className="rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">
                  Copy link
                </button>
              </div>
            </div>

            <AuthorBox />
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
            <TableOfContents />
            <SearchCard />
            <ShareCard />
            <PopularArticlesCard />
            <TagsCard />

            <div className="rounded-[10px] bg-sky-600 p-5 text-white shadow-[0_14px_35px_rgba(2,132,199,0.18)]">
              <BookOpen className="h-5 w-5 text-white/80" />
              <h3 className="mt-4 text-[16px] font-bold leading-[1.3]">
                Want more destination guides?
              </h3>
              <p className="mt-2 text-[12px] leading-[1.6] text-sky-100">
                Explore practical guides and country insights designed to help you plan with confidence.
              </p>
              <Link
                href="/destinations"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold text-sky-700 transition hover:bg-sky-50"
              >
                Explore guides
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <RelatedArticles />
      <BottomCta />
    </div>
  );
}