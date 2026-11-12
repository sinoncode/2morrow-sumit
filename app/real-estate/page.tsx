"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  RotateCcw,
  Wallet,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Image URLs (swap for your own assets)                                      */
/* -------------------------------------------------------------------------- */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const IMG = {
  hero: u("photo-1564013799919-ab600027ffc6"),
  villa: u("photo-1512917774080-9991f1c4c750"),
  living: u("photo-1560448204-e02f11c3d0e2"),
  interior: u("photo-1502672260266-1c1ef2d93688"),
  terrace: u("photo-1600585154340-be6161a56a0c"),
  garden: u("photo-1600607687939-ce8a6c25118c"),
  modern: u("photo-1600566753190-17f0baa2a6c3"),
  coast: u("photo-1499793983690-e29da59ef1c2"),
  mountain: u("photo-1464822759023-fed622ff2c3b"),
  plans: u("photo-1503387762-592deb58ef4e"),
  keys: u("photo-1560518883-ce09059eeffa"),
  calc: u("photo-1554224155-6726b3ff858f"),
  street: u("photo-1523217582562-09d0def993a6"),
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const heroTags = ["Person", "Lifestyle", "Current property", "Next chapter"];

const roleCards: { title: string; text: string; image: string }[] = [
  { title: "Capital", text: "Could the property release capital for your next home or life project?", image: IMG.keys },
  { title: "Income", text: "Could it generate reliable income while remaining part of your assets?", image: IMG.living },
  { title: "Security", text: "Could keeping it preserve stability or a possible return to your home country?", image: IMG.villa },
  { title: "Potential", text: "Could renovation, development or densification create additional value?", image: IMG.plans },
  { title: "Flexibility", text: "Could refinancing or a different use give you more options?", image: IMG.mountain },
];

const considerGroups = [
  { title: "Property", items: ["Type, location and current use", "Indicative market position", "Renovation or upgrading potential", "Development or densification potential", "Rental or income potential"] },
  { title: "Ownership and timing", items: ["Ownership structure", "Preferred timeline"] },
  { title: "Financial position", items: ["Existing mortgage arrangements", "Current and future funding needs", "Available capital and borrowing capacity"] },
  { title: "Future project", items: ["Future destination", "Need for flexibility", "Possible return to your home country"] },
];

type Option = {
  tag: string;
  title: string;
  text: string;
  note: string;
  points: string[];
  primary: string;
  secondary?: string;
  image: string;
};

const options: Option[] = [
  {
    tag: "Option 01 · sell",
    title: "Sell your property. Unlock what comes next.",
    text: "Selling may release capital, simplify your situation in your current country and help finance a purchase, rental or relocation abroad.",
    note: "A sale should still be assessed in relation to timing, market conditions, mortgage arrangements and the amount of capital you actually need.",
    points: ["Current market value", "Property positioning and sale strategy", "Mortgage repayment or early-termination conditions", "Indicative sale costs", "Tax and legal questions", "Timing of the sale", "Temporary accommodation requirements", "Coordination with a purchase or rental abroad"],
    primary: "Request a property valuation",
    secondary: "Sell or rent? Compare my options",
    image: IMG.terrace,
  },
  {
    tag: "Option 02 · keep",
    title: "Keep a home-country base while your life evolves.",
    text: "Keeping the property may preserve long-term security, exposure to your current property market and the possibility of returning.",
    note: "However, retaining a property also means maintaining the financial, administrative and practical responsibilities attached to it.",
    points: ["Ongoing mortgage affordability", "Maintenance and renovation costs", "Vacancy and security", "Property management", "Tax and residency implications", "Insurance requirements", "Use by family members", "Compatibility with financing abroad"],
    primary: "Assess my keep option",
    image: IMG.garden,
  },
  {
    tag: "Option 03 · rent",
    title: "Turn your property into a source of income.",
    text: "Renting may help you retain your current property while generating income that supports your next stage of life.",
    note: "Depending on the property, regulations and your plans, the review may consider long-term, medium-term or short-term rental where appropriate and legally permitted.",
    points: ["Realistic rental value", "Long, medium or short-term suitability", "Applicable local regulations", "Tenant law and contractual obligations", "Property management responsibilities", "Vacancy assumptions", "Maintenance and tenant costs", "Tax and insurance considerations"],
    primary: "Explore the rental option",
    secondary: "Request a rental assessment",
    image: IMG.interior,
  },
  {
    tag: "Option 04 · renovate",
    title: "Improve the property before deciding what comes next.",
    text: "Renovation may improve comfort, energy performance, rental potential or market positioning, and can also prepare a property for a future return to your home country.",
    note: "Not every renovation creates equivalent value. The scope, budget and purpose should be clear before work begins.",
    points: ["Technical condition", "Energy performance", "Necessary versus optional work", "Estimated budget", "Planning and authorisation requirements", "Impact on rental potential", "Impact on market positioning", "Expected value in relation to cost"],
    primary: "Review my renovation potential",
    image: IMG.living,
  },
  {
    tag: "Option 05 · develop or densify",
    title: "Look beyond the property as it stands today.",
    text: "Some properties and plots may contain unused development potential. This potential must be verified through planning, technical and legal analysis.",
    note: "An extension, conversion, additional unit, redevelopment or densification project may create value, but it is not automatically available or appropriate.",
    points: ["Land and zoning rules", "Construction rights", "Extension or conversion potential", "Additional housing units", "Mortgage or environmental restrictions", "Access and infrastructure", "Technical feasibility", "Project cost and financing"],
    primary: "Explore the potential",
    secondary: "Request a potential review",
    image: IMG.modern,
  },
  {
    tag: "Option 06 · refinance",
    title: "Consider whether your property can create financial flexibility.",
    text: "Refinancing may help restructure existing debt, release part of the available equity or adapt the property's financing to a new stage of life.",
    note: "It is not automatically available or appropriate. Affordability, valuation, lender criteria, residency, income and the wider financial structure must be reviewed.",
    points: ["Current mortgage structure", "Renewal and termination dates", "Indicative property value", "Available equity", "Affordability", "Interest rate exposure", "Planned financing for a new stage of life", "Lender requirements"],
    primary: "Explore the refinance option",
    image: IMG.calc,
  },
];

const strategyLinks = [
  { title: "Destination and financial strategy", text: "Align your destination with your goals." },
  { title: "Buy or rent safely abroad", text: "Secure your next home with confidence." },
  { title: "Relocation and new life", text: "Turn plans into a fulfilling reality." },
];

const returnQuestions = [
  "Would you need to keep access to your existing property?",
  "Is the property easy to rent, resell or return to later?",
  "Would renting provide flexibility to buy again later?",
  "Should part of the capital remain available in your home country?",
  "Would the property remain suitable as your needs change?",
  "Could renovation improve its long-term accessibility?",
  "Why would managing the property while you are abroad?",
  "Which tax, insurance and residency questions require professional advice?",
];

const steps = [
  { n: "01", title: "Tell us about your situation", text: "Share your current property, your plans and the questions you are considering." },
  { n: "02", title: "Establish the starting position", text: "We clarify the information available, what needs verification and where realistic options may exist." },
  { n: "03", title: "Compare realistic scenarios", text: "Sell, keep, rent, renovate, refinance or develop, according to what is meaningful for your situation." },
  { n: "04", title: "Coordinate the right expertise", text: "Where valuation, legal, tax, technical or finance specialists are needed, we help coordinate them." },
  { n: "05", title: "Decide at your own pace", text: "You receive a clearer view of the options, their advantages, risks and likely next steps." },
];

const priorities: {
  label: string;
  chips: string[];
  options: { title: string; text: string }[];
}[] = [
  {
    label: "Releasing capital",
    chips: ["Sell", "Refinance", "Develop"],
    options: [
      { title: "Sell", text: "Release capital directly from the property to support your next project." },
      { title: "Refinance", text: "Assess whether equity can be released while you remain the owner." },
      { title: "Develop", text: "Check whether unused potential could create additional value first." },
    ],
  },
  {
    label: "Creating income",
    chips: ["Rent", "Develop", "Keep"],
    options: [
      { title: "Rent", text: "Generate income while retaining ownership of the property." },
      { title: "Develop", text: "Explore additional units or conversions that could increase income." },
      { title: "Keep", text: "Retain the asset and review the costs of holding it." },
    ],
  },
  {
    label: "Preserving a home-country base",
    chips: ["Keep", "Rent", "Renovate"],
    options: [
      { title: "Keep", text: "Maintain a place to return to while your life abroad evolves." },
      { title: "Rent", text: "Let it support itself while you are away." },
      { title: "Renovate", text: "Prepare the property so it stays comfortable and valuable." },
    ],
  },
  {
    label: "Increasing long-term potential",
    chips: ["Renovate", "Develop", "Densify"],
    options: [
      { title: "Renovate", text: "Improve condition and energy performance to protect value." },
      { title: "Develop", text: "Verify what the plot or building could legally become." },
      { title: "Densify", text: "Review whether additional housing units may be possible." },
    ],
  },
  {
    label: "Simplifying your situation",
    chips: ["Sell"],
    options: [{ title: "Sell", text: "Reduce ownership responsibilities and close a chapter cleanly." }],
  },
  {
    label: "Maintaining return flexibility",
    chips: ["Keep", "Rent", "Renovate"],
    options: [
      { title: "Keep", text: "Preserve the option to return on your own timeline." },
      { title: "Rent", text: "Use flexible rental terms that can end when you need the home." },
      { title: "Renovate", text: "Keep the property ready for a future return." },
    ],
  },
  {
    label: "Financing a home abroad",
    chips: ["Sell", "Rent", "Refinance"],
    options: [
      { title: "Sell", text: "Release capital from your property to support a purchase abroad." },
      { title: "Rent", text: "Generate income from the property to support your next home." },
      { title: "Refinance", text: "Access part of the equity while keeping the property. Final conditions depend on lender review." },
    ],
  },
  {
    label: "Remaining undecided for now",
    chips: ["Comprehensive review"],
    options: [
      { title: "Comprehensive review", text: "Compare every option calmly before choosing a direction. Not sure yet is a valid place to begin." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hooks and primitives                                                       */
/* -------------------------------------------------------------------------- */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const hidden = {
    up: "translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
    scale: "scale-95",
  }[from];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        inView ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `${hidden} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Photo({
  src,
  alt = "",
  className = "",
  zoom = true,
}: {
  src: string;
  alt?: string;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-sky-100 via-slate-100 to-amber-50 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.opacity = "0";
        }}
        className={`h-full w-full object-cover ${
          zoom ? "transition-transform duration-[1100ms] ease-out group-hover:scale-110" : ""
        }`}
      />
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[10px] font-bold  tracking-[0.22em] ${
        light ? "text-sky-200" : "text-sky-600"
      }`}
    >
      {children}
    </p>
  );
}

function PrimaryButton({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green";
}) {
  const color =
    tone === "green"
      ? "bg-emerald-500 shadow-[0_12px_28px_rgba(16,185,129,0.3)] hover:bg-emerald-400"
      : "bg-sky-600 shadow-[0_12px_28px_rgba(2,132,199,0.25)] hover:bg-sky-700";
  return (
    <button
      type="button"
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[12.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${color}`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function GhostButton({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 items-center justify-center rounded-lg border px-5 text-[12.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
        light
          ? "border-white/40 text-white hover:bg-white/10"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
      }`}
    >
      {children}
    </button>
  );
}

function Heading({
  children,
  center = false,
  light = false,
  className = "",
}: {
  children: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-semibold leading-[1.1] tracking-[-0.035em] ${
        light ? "text-white" : "text-slate-950"
      } ${center ? "text-center" : ""} ${className}`}
    >
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-12 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:pb-20 md:pt-16">
        <div>
          <Reveal>
            <Eyebrow>Your current property. Your next chapter.</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-[44px] lg:text-[52px]">
              What should your current property do for your future?
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 text-[15px] font-semibold text-slate-800">
              Selling is only one possibility.
            </p>
            <p className="mt-2 max-w-[460px] text-[13.5px] leading-[1.7] text-slate-500">
              Your property may provide capital, generate income, preserve a
              future base or create additional value. The right decision
              depends on your property, your plans, your finances, your timing
              and the life you want to build next.
            </p>
            <p className="mt-3 max-w-[460px] text-[13.5px] leading-[1.7] text-slate-500">
              2morrow helps you compare the options before committing to one.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton>Understand my property options</PrimaryButton>
            <GhostButton>Request a property review</GhostButton>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-4 max-w-[420px] text-[10.5px] leading-[1.6] text-slate-400">
              You do not need to sell. We begin with the information you have
              and a clear view of what matters most to you.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-sky-100 bg-white px-3 py-1 text-[10px] font-semibold text-sky-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal from="scale" delay={150}>
          <div className="relative mx-auto max-w-[480px]">
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-sky-200/50 via-amber-100/40 to-transparent blur-2xl" />
            <div className="re-float group overflow-hidden rounded-[28px] shadow-[0_30px_70px_rgba(11,29,51,0.22)] ring-1 ring-white">
              <Photo src={IMG.hero} alt="Mediterranean house" className="aspect-[4/4.4] w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur">
                <p className="text-[9px] font-bold tracking-[0.18em] text-sky-600">
                  2morrow
                </p>
                <p className="text-[12px] font-semibold text-slate-900">
                  Your property, your options
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Start with what you already have                                           */
/* -------------------------------------------------------------------------- */

function StartSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <Eyebrow>Start with what you already have</Eyebrow>
            <Heading className="mt-3 text-[30px] md:text-[40px]">
              Your property is more than a value on paper.
            </Heading>
            <p className="mt-4 text-[13px] leading-[1.7] text-slate-500">
              A home, apartment, investment property or plot of land can play
              several roles in your next chapter.
            </p>
            <p className="mt-3 text-[13px] leading-[1.7] text-slate-500">
              It may become available capital for a purchase abroad. It may
              provide rental income. It may remain your base. It may offer
              renovation, development or densification potential. In some
              situations, refinancing may also create greater financial
              flexibility.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-6 border-l-2 border-sky-600 pl-4">
              <p className="text-[11px] text-slate-500">
                The first question is therefore not simply:
              </p>
              <p className="mt-1 text-[14px] italic text-slate-400 line-through decoration-slate-300">
                &lsquo;How much is my property worth?&rsquo;
              </p>
              <p className="mt-2 text-[11px] text-slate-500">It is:</p>
              <p className="mt-1 text-[16px] font-semibold leading-snug text-slate-900">
                &lsquo;What role should this property play in my future?&rsquo;
              </p>
            </div>
            <div className="mt-6">
              <PrimaryButton>Explore my options</PrimaryButton>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {roleCards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 110}
              className={i % 2 === 1 ? "Lg:mt-6" : ""}
            >
              <article className="group h-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(11,29,51,0.09)] ring-1 ring-slate-900/[0.04] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:shadow-[0_28px_55px_rgba(11,29,51,0.18)]">
                <Photo src={card.image} className="h-[110px] w-full lg:h-[130px]" />
                <div className="px-3.5 pb-5 pt-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-[9px] font-bold text-white transition-transform duration-500 group-hover:rotate-[360deg]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2.5 text-[15px] font-semibold tracking-[-0.02em] text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[10.5px] leading-[1.55] text-slate-500">
                    {card.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 01 Understand your current position                                        */
/* -------------------------------------------------------------------------- */

function PositionSection() {
  return (
    <section className="bg-sky-50/70 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal from="scale">
          <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(11,29,51,0.08)] lg:grid-cols-[0.9fr_1fr_1fr]">
            <div className="p-7 sm:p-9">
              <Eyebrow>01 — your starting point</Eyebrow>
              <Heading className="mt-3 text-[28px] md:text-[34px]">
                Understand your current position
              </Heading>
              <p className="mt-4 text-[12.5px] leading-[1.7] text-slate-500">
                A useful strategy begins with a realistic understanding of
                where you are today. We look at your property as one part of
                your wider situation, rather than treating it in isolation.
              </p>

              <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50 p-4 text-[12px] leading-[1.6] text-slate-600">
                You do not need to have made a decision before speaking with
                us. &lsquo;Not sure yet&rsquo; is a valid place to begin.
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton>Start my property review</PrimaryButton>
                <GhostButton>Talk to 2morrow</GhostButton>
              </div>
              <p className="mt-4 text-[10px] leading-[1.6] text-slate-400">
                The review helps identify the questions that require valuation,
                financial, legal or technical input.
              </p>
            </div>

            <div className="group relative min-h-[260px]">
              <Photo src={IMG.villa} alt="Villa with garden" className="absolute inset-0 h-full w-full" />
            </div>

            <div className="p-7 sm:p-9">
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-950">
                What we consider
              </h3>
              <div className="mt-4 space-y-4">
                {considerGroups.map((group, gi) => (
                  <Reveal key={group.title} delay={gi * 90}>
                    <p className="text-[9px] font-bold tracking-[0.16em] text-sky-600">
                      {group.title}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[11.5px] leading-[1.5] text-slate-500"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 Options                                                                 */
/* -------------------------------------------------------------------------- */

function OptionCard({ option, index }: { option: Option; index: number }) {
  return (
    <Reveal delay={(index % 2) * 120}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_14px_40px_rgba(11,29,51,0.07)] ring-1 ring-slate-900/[0.04] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_30px_65px_rgba(11,29,51,0.15)]">
        <Photo src={option.image} className="h-[190px] w-full sm:h-[230px]" />

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-[9px] font-bold tracking-[0.2em] text-sky-600">
            {option.tag}
          </p>
          <h3 className="mt-2 text-[21px] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-950 sm:text-[24px]">
            {option.title}
          </h3>
          <p className="mt-3 text-[12.5px] leading-[1.7] text-slate-500">{option.text}</p>
          <p className="mt-2 text-[12px] leading-[1.7] text-slate-400">{option.note}</p>

          <p className="mt-5 text-[9px] font-bold tracking-[0.18em] text-slate-400">
            Points to review
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {option.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[11.5px] leading-[1.5] text-slate-600">
                <Check className="mt-[3px] h-3 w-3 shrink-0 text-sky-500" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <PrimaryButton>{option.primary}</PrimaryButton>
            {option.secondary ? <GhostButton>{option.secondary}</GhostButton> : null}
          </div>
          <p className="mt-3 text-[10px] leading-[1.5] text-slate-400">
            Illustrative review only. Final suitability depends on your property
            and the professional advice required.
          </p>
        </div>
      </article>
    </Reveal>
  );
}

function OptionsSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>02 — one property. Several possible roles.</Eyebrow>
          <Heading center className="mt-3 text-[28px] md:text-[38px]">
            Compare the options before choosing a direction
          </Heading>
          <p className="mt-4 text-[13px] leading-[1.7] text-slate-500">
            The objective is not to push every owner towards a sale. It is to
            understand which option, or combination of options, best supports
            your life project.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14">
          {options.map((option, i) => (
            <OptionCard key={option.tag} option={option} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 Finance your next chapter                                               */
/* -------------------------------------------------------------------------- */

function FinanceSection() {
  const flow: { label: string; icon: IconType }[] = [
    { label: "Timing", icon: Clock },
    { label: "Finance", icon: Wallet },
    { label: "Future plans", icon: Compass },
  ];

  const panels = [
    {
      title: "Your position in your current country",
      text: "Turn your current property into opportunities for what comes next.",
      image: IMG.garden,
      chips: ["Sell", "Rent", "Renovate", "Develop"],
    },
    {
      title: "Your next chapter abroad",
      text: "Find and secure the right home for your lifestyle and long-term goals.",
      image: IMG.coast,
      chips: ["Capital", "Income", "Security", "Flexibility"],
    },
  ];

  return (
    <section className="bg-sky-50/70 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>03 — from your current property to your life project</Eyebrow>
          <Heading center className="mt-3 text-[28px] md:text-[38px]">
            Finance your next chapter
          </Heading>
          <p className="mt-4 text-[13px] leading-[1.7] text-slate-500">
            Your current property and your future destination should not be
            treated as two unrelated projects.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal from="left">
            <PanelCard {...panels[0]} />
          </Reveal>

          <Reveal from="scale" delay={150} className="flex items-center justify-center">
            <div className="flex flex-row items-center gap-4 lg:flex-col">
              <span className="max-w-[110px] text-center text-[9px] font-bold tracking-[0.16em] text-sky-600">
                One coordinated strategy
              </span>
              {flow.map(({ label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className="re-pulse flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-600 shadow-[0_8px_22px_rgba(2,132,199,0.18)] ring-1 ring-sky-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal from="right">
            <PanelCard {...panels[1]} />
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {strategyLinks.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-white p-5 text-left shadow-[0_8px_26px_rgba(11,29,51,0.06)] ring-1 ring-slate-900/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,29,51,0.12)]"
              >
                <span>
                  <span className="block text-[13px] font-semibold text-slate-900">{item.title}</span>
                  <span className="mt-1 block text-[11px] text-slate-500">{item.text}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-sky-600 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-[12.5px] text-slate-600">
            2morrow connects these decisions within one coordinated journey.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <PrimaryButton>Build my project scenario</PrimaryButton>
            <GhostButton>Explore destinations</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PanelCard({
  title,
  text,
  image,
  chips,
}: {
  title: string;
  text: string;
  image: string;
  chips: string[];
}) {
  return (
    <article className="group h-full overflow-hidden rounded-[22px] bg-white p-6 shadow-[0_14px_40px_rgba(11,29,51,0.07)] ring-1 ring-slate-900/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(11,29,51,0.14)]">
      <h3 className="text-center text-[16px] font-semibold tracking-[-0.02em] text-slate-950">
        {title}
      </h3>
      <p className="mx-auto mt-1.5 max-w-[320px] text-center text-[11.5px] leading-[1.55] text-slate-500">
        {text}
      </p>
      <Photo src={image} className="mt-5 h-[170px] w-full rounded-2xl" />
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-semibold text-sky-700 transition-colors group-hover:bg-sky-100"
          >
            {chip}
          </span>
        ))}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 Return                                                                  */
/* -------------------------------------------------------------------------- */

function ReturnSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="grid grid-cols-2 gap-4">
          <Reveal from="left">
            <div className="group overflow-hidden rounded-[22px] shadow-[0_20px_50px_rgba(11,29,51,0.14)]">
              <Photo src={IMG.street} className="h-[260px] w-full sm:h-[420px]" />
            </div>
          </Reveal>
          <Reveal from="left" delay={150} className="pt-10">
            <div className="group overflow-hidden rounded-[22px] shadow-[0_20px_50px_rgba(11,29,51,0.14)]">
              <Photo src={IMG.terrace} className="h-[260px] w-full sm:h-[420px]" />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <Eyebrow>04 — keep the option open</Eyebrow>
            <Heading className="mt-3 text-[28px] md:text-[38px]">
              Prepare for a possible return to your home country
            </Heading>
            <p className="mt-4 text-[13px] leading-[1.7] text-slate-500">
              Leaving your home country does not always mean closing the door
              behind you.
            </p>
            <p className="mt-3 text-[13px] leading-[1.7] text-slate-500">
              Plans change. Family needs evolve. Health, work, finances or
              personal priorities may lead you to reconsider where you want to
              live. A responsible strategy should therefore consider not only
              the move abroad, but also what would happen if you choose or
              needed to return.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="mt-6 text-[15px] font-semibold text-slate-950">
              Questions worth asking
            </h3>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {returnQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[12px] leading-[1.55] text-slate-600">
                  <RotateCcw className="mt-[3px] h-3 w-3 shrink-0 text-sky-500" />
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 rounded-xl border-l-2 border-sky-600 bg-sky-50 px-4 py-3 text-[12px] font-semibold leading-[1.6] text-slate-700">
              A return strategy does not mean expecting the project to fail. It
              means protecting your ability to adapt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton>Include a return scenario</PrimaryButton>
              <GhostButton>Talk to 2morrow</GhostButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

function ProcessSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section className="bg-sky-50/70 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>A clear and controlled process</Eyebrow>
          <Heading center className="mt-3 text-[28px] md:text-[38px]">
            How the property and asset review works
          </Heading>
        </Reveal>

        <div ref={ref} className="relative mt-12">
          {/* animated connecting line (desktop) */}
          <div className="absolute left-[10%] right-[10%] top-[22px] hidden h-px bg-slate-200 lg:block">
            <div
              className="h-full origin-left bg-sky-500 transition-transform duration-[1600ms] ease-out motion-reduce:transition-none"
              style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li
                key={step.n}
                style={{ transitionDelay: `${i * 140}ms` }}
                className={`group relative rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(11,29,51,0.06)] ring-1 ring-slate-900/[0.04] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(11,29,51,0.13)] motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-[12px] font-bold text-sky-600 transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white">
                  {step.n}
                </span>
                <h3 className="mt-4 text-[13px] font-semibold leading-snug text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-[11px] leading-[1.6] text-slate-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-10 text-center">
          <PrimaryButton>Request my property and asset review</PrimaryButton>
          <p className="mt-4 text-[11px] text-slate-400">
            One coordinated process. Relevant expertise. No obligation to
            choose a specific property strategy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Priorities (interactive)                                                   */
/* -------------------------------------------------------------------------- */

function PrioritiesSection() {
  const [active, setActive] = useState(priorities.length - 2);
  const current = priorities[active];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>From possibility to decision</Eyebrow>
          <Heading className="mt-3 text-[28px] md:text-[40px]">
            One property can support
            <br className="hidden md:block" /> different priorities
          </Heading>
          <p className="mt-3 text-[13px] text-slate-400">
            The best option depends on what matters most to you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {priorities.map((item, i) => {
              const selected = i === active;
              return (
                <Reveal key={item.label} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={`h-full w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      selected
                        ? "border-sky-500 bg-sky-50 shadow-[0_16px_36px_rgba(2,132,199,0.18)]"
                        : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-[0_14px_30px_rgba(11,29,51,0.08)]"
                    }`}
                  >
                    <span
                      className={`block text-[14px] font-semibold tracking-[-0.02em] ${
                        selected ? "text-sky-800" : "text-slate-900"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            selected ? "bg-white text-sky-700" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal from="right">
            <aside className="sticky top-6 rounded-[22px] bg-white p-6 shadow-[0_20px_55px_rgba(11,29,51,0.1)] ring-1 ring-slate-900/[0.05] sm:p-7">
              <p className="text-[9px] font-bold tracking-[0.2em] text-sky-600">
                Your selected priority
              </p>

              {/* key forces the panel to replay its animation on change */}
              <div key={current.label} className="re-fade">
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">
                  {current.label}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.6] text-slate-500">
                  Explore how the property could support this priority.
                </p>

                <div className="mt-5 space-y-3">
                  {current.options.map((opt, i) => (
                    <div
                      key={opt.title}
                      style={{ animationDelay: `${i * 90}ms` }}
                      className="re-fade rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50"
                    >
                      <p className="text-[13px] font-semibold text-slate-900">{opt.title}</p>
                      <p className="mt-1 text-[11.5px] leading-[1.6] text-slate-500">{opt.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[10.5px] leading-[1.6] text-slate-400">
                Compare these routes before committing to one. Illustrative
                only; suitability depends on your property and the advice
                required.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(2,132,199,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
                >
                  Compare my property scenarios
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </aside>
          </Reveal>
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
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a2a6b] via-sky-800 to-sky-600">
      <div className="re-blob absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="re-blob absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl [animation-delay:-6s]" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Eyebrow light>Your property. Your next chapter.</Eyebrow>
            <Heading light className="mt-4 text-[30px] md:text-[46px]">
              Understand what your property could make possible.
            </Heading>
            <p className="mt-4 max-w-[520px] text-[13.5px] leading-[1.7] text-sky-100">
              Start with your current position, compare realistic scenarios
              and connect your property decision with the life you want to
              build next.
            </p>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <PrimaryButton tone="green">Request my property review</PrimaryButton>
            <GhostButton light>Start my life project</GhostButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function RealEstatePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 antialiased">
      <style>{`
        @keyframes re-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes re-pulse {
          0%, 100% { box-shadow: 0 8px 22px rgba(2,132,199,0.18), 0 0 0 0 rgba(14,165,233,0.25); }
          50% { box-shadow: 0 8px 22px rgba(2,132,199,0.18), 0 0 0 10px rgba(14,165,233,0); }
        }
        @keyframes re-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes re-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 20px) scale(1.1); }
        }
        .re-float { animation: re-float 8s ease-in-out infinite; }
        .re-pulse { animation: re-pulse 3s ease-in-out infinite; }
        .re-fade { animation: re-fade 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .re-blob { animation: re-blob 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .re-float, .re-pulse, .re-fade, .re-blob { animation: none !important; }
        }
      `}</style>

      <Hero />
      <StartSection />
      <PositionSection />
      <OptionsSection />
      <FinanceSection />
      <ReturnSection />
      <ProcessSection />
      <PrioritiesSection />
      <FinalCTA />
    </main>
  );
}