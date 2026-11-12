"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  Search,
  SearchX,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Data (illustrative: replace with verified content / your CMS)              */
/* -------------------------------------------------------------------------- */

type Scores = {
  lifestyle: number;
  value: number;
  access: number;
  climate: number;
  buying: number;
};

type Details = {
  lifestyle: string;
  healthcare: string;
  climate: string;
  access: string;
  regions: string;
  buyers: string;
  acquisition: string;
  ownership: string;
  support: string;
};

export type Destination = {
  id: string;
  name: string;
  region: string;
  tagline: string;
  image: string;
  scores: Scores;
  details: Details;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=80`;

export const DESTINATIONS: Destination[] = [
  {
    id: "switzerland",
    name: "Switzerland",
    region: "Europe",
    tagline: "Alpine lifestyle, political stability",
    image: img("photo-1464822759023-fed622ff2c3b"),
    scores: { lifestyle: 5, value: 1, access: 5, climate: 3, buying: 2 },
    details: {
      lifestyle: "Orderly, outdoors-focused, high quality of life",
      healthcare: "Excellent, insurance-based system",
      climate: "Four distinct seasons, snowy winters",
      access: "Home base: excellent rail and air links",
      regions: "Lakes, mountains and compact cities",
      buyers: "Restrictions apply to non-residents",
      acquisition: "Cantonal taxes and notary fees apply",
      ownership: "High maintenance and property costs",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "portugal",
    name: "Portugal",
    region: "Europe",
    tagline: "Coastal lifestyle, welcoming people",
    image: img("photo-1555881400-74d7acaacd8b"),
    scores: { lifestyle: 4, value: 3, access: 4, climate: 5, buying: 4 },
    details: {
      lifestyle: "Relaxed and authentic",
      healthcare: "Good quality and accessible",
      climate: "Mild year-round climate",
      access: "Direct flights, good connections",
      regions: "Coast, cities and countryside",
      buyers: "Straightforward for eu citizens",
      acquisition: "Generally reasonable",
      ownership: "Moderate annual property taxes",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "spain",
    name: "Spain",
    region: "Europe",
    tagline: "Vibrant cities, mediterranean living",
    image: img("photo-1583422409516-2895a77efded"),
    scores: { lifestyle: 4, value: 3, access: 5, climate: 5, buying: 4 },
    details: {
      lifestyle: "Vibrant and diverse",
      healthcare: "Good quality and accessible",
      climate: "Warm summers, mild winters",
      access: "Direct flights, excellent connections",
      regions: "Beaches, cities and inland regions",
      buyers: "Straightforward for eu citizens",
      acquisition: "Generally reasonable",
      ownership: "Community and local property taxes",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "greece",
    name: "Greece",
    region: "Europe",
    tagline: "Island charm, relaxed lifestyle",
    image: img("photo-1613395877344-13d4a8e0d49e"),
    scores: { lifestyle: 4, value: 3, access: 4, climate: 5, buying: 3 },
    details: {
      lifestyle: "Island and mainland lifestyles",
      healthcare: "Good quality, with regional differences",
      climate: "Warm summers, mild winters",
      access: "Direct flights, good connections",
      regions: "Islands and mainland regions",
      buyers: "Varies by location",
      acquisition: "Transfer tax and legal fees apply",
      ownership: "Annual property tax, varies by area",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "france",
    name: "France",
    region: "Europe",
    tagline: "Refined living, nature and heritage",
    image: img("photo-1502602898657-3e91760cbb34"),
    scores: { lifestyle: 5, value: 2, access: 5, climate: 4, buying: 4 },
    details: {
      lifestyle: "Refined, rich in food and culture",
      healthcare: "Very good, widely accessible",
      climate: "Varies from alpine to mediterranean",
      access: "Excellent rail and air links",
      regions: "Alps, riviera, paris and countryside",
      buyers: "Open to foreign buyers",
      acquisition: "Notary fees are significant",
      ownership: "Local property and residence taxes",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "italy",
    name: "Italy",
    region: "Europe",
    tagline: "Art, culture, la dolce vita",
    image: img("photo-1499678329028-101435896b83"),
    scores: { lifestyle: 5, value: 3, access: 5, climate: 4, buying: 3 },
    details: {
      lifestyle: "Historic beauty, strong sense of belonging",
      healthcare: "Good, public and private options",
      climate: "Mediterranean, alpine in the north",
      access: "Excellent rail and air links",
      regions: "Lakes, coast, hill towns and cities",
      buyers: "Generally open, check reciprocity rules",
      acquisition: "Registration taxes and notary fees",
      ownership: "Municipal property taxes apply",
      support: "Local team and trusted partners",
    },
  },
  {
    id: "indonesia",
    name: "Bali, indonesia",
    region: "Asia",
    tagline: "Tropical lifestyle, creative community",
    image: img("photo-1537996194471-e657df975ab4"),
    scores: { lifestyle: 4, value: 4, access: 2, climate: 4, buying: 2 },
    details: {
      lifestyle: "Creative, wellness-oriented, expat community",
      healthcare: "Private clinics, limited in remote areas",
      climate: "Tropical, wet and dry seasons",
      access: "Long-haul, usually with a connection",
      regions: "Beaches, rice terraces and towns",
      buyers: "Foreigners cannot hold freehold land",
      acquisition: "Leasehold or specific rights structures",
      ownership: "Lease terms and local taxes vary",
      support: "Verify locally with qualified advisers",
    },
  },
  {
    id: "thailand",
    name: "Thailand",
    region: "Asia",
    tagline: "Warm hospitality, vibrant way of life",
    image: img("photo-1552462861-009d8b7a5e57"),
    scores: { lifestyle: 4, value: 4, access: 2, climate: 4, buying: 2 },
    details: {
      lifestyle: "Warm, social, strong hospitality",
      healthcare: "Strong private hospitals",
      climate: "Tropical, hot and humid",
      access: "Long-haul, direct options limited",
      regions: "Islands, beaches, cities and north",
      buyers: "Condo ownership possible, land restricted",
      acquisition: "Transfer fees apply",
      ownership: "Condo fees and local taxes",
      support: "Verify locally with qualified advisers",
    },
  },
  {
    id: "morocco",
    name: "Morocco",
    region: "Africa",
    tagline: "Rich culture, easy access",
    image: img("photo-1489749798305-4fea3ae63d43"),
    scores: { lifestyle: 3, value: 4, access: 4, climate: 4, buying: 3 },
    details: {
      lifestyle: "Rich culture, riads and coastal towns",
      healthcare: "Good private care in major cities",
      climate: "Warm, dry, atlantic and desert variety",
      access: "Short flights from europe",
      regions: "Marrakech, coast and atlas foothills",
      buyers: "Generally open to foreign buyers",
      acquisition: "Registration fees and legal costs",
      ownership: "Generally low running costs",
      support: "Verify locally with qualified advisers",
    },
  },
  {
    id: "uae",
    name: "United arab emirates",
    region: "Middle east",
    tagline: "Modern cities, tax-friendly setting",
    image: img("photo-1512453979798-5ea266f8880c"),
    scores: { lifestyle: 4, value: 2, access: 3, climate: 3, buying: 4 },
    details: {
      lifestyle: "Modern, international, fast-paced",
      healthcare: "High-quality private system",
      climate: "Very hot summers, mild winters",
      access: "Direct flights from major hubs",
      regions: "Dubai, abu dhabi and coastal zones",
      buyers: "Freehold available in designated zones",
      acquisition: "Registration fees apply",
      ownership: "Service charges, no annual property tax in most cases",
      support: "Verify locally with qualified advisers",
    },
  },
];

const METRICS: { key: keyof Scores; label: string }[] = [
  { key: "lifestyle", label: "Lifestyle fit" },
  { key: "value", label: "Value for money" },
  { key: "access", label: "Access from switzerland" },
  { key: "climate", label: "Climate" },
  { key: "buying", label: "Buyer conditions" },
];

const GROUPS: {
  id: string;
  title: string;
  description: string;
  rows: { key: keyof Details; label: string }[];
}[] = [
  {
    id: "daily",
    title: "Daily life",
    description: "What it feels like, every day.",
    rows: [
      { key: "lifestyle", label: "Lifestyle fit" },
      { key: "healthcare", label: "Healthcare context" },
      { key: "climate", label: "Seasonality" },
    ],
  },
  {
    id: "access",
    title: "Practical access",
    description: "How easily you can get there.",
    rows: [
      { key: "access", label: "Access from switzerland" },
      { key: "regions", label: "Regional variety" },
    ],
  },
  {
    id: "property",
    title: "Property reality",
    description: "What to expect as a buyer and owner.",
    rows: [
      { key: "buyers", label: "Foreign buyer conditions" },
      { key: "acquisition", label: "Indicative acquisition costs" },
      { key: "ownership", label: "Main ownership costs" },
      { key: "support", label: "Transaction support" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hooks                                                                      */
/* -------------------------------------------------------------------------- */

/** Keeps the modal mounted during its exit animation. */
function usePresence(open: boolean, duration = 280) {
  const [render, setRender] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    const t = window.setTimeout(() => setRender(false), duration);
    return () => window.clearTimeout(t);
  }, [open, duration]);

  return { render, visible };
}

/* -------------------------------------------------------------------------- */
/* Country picker (search combobox)                                           */
/* -------------------------------------------------------------------------- */

type Accent = "sky" | "emerald";

const accentStyles: Record<
  Accent,
  { badge: string; ring: string; bar: string; barSoft: string; text: string }
> = {
  sky: {
    badge: "Bg-sky-600 text-white",
    ring: "ring-sky-200 border-sky-300",
    bar: "bg-sky-600",
    barSoft: "bg-sky-200",
    text: "Text-sky-700",
  },
  emerald: {
    badge: "Bg-emerald-500 text-white",
    ring: "ring-emerald-200 border-emerald-300",
    bar: "bg-emerald-500",
    barSoft: "bg-emerald-200",
    text: "Text-emerald-700",
  },
};

function CountryPicker({
  slot,
  accent,
  value,
  excludeId,
  onChange,
  inputRef,
}: {
  slot: "A" | "B";
  accent: Accent;
  value: Destination | null;
  excludeId?: string;
  onChange: (d: Destination | null) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const style = accentStyles[accent];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATIONS.filter((d) => d.id !== excludeId).filter((d) =>
      q
        ? `${d.name} ${d.region} ${d.tagline}`.toLowerCase().includes(q)
        : true,
    );
  }, [query, excludeId]);

  useEffect(() => setActive(0), [query, open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (d: Destination) => {
    onChange(d);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape" && open) {
      e.stopPropagation(); // close the list first, not the modal
      setOpen(false);
    }
  };

  /* Selected state */
  if (value) {
    return (
      <div
        key={value.id}
        className={`cm-pop flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-[0_10px_30px_rgba(11,29,51,0.07)] ring-4 ${style.ring}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.image}
          alt=""
          onError={(e) => (e.currentTarget.style.opacity = "0")}
          className="h-14 w-14 shrink-0 rounded-xl bg-slate-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold ${style.badge}`}
          >
            {slot}
          </span>
          <p className="mt-1 truncate text-[14px] font-bold tracking-[-0.02em] text-slate-950">
            {value.name}
          </p>
          <p className="truncate text-[11px] text-slate-500">{value.tagline}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label={`Remove ${value.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:rotate-90 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  /* Search state */
  return (
    <div ref={wrapRef} className="relative">
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] text-slate-400">
          <span
            className={`inline-flex h-4 w-4 items-center justify-center rounded text-[9px] ${style.badge}`}
          >
            {slot}
          </span>
          Destination {slot}
        </span>
        <span className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            placeholder="Search a country..."
            className="h-[58px] w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 pl-10 pr-4 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-sky-300 focus:border-solid focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </span>
      </label>

      {open ? (
        <ul
          role="listbox"
          className="cm-drop absolute left-0 right-0 top-full z-30 mt-2 max-h-[260px] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_24px_60px_rgba(11,29,51,0.18)]"
        >
          {results.length === 0 ? (
            <li className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
              <SearchX className="h-5 w-5 text-slate-300" />
              <span className="text-[12px] font-semibold text-slate-600">
                No destinations found
              </span>
              <span className="text-[11px] text-slate-400">
                try another country or region.
              </span>
            </li>
          ) : (
            results.map((d, i) => (
              <li key={d.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(d)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                    i === active ? "bg-sky-50" : "hover:bg-slate-50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.opacity = "0")}
                    className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-slate-900">
                      {d.name}
                    </span>
                    <span className="block truncate text-[11px] text-slate-400">
                      {d.region} · {d.tagline}
                    </span>
                  </span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 shrink-0 text-sky-600 transition ${
                      i === active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Results                                                                    */
/* -------------------------------------------------------------------------- */

function ScoreBar({
  score,
  best,
  accent,
  animate,
  delay,
}: {
  score: number;
  best: boolean;
  accent: Accent;
  animate: boolean;
  delay: number;
}) {
  const s = accentStyles[accent];
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            best ? s.bar : s.barSoft
          }`}
          style={{
            width: animate ? `${(score / 5) * 100}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className={`w-7 text-right text-[11px] tabular-nums ${
          best ? `font-bold ${s.text}` : "font-medium text-slate-400"
        }`}
      >
        {score}/5
      </span>
    </div>
  );
}

function Results({ a, b }: { a: Destination; b: Destination }) {
  const [filter, setFilter] = useState("all");
  const [animate, setAnimate] = useState(false);

  // replay the bar animation whenever either destination changes
  useEffect(() => {
    setAnimate(false);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [a.id, b.id]);

  const tabs = [{ id: "all", title: "All" }, ...GROUPS.map((g) => ({ id: g.id, title: g.title }))];
  const groups = GROUPS.filter((g) => filter === "all" || g.id === filter);

  return (
    <div className="cm-rise">
      {/* At a glance */}
      <section className="rounded-2xl bg-gradient-to-br from-sky-50 to-white p-4 ring-1 ring-sky-100 sm:p-5">
        <p className="text-[10px] font-bold tracking-[0.18em] text-sky-600">
          At a glance
        </p>
        <div className="mt-4 space-y-4">
          {METRICS.map((m, i) => {
            const sa = a.scores[m.key];
            const sb = b.scores[m.key];
            return (
              <div key={m.key} className="grid items-center gap-x-5 gap-y-1.5 md:grid-cols-[170px_1fr_1fr]">
                <span className="text-[12px] font-semibold text-slate-700">{m.label}</span>
                <ScoreBar score={sa} best={sa >= sb} accent="sky" animate={animate} delay={i * 90} />
                <ScoreBar score={sb} best={sb >= sa} accent="emerald" animate={animate} delay={i * 90 + 60} />
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-[10px] text-slate-400">
          Indicative scores to help you compare. Always verify details with
          local professionals.
        </p>
      </section>

      {/* Group filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
              filter === t.id
                ? "bg-slate-950 text-white shadow-md"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Detail groups (key replays the entrance on filter change) */}
      <div key={filter} className="mt-2">
        {groups.map((group) => (
          <section key={group.id} className="mt-5">
            <div className="mb-1 flex items-baseline gap-2">
              <h3 className="text-[13px] font-bold text-slate-950">{group.title}</h3>
              <span className="text-[11px] text-slate-400">{group.description}</span>
            </div>

            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
              {group.rows.map((row, i) => (
                <div
                  key={row.key}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="cm-rise grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3.5 transition-colors hover:bg-slate-50/70 md:grid-cols-[170px_1fr_1fr] md:items-start"
                >
                  <p className="col-span-2 text-[11px] font-bold tracking-[0.08em] text-slate-400 md:col-span-1 md:pt-0.5 md:text-[12px] md:normal-case md:tracking-normal md:text-slate-700 md:font-semibold">
                    {row.label}
                  </p>
                  <p className="text-[12px] leading-[1.55] text-slate-600">{a.details[row.key]}</p>
                  <p className="text-[12px] leading-[1.55] text-slate-600">{b.details[row.key]}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function EmptyState({
  picked,
  onQuickPick,
}: {
  picked: number;
  onQuickPick: (d: Destination) => void;
}) {
  const popular = DESTINATIONS.filter((d) =>
    ["portugal", "spain", "greece", "italy", "thailand"].includes(d.id),
  );

  return (
    <div className="cm-rise flex h-full min-h-[220px] flex-col items-center justify-center px-4 py-8 text-center">
      <div className="flex items-center gap-3">
        <span className="cm-bob flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-[13px] font-bold text-sky-700">
          A
        </span>
        <ArrowLeftRight className="h-4 w-4 text-slate-300" />
        <span className="cm-bob flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[13px] font-bold text-emerald-700 [animation-delay:-1.2s]">
          B
        </span>
      </div>

      <h3 className="mt-5 text-[16px] font-bold tracking-[-0.02em] text-slate-950">
        {picked === 0 ? "Choose two destinations to compare" : "Now choose one more"}
      </h3>
      <p className="mt-1.5 max-w-sm text-[12px] leading-[1.6] text-slate-500">
        Search above, or start with a popular destination.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {popular.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onQuickPick(d)}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11.5px] font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 hover:shadow-md"
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                      */
/* -------------------------------------------------------------------------- */

export default function CompareDestinationsModal({
  open,
  onClose,
  initial,
  onExplore,
}: {
  open: boolean;
  onClose: () => void;
  /** optional destination ids to preselect, e.g. ["portugal", "spain"] */
  initial?: [string?, string?];
  onExplore?: (destination: Destination) => void;
}) {
  const { render, visible } = usePresence(open);
  const [mounted, setMounted] = useState(false);
  const [a, setA] = useState<Destination | null>(null);
  const [b, setB] = useState<Destination | null>(null);
  const firstInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  // preselect when the modal opens
  useEffect(() => {
    if (!open) return;
    const find = (id?: string) => DESTINATIONS.find((d) => d.id === id) ?? null;
    if (initial) {
      setA(find(initial[0]));
      setB(find(initial[1]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // esc to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstInput.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const quickPick = useCallback(
    (d: Destination) => {
      if (!a) setA(d);
      else if (!b && d.id !== a.id) setB(d);
    },
    [a, b],
  );

  const swap = () => {
    setA(b);
    setB(a);
  };

  if (!mounted || !render) return null;

  const picked = Number(Boolean(a)) + Number(Boolean(b));

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Compare destinations"
    >
      <style>{`
        @keyframes cm-pop { from { opacity: 0; transform: scale(0.94) translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes cm-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes cm-drop { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes cm-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .cm-pop { animation: cm-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cm-rise { animation: cm-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cm-drop { animation: cm-drop 0.2s ease-out both; transform-origin: top; }
        .cm-bob { animation: cm-bob 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cm-pop, .cm-rise, .cm-drop, .cm-bob { animation: none; }
        }
      `}</style>

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close comparison"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        className={`relative flex h-[94vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_100px_rgba(2,12,27,0.4)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[min(88vh,820px)] sm:max-w-[1000px] sm:rounded-[28px] ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-10 opacity-0 sm:translate-y-4 sm:scale-95"
        }`}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-sky-600">
              Destination comparison
            </p>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-slate-950 sm:text-[26px]">
              Compare two destinations
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:rotate-90 hover:bg-slate-200 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Pickers */}
        <div className="relative z-20 grid gap-3 px-5 pb-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:px-7">
          <CountryPicker slot="A" accent="sky" value={a} excludeId={b?.id} onChange={setA} inputRef={firstInput} />

          <button
            type="button"
            onClick={swap}
            disabled={!a && !b}
            aria-label="Swap destinations"
            className="group mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:border-sky-300 hover:text-sky-600 disabled:pointer-events-none disabled:opacity-40 sm:mb-2"
          >
            <ArrowLeftRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          </button>

          <CountryPicker slot="B" accent="emerald" value={b} excludeId={a?.id} onChange={setB} />
        </div>

        {/* Results */}
        <div className="relative z-10 flex-1 overflow-y-auto border-t border-slate-100 bg-white px-5 py-5 sm:px-7">
          {a && b ? (
            <Results a={a} b={b} />
          ) : (
            <EmptyState picked={picked} onQuickPick={quickPick} />
          )}
        </div>

        {/* Footer */}
        <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <button
            type="button"
            onClick={() => {
              setA(null);
              setB(null);
            }}
            disabled={!a && !b}
            className="text-[12px] font-semibold text-slate-400 transition hover:text-slate-700 disabled:pointer-events-none disabled:opacity-40"
          >
            Clear selection
          </button>

          <div className="flex flex-wrap gap-2.5">
            {a && b ? (
              <>
                <button
                  type="button"
                  onClick={() => onExplore?.(a)}
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-sky-600 px-5 text-[12px] font-bold text-white shadow-[0_10px_25px_rgba(2,132,199,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
                >
                  Explore {a.name.split(",")[0]}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => onExplore?.(b)}
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-emerald-500 px-5 text-[12px] font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  Explore {b.name.split(",")[0]}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-400">
                <Check className="h-3.5 w-3.5" />
                {picked}/2 selected
              </span>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}