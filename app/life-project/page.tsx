"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  ArrowRight,
  Banknote,
  Compass,
  Home,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

type RoleCard = {
  title: string;
  text: string;
  image: string;
  alt: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** slanted bottom edge of the photo */
  clip: string;
  /** vertical offset of the card on large screens (staggered fan) */
  offset: string;
  /** z-index on large screens so cards overlap like the reference */
  z: string;
};

const roleCards: RoleCard[] = [
  {
    title: "Capital",
    text: "Could the property release capital for your next home or life project?",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85",
    alt: "House keys on a wooden table",
    icon: Banknote,
    clip: "polygon(0 0, 100% 0, 100% 96%, 0 100%)",
    offset: "lg:mt-0",
    z: "lg:z-[1]",
  },
  {
    title: "Income",
    text: "Could it generate reliable income while remaining part of your assets?",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=85",
    alt: "Bright living room with an armchair",
    icon: TrendingUp,
    clip: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
    offset: "lg:mt-1",
    z: "lg:z-[2]",
  },
  {
    title: "Security",
    text: "Could keeping it preserve stability or a possible return to switzerland?",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=85",
    alt: "Alpine chalet with mountains behind",
    icon: ShieldCheck,
    clip: "polygon(0 0, 100% 0, 100% 86%, 0 100%)",
    offset: "lg:mt-4",
    z: "lg:z-[3]",
  },
  {
    title: "Potential",
    text: "Could renovation, development or densification create additional value?",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=85",
    alt: "Architectural plans on a desk",
    icon: Home,
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 88%)",
    offset: "lg:mt-7",
    z: "lg:z-[4]",
  },
  {
    title: "Flexibility",
    text: "Could refinancing or a different use give you more options?",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=85",
    alt: "Wooden signpost pointing in several directions",
    icon: Compass,
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
    offset: "lg:mt-9",
    z: "lg:z-[5]",
  },
];

/* -------------------------------------------------------------------------- */
/* Hooks                                                                      */
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
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function Reveal({
  inView,
  delay = 0,
  className = "",
  children,
}: {
  inView: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function PropertyCard({
  card,
  index,
  inView,
}: {
  card: RoleCard;
  index: number;
  inView: boolean;
}) {
  const Icon = card.icon;

  return (
    /* Outer layer: entrance animation + staggered fan position */
    <div
      style={{ transitionDelay: `${300 + index * 110}ms` }}
      className={`relative transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:-ml-7 lg:first:ml-0 lg:flex-1 hover:z-20 ${card.offset} ${card.z} ${
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-14 opacity-0 lg:translate-x-10"
      }`}
    >
      {/* Inner layer: hover lift */}
      <article className="group h-full cursor-pointer overflow-hidden rounded-[18px] bg-white shadow-[0_14px_34px_rgba(11,29,51,0.10)] ring-1 ring-slate-900/[0.03] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:scale-[1.035] hover:shadow-[0_28px_55px_rgba(11,29,51,0.20)]">
        {/* Photo with slanted bottom edge */}
        <div className="relative h-[132px] overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100 sm:h-[150px] lg:h-[128px] xl:h-[142px]">
          <div
            className="absolute inset-0"
            style={{ clipPath: card.clip } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 pt-1">
          <span className="relative -mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-sky-600 group-hover:text-white">
            <Icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
          </span>

          <h3
            className="mt-3 text-[20px] font-medium leading-none text-[#14284b]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {card.title}
          </h3>

          <div className="mt-3 h-px w-full origin-left bg-slate-200 transition-colors duration-500 group-hover:bg-sky-300" />

          <p className="mt-3 text-[12.5px] leading-[1.6] text-slate-500">
            {card.text}
          </p>
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PropertyRolePage() {
  const intro = useInView<HTMLDivElement>(0.1);
  const cards = useInView<HTMLDivElement>(0.12);
  const question = useInView<HTMLDivElement>(0.3);

  return (
    <main
      className="min-h-screen bg-white font-sans text-slate-900 antialiased"
    >
      <style>{`
        @keyframes pr-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pr-arrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pr-float, .pr-arrow { animation: none !important; }
        }
      `}</style>

      <section className="relative isolate overflow-hidden bg-white">
        {/* ---------------------------------------------------------------- */}
        {/* Background imagery (mountains + modern house, faded into white)  */}
        {/* ---------------------------------------------------------------- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] sm:h-[600px] lg:h-[640px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="absolute right-0 top-0 h-full w-full object-cover opacity-45 sm:w-[85%] lg:w-[72%] lg:opacity-60"
            style={{
              WebkitMaskImage:
                "linear-gradient(to left, #000 35%, transparent 100%), linear-gradient(to bottom, #000 55%, transparent 100%)",
              maskImage:
                "linear-gradient(to left, #000 35%, transparent 100%), linear-gradient(to bottom, #000 55%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85"
            alt=""
            className="pr-float absolute -right-6 top-24 hidden h-[330px] w-[420px] object-cover opacity-90 lg:block xl:right-0 xl:h-[380px] xl:w-[480px]"
            style={{
              animation: "pr-float 9s ease-in-out infinite",
              WebkitMaskImage:
                "radial-gradient(ellipse at 65% 45%, #000 40%, transparent 78%)",
              maskImage:
                "radial-gradient(ellipse at 65% 45%, #000 40%, transparent 78%)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:via-white/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:pb-20">
          {/* -------------------------------------------------------------- */}
          {/* Intro copy                                                      */}
          {/* -------------------------------------------------------------- */}
          <div ref={intro.ref} className="max-w-[520px]">
            <Reveal inView={intro.inView}>
              <p className="text-[10px] font-bold tracking-[0.2em] text-sky-700">
                Start with what you already have
              </p>
            </Reveal>

            <Reveal inView={intro.inView} delay={100}>
              <h1
                className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.01em] text-[#14284b] sm:text-[42px] md:text-[48px]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your property is more than a value on paper.
              </h1>
            </Reveal>

            <Reveal inView={intro.inView} delay={200}>
              <p className="mt-5 max-w-[470px] text-[14px] leading-[1.65] text-slate-600">
                A home, apartment, investment property or plot of land can play
                several roles in your next chapter.
              </p>
            </Reveal>

            <Reveal inView={intro.inView} delay={300}>
              <p className="mt-3 max-w-[470px] text-[14px] leading-[1.65] text-slate-600">
                It may become available capital for a purchase abroad. It may
                provide rental income. It may remain your swiss base. It may
                offer renovation, development or densification potential. In
                some situations, refinancing may also create greater financial
                flexibility.
              </p>
            </Reveal>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Role cards                                                      */}
          {/* -------------------------------------------------------------- */}
          <div
            ref={cards.ref}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:flex lg:items-start lg:gap-0"
          >
            {roleCards.map((card, index) => (
              <PropertyCard
                key={card.title}
                card={card}
                index={index}
                inView={cards.inView}
              />
            ))}
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Key question + CTA                                              */}
          {/* -------------------------------------------------------------- */}
          <div
            ref={question.ref}
            className="mt-12 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between"
          >
            <Reveal inView={question.inView}>
              <div className="relative border-l-2 border-[#14284b]/80 pl-5">
                <p className="text-[12.5px] text-slate-600">
                  The first question is therefore not simply:
                </p>

                <p
                  className="mt-1 text-[26px] leading-tight text-sky-700 sm:text-[30px]"
                  style={{ fontFamily: "cursive" }}
                >
                  &lsquo;How much is my property worth?&rsquo;
                </p>

                <p className="mt-1 text-[12.5px] text-slate-600">It is:</p>

                <p
                  className="mt-1 text-[19px] leading-snug text-[#14284b] sm:text-[22px]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  &lsquo;What role should this property play in my future?&rsquo;
                </p>
              </div>
            </Reveal>

            <Reveal
              inView={question.inView}
              delay={200}
              className="flex items-center gap-4 sm:gap-6 lg:pr-4"
            >
              <svg
                aria-hidden
                viewBox="0 0 90 30"
                fill="none"
                className="pr-arrow hidden h-8 w-24 text-sky-700 sm:block"
                style={{ animation: "pr-arrow 2.6s ease-in-out infinite" }}
              >
                <path
                  d="M2 22C18 6 44 4 82 14"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M74 9l9 5-8 6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <button
                type="button"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[7px] bg-sky-700 px-8 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(3,105,161,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-[0_18px_36px_rgba(3,105,161,0.34)] active:translate-y-0 sm:w-auto"
              >
                Explore my options
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}