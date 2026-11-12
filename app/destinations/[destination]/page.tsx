"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  HeartHandshake,
  Home,
  Laptop,
  MapPin,
  Newspaper,
  Plus,
  ShieldCheck,
  Sun,
  TrendingUp,
  Umbrella,
  User,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */
import CompareDestinationsModal from "@/components/modals/CompareDestinationsModal";
const priorityDestinations = [
  {
    name: "Switzerland",
    badge: "Mountain base",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    description:
      "Stability, nature and quality of life in the heart of europe.",
    tags: ["Alpine lifestyle", "Political stability"],
  },
  {
    name: "Portugal",
    badge: "Currently trending",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85",
    description:
      "Coastline, authentic culture and welcoming communities.",
    tags: ["Coastal lifestyle", "Welcoming people"],
  },
  {
    name: "Spain",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=85",
    description:
      "Vibrant cities, rich culture and relaxed mediterranean living.",
    tags: ["Authentic culture", "Southern lifestyle"],
  },
  {
    name: "Greece",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85",
    description:
      "Island charm and mainland diversity in a unique light.",
    tags: ["Island life", "Relaxed lifestyle"],
  },
  {
    name: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    description:
      "Lakes, mountains and refined living close to switzerland.",
    tags: ["Refined living", "Nature and heritage"],
  },
  {
    name: "Italy",
    image:
      "https://images.unsplash.com/photo-1499678329028-101435896b83?auto=format&fit=crop&w=900&q=85",
    description: "Historic beauty and a strong sense of belonging.",
    tags: ["Art and culture", "La dolce vita"],
  },
  {
    name: "Bali, indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    description:
      "Natural beauty, creative communities and a fulfilling lifestyle.",
    tags: ["Tropical lifestyle", "Creative community"],
  },
  {
    name: "Thailand",
    image:
      "https://images.unsplash.com/photo-1552462861-009d8b7a5e57?auto=format&fit=crop&w=900&q=85",
    description:
      "Warm hospitality, stunning nature and a vibrant way of life.",
    tags: ["Island life", "Welcoming warmth"],
  },
];

const comparisonCountries = [
  {
    name: "Portugal",
    image:
      "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=500&q=80",
    features: [
      ["Relaxed and authentic", "Good quality and accessible", "Mild year-round climate"],
      ["Direct flights, good connections", "Coast, cities and countryside"],
      [
        "Straightforward for EU citizens",
        "Generally reasonable",
        "Local team and trusted partners",
      ],
    ],
  },
  {
    name: "Spain",
    image:
      "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=500&q=80",
    features: [
      ["Vibrant and diverse", "Good quality and accessible", "Warm summers, mild winters"],
      ["Direct flights, excellent connections", "Beaches, cities and inland regions"],
      [
        "Straightforward for EU citizens",
        "Generally reasonable",
        "Local team and trusted partners",
      ],
    ],
  },
  {
    name: "Greece",
    image:
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=500&q=80",
    features: [
      [
        "Island and mainland lifestyles",
        "Good quality, with regional differences",
        "Warm summers, mild winters",
      ],
      ["Direct flights, good connections", "Islands and mainland regions"],
      ["Varies by location", "Local team and trusted partners"],
    ],
  },
];

const comparisonCriteria = [
  {
    title: "Daily life",
    description: "What it feels like, every day.",
    items: ["Lifestyle fit", "Healthcare context", "Seasonality"],
  },
  {
    title: "Practical access",
    description: "How easily you can get there and live around it.",
    items: ["Access from Switzerland", "Regional variety"],
  },
  {
    title: "Property reality",
    description: "What to expect as a buyer and owner.",
    items: [
      "Foreign buyer conditions",
      "Indicative acquisition costs",
      "Main ownership costs",
      "Transaction support",
    ],
  },
];

const otherCountries = [
  {
    title: "Middle east",
    subtitle: "3 destinations",
    countries: ["Dubai", "Oman", "United Arab Emirates"],
    action: "View Middle East",
  },
  {
    title: "Americas",
    subtitle: "2 destinations",
    countries: ["Mexico", "Costa Rica"],
    action: "View Americas",
  },
];

const postcardHighlights = [
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85",
    title: "What attracts you",
    text: "Beauty, lifestyle and possibility.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85",
    title: "What daily life requires",
    text: "Practicalities, services and community.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85",
    title: "What informed decisions protect",
    text: "Clarity, real value and peace of mind.",
  },
];

