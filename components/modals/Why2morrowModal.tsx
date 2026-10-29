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
    CheckCircle2,
    Compass,
    Globe2,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";

interface Why2morrowModalProps {
    open: boolean;
    onClose: () => void;
    onStartProject?: () => void;
    onContact?: () => void;
    onAction?: (label: string) => void;
}

interface CompanySection {
    number: string;
    title: string;
    description: string;
    links: string[];
}

const companySections: CompanySection[] = [
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
        y: 32,
        scale: 0.975,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
            staggerChildren: 0.07,
            when: "beforeChildren" as const,
        },
    },
    exit: {
        opacity: 0,
        y: 18,
        scale: 0.99,
        filter: "blur(4px)",
        transition: {
            duration: 0.22,
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
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

function CompanyAction({
    label,
    onClick,
    reduceMotion,
}: {
    label: string;
    onClick: () => void;
    reduceMotion: boolean;
}) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
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
                reduceMotion ? undefined : { scale: 0.98 }
            }
            transition={{
                duration: 0.22,
                ease: "easeOut",
            }}
            className="company-action group relative flex min-h-[44px] w-full items-center justify-between overflow-hidden rounded-xl border border-[#dfebf3] bg-white px-3.5 py-3 text-left text-[12px] font-medium text-[#263d5c] sm:px-4"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[#eaf5fc] transition-[width] duration-300 ease-out group-hover:w-full"
            />

            <span className="relative z-10 flex items-center gap-2.5">
                <ArrowRight
                    size={13}
                    strokeWidth={1.8}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />

                <span>{label}</span>
            </span>

            <ArrowUpRight
                size={14}
                className="relative z-10 shrink-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
        </motion.button>
    );
}

