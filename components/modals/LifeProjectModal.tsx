"use client";

import {
    useEffect,
    useRef,
    type MouseEvent,
} from "react";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    ArrowRight,
    ArrowUpRight,
    Compass,
    Heart,
    Sparkles,
    X,
} from "lucide-react";

interface LifeProjectModalProps {
    open: boolean;
    onClose: () => void;
    onStartProject?: () => void;
    onContact?: () => void;
    onAction?: (label: string) => void;
}

interface JourneySection {
    number: string;
    title: string;
    description: string;
    links: string[];
}

const journeySections: JourneySection[] = [
    {
        number: "01",
        title: "Begin with the person",
        description:
            "Understand the change you are considering, who is involved, what matters now and what must remain possible later.",
        links: [
            "Current situation",
            "People involved",
            "Timing",
            "Non-negotiables",
        ],
    },
    {
        number: "02",
        title: "Define the life you want",
        description:
            "Translate an aspiration into practical priorities: pace, climate, community, healthcare, access, work and financial resilience.",
        links: [
            "Lifestyle",
            "Everyday needs",
            "Financial comfort",
            "Return flexibility",
        ],
    },
    {
        number: "03",
        title: "Explore destinations with purpose",
        description:
            "Compare places through Destination Intelligence, professional knowledge and lived local insight.",
        links: [
            "Reality Check",
            "Country guides",
            "Local professionals",
            "2Morrow Angels",
        ],
    },
    {
        number: "04",
        title: "Place property in context",
        description:
            "Only then consider whether to sell, keep, rent, refinance, buy or rent abroad.",
        links: [
            "Current property",
            "Property search",
            "Verification",
            "Purchase support",
        ],
    },
    {
        number: "05",
        title: "Coordinate the journey",
        description:
            "Bring decisions, requests, documents, appointments and trusted people together in one secure project.",
        links: [
            "Client dashboard",
            "Requests",
            "Documents",
            "Appointments",
        ],
    },
    {
        number: "06",
        title: "Keep support beyond the transaction",
        description:
            "Relocation and integration are part of the project, not an afterthought.",
        links: [
            "Relocation",
            "Arrival",
            "Local connection",
            "New Life",
        ],
    },
];

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.965,
        y: 28,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.985,
        y: 16,
        filter: "blur(4px)",
        transition: {
            duration: 0.22,
            ease: "easeIn" as const,
        },
    },
};

export default function LifeProjectModal({
    open,
    onClose,
    onStartProject,
    onContact,
    onAction,
}: LifeProjectModalProps) {
    const reduceMotion = useReducedMotion() ?? false;

    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement as HTMLElement | null;

        document.body.style.overflow = "hidden";

        const timer = window.setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 50);

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !modalRef.current) return;

            const elements =
                modalRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

            if (!elements.length) return;

            const first = elements[0];
            const last = elements[elements.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);

            document.body.style.overflow = previousOverflow;

            previouslyFocused?.focus();
        };
    }, [open, onClose]);

    const handleBackdropClick = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleAction = (label: string) => {
        if (label === "Start project") {
            onStartProject?.();
            return;
        }

        if (label === "Contact") {
            onContact?.();
            return;
        }

        onAction?.(label);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="life-project-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.01 : 0.28,
                    }}
                    onMouseDown={handleBackdropClick}
                    className="life-modal-backdrop fixed inset-0 z-[120] flex items-center justify-center bg-[#061a30]/55 p-0 backdrop-blur-md sm:p-4 lg:p-6"
                >
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="life-modal-title"
                        variants={reduceMotion ? undefined : modalVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        exit="exit"
                        className="life-modal relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[0_30px_100px_rgba(4,26,52,0.25)] sm:h-auto sm:max-h-[94dvh] sm:max-w-[1200px] sm:rounded-[26px]"
                    >
                        {/* HEADER */}

                        <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#e5eef4] bg-white/95 px-5 py-3.5 backdrop-blur-xl sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf7fc] text-[#2780c3]">
                                    <Compass size={18} />
                                </div>

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2780c3]">
                                        2Morrow
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#71839a]">
                                        Your Life Project
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                ref={closeButtonRef}
                                type="button"
                                onClick={onClose}
                                aria-label="Close Life Project modal"
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { rotate: 90, scale: 1.05 }
                                }
                                whileTap={
                                    reduceMotion
                                        ? undefined
                                        : { scale: 0.92 }
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0eaf2] text-[#17345b] transition-colors hover:bg-[#edf7fc]"
                            >
                                <X size={18} />
                            </motion.button>
                        </header>

                        {/* SCROLLABLE CONTENT */}

                        <div className="life-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {/* HERO */}

                            <section className="life-hero relative isolate overflow-hidden bg-[#f7fbfd] px-6 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                                {/* Decorative rings */}

                                <div
                                    aria-hidden="true"
                                    className="life-rings pointer-events-none absolute -right-36 -top-36 -z-10 h-[440px] w-[440px] sm:-right-28 sm:-top-44 sm:h-[580px] sm:w-[580px]"
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((ring) => (
                                        <motion.div
                                            key={ring}
                                            className="absolute rounded-full border border-[#b9def5]/70"
                                            style={{
                                                inset: `${ring * 25}px`,
                                            }}
                                            animate={
                                                reduceMotion
                                                    ? undefined
                                                    : {
                                                        scale: [1, 1.018, 1],
                                                        opacity: [0.4, 0.9, 0.4],
                                                    }
                                            }
                                            transition={{
                                                duration: 5 + ring * 0.7,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: ring * 0.25,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="grid items-center gap-9 lg:grid-cols-[1.2fr_0.95fr] lg:gap-12">
                                    {/* HERO COPY */}

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, x: -18 }
                                        }
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            delay: reduceMotion ? 0 : 0.08,
                                        }}
                                    >
                                        <div className="mb-5 flex items-center gap-2.5">
                                            <span className="h-px w-7 bg-[#2780c3]" />

                                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2780c3] sm:text-[11px]">
                                                Life first. Decisions in context.
                                            </span>
                                        </div>

                                        <h2
                                            id="life-modal-title"
                                            className="max-w-[630px] font-serif text-[34px] font-bold leading-[1.1] tracking-[-0.035em] text-[#0c2854] sm:text-[43px] lg:text-[48px]"
                                        >
                                            Build the life project before choosing the property.
                                        </h2>

                                        <p className="mt-5 max-w-[570px] text-[13px] leading-[1.9] text-[#70839b] sm:text-[14px]">
                                            A central public page that connects the home page,
                                            destinations, real estate, Angels, professional
                                            expertise, the intelligent intake and the CRM.
                                        </p>

                                        <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
                                            <motion.button
                                                type="button"
                                                onClick={onStartProject}
                                                whileHover={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            y: -3,
                                                            boxShadow:
                                                                "0 12px 28px rgba(39,128,195,0.24)",
                                                        }
                                                }
                                                whileTap={
                                                    reduceMotion
                                                        ? undefined
                                                        : { scale: 0.97 }
                                                }
                                                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2780c3] px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#176ba9]"
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
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            y: -3,
                                                            borderColor: "#2780c3",
                                                        }
                                                }
                                                whileTap={
                                                    reduceMotion
                                                        ? undefined
                                                        : { scale: 0.97 }
                                                }
                                                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#2780c3] bg-white px-5 py-3 text-[13px] font-semibold text-[#2780c3] transition-colors hover:bg-[#edf7fc]"
                                            >
                                                Talk to 2Morrow

                                                <ArrowUpRight size={15} />
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    {/* DECISION JOURNEY CARD */}

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, x: 18, y: 8 }
                                        }
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.65,
                                            delay: reduceMotion ? 0 : 0.15,
                                        }}
                                        className="relative"
                                    >
                                        <motion.div
                                            whileHover={
                                                reduceMotion ? undefined : { y: -4 }
                                            }
                                            className="relative overflow-hidden rounded-[25px] border border-[#dceaf3] bg-[#eef7fc] px-5 py-9 sm:px-8 sm:py-10"
                                        >
                                            <motion.div
                                                aria-hidden="true"
                                                className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#c5e3f5]"
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : { rotate: 360 }
                                                }
                                                transition={{
                                                    duration: 36,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />

                                            <motion.div
                                                aria-hidden="true"
                                                className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-[#c5e3f5]"
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : { rotate: -360 }
                                                }
                                                transition={{
                                                    duration: 25,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />

                                            <div className="relative">
                                                <div className="mb-3 flex items-center justify-center gap-2">
                                                    <Sparkles
                                                        size={13}
                                                        className="text-[#12a879]"
                                                    />

                                                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#12a879]">
                                                        Your decision journey
                                                    </span>
                                                </div>

                                                <h3 className="text-center font-serif text-[27px] font-bold leading-[1.25] tracking-[-0.025em] text-[#0c2854] sm:text-[31px]">
                                                    Life first.
                                                    <br />
                                                    Property in context.
                                                </h3>

                                                <div className="my-7 h-px bg-gradient-to-r from-transparent via-[#c9e1f0] to-transparent" />

                                                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[9px] font-bold uppercase tracking-[0.06em] text-[#2780c3] sm:text-[10px]">
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
                                            className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-[25px] border border-[#dceaf3]"
                                            initial={
                                                reduceMotion
                                                    ? false
                                                    : { opacity: 0, x: 10, y: -10 }
                                            }
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.3,
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </section>

                            {/* SIX LIFE PROJECT STAGES */}

                            <div id="life-project-stages">
                                {journeySections.map((section, sectionIndex) => (
                                    <motion.section
                                        key={section.number}
                                        initial={
                                            reduceMotion
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
                                            duration: reduceMotion ? 0.01 : 0.5,
                                            delay: reduceMotion
                                                ? 0
                                                : (sectionIndex % 2) * 0.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className={`life-section grid gap-5 px-6 py-7 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-5 sm:px-10 sm:py-8 lg:grid-cols-[32px_minmax(0,1.3fr)_minmax(300px,1fr)] lg:items-center lg:gap-6 lg:px-12 ${sectionIndex % 2 === 1
                                            ? "bg-[#eef8fc]"
                                            : "bg-white"
                                            }`}
                                    >
                                        {/* SECTION NUMBER */}

                                        <span className="pt-0.5 font-serif text-[13px] font-bold tracking-wide text-[#13aa7b]">
                                            {section.number}
                                        </span>

                                        {/* SECTION CONTENT */}

                                        <div>
                                            <h3 className="font-serif text-[21px] font-bold leading-tight tracking-[-0.02em] text-[#0c2854] sm:text-[23px]">
                                                {section.title}
                                            </h3>

                                            <p className="mt-2 max-w-[560px] text-[12px] leading-[1.8] text-[#71839a] sm:text-[13px]">
                                                {section.description}
                                            </p>
                                        </div>

                                        {/* INTERACTIVE ACTIONS */}

                                        <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                                            {section.links.map((label, linkIndex) => (
                                                <motion.button
                                                    key={label}
                                                    type="button"
                                                    onClick={() => handleAction(label)}
                                                    initial={
                                                        reduceMotion
                                                            ? false
                                                            : {
                                                                opacity: 0,
                                                                x: 12,
                                                            }
                                                    }
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                    }}
                                                    whileHover={
                                                        reduceMotion
                                                            ? undefined
                                                            : {
                                                                y: -2,
                                                                borderColor: "#2780c3",
                                                                backgroundColor: "#f2f9fd",
                                                            }
                                                    }
                                                    whileTap={
                                                        reduceMotion
                                                            ? undefined
                                                            : { scale: 0.98 }
                                                    }
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: reduceMotion
                                                            ? 0
                                                            : linkIndex * 0.05,
                                                    }}
                                                    className="life-action group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-[#dfebf3] bg-white px-3.5 py-3 text-left text-[11px] font-medium text-[#263d5c] sm:px-4"
                                                >
                                                    <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[#eaf5fc] transition-[width] duration-300 group-hover:w-full" />

                                                    <span className="relative z-10 flex items-center gap-2.5">
                                                        <ArrowRight
                                                            size={13}
                                                            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                                        />

                                                        <span>{label}</span>
                                                    </span>

                                                    <ArrowUpRight
                                                        size={13}
                                                        className="relative z-10 shrink-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.section>
                                ))}
                            </div>

                            {/* FOOTER */}

                            <footer className="flex flex-col gap-4 border-t border-[#e5eef4] bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf8f2] text-[#16a779]">
                                        <Heart size={18} />
                                    </div>

                                    <div>
                                        <p className="text-[12px] font-semibold text-[#18355b]">
                                            Your life comes first.
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-[#7b8ba0]">
                                            Start with your needs. Build your journey around them.
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    whileHover={
                                        reduceMotion ? undefined : { x: 3 }
                                    }
                                    className="inline-flex items-center gap-2 self-start text-[12px] font-semibold text-[#2780c3] transition-colors hover:text-[#155789] sm:self-center"
                                >
                                    Back to your journey

                                    <ArrowRight size={15} />
                                </motion.button>
                            </footer>
                        </div>

                        {/* ANIMATED BOTTOM LINE */}

                        <div
                            aria-hidden="true"
                            className="relative h-[3px] shrink-0 overflow-hidden bg-[#edf4f8]"
                        >
                            <motion.div
                                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#2780c3] via-[#21a9df] to-[#16a779]"
                                initial={{
                                    scaleX: 0,
                                }}
                                animate={{
                                    scaleX: 1,
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: "easeOut",
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}