const faqItems = [
  {
    question: "Who can become a 2morrow angel?",
    answer:
      "People who live in the destination, understand everyday life there and can share honest, practical perspective. Every angel is reviewed before joining the network.",
  },
  {
    question: "How are angels selected and verified?",
    answer:
      "We review identity, experience, local knowledge and references. Their role is advisory and independent, and they are never expected to sell a property.",
  },
  {
    question: "Is there a cost to speak with an angel?",
    answer:
      "The initial conversation is included in the 2morrow journey. If a specialist or regulated professional is required, that is agreed transparently in advance.",
  },
  {
    question: "Can i speak with an angel before i choose a destination?",
    answer:
      "Yes. Angels can help you compare realities, understand local nuances and avoid choosing a place only from its holiday image.",
  },
  {
    question: "Do angels provide legal or financial advice?",
    answer:
      "No. Angels share human, local insight. Legal, tax and regulated financial matters are handled by qualified professionals.",
  },
  {
    question: "How does 2morrow ensure independence?",
    answer:
      "Our advisors are not paid to promote specific properties. Their brief is to help you understand the destination and make a sound decision.",
  },
];

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */
function ComparisonSection() {
  const [compareOpen, setCompareOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[25px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[30px]">
              Still considering several countries?
            </h2>

            <p className="mt-2 max-w-[600px] text-[10.5px] leading-[1.6] text-slate-500 md:text-[12px]">
              Compare the points that can genuinely influence your decision — not
              only property prices.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-[11px] font-bold text-white shadow-[0_10px_25px_rgba(2,132,199,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-700 sm:w-auto"
          >
            Compare destinations
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {["Portugal", "Spain", "Greece"].map((country) => (
              <span
                key={country}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-semibold text-slate-600"
              >
                {country}
              </span>
            ))}

            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100"
            >
              + Add destination
            </button>
          </div>

          <p className="text-[9px] leading-relaxed text-slate-400 sm:text-right">
            Choose two countries to compare side by side.
          </p>
        </div>

        <DestinationComparisonTable />

        <CompareDestinationsModal
          open={compareOpen}
          onClose={() => setCompareOpen(false)}
          initial={["portugal", "spain"]}
          onExplore={(destination) => router.push(`/destinations/${destination.id}`)}
        />
      </div>
    </section>
  );
}
function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow ? (
        <p className="text-[9px] font-bold tracking-[0.24em] text-sky-600">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-[25px] font-semibold leading-[1.12] tracking-[-0.035em] text-slate-950 md:text-[34px]">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 text-[12px] leading-[1.65] text-slate-500 md:text-[13px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  const steps = [
    { number: "01", label: "Person", icon: User, active: false },
    { number: "02", label: "Lifestyle", icon: Umbrella, active: false },
    { number: "03", label: "Destination", icon: MapPin, active: true },
    { number: "04", label: "Property", icon: Building2, active: false },
  ];

  return (
    <section className="bg-white pt-10 md:pt-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 md:grid-cols-[1fr_0.92fr] md:gap-10 md:px-8">
        <div className="max-w-[560px]">
          <p className="text-[9px] font-bold tracking-[0.22em] text-sky-600">
            Life first. Destination second.
          </p>

          <h1 className="mt-4 text-[37px] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 md:text-[47px]">
            A destination is more
            <br className="hidden md:block" /> than a place on a map.
          </h1>

          <p className="mt-5 max-w-[430px] text-[13px] leading-[1.65] text-slate-500 md:text-[14px]">
            Understand how a country may work for your life, your finances
            and your long-term plans.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#priority-destinations"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-sky-600 px-5 text-[11px] font-semibold text-white shadow-[0_10px_25px_rgba(2,132,199,0.18)] transition hover:bg-sky-700"
            >
              Explore destinations
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="#destination-guide"
              className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-5 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
            >
              Find my destination
            </a>
          </div>

          <div className="mt-10 hidden max-w-[390px] items-start md:flex">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex-1">
                {index < steps.length - 1 ? (
                  <div className="absolute left-1/2 top-[13px] h-px w-full bg-slate-200" />
                ) : null}

                <div className="relative z-10 flex flex-col items-center">
                  <span
                    className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border text-slate-400 ${
                      step.active
                        ? "border-emerald-300 bg-emerald-50 text-emerald-500 shadow-[0_0_0_3px_rgba(110,231,183,0.12)]"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <step.icon className="h-3 w-3" strokeWidth={1.8} />
                  </span>

                  <span className="mt-1.5 text-[7px] font-semibold tracking-[0.1em] text-slate-400">
                    {step.number}
                  </span>

                  <span className="mt-0.5 text-[7px] text-slate-500">
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[250px] md:min-h-[292px]">
          <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-slate-100 shadow-[0_20px_55px_rgba(11,29,51,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85"
              alt="Colourful coastal village overlooking the mediterranean"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/5" />
          </div>

          <div className="absolute bottom-4 right-4 max-w-[190px] rounded-[8px] bg-white/95 p-3 shadow-[0_12px_30px_rgba(11,29,51,0.18)] backdrop-blur-sm md:bottom-5 md:right-5">
            <p className="text-[9px] font-semibold italic leading-[1.45] text-slate-700">
              “A brighter tomorrow grows from a clearer decision.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Life project                                                               */
/* -------------------------------------------------------------------------- */

function LookingAheadSection() {
  const goals = [
    {
      icon: Home,
      title: "A permanent move",
      text: "Prepare for a new everyday life, not only a property purchase.",
      cta: "Explore relocation",
    },
    {
      icon: Sun,
      title: "Retirement abroad",
      text: "Consider healthcare access, long-term suitability and financial structure.",
      cta: "Explore retirement",
    },
    {
      icon: Building2,
      title: "A second home",
      text: "Balance personal use, access, maintenance and future flexibility.",
      cta: "Explore a second home",
    },
    {
      icon: TrendingUp,
      title: "A lifestyle investment",
      text: "Separate lifestyle appeal from investment fundamentals.",
      cta: "Explore investment",
    },
    {
      icon: Laptop,
      title: "Remote working",
      text: "Ensure connectivity, practical requirements and year-round living.",
      cta: "Explore remote living",
    },
    {
      icon: Compass,
      title: "Still exploring",
      text: "Begin with lifestyle, priorities and constraints.",
      cta: "Help me explore",
    },
  ];

  return (
    <section className="mt-14 bg-[#fbfaf7] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Start with your life project"
          title="What are you looking for next?"
          description={
            <>
              You may already have a country in mind. Or you may only know how
              you want your next life
              <br className="hidden md:block" /> To feel. Both are enough to
              begin.
            </>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <article
              key={goal.title}
              className="group min-h-[164px] rounded-[7px] bg-white p-5 shadow-[0_7px_26px_rgba(11,29,51,0.035)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(11,29,51,0.07)]"
            >
              <goal.icon className="h-5 w-5 text-sky-600" strokeWidth={1.6} />

              <h3 className="mt-7 text-[13px] font-bold tracking-[-0.01em] text-slate-900">
                {goal.title}
              </h3>

              <p className="mt-2 max-w-[250px] text-[10.5px] leading-[1.55] text-slate-500">
                {goal.text}
              </p>

              <a
                href="#destination-guide"
                className="mt-6 inline-flex items-center gap-1.5 text-[9.5px] font-semibold text-sky-600 transition group-hover:text-sky-700"
              >
                {goal.cta}
                <ArrowRight className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] text-slate-500">
          One intelligent starting point. Your choices personalise the
          questions that follow.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Destination map                                                            */
/* -------------------------------------------------------------------------- */

function WorldMap() {
  const pins = [
    { name: "London", x: "40%", y: "28%" },
    { name: "Frankfurt", x: "43%", y: "33%" },
    { name: "Madrid", x: "38%", y: "40%" },
    { name: "New york", x: "18%", y: "40%" },
    { name: "Dubai", x: "57%", y: "44%" },
    { name: "Bangalore", x: "69%", y: "55%" },
    { name: "Singapore", x: "74%", y: "64%" },
  ];

  return (
    <div className="relative h-[260px] overflow-hidden rounded-lg bg-[#eef8fd] md:h-[315px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 720 360"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="720" height="360" fill="#eef8fd" />

        <g fill="#b8ddf7">
          <path d="M52 93c33-28 79-31 116-18 21 8 37 22 58 24 17 2 31-4 43 6 11 9 11 25 4 38-8 15-24 20-38 29-21 13-30 32-45 49-18 22-45 29-64 12-19-17-18-43-27-63-8-17-22-28-30-44-8-17 1-24 17-33z" />
          <path d="M172 194c22-3 43 9 52 29 10 23 7 51-4 77-9 21-21 42-37 51-14 7-26-1-31-17-8-25-7-51-14-75-6-22-9-57 34-65z" />
          <path d="M296 82c25-15 57-16 79 1 10 8 20 10 31 8 16-3 25 8 21 22-3 12-14 16-20 27-7 13-3 27-15 36-15 11-30-3-42-12-17-13-35-20-47-37-10-15-16-31-7-45z" />
          <path d="M323 155c24-9 51-2 64 17 10 14 9 32 4 49-7 23-9 47-22 68-12 20-32 33-47 24-16-10-19-31-18-50 1-24-8-45-1-67 5-17 10-32 20-41z" />
          <path d="M377 111c17-12 43-18 68-15 27 3 50 16 72 30 24 15 52 16 79 18 37 3 73 9 101 30 12 9 12 22 0 30-24 16-54 6-80 8-30 2-53 19-76 33-26 16-56 20-83 8-24-11-45-30-57-53-11-21-12-46-9-68 2-11 2-17-15-21z" />
          <path d="M573 235c16-11 42-9 61 2 15 9 26 22 32 37 5 14-5 27-21 29-22 3-45-5-60-19-16-15-26-36-12-49z" />
          <path d="M270 224c13-7 31-3 40 8 9 11 7 28-3 38-11 11-31 12-42 2-11-11-9-30 5-48z" />
        </g>

        <g fill="#8fc7ef" opacity="0.55">
          <path d="M108 82c22-12 56-12 78-1 11 6 9 17-3 20-23 6-48 4-71-1-14-3-18-11-4-18z" />
          <path d="M326 82c22-8 47-7 61 4 10 8 7 18-5 20-21 4-45 1-60-8-9-5-7-12 4-16z" />
          <path d="M394 106c27-9 58-5 80 9 11 7 9 18-4 21-26 6-56 1-76-12-10-7-10-13 0-18z" />
        </g>

        <g
          fill="#79aecd"
          fontSize="9"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.2"
        >
          <text x="38" y="194">Pacific</text>
          <text x="38" y="205">Ocean</text>
          <text x="216" y="190">Atlantic</text>
          <text x="216" y="201">Ocean</text>
          <text x="487" y="190">Indian</text>
          <text x="487" y="201">Ocean</text>
          <text x="653" y="170">Pacific</text>
          <text x="653" y="181">Ocean</text>
        </g>
      </svg>

      {pins.map((pin) => (
        <div
          key={pin.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
          style={{ left: pin.x, top: pin.y }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_3px_8px_rgba(37,99,235,0.35)]">
            <MapPin className="h-2.5 w-2.5" fill="currentColor" strokeWidth={1.5} />
          </span>
          <span className="whitespace-nowrap text-[7px] font-semibold text-slate-600">
            {pin.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function DestinationIntelligence() {
  const filters = [
    "Region",
    "Life project",
    "Environment",
    "Support available",
    "Clear filters",
  ];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Destination intelligence"
          title="Explore the places where 2morrow can support your project"
          description="Explore destinations by region, life project and the kind of support currently available."
        />

        <div className="mt-9 rounded-[7px] bg-white p-4 shadow-[0_12px_40px_rgba(11,29,51,0.06)] md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[9px] font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  {filter}
                  {filter !== "Clear filters" ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-md bg-slate-100 p-0.5">
              <button className="inline-flex h-7 items-center gap-1 rounded-[5px] bg-sky-600 px-2.5 text-[8px] font-bold text-white">
                Map
              </button>
              <button className="inline-flex h-7 items-center gap-1 rounded-[5px] px-2.5 text-[8px] font-semibold text-slate-500 hover:text-slate-700">
                List
              </button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_285px]">
            <WorldMap />

            <aside className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-[0_10px_35px_rgba(11,29,51,0.06)]">
              <div className="flex items-center justify-between px-3.5 pt-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Portugal
                </div>

                <button className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-3.5">
                <div className="relative h-[62px] overflow-hidden rounded-md">
                  <img
                    src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=80"
                    alt="Portugal"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-black/35 px-1.5 py-0.5 text-[7px] font-semibold text-white">
                    Atlantic coast
                  </span>
                </div>

                <p className="mt-3 text-[8.5px] leading-[1.5] text-slate-500">
                  Atlantic views, welcoming regions and an established
                  international community.
                </p>

                <div className="mt-2.5 flex gap-1.5">
                  {["Coastal lifestyle", "Healthcare", "Local Angels"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-50 px-1.5 py-1 text-[7px] font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="h-8 rounded-md bg-sky-600 text-[8px] font-bold text-white transition hover:bg-sky-700">
                    Explore portugal
                  </button>

                  <button className="flex h-8 items-center justify-center gap-1 rounded-md bg-slate-100 text-[8px] font-semibold text-slate-600 transition hover:bg-slate-200">
                    <Building2 className="h-3 w-3" />
                    View properties
                  </button>
                </div>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-3">
                  {["Portugal", "Switzerland", "Spain", "France"].map(
                    (country, index) => (
                      <div
                        key={country}
                        className="flex items-center justify-between text-[9px]"
                      >
                        <span
                          className={
                            index === 0
                              ? "Font-bold text-sky-600"
                              : "Text-slate-500"
                          }
                        >
                          {country}
                        </span>

                        {index === 0 ? (
                          <span className="text-[7px] font-bold tracking-wider text-emerald-500">
                            Active
                          </span>
                        ) : null}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[8px] font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
              2morrow country hubs
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              View destination list
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Priority destinations                                                      */
/* -------------------------------------------------------------------------- */

function PriorityDestinations() {
  return (
    <section id="priority-destinations" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white">
            <Compass className="h-3 w-3" />
          </span>

          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] text-sky-600">
              Explore
            </p>

            <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[29px]">
              Explore our priority destinations
            </h2>

            <p className="mt-1.5 text-[10px] text-slate-500 md:text-[11px]">
              Each destination offers a different combination of lifestyle,
              property market, legal framework and everyday reality.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priorityDestinations.map((destination, index) => {
            const highlighted = destination.name === "Portugal";

            return (
              <article
                key={destination.name}
                className={`group overflow-hidden rounded-[7px] bg-white transition duration-300 hover:-translate-y-1 ${
                  highlighted
                    ? "border border-sky-200 shadow-[0_12px_35px_rgba(2,132,199,0.10)]"
                    : "border border-slate-100 shadow-[0_7px_24px_rgba(11,29,51,0.045)] hover:shadow-[0_15px_40px_rgba(11,29,51,0.08)]"
                }`}
              >
                <div className="relative h-[112px] overflow-hidden bg-slate-100">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading={index > 3 ? "lazy" : "eager"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

                  {destination.badge ? (
                    <span className="absolute left-2 top-2 rounded bg-black/35 px-1.5 py-0.5 text-[7px] font-semibold text-white backdrop-blur-sm">
                      {destination.badge}
                    </span>
                  ) : null}
                </div>

                <div className="p-3.5 pt-4">
                  <h3 className="text-[13px] font-bold tracking-[-0.01em] text-slate-950">
                    {destination.name}
                  </h3>

                  <p className="mt-2 min-h-[28px] text-[8.5px] leading-[1.5] text-slate-500">
                    {destination.description}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {destination.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-slate-50 px-1.5 py-0.5 text-[7px] font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between pb-1">
                    <button className="h-7 rounded-md bg-sky-600 px-2.5 text-[8px] font-bold text-white transition hover:bg-sky-700">
                      Explore {destination.name.replace(", Indonesia", "")}
                    </button>

                    <button className="text-[8px] font-semibold text-slate-400 transition hover:text-sky-600">
                      View properties
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Other countries                                                            */
/* -------------------------------------------------------------------------- */

function OtherCountries() {
  const featured = [
    {
      name: "Morocco",
      image:
        "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=600&q=80",
      description: "Rich culture, easy access and growing opportunities.",
    },
    {
      name: "Tunisia",
      image:
        "https://images.unsplash.com/photo-1553603227-2358aabe821e?auto=format&fit=crop&w=600&q=80",
      description: "Mediterranean lifestyle with great potential.",
    },
  ];

  return (
    <section className="bg-white pb-14 pt-8 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[23px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[27px]">
              Other countries
            </h2>

            <p className="mt-1.5 max-w-[620px] text-[10px] leading-[1.6] text-slate-500 md:text-[11px]">
              Explore additional destinations where 2morrow is developing
              information, local relationships or project support.
            </p>
          </div>

          <button className="inline-flex items-center gap-1 text-[9px] font-semibold text-sky-600 transition hover:text-sky-700">
            <ArrowUpRight className="h-3 w-3" />
            Close other countries
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_1fr]">
          <div className="grid content-start gap-4">
            {featured.map((country) => (
              <article
                key={country.name}
                className="grid grid-cols-[104px_1fr] items-center gap-3 rounded-[7px] bg-white p-3 shadow-[0_8px_28px_rgba(11,29,51,0.045)] transition hover:shadow-[0_14px_36px_rgba(11,29,51,0.07)]"
              >
                <img
                  src={country.image}
                  alt={country.name}
                  loading="lazy"
                  className="h-[68px] w-full rounded-md object-cover"
                />

                <div className="min-w-0 py-1">
                  <h3 className="text-[12px] font-bold text-slate-950">
                    {country.name}
                  </h3>

                  <p className="mt-1 max-w-[280px] text-[8.5px] leading-[1.45] text-slate-500">
                    {country.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[7px] font-bold text-emerald-600">
                      <BadgeCheck className="h-2.5 w-2.5" />
                      Verified information
                    </span>

                    <button className="h-7 rounded-md bg-sky-600 px-2.5 text-[8px] font-bold text-white transition hover:bg-sky-700">
                      Explore {country.name}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {otherCountries.map((group) => (
              <article
                key={group.title}
                className="rounded-[7px] bg-sky-50/80 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-900">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-[8px] font-semibold text-sky-600">
                      {group.subtitle}
                    </p>
                  </div>

                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </div>

                <div className="mt-5 space-y-2.5">
                  {group.countries.map((country) => (
                    <p key={country} className="text-[9px] text-slate-500">
                      {country}
                    </p>
                  ))}
                </div>

                <button className="mt-7 w-full border-t border-sky-100 pt-3 text-left text-[8px] font-bold text-sky-600 transition hover:text-sky-700">
                  {group.action}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparison                                                                 */
/* -------------------------------------------------------------------------- */

function DestinationComparisonTable() {
  return (
    <>
        <div className="mt-7 overflow-x-auto rounded-lg border border-slate-100 bg-white shadow-[0_12px_36px_rgba(11,29,51,0.05)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="w-[220px] px-5 py-4 text-[8px] font-bold tracking-[0.16em] text-slate-400">
                  Criteria & insights
                </th>

                {comparisonCountries.map((country) => (
                  <th key={country.name} className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={country.image}
                        alt={country.name}
                        loading="lazy"
                        className="h-7 w-10 rounded object-cover"
                      />
                      <span className="text-[11px] font-bold text-slate-900">
                        {country.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonCriteria.map((criterion, propertyIndex) => (
                <tr
                  key={criterion.title}
                  className="border-b border-slate-100 align-top last:border-b-0"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <CheckCircle2 className="h-3 w-3" />
                      </span>

                      <div>
                        <p className="text-[10px] font-bold text-slate-900">
                          {criterion.title}
                        </p>

                        <p className="mt-1 max-w-[150px] text-[8px] leading-[1.5] text-slate-500">
                          {criterion.description}
                        </p>

                        <div className="mt-2 space-y-1">
                          {criterion.items.map((item) => (
                            <p key={item} className="text-[7.5px] text-slate-400">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {comparisonCountries.map((country) => (
                    <td key={`${country.name}-${criterion.title}`} className="px-5 py-5">
                      <div className="space-y-1.5">
                        {country.features[propertyIndex].map((feature) => (
                          <p
                            key={feature}
                            className="text-[9px] leading-[1.5] text-slate-500"
                          >
                            {feature}
                          </p>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

function NextChapterCTA() {
  return (
    <section
      id="destination-guide"
      className="bg-white pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid overflow-hidden rounded-[10px] bg-white shadow-[0_16px_50px_rgba(11,29,51,0.07)] md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="text-[8px] font-bold tracking-[0.22em] text-sky-600">
              Your next chapter
            </p>

            <h2 className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 md:text-[34px]">
              Not sure where to begin?
            </h2>

            <p className="mt-4 max-w-[390px] text-[11px] leading-[1.65] text-slate-500">
              Tell us what you want your next life to feel like. We will help
              you identify the destinations worth exploring and the questions
              that need answering before you commit.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Retirement", "Portugal - Spain", "Coastal living"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-50 px-3 py-1.5 text-[8px] font-semibold text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <button className="inline-flex h-10 items-center gap-2 rounded-full bg-sky-600 px-5 text-[10px] font-bold text-white transition hover:bg-sky-700">
                Find my destination
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <p className="mt-3 text-[8px] text-slate-400">
                Your previous choices will be remembered.
              </p>
            </div>
          </div>

          <div className="relative min-h-[260px] bg-slate-100 md:min-h-[330px]">
            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85"
              alt="Sunny terrace overlooking the coast"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Postcard                                                                   */
/* -------------------------------------------------------------------------- */

function BeyondPostcard() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-[8px] font-bold tracking-[0.24em] text-sky-600">
            A clearer perspective
          </p>

          <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[34px]">
            Look beyond the postcard
          </h2>

          <p className="mx-auto mt-3 max-w-[650px] text-[10.5px] leading-[1.65] text-slate-500 md:text-[12px]">
            A destination can be wonderful for a holiday and unsuitable for
            everyday life. Destination intelligence brings together structured
            information, professional expertise and lived local insight so that
            the attractive picture can be tested against reality.
          </p>

          <p className="mt-4 font-serif text-[13px] italic text-slate-500">
            Real places. Real life. Better decisions.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {postcardHighlights.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[7px] bg-white shadow-[0_8px_28px_rgba(11,29,51,0.045)]"
            >
              <div className="h-[170px] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-[10px] font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-[8px] text-slate-500">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Resources                                                                  */
/* -------------------------------------------------------------------------- */

function ResourcesSection() {
  const resources = [
    {
      icon: Building2,
      title: "Property opportunities",
      text: "View available homes and understand the wider context of the region and everyday life.",
      action: "View Properties",
    },
    {
      icon: BookOpen,
      title: "Country e-books",
      text: "Access detailed country information, covering practical, financial and legal system clarity.",
      action: "Read Country Guides",
    },
    {
      icon: Newspaper,
      title: "Current insights",
      text: "Follow changes in markets, regulation, access and local conditions.",
      action: "Explore insights",
    },
  ];

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Go deeper when it matters"
          title={
            <>
              Properties, guides and practical
              <br className="hidden md:block" /> Information
            </>
          }
          description={
            <>
              Once a destination feels relevant, move from inspiration to
              verified information and suitable
              <br className="hidden md:block" /> Opportunities.
            </>
          }
        />

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="rounded-[7px] bg-white p-5 shadow-[0_7px_26px_rgba(11,29,51,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(11,29,51,0.07)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <resource.icon className="h-4 w-4" strokeWidth={1.7} />
              </span>

              <h3 className="mt-7 text-[13px] font-bold text-slate-950">
                {resource.title}
              </h3>

              <p className="mt-2 max-w-[270px] text-[9px] leading-[1.55] text-slate-500">
                {resource.text}
              </p>

              <button className="mt-6 text-[8.5px] font-bold text-sky-600 transition hover:text-sky-700">
                {resource.action}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Expertise                                                                  */
/* -------------------------------------------------------------------------- */

function ExpertiseSection() {
  const panels = [
    {
      eyebrow: "Regulated expertise",
      title: "Local professionals",
      text: "Agencies, lawyers, tax experts, notaries and specialists support the work that requires qualified professional responsibility.",
      bullets: [
        "Buying process, due diligence, regulated advice",
        "Verified network of transparent pros",
      ],
      className: "bg-white",
    },
    {
      eyebrow: "Human local insight",
      title: "2morrow angels",
      text: "Trusted local people share lived experience, practical context and an honest view of everyday life in the destination.",
      bullets: [
        "Neighbourhood, everyday life, orientation, community",
        "Honest perspective before and after the move",
      ],
      className: "bg-emerald-50/80",
    },
  ];

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <p className="text-[8px] font-bold tracking-[0.24em] text-sky-600">
            Two distinct forms of support
          </p>

          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-slate-950 md:text-[31px]">
            Expertise when required. Local perspective when useful.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {panels.map((panel, index) => (
            <article
              key={panel.title}
              className={`rounded-[8px] p-6 shadow-[0_8px_28px_rgba(11,29,51,0.045)] md:p-7 ${panel.className}`}
            >
              <p className="text-[8px] font-bold tracking-[0.18em] text-sky-600">
                {panel.eyebrow}
              </p>

              <div className="mt-5 flex items-start gap-3">
                {index === 0 ? (
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sky-600" />
                ) : (
                  <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                )}

                <div>
                  <h3 className="text-[16px] font-bold text-slate-950">
                    {panel.title}
                  </h3>

                  <p className="mt-2 max-w-[430px] text-[9px] leading-[1.6] text-slate-500">
                    {panel.text}
                  </p>

                  <div className="mt-5 space-y-2">
                    {panel.bullets.map((bullet) => (
                      <p
                        key={bullet}
                        className="flex items-center gap-2 text-[8.5px] font-medium text-slate-600"
                      >
                        <span className="h-1 w-1 rounded-full bg-sky-500" />
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Journey                                                                    */
/* -------------------------------------------------------------------------- */

function JourneyTimeline() {
  const steps = [
    { number: "01", label: "Decide" },
    { number: "02", label: "Identity" },
    { number: "03", label: "Destination", active: true },
    { number: "04", label: "Property" },
    { number: "05", label: "Verification" },
    { number: "06", label: "Purchase" },
    { number: "07", label: "Relocation" },
    { number: "08", label: "New life", active: true },
  ];

  return (
    <section className="bg-sky-50/80 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="One connected decision journey"
          title="The destination within the 2morrow journey"
          description="Property remains part of the process, but it appears only after the person, lifestyle and destination have been understood."
        />

        <div className="mt-10 overflow-x-auto pb-2">
          <div className="relative flex min-w-[820px] items-start">
            <div className="absolute left-6 right-6 top-[14px] h-px bg-slate-200" />

            {steps.map((step, index) => (
              <div key={step.number} className="relative z-10 flex-1">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-[29px] w-[29px] items-center justify-center rounded-full border bg-white text-[7px] font-bold ${
                      step.active
                        ? "border-emerald-300 text-emerald-500 shadow-[0_0_0_4px_rgba(110,231,183,0.12)]"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    {step.number}
                  </span>

                  <span
                    className={`mt-2 text-[7px] font-bold  tracking-[0.08em] ${
                      step.active ? "text-emerald-600" : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </span>

                  {index === 2 ? (
                    <span className="mt-1 text-[6px] font-semibold text-sky-600">
                      You are here
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[8px] font-semibold tracking-[0.16em] text-slate-400">
          Person · lifestyle · destination · property
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Assets                                                                     */
/* -------------------------------------------------------------------------- */

function AssetsSection() {
  const actions = [
    {
      title: "Sell",
      text: "Release capital",
      action: "Strategic Swiss Transaction",
    },
    {
      title: "Rent",
      text: "Create income",
      action: "Strategic Swiss Transaction",
    },
    {
      title: "Keep",
      text: "Preserve flexibility",
      action: "Strategic Swiss Transaction",
    },
    {
      title: "Optimise",
      text: "Review value and use",
      action: "Strategic Swiss Transaction",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <p className="text-[8px] font-bold tracking-[0.22em] text-sky-600">
            Your swiss starting point
          </p>

          <h2 className="mt-3 max-w-[400px] text-[25px] font-semibold leading-[1.13] tracking-[-0.04em] text-slate-950 md:text-[32px]">
            Prepare the life project by understanding the assets behind it.
          </h2>

          <p className="mt-4 max-w-[400px] text-[10.5px] leading-[1.65] text-slate-500">
            Many life moves begin with a home, income or capital in switzerland.
            Clarify how that asset can support what comes next without closing
            the door on a future return.
          </p>

          <button className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-sky-600 px-5 text-[10px] font-bold text-white transition hover:bg-sky-700">
            Explore asset & financial strategy
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid content-center gap-x-10 gap-y-8 sm:grid-cols-2">
          {actions.map((item) => (
            <div key={item.title}>
              <h3 className="text-[16px] font-bold tracking-[-0.02em] text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-[9px] text-slate-500">{item.text}</p>

              <button className="mt-3 text-[8px] font-semibold text-sky-600 transition hover:text-sky-700">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-sky-700 md:text-[26px]">
          Frequently asked questions
        </h2>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className="rounded-[7px] bg-white shadow-[0_6px_22px_rgba(11,29,51,0.045)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-[10px] font-semibold text-slate-800">
                    {item.question}
                  </span>

                  {isOpen ? (
                    <ChevronUp className="h-3.5 w-3.5 shrink-0 text-sky-600" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  )}
                </button>

                {isOpen ? (
                  <div className="px-4 pb-4">
                    <p className="border-t border-slate-100 pt-3 text-[9px] leading-[1.65] text-slate-500">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-slate-950">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85"
        alt="Mountain lake and forest"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-sky-950/55" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <p className="text-[8px] font-bold tracking-[0.24em] text-sky-200">
          Perhaps you already know where
        </p>

        <h2 className="mt-5 text-[30px] font-semibold leading-[1.12] tracking-[-0.04em] text-white md:text-[43px]">
          Perhaps you only know how
          <br className="hidden md:block" /> you want to live.
        </h2>

        <p className="mt-5 text-[11px] text-sky-100">
          Both are enough to begin.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex h-10 items-center gap-2 rounded-full bg-sky-500 px-5 text-[10px] font-bold text-white transition hover:bg-sky-400">
            Find my destination
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button className="inline-flex h-10 items-center rounded-full border border-white/30 px-5 text-[10px] font-semibold text-white transition hover:bg-white/10">
            Explore destinations
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function DestinationPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <HeroSection />
      <LookingAheadSection />
      <DestinationIntelligence />
      <PriorityDestinations />
      <OtherCountries />
      <ComparisonSection />
      <NextChapterCTA />
      <BeyondPostcard />
      <ResourcesSection />
      <ExpertiseSection />
      <JourneyTimeline />
      <AssetsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}