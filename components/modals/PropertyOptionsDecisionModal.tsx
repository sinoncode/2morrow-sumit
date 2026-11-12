"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Compass,
  Globe2,
  Home,
  Info,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";

export interface PropertyDecisionAnswers {
  property_type: string;
  country_code: string;
  location_text: string;
  current_use: string;
  future_role: string[];
  ownership_preference: string;
  capital_need: string;
  timing: string;
  mortgage_status: string;
  property_potential: string[];
  next_chapter: string[];
}

interface PropertyDecisionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (answers: PropertyDecisionAnswers) => void | Promise<void>;
  /** Optional image URL for the visual panel. A gradient fallback is always available. */
  imageUrl?: string;
}

type Choice = {
  label: string;
  value: string;
  description?: string;
};

type Question = {
  code: keyof PropertyDecisionAnswers;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  type: "single" | "multi" | "location";
  options?: Choice[];
  max?: number;
};

const questions: Question[] = [
  {
    code: "property_type",
    number: "01",
    eyebrow: "Your property",
    title: "What type of property do you currently own?",
    description: "Let's start by understanding the property at the centre of your next decision.",
    type: "single",
    options: [
      { label: "House", value: "house", description: "A standalone or family home" },
      { label: "Apartment", value: "apartment", description: "A flat or condominium" },
      { label: "Investment property", value: "investment_property", description: "A property held primarily as an investment" },
      { label: "Land / plot", value: "land", description: "Land or an undeveloped plot" },
      { label: "Mixed-use or other", value: "other", description: "A mixed-use or another property type" },
    ],
  },
  {
    code: "country_code",
    number: "02",
    eyebrow: "Where it is",
    title: "Where is the property located?",
    description: "Your country and city or region help us understand the relevant local context.",
    type: "location",
  },
  {
    code: "current_use",
    number: "03",
    eyebrow: "Today",
    title: "How is the property used today?",
    description: "This helps distinguish between a home, an income-producing asset and an unused property.",
    type: "single",
    options: [
      { label: "My main home", value: "main_home" },
      { label: "Second home", value: "second_home" },
      { label: "Rented to tenants", value: "rented" },
      { label: "Vacant", value: "vacant" },
      { label: "Land / development asset", value: "development_asset" },
      { label: "Other", value: "other" },
    ],
  },
  {
    code: "future_role",
    number: "04",
    eyebrow: "What comes next",
    title: "What do you want this property to make possible next?",
    description: "Choose up to three outcomes. This is the most important question for shaping your possible scenarios.",
    type: "multi",
    max: 3,
    options: [
      { label: "Release capital", value: "release_capital", description: "Unlock value tied up in the property" },
      { label: "Generate income", value: "generate_income", description: "Create or strengthen regular income" },
      { label: "Keep a secure base", value: "keep_base", description: "Retain a place to return to" },
      { label: "Create more value", value: "create_value", description: "Improve, develop or reposition the asset" },
      { label: "Increase financial flexibility", value: "financial_flexibility", description: "Keep more options open" },
      { label: "Not sure yet", value: "not_sure" },
    ],
  },
  {
    code: "ownership_preference",
    number: "05",
    eyebrow: "Your preference",
    title: "How important is it for you to keep ownership of this property?",
    description: "There is no right answer. Your preference matters and helps us avoid assuming that selling is the best route.",
    type: "single",
    options: [
      { label: "Very important", value: "must_keep" },
      { label: "Prefer to keep it if practical", value: "prefer_keep" },
      { label: "Open to either keeping or selling", value: "open" },
      { label: "Prefer to sell", value: "prefer_sell" },
      { label: "I expect to sell", value: "must_sell" },
      { label: "Not sure yet", value: "not_sure" },
    ],
  },
  {
    code: "capital_need",
    number: "06",
    eyebrow: "Financial direction",
    title: "Do you need money from this property to finance your next chapter?",
    description: "This helps us understand whether releasing capital, refinancing or generating income may be relevant.",
    type: "single",
    options: [
      { label: "Yes, most of the capital", value: "high" },
      { label: "Yes, part of the capital", value: "medium" },
      { label: "Possibly", value: "possible" },
      { label: "No", value: "none" },
      { label: "Not sure yet", value: "not_sure" },
    ],
  },
  {
    code: "timing",
    number: "07",
    eyebrow: "Your timeline",
    title: "When do you expect your next chapter to begin?",
    description: "Your timing helps us understand urgency and the amount of room available to plan.",
    type: "single",
    options: [
      { label: "Within 6 months", value: "0_6m" },
      { label: "6 to 12 months", value: "6_12m" },
      { label: "1 to 2 years", value: "1_2y" },
      { label: "More than 2 years", value: "2y_plus" },
      { label: "No fixed date yet", value: "unknown" },
    ],
  },
  {
    code: "mortgage_status",
    number: "08",
    eyebrow: "Current financing",
    title: "What is your current financing situation?",
    description: "A high-level indication is enough. This question does not provide financial advice.",
    type: "single",
    options: [
      { label: "No mortgage", value: "none" },
      { label: "Mortgage with comfortable affordability", value: "mortgage_comfortable" },
      { label: "Mortgage with limited flexibility", value: "mortgage_tight" },
      { label: "Mortgage renewal or refinancing coming soon", value: "renewal_due" },
      { label: "I do not know the details yet", value: "unknown" },
    ],
  },
  {
    code: "property_potential",
    number: "09",
    eyebrow: "Potential",
    title: "Does the property have any obvious improvement or development potential?",
    description: "Select all that apply. If you are unsure, that is useful for us to know too.",
    type: "multi",
    options: [
      { label: "Renovation / upgrading", value: "renovation" },
      { label: "Extension / conversion", value: "extension" },
      { label: "Additional unit(s)", value: "additional_units" },
      { label: "Land development / densification", value: "development" },
      { label: "No obvious potential", value: "none" },
      { label: "I do not know", value: "unknown" },
    ],
  },
  {
    code: "next_chapter",
    number: "10",
    eyebrow: "Your next chapter",
    title: "What are you planning for your next chapter?",
    description: "Choose up to three possibilities. You can still be exploring or leave more than one path open.",
    type: "multi",
    max: 3,
    options: [
      { label: "Buy a home abroad", value: "buy_abroad" },
      { label: "Rent abroad first", value: "rent_abroad" },
      { label: "Retire or spend more time abroad", value: "retire_abroad" },
      { label: "Invest in another property", value: "invest" },
      { label: "Keep flexibility between countries", value: "multi_country" },
      { label: "Return may remain possible", value: "return_possible" },
      { label: "I am still exploring", value: "exploring" },
    ],
  },
];

const initialAnswers: PropertyDecisionAnswers = {
  property_type: "",
  country_code: "",
  location_text: "",
  current_use: "",
  future_role: [],
  ownership_preference: "",
  capital_need: "",
  timing: "",
  mortgage_status: "",
  property_potential: [],
  next_chapter: [],
};

const panelCopy = [
  "Every property has a different role. Let's understand yours before exploring the possibilities.",
  "Local context matters. We'll use the location to guide the right market and professional considerations.",
  "A clear picture of today makes it easier to consider what could work tomorrow.",
  "Your priorities guide the scenarios we explore. There is no need to have every answer figured out.",
  "Your relationship with the property is part of the decision—not just the numbers.",
  "Understand the role capital may need to play in your plans.",
  "A realistic timeline helps turn possibilities into a practical next step.",
  "A simple overview of your financing helps frame the options to explore.",
  "Potential can be worth investigating, even when it is not yet clear what is possible.",
  "Bring your property decision and your future plans together.",
];

function isMultiValue(value: unknown): value is string[] {
  return Array.isArray(value);
}

export default function PropertyOptionsDecisionModal({
  open,
  onClose,
  onSubmit,
  imageUrl,
}: PropertyDecisionModalProps) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PropertyDecisionAnswers>(initialAnswers);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, submitting]);

  const selectedValue = answers[current.code];

  const canContinue = useMemo(() => {
    if (current.type === "location") {
      return Boolean(answers.country_code.trim() && answers.location_text.trim());
    }
    if (current.type === "multi") {
      return isMultiValue(selectedValue) && selectedValue.length > 0;
    }
    return typeof selectedValue === "string" && selectedValue.length > 0;
  }, [answers.country_code, answers.location_text, current.code, current.type, selectedValue]);

  const updateSingle = (value: string) => {
    setAnswers((previous) => ({ ...previous, [current.code]: value }));
    setError("");
  };

  const toggleMulti = (value: string) => {
    setAnswers((previous) => {
      const existing = previous[current.code];
      if (!Array.isArray(existing)) return previous;

      const alreadySelected = existing.includes(value);
      if (alreadySelected) {
        return { ...previous, [current.code]: existing.filter((item) => item !== value) };
      }

      if (current.max && existing.length >= current.max) {
        setError(`You can select up to ${current.max} options.`);
        return previous;
      }

      // "None" / "not sure" choices should not be combined with specific options.
      const exclusiveValues = ["none", "unknown", "not_sure", "exploring"];
      const isExclusive = exclusiveValues.includes(value);
      const next = isExclusive
        ? [value]
        : existing.filter((item) => !exclusiveValues.includes(item)).concat(value);

      setError("");
      return { ...previous, [current.code]: next };
    });
  };

  const goNext = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!canContinue) {
      setError(
        current.type === "location"
          ? "Please enter both the country and the city or region."
          : "Please select an answer to continue.",
      );
      return;
    }
    setError("");

    if (step < questions.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    if (!onSubmit) {
      setError("Submission is not connected yet. Please try again later.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(answers);
      onClose();
    } catch {
      setError("We couldn't submit your answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setError("");
    setStep((value) => Math.max(0, value - 1));
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#061a30]/55 p-0 backdrop-blur-md sm:p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !submitting) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[100dvh] w-full max-w-[1120px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:h-[min(820px,92dvh)] sm:rounded-[26px]"
          >
            {/* Visual panel */}
            <aside className="relative hidden w-[34%] shrink-0 overflow-hidden bg-[#0c2854] text-white md:flex md:flex-col md:justify-between">
              <img
                src={imageUrl || "/images/property.png"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[25%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#061a30]/85 via-[#061a30]/35 to-[#061a30]/100" />
              <div className="relative z-10 flex items-center gap-2.5 px-8 pt-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md">
                  <Compass size={19} />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em]">2morrow</p>
                  <p className="mt-0.5 text-[11px] text-white/65">Property options</p>
                </div>
              </div>

              <div className="relative z-10 px-8 pb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md">
                  {step === 1 ? <MapPin size={21} /> : step === 9 ? <Globe2 size={21} /> : <Home size={21} />}
                </div>
                <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-[#aed6f1]">
                  Question {current.number} / 10
                </p>
                <h2 className="max-w-[340px] font-serif text-[32px] font-semibold leading-[1.12] tracking-[-0.03em]">
                  {current.eyebrow === "Your next chapter"
                    ? "A new chapter starts with a clear picture."
                    : "Your property. Your possibilities."}
                </h2>
                <p className="mt-4 max-w-[330px] text-[13px] leading-6 text-white/75">
                  {panelCopy[step]}
                </p>

                <div className="mt-8 rounded-2xl border border-white/20 bg-white/[0.09] p-4 backdrop-blur-lg">
                  <div className="mb-3 flex items-center justify-between text-[10px] text-white/65">
                    <span>Your progress</span>
                    <span>{step + 1} of 10</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                    <motion.div
                      className="h-full rounded-full bg-[#5dade2]"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-white/75">
                    <ShieldCheck size={14} className="text-[#aed6f1]" />
                    Your information is treated confidentially.
                  </div>
                </div>
              </div>
            </aside>

            {/* Form panel */}
            <main className="flex min-w-0 flex-1 flex-col">
              <header className="flex shrink-0 items-center justify-between border-b border-[#e9f0f5] px-5 py-4 sm:px-8 sm:py-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#75849a]">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf5fc] text-[#2780c3] md:hidden">
                    <Compass size={15} />
                  </span>
                  <span className="text-[#2780c3]">2morrow</span>
                  <span className="text-[#b3bfd0]">/</span>
                  <span>Property options decision engine</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  aria-label="Close questionnaire"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1eaf2] bg-white text-[#203b60] shadow-[0_4px_14px_rgba(12,40,84,.08)] transition hover:bg-[#eff7fc] disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="h-1 shrink-0 bg-[#f0f6fa] md:hidden">
                <motion.div className="h-full bg-[#2780c3]" animate={{ width: `${progress}%` }} />
              </div>

              <form onSubmit={goNext} className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.code}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
                      className="mx-auto w-full max-w-[700px]"
                    >
                      <div className="mb-6 flex items-center gap-2">
                        <span className="h-px w-7 bg-[#2780c3]" />
                        <span className="text-[10px] font-bold tracking-[0.18em] text-[#2780c3]">
                          {current.eyebrow}
                        </span>
                        <span className="ml-auto text-[11px] font-medium text-[#9aa69e]">
                          {current.number} / 10
                        </span>
                      </div>

                      <h1
                        id="property-modal-title"
                        className="max-w-[620px] font-serif text-[29px] font-semibold leading-[1.16] tracking-[-0.035em] text-[#0c2854] sm:text-[36px]"
                      >
                        {current.title}
                      </h1>
                      <p className="mt-3 max-w-[610px] text-[13px] leading-6 text-[#73849a] sm:text-[14px]">
                        {current.description}
                      </p>

                      {current.type === "location" ? (
                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-[12px] font-semibold text-[#263e5c]">Country <span className="text-[#2780c3]">*</span></span>
                            <div className="relative">
                              <Globe2 size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8190a3]" />
                              <input
                                value={answers.country_code}
                                onChange={(event) => setAnswers((previous) => ({ ...previous, country_code: event.target.value }))}
                                placeholder="e.g. Switzerland"
                                autoComplete="country-name"
                                className="h-[52px] w-full rounded-xl border border-[#dfeaf2] bg-[#f8fbfd] pl-11 pr-4 text-[13px] text-[#203b60] outline-none transition placeholder:text-[#9aaabd] focus:border-[#5dade2] focus:bg-white focus:ring-4 focus:ring-[#2780c3]/[0.1]"
                              />
                            </div>
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-[12px] font-semibold text-[#263e5c]">City / region <span className="text-[#2780c3]">*</span></span>
                            <div className="relative">
                              <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8190a3]" />
                              <input
                                value={answers.location_text}
                                onChange={(event) => setAnswers((previous) => ({ ...previous, location_text: event.target.value }))}
                                placeholder="e.g. Zurich, Vaud"
                                autoComplete="address-level2"
                                className="h-[52px] w-full rounded-xl border border-[#dfeaf2] bg-[#f8fbfd] pl-11 pr-4 text-[13px] text-[#203b60] outline-none transition placeholder:text-[#9aaabd] focus:border-[#5dade2] focus:bg-white focus:ring-4 focus:ring-[#2780c3]/[0.1]"
                              />
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {current.options?.map((option, index) => {
                            const selected = current.type === "multi"
                              ? isMultiValue(selectedValue) && selectedValue.includes(option.value)
                              : selectedValue === option.value;

                            return (
                              <motion.button
                                key={option.value}
                                type="button"
                                onClick={() => current.type === "multi" ? toggleMulti(option.value) : updateSingle(option.value)}
                                whileHover={reduceMotion ? undefined : { y: -2 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                                transition={{ duration: 0.18 }}
                                aria-pressed={selected}
                                className={`group flex min-h-[68px] w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                                  selected
                                    ? "border-[#5dade2] bg-[#eff7fc] shadow-[0_4px_14px_rgba(39,128,195,.08)]"
                                    : "border-[#e1eaf2] bg-white hover:border-[#aed6f1] hover:bg-[#f8fbfd]"
                                }`}
                              >
                                <span className={`mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border transition ${
                                  selected ? "border-[#2780c3] bg-[#2780c3] text-white" : "border-[#cbd8e3] bg-white text-transparent group-hover:border-[#5dade2]"
                                }`}>
                                  {selected ? <Check size={12} strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-transparent" />}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[13px] font-semibold leading-5 text-[#203b60]">{option.label}</span>
                                  {option.description && <span className="mt-1 block text-[11px] leading-[1.5] text-[#75859a]">{option.description}</span>}
                                </span>
                                {selected && <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2780c3]" />}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {current.type === "multi" && (
                        <p className="mt-4 flex items-center gap-2 text-[11px] text-[#75859a]">
                          <Info size={14} className="shrink-0 text-[#2780c3]" />
                          {current.max ? `Select up to ${current.max} options.` : "Select all options that apply."}
                          {isMultiValue(selectedValue) && <span className="font-semibold text-[#2780c3]">{selectedValue.length} selected</span>}
                        </p>
                      )}

                      {error && (
                        <p role="alert" className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">
                          {error}
                        </p>
                      )}

                      <div className="mt-7 flex items-start gap-2 rounded-xl bg-[#f6fbfe] px-4 py-3 text-[11px] leading-5 text-[#75859a]">
                        <CircleHelp size={15} className="mt-0.5 shrink-0 text-[#2780c3]" />
                        <span>Your answers help us identify relevant scenarios for discussion. They do not constitute financial, legal or tax advice.</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <footer className="flex shrink-0 flex-col gap-3 border-t border-[#e9f0f5] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={step === 0 || submitting}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e1eaf2] px-4 text-[12px] font-semibold text-[#314b63] transition hover:border-[#aed6f1] hover:bg-[#eff7fc] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ArrowLeft size={14} />
                      Previous
                    </button>
                    <span className="px-1 text-[11px] text-[#9aaabd]">{step + 1} of 10</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2780c3] to-[#1a5276] px-6 text-[13px] font-semibold text-white shadow-[0_7px_18px_rgba(39,128,195,.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(39,128,195,.27)] disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : step === questions.length - 1 ? "Submit your answers" : "Continue"}
                    {!submitting && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowRight size={14} /></span>}
                  </button>
                </footer>
              </form>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