export default function Why2morrowModal({
    open,
    onClose,
    onStartProject,
    onContact,
    onAction,
}: Why2morrowModalProps) {
    const reduceMotion = useReducedMotion() ?? false;

    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement as HTMLElement | null;

        document.body.style.overflow = "hidden";

        const focusTimer = window.setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 50);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !modalRef.current) return;

            const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

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
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
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
        switch (label) {
            case "Start project":
                onStartProject?.();
                return;

            case "Contact":
                onContact?.();
                return;

            default:
                onAction?.(label);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="why-2morrow-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.01 : 0.28,
                    }}
                    onMouseDown={handleBackdropClick}
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-[#061a30]/55 p-0 backdrop-blur-md sm:p-4 lg:p-6"
                >
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="why-2morrow-title"
                        variants={reduceMotion ? undefined : modalVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        exit="exit"
                        className="company-modal relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[0_30px_100px_rgba(4,26,52,0.25)] sm:h-auto sm:max-h-[94dvh] sm:max-w-[1120px] sm:rounded-[26px]"
                    >
                        {/* TOP BAR */}
                        <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#e8f0f5] bg-white/95 px-5 py-3.5 backdrop-blur-xl sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf7fc] text-[#2780c3]">
                                    <Compass size={18} />
                                </div>

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#2780c3]">
                                        2Morrow
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#7b8ca1]">
                                        Our company &amp; approach
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                ref={closeButtonRef}
                                type="button"
                                onClick={onClose}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { rotate: 90, scale: 1.05 }
                                }
                                whileTap={
                                    reduceMotion ? undefined : { scale: 0.92 }
                                }
                                aria-label="Close company overview"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0eaf2] text-[#17345b] transition-colors hover:bg-[#edf7fc]"
                            >
                                <X size={18} />
                            </motion.button>
                        </header>

                        {/* SCROLLABLE CONTENT */}
                        <div className="company-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {/* HERO SECTION */}
                            <section className="company-hero relative isolate overflow-hidden bg-[#f7fbfd] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                                {/* Animated concentric circles */}
                                <div
                                    aria-hidden="true"
                                    className="company-rings pointer-events-none absolute -right-32 -top-36 -z-10 h-[440px] w-[440px] sm:-right-24 sm:-top-40 sm:h-[570px] sm:w-[570px]"
                                >
                                    {[0, 1, 2, 3, 4, 5].map((ring) => (
                                        <motion.div
                                            key={ring}
                                            className="absolute rounded-full border border-[#b9def5]/70"
                                            style={{
                                                inset: `${ring * 26}px`,
                                            }}
                                            animate={
                                                reduceMotion
                                                    ? undefined
                                                    : {
                                                        scale: [1, 1.018, 1],
                                                        opacity: [0.48, 0.9, 0.48],
                                                    }
                                            }
                                            transition={{
                                                duration: 5 + ring * 0.8,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: ring * 0.3,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="grid items-center gap-9 lg:grid-cols-[1.18fr_0.92fr] lg:gap-10">
                                    {/* Hero copy */}
                                    <motion.div variants={revealVariants}>
                                        <div className="mb-5 flex items-center gap-2.5">
                                            <span className="h-px w-7 bg-[#2780c3]" />

                                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2780c3] sm:text-[11px]">
                                                One coordinated view of what comes next.
                                            </span>
                                        </div>

                                        <h2
                                            id="why-2morrow-title"
                                            className="max-w-[580px] font-serif text-[36px] font-bold leading-[1.1] tracking-[-0.035em] text-[#0c2854] sm:text-[45px] lg:text-[49px]"
                                        >
                                            Why 2Morrow exists
                                        </h2>

                                        <p className="mt-5 max-w-[550px] text-[13px] leading-[1.9] text-[#70839b] sm:text-[14px]">
                                            A credible company page explaining the life-project
                                            positioning, operating model, standards and
                                            limitations without inflated claims.
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
                                                                "0 12px 28px rgba(39,128,195,0.22)",
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

                                    {/* Decision journey card */}
                                    <motion.div
                                        variants={revealVariants}
                                        className="relative"
                                    >
                                        <motion.div
                                            whileHover={
                                                reduceMotion ? undefined : { y: -4 }
                                            }
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
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
                                                    duration: 26,
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
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.3,
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </section>

                            {/* COMPANY INFORMATION SECTIONS */}
                            <div id="why-2morrow-sections">
                                {companySections.map((section, sectionIndex) => (
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
                                            delay: reduceMotion
                                                ? 0
                                                : (sectionIndex % 2) * 0.06,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className={`company-section grid gap-5 px-6 py-7 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-5 sm:px-10 sm:py-8 lg:grid-cols-[32px_minmax(0,1.3fr)_minmax(300px,1fr)] lg:items-center lg:gap-6 lg:px-12 ${sectionIndex % 2 === 1
                                            ? "bg-[#eef8fc]"
                                            : "bg-white"
                                            }`}
                                    >
                                        {/* Number */}
                                        <span className="pt-0.5 font-serif text-[13px] font-bold tracking-wide text-[#13aa7b]">
                                            {section.number}
                                        </span>

                                        {/* Heading and description */}
                                        <div>
                                            <h3 className="font-serif text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#0c2854] sm:text-[24px]">
                                                {section.title}
                                            </h3>

                                            <p className="mt-2 max-w-[550px] text-[12px] leading-[1.8] text-[#71839a] sm:text-[13px]">
                                                {section.description}
                                            </p>
                                        </div>

                                        {/* Action links */}
                                        <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                                            {section.links.map((label, linkIndex) => (
                                                <motion.div
                                                    key={label}
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
                                                    transition={{
                                                        duration: 0.35,
                                                        delay: reduceMotion
                                                            ? 0
                                                            : linkIndex * 0.055,
                                                    }}
                                                >
                                                    <CompanyAction
                                                        label={label}
                                                        reduceMotion={reduceMotion}
                                                        onClick={() => handleAction(label)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                ))}
                            </div>

                            {/* TRUST AND STANDARDS STRIP */}
                            <motion.footer
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, y: 14 }
                                }
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                className="flex flex-col gap-4 border-t border-[#e5eef4] bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf8f2] text-[#16a779]">
                                        <ShieldCheck size={19} />
                                    </div>

                                    <div>
                                        <p className="text-[12px] font-semibold text-[#18355b]">
                                            Clarity before commitment
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-[#7b8ba0]">
                                            Transparent information. Clear responsibilities.
                                            Human support.
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
                            </motion.footer>
                        </div>

                        {/* Bottom decorative progress line */}
                        <div
                            aria-hidden="true"
                            className="relative h-[3px] shrink-0 overflow-hidden bg-[#edf4f8]"
                        >
                            <motion.div
                                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#2780c3] via-[#21a9df] to-[#16a779]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
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