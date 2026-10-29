"use client";

import { useEffect, useRef, type MouseEvent } from "react";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    ArrowRight,
    ArrowUpRight,
    Compass,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";

interface Why2MorrowModalProps {
    open: boolean;
    onClose: () => void;
    onStartProject?: () => void;
    onContact?: () => void;
    onAction?: (label: string) => void;
}

interface Section {
    number: string;
    title: string;
    description: string;
    links: string[];
}

const sections: Section[] = [
    {
        number: "01",
        title: "Our point of view",
        description:
            "A property decision makes more sense when it is connected to the life, finances and future it must support.",
        links: [
            "Life first",
            "Property in context",
            "Human support",
            "Clear decisions",
        ],
    },
    {
        number: "02",
        title: "What 2Morrow coordinates",
        description:
            "Destination intelligence, real estate, current assets, professionals, Angels and relocation within one journey.",
        links: [
            "Discovery",
            "Strategy",
            "Verification",
            "Transition",
        ],
    },
    {
        number: "03",
        title: "How support is organised",
        description:
            "2Morrow coordinates; regulated or specialist work remains with qualified local professionals.",
        links: [
            "Clear roles",
            "No invented expertise",
            "Disclosure",
            "Client Shield",
        ],
    },
    {
        number: "04",
        title: "Our standards",
        description:
            "Verified information, transparent interests, privacy by design and no pressure to complete a transaction.",
        links: [
            "Verification",
            "Confidentiality",
            "Independence",
            "Human review",
        ],
    },
    {
        number: "05",
        title: "Who is behind 2Morrow",
        description:
            "Founder and leadership content with real biographies, responsibilities and verified credentials only.",
        links: [
            "Founder",
            "Team",
            "Advisers",
            "Markets",
        ],
    },
    {
        number: "06",
        title: "Begin your project",
        description:
            "Invite the visitor into the Life Project rather than a generic sales call.",
        links: [
            "Start project",
            "Contact",
            "FAQ",
            "Legal",
        ],
    },
];

const modalVariants = {
    hidden: {
        opacity: 0,
        y: 24,
        scale: 0.975,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
    exit: {
        opacity: 0,
        y: 12,
        scale: 0.99,
        filter: "blur(3px)",
        transition: {
            duration: 0.22,
        },
    },
};

export default function Why2MorrowModals({
    open,
    onClose,
    onStartProject,
    onContact,
    onAction,
}: Why2MorrowModalProps) {
    const reduceMotion = useReducedMotion() ?? false;

    const modalRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement as HTMLElement | null;

        document.body.style.overflow = "hidden";

        const timer = window.setTimeout(() => {
            closeRef.current?.focus();
        }, 50);

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !modalRef.current) return;

            const elements =
                modalRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
                );

            if (!elements.length) return;

            const first = elements[0];
            const last = elements[elements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
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
            previousFocus?.focus();
        };
    }, [open, onClose]);

    function handleBackdropClick(
        event: MouseEvent<HTMLDivElement>
    ) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    function handleAction(label: string) {
        if (label === "Start project") {
            onStartProject?.();
            return;
        }

        if (label === "Contact") {
            onContact?.();
            return;
        }

        onAction?.(label);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="why-2morrow-backdrop"
                    className="why-modal-backdrop fixed inset-0 z-[130] flex items-center justify-center bg-[#071a32]/55 p-0 backdrop-blur-md sm:p-4 lg:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.01 : 0.28,
                    }}
                    onMouseDown={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="why-modal-title"
                        variants={reduceMotion ? undefined : modalVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        exit="exit"
                        className="why-modal relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[0_30px_100px_rgba(4,26,52,0.25)] sm:h-auto sm:max-h-[94dvh] sm:max-w-[1240px] sm:rounded-[26px]"
                    >
                        {/* MODAL HEADER */}

                        <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#e6eef4] bg-white/95 px-5 py-3.5 backdrop-blur-xl sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcecf7] bg-[#eff8fc] text-[#2780c3]">
                                    <Compass size={19} />
                                </div>

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2780c3]">
                                        2Morrow
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#7b8da2]">
                                        Our philosophy & standards
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                ref={closeRef}
                                type="button"
                                onClick={onClose}
                                aria-label="Close Why 2Morrow modal"
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { rotate: 90, scale: 1.06 }
                                }
                                whileTap={
                                    reduceMotion
                                        ? undefined
                                        : { scale: 0.92 }
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce8f1] text-[#102c54] transition-colors hover:bg-[#edf7fc]"
                            >
                                <X size={18} />
                            </motion.button>
                        </header>

                        {/* SCROLLABLE MODAL BODY */}

                        <div className="why-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {/* HERO */}

                            <section className="why-hero relative isolate overflow-hidden bg-[#f7fbfd] px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">
                                {/* Animated circular outlines */}

                                <div
                                    aria-hidden="true"
                                    className="why-orbits pointer-events-none absolute -right-32 -top-40 -z-10 h-[440px] w-[440px] sm:-right-24 sm:-top-48 sm:h-[590px] sm:w-[590px]"
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((ring) => (
                                        <motion.div
                                            key={ring}
                                            className="absolute rounded-full border border-[#b9def5]/75"
                                            style={{
                                                inset: `${ring * 24}px`,
                                            }}
                                            animate={
                                                reduceMotion
                                                    ? undefined
                                                    : {
                                                        scale: [1, 1.015, 1],
                                                        opacity: [0.45, 0.9, 0.45],
                                                    }
                                            }
                                            transition={{
                                                duration: 5 + ring * 0.65,
                                                delay: ring * 0.18,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="grid items-center gap-9 lg:grid-cols-[1.2fr_0.95fr] lg:gap-12">
                                    {/* LEFT CONTENT */}

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, x: -22 }
                                        }
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: reduceMotion ? 0 : 0.08,
                                        }}
                                    >
                                        <div className="mb-5 flex items-center gap-2.5">
                                            <span className="h-px w-7 bg-[#2780c3]" />

                                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2780c3] sm:text-[11px]">
                                                One coordinated view of what comes next.
                                            </span>
                                        </div>

                                        <h2
                                            id="why-modal-title"
                                            className="max-w-[620px] font-serif text-[36px] font-bold leading-[1.1] tracking-[-0.035em] text-[#0c2854] sm:text-[44px] lg:text-[48px]"
                                        >
                                            Why 2Morrow exists
                                        </h2>

                                        <p className="mt-5 max-w-[550px] text-[13px] leading-[1.85] text-[#70839b] sm:text-[14px]">
                                            A credible company page explaining the
                                            life-project positioning, operating model,
                                            standards and limitations without inflated claims.
                                        </p>

                                        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                                            <motion.button
                                                type="button"
                                                onClick={onStartProject}
                                                whileHover={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            y: -3,
                                                            boxShadow:
                                                                "0 12px 28px rgba(39,128,195,0.25)",
                                                        }
                                                }
                                                whileTap={
                                                    reduceMotion
                                                        ? undefined
                                                        : { scale: 0.97 }
                                                }
                                                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2780c3] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#176ba9]"
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
                                                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#2780c3] bg-white px-6 py-3 text-[13px] font-semibold text-[#2780c3] transition-colors hover:bg-[#edf7fc]"
                                            >
                                                Talk to 2Morrow

                                                <ArrowUpRight size={15} />
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    {/* RIGHT DECISION CARD */}

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, x: 20, y: 8 }
                                        }
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.65,
                                            delay: reduceMotion ? 0 : 0.16,
                                        }}
                                        className="relative"
                                    >
                                        <motion.div
                                            whileHover={
                                                reduceMotion ? undefined : { y: -4 }
                                            }
                                            className="relative overflow-hidden rounded-[25px] border border-[#dceaf3] bg-[#eef7fc] px-5 py-10 sm:px-8 sm:py-11"
                                        >
                                            <motion.div
                                                aria-hidden="true"
                                                className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#c4e2f4]"
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : { rotate: 360 }
                                                }
                                                transition={{
                                                    duration: 38,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />

                                            <motion.div
                                                aria-hidden="true"
                                                className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#c4e2f4]"
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : { rotate: -360 }
                                                }
                                                transition={{
                                                    duration: 28,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />

                                            <div className="relative">
                                                <div className="mb-3 flex items-center justify-center gap-2">
                                                    <Sparkles
                                                        size={13}
                                                        className="text-[#13a779]"
                                                    />

                                                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#13a779]">
                                                        Your decision journey
                                                    </span>
                                                </div>

                                                <h3 className="text-center font-serif text-[28px] font-bold leading-[1.25] tracking-[-0.025em] text-[#0c2854] sm:text-[31px]">
                                                    Life first.
                                                    <br />
                                                    Property in context.
                                                </h3>

                                                <div className="my-7 h-px bg-gradient-to-r from-transparent via-[#c9e1f0] to-transparent" />

                                                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[9px] font-bold uppercase tracking-[0.05em] text-[#2780c3] sm:text-[10px]">
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

                                        {/* Floating outline */}

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
                                                duration: 0.65,
                                                delay: 0.3,
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </section>

                            {/* CONTENT SECTIONS */}

                            <div id="why-2morrow-sections">
                                {sections.map((section, index) => (
                                    <motion.section
                                        key={section.number}
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, y: 20 }
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
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className={`why-section grid gap-5 px-6 py-7 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-5 sm:px-10 sm:py-8 lg:grid-cols-[32px_minmax(0,1.3fr)_minmax(300px,1fr)] lg:items-center lg:gap-6 lg:px-12 ${index % 2 === 1
                                            ? "bg-[#eef8fc]"
                                            : "bg-white"
                                            }`}
                                    >
                                        {/* NUMBER */}

                                        <span className="pt-0.5 font-serif text-[13px] font-bold tracking-wide text-[#13aa7b]">
                                            {section.number}
                                        </span>

                                        {/* TITLE AND DESCRIPTION */}

                                        <div>
                                            <h3 className="font-serif text-[21px] font-bold leading-tight tracking-[-0.02em] text-[#0c2854] sm:text-[23px]">
                                                {section.title}
                                            </h3>

                                            <p className="mt-2 max-w-[560px] text-[12px] leading-[1.8] text-[#71839a] sm:text-[13px]">
                                                {section.description}
                                            </p>
                                        </div>

                                        {/* ACTION CARDS */}

                                        <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                                            {section.links.map((label, linkIndex) => (
                                                <motion.button
                                                    key={label}
                                                    type="button"
                                                    onClick={() => handleAction(label)}
                                                    initial={
                                                        reduceMotion
                                                            ? false
                                                            : { opacity: 0, x: 12 }
                                                    }
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    viewport={{ once: true }}
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
                                                    className="why-action group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-[#dce9f2] bg-white px-3.5 py-3 text-left text-[11px] font-medium text-[#263d5c] sm:px-4"
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

                            {/* TRUST FOOTER */}

                            <footer className="flex flex-col gap-4 border-t border-[#e5eef4] bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf8f2] text-[#13a779]">
                                        <ShieldCheck size={19} />
                                    </div>

                                    <div>
                                        <p className="text-[12px] font-semibold text-[#18355b]">
                                            Clear roles. Informed decisions.
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-[#7b8ba0]">
                                            A coordinated journey built around your interests.
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

                        {/* ANIMATED BOTTOM ACCENT */}

                        <div className="relative h-[3px] shrink-0 overflow-hidden bg-[#edf4f8]">
                            <motion.div
                                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#2780c3] via-[#21a9df] to-[#13aa7b]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    duration: reduceMotion ? 0.01 : 1.1,
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