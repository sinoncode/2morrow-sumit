"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

interface DestinationIntelligenceModalProps {
  open: boolean;
  onClose: () => void;
  onStartProject?: () => void;
  onContact?: () => void;
}

interface DestinationSection {
  number: string;
  title: string;
  description: string;
  links: string[];
}

const sections: DestinationSection[] = [
  {
    number: "01",
    title: "Country overview",
    description:
      "Human introduction, best-fit project types, verified availability badges and last-reviewed date.",
    links: [
      "Country guide",
      "Properties",
      "Professionals",
      "Angels",
    ],
  },
  {
    number: "02",
    title: "Life in the country",
    description:
      "Everyday reality, environment, access, healthcare context, community, language and seasonality.",
    links: [
      "What people love",
      "What to understand",
      "Regional differences",
      "Reality Check",
    ],
  },
  {
    number: "03",
    title: "Property and buying context",
    description:
      "Market structure, foreign-buyer framework, indicative costs and ownership considerations with sources and dates.",
    links: [
      "Never legal advice",
      "Verified data only",
      "Cost ranges",
      "Source date",
    ],
  },
  {
    number: "04",
    title: "Regions and areas",
    description:
      "Cards for regions, cities or islands using consistent CMS fields and availability states.",
    links: [
      "Region filters",
      "Area comparison",
      "Map sync",
      "Empty states",
    ],
  },
  {
    number: "05",
    title: "Available support",
    description:
      "Present licensed professionals and Angels as distinct support types with clear roles.",
    links: [
      "Professional request",
      "Angel conversation",
      "Client Shield",
      "Conflicts disclosed",
    ],
  },
  {
    number: "06",
    title: "Continue the project",
    description:
      "Properties never lead the page; they appear after destination fit and practical understanding.",
    links: [
      "View properties",
      "Download e-book",
      "Start intake",
      "Compare country",
    ],
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.975,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.985,
    filter: "blur(5px)",
    transition: {
      duration: 0.24,
      ease: "easeIn" as const,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ActionLink({
  children,
  onClick,
  index,
}: {
  children: ReactNode;
  onClick?: () => void;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={false}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
              borderColor: "#2780c3",
              backgroundColor: "#f4faff",
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : { scale: 0.985 }
      }
      transition={{
        duration: 0.24,
        ease: "easeOut",
      }}
      className="destination-action group relative flex min-h-[44px] w-full items-center justify-between gap-3 overflow-hidden rounded-xl border border-[#e0eaf2] bg-white px-4 py-3 text-left text-[12px] font-medium text-[#243c5b] transition-colors"
      aria-label={String(children)}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[#eaf5fc] transition-all duration-300 group-hover:w-full"
        style={{ zIndex: 0 }}
      />

      <span className="relative z-10 flex items-center gap-2">
        <ArrowRight
          size={13}
          strokeWidth={1.8}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
        <span>{children}</span>
      </span>

      <ArrowUpRight
        size={14}
        className="relative z-10 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </motion.button>
  );
}

export default function DestinationIntelligenceModal({
  open,
  onClose,
  onStartProject,
  onContact,
}: DestinationIntelligenceModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("01");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleAction = (label: string) => {
    if (label === "Start intake" || label === "View properties") {
      onStartProject?.();
      return;
    }

    if (
      label === "Professional request" ||
      label === "Angel conversation" ||
      label === "Angels"
    ) {
      onContact?.();
      return;
    }

    // Connect the remaining actions to your application routes
    // or section-specific modal handlers here.
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="destination-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.3,
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061a30]/55 p-0 backdrop-blur-md sm:p-4 lg:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-modal-title"
            variants={
              shouldReduceMotion
                ? undefined
                : modalVariants
            }
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            className="destination-modal relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[0_30px_120px_rgba(4,26,52,0.25)] sm:h-auto sm:max-h-[94dvh] sm:max-w-[1120px] sm:rounded-[26px]"
          >
            {/* Header / close controls */}
            <div className="relative z-30 flex shrink-0 items-center justify-between border-b border-[#e9f0f5] bg-white/90 px-5 py-3 backdrop-blur-xl sm:px-7">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eaf5fc] text-[#2780c3]">
                  <Compass size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#2780c3]">
                    2morrow
                  </p>
                  <p className="text-[11px] text-[#75859a]">
                    Destination intelligence
                  </p>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: 90, scale: 1.05 }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 0.9 }
                }
                aria-label="Close destination intelligence"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1eaf2] bg-white text-[#203b60] transition-colors hover:bg-[#eff7fc]"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Scrollable modal content */}
            <div className="destination-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {/* HERO */}
              <section className="destination-hero relative isolate overflow-hidden bg-[#f6fbfe] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                {/* Decorative animated rings */}
                <div
                  aria-hidden="true"
                  className="destination-rings pointer-events-none absolute -right-24 -top-40 -z-10 h-[460px] w-[460px] sm:-right-12 sm:-top-44 sm:h-[580px] sm:w-[580px]"
                >
                  {[0, 1, 2, 3, 4].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-full border border-[#b8dff6]/65"
                      style={{
                        inset: `${ring * 28}px`,
                      }}
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: [1, 1.025, 1],
                              opacity: [0.48, 0.9, 0.48],
                            }
                      }
                      transition={{
                        duration: 5 + ring,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: ring * 0.35,
                      }}
                    />
                  ))}
                </div>

                <div className="grid items-center gap-9 lg:grid-cols-[1.2fr_0.88fr] lg:gap-10">
                  <motion.div variants={revealVariants}>
                    <div className="mb-5 flex items-center gap-2">
                      <span className="h-px w-7 bg-[#2780c3]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#2780c3] sm:text-[11px]">
                        Destination intelligence. Country by country.
                      </span>
                    </div>

                    <h2
                      id="destination-modal-title"
                      className="max-w-[590px] font-serif text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-[#0c2854] sm:text-[43px] lg:text-[48px]"
                    >
                      Could this country work for your life?
                    </h2>

                    <p className="mt-5 max-w-[550px] text-[13px] leading-[1.9] text-[#73849a] sm:text-[14px]">
                      A reusable CMS template that progresses from
                      country to region to area to property while
                      separating verified facts, professional advice
                      and Angel insight.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
                      <motion.button
                        type="button"
                        onClick={onStartProject}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -3,
                                boxShadow:
                                  "0 12px 26px rgba(39,128,195,0.22)",
                              }
                        }
                        whileTap={
                          shouldReduceMotion
                            ? undefined
                            : { scale: 0.97 }
                        }
                        className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2780c3] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_5px_14px_rgba(39,128,195,0.12)] transition-colors hover:bg-[#176ba9]"
                      >
                        Start Your Life Project
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={onContact}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -3,
                                borderColor: "#2780c3",
                              }
                        }
                        whileTap={
                          shouldReduceMotion
                            ? undefined
                            : { scale: 0.97 }
                        }
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#2780c3] bg-white px-5 py-3 text-[13px] font-semibold text-[#2780c3] transition-colors hover:bg-[#edf7fd]"
                      >
                        Talk to 2Morrow
                        <ArrowUpRight size={15} />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Journey card */}
                  <motion.div
                    variants={revealVariants}
                    className="relative"
                  >
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -4 }
                      }
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="relative overflow-hidden rounded-[25px] border border-[#dcebf4] bg-[#edf7fc] p-7 sm:p-9 lg:p-10"
                    >
                      <motion.div
                        aria-hidden="true"
                        className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[#c5e3f5]"
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { rotate: 360 }
                        }
                        transition={{
                          duration: 35,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <motion.div
                        aria-hidden="true"
                        className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-[#c5e3f5]"
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { rotate: -360 }
                        }
                        transition={{
                          duration: 26,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <div className="relative">
                        <div className="mb-3 flex items-center justify-center gap-2">
                          <Sparkles
                            size={13}
                            className="text-[#16a779]"
                          />

                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#16a779]">
                            Your decision journey
                          </span>
                        </div>

                        <h3 className="text-center font-serif text-[27px] font-bold leading-[1.24] tracking-[-0.02em] text-[#0c2854] sm:text-[31px]">
                          Life first.
                          <br />
                          Property in context.
                        </h3>

                        <div className="my-7 h-px bg-gradient-to-r from-transparent via-[#c9e1f0] to-transparent" />

                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[9px] font-bold uppercase tracking-[0.07em] text-[#2780c3] sm:text-[10px]">
                          <span>Person</span>
                          <ArrowRight size={11} />
                          <span>Lifestyle</span>
                          <ArrowRight size={11} />
                          <span>Destination</span>
                          <ArrowRight size={11} />
                          <span>Property</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      aria-hidden="true"
                      className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-[25px] border border-[#dcebf4]"
                      initial={{ opacity: 0, x: 10, y: -10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.6 }}
                    />
                  </motion.div>
                </div>

                <motion.button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("destination-sections")
                      ?.scrollIntoView({
                        behavior: shouldReduceMotion
                          ? "auto"
                          : "smooth",
                        block: "start",
                      })
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-9 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6e8298] transition-colors hover:text-[#2780c3] sm:flex"
                >
                  Explore the journey
                  <ArrowDownRight size={14} />
                </motion.button>
              </section>

              {/* INFORMATION SECTIONS */}
              <div id="destination-sections">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.number}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 20,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.48,
                      delay: shouldReduceMotion
                        ? 0
                        : (index % 2) * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`destination-section grid gap-5 px-6 py-7 sm:grid-cols-[38px_minmax(0,1fr)] sm:gap-5 sm:px-10 sm:py-8 lg:grid-cols-[32px_minmax(0,1.3fr)_minmax(300px,1fr)] lg:items-center lg:gap-6 lg:px-12 ${
                      index % 2 === 1
                        ? "bg-[#eef8fc]"
                        : "bg-white"
                    }`}
                  >
                    {/* Section number */}
                    <span className="pt-0.5 font-serif text-[13px] font-bold tracking-wide text-[#13aa7b]">
                      {section.number}
                    </span>

                    {/* Section description */}
                    <div>
                      <h3 className="font-serif text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#0c2854] sm:text-[24px]">
                        {section.title}
                      </h3>

                      <p className="mt-2 max-w-[540px] text-[12px] leading-[1.8] text-[#71839a] sm:text-[13px]">
                        {section.description}
                      </p>
                    </div>

                    {/* Action links */}
                    <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                      {section.links.map((link, linkIndex) => (
                        <motion.div
                          key={link}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, x: 12 }
                          }
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: shouldReduceMotion
                              ? 0
                              : linkIndex * 0.055,
                          }}
                        >
                          <ActionLink
                            index={linkIndex}
                            onClick={() => {
                              setActiveSection(section.number);
                              handleAction(link);
                            }}
                          >
                            {link}
                          </ActionLink>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              {/* Bottom trust strip */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 15 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 border-t border-[#e6eef4] bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf8f2] text-[#16a779]">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-[#18355b]">
                      Your life. Your decision.
                    </p>

                    <p className="mt-1 text-[11px] text-[#7b8ba0]">
                      Clear context, transparent information, independent support.
                    </p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { x: 3 }
                  }
                  className="inline-flex items-center gap-2 self-start text-[12px] font-semibold text-[#2780c3] transition-colors hover:text-[#155789] sm:self-center"
                >
                  Back to your journey
                  <ArrowRight size={15} />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom progress indicator */}
            <div className="relative h-[3px] shrink-0 overflow-hidden bg-[#edf4f8]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#2780c3]"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(Number(activeSection) / 6) * 100}%`,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}