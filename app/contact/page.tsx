"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, FormEvent, ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
  Home,
  Key,
  Lock,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Plus,
  Search,
  Send,
  Shield,
  ShieldCheck,
  ThumbsUp,
  Users,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Images (swap for your own assets)                                          */
/* -------------------------------------------------------------------------- */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const IMG = {
  hero: u("photo-1534445867742-43195f401b6c", 2000),
  town: u("photo-1523906834658-6e24ef2386f9", 1200),
  cta: u("photo-1516483638261-f4dbaf036963", 2000),
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const processStrip: { icon: IconType; title: string; text: string }[] = [
  { icon: Search, title: "Your request", text: "Share what you are looking for." },
  { icon: Users, title: "Right specialist", text: "We connect you with the right expert." },
  { icon: FileText, title: "Coordinated next step", text: "We confirm and arrange the next step." },
];

const helpCards: { icon: IconType; title: string; text: string; value: string }[] = [
  { icon: Globe, title: "Moving abroad", text: "Plan your move with confidence.", value: "Moving abroad" },
  { icon: Home, title: "Buying or renting", text: "Find your ideal property abroad.", value: "Buying or renting" },
  { icon: Key, title: "Selling or managing my current property", text: "Get expert advice and support.", value: "Selling or managing my current property" },
  { icon: BarChart3, title: "Investing", text: "Explore investment opportunities.", value: "Investing" },
  { icon: Users, title: "Relocation support", text: "Practical help for a smooth transition.", value: "Relocation support" },
  { icon: ThumbsUp, title: "Professional partnership", text: "Explore collaboration opportunities.", value: "Professional partnership" },
];

const requestTypes = helpCards.map((c) => c.value);

const countries = [
  "Switzerland", "Italy", "France", "Spain", "Portugal", "Greece", "Germany",
  "United Kingdom", "United States", "United Arab Emirates", "Other",
];
const languages = ["English", "French", "German", "Italian", "Spanish", "Portuguese"];
const contactMethods = ["Email", "Phone", "WhatsApp", "Video call"];
const contactTimes = ["Morning", "Afternoon", "Evening", "No preference"];

const formSteps = [
  { title: "You send your request", text: "Tell us where you are today and what you are considering." },
  { title: "We route it to the right specialist", text: "Your request is carefully matched with the most relevant 2Morrow expert." },
  { title: "You receive a personal response", text: "We get back to you, usually within one business day." },
];

const expertise: { icon: IconType; title: string; text: string }[] = [
  { icon: Home, title: "Property search & acquisition", text: "Find and secure your ideal home abroad." },
  { icon: FileText, title: "Sales & property management", text: "Sell or manage your property with confidence." },
  { icon: Package, title: "Investment opportunities", text: "Access selected opportunities in prime locations." },
  { icon: Users, title: "Relocation support", text: "Make your move smoother with practical guidance." },
  { icon: Shield, title: "Legal & administrative guidance", text: "Navigate local requirements with trusted partners." },
  { icon: AlertTriangle, title: "Long-term life planning", text: "Build a future that fits your personal and professional goals." },
];

const nextSteps = [
  { title: "We confirm your request.", text: "We review your information and make sure we understand your goals." },
  { title: "We route it to the right specialist.", text: "Your request is matched with the most relevant expert." },
  { title: "We get back to you.", text: "You will usually hear from us within one business day." },
];

const trust: { icon: IconType; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Your data is safe", text: "We keep your information private and secure." },
  { icon: Users, title: "Locally coordinated expertise", text: "You benefit from on-the-ground knowledge and a global network." },
  { icon: Zap, title: "Fast and personal response", text: "We usually get back to you within one business day." },
];

const directContacts: {
  icon: IconType;
  tint: string;
  title: string;
  text: string;
  cta: string;
  href: string;
}[] = [
  { icon: MessageCircle, tint: "bg-emerald-100 text-emerald-600", title: "WhatsApp", text: "Chat with our team directly on WhatsApp.", cta: "Open WhatsApp", href: "https://wa.me/" },
  { icon: Mail, tint: "bg-rose-100 text-rose-600", title: "Email", text: "Send us an email and we'll get back to you.", cta: "Send an Email", href: "mailto:hello@2morrow.com" },
  { icon: Phone, tint: "bg-green-100 text-green-600", title: "Telephone", text: "Speak with our team during business hours.", cta: "View Number", href: "tel:+41000000000" },
  { icon: CalendarDays, tint: "bg-sky-100 text-sky-700", title: "Book a conversation", text: "Schedule a first conversation with our team.", cta: "Book a Call", href: "#contact-form" },
];

const faqs = [
  { q: "Who can become a 2Morrow Angel?", a: "Angels are experienced local professionals who share our standards of service, independence and market knowledge. Each one is introduced to us through a careful selection process." },
  { q: "How are Angels selected and verified?", a: "We review each Angel's background, credentials, references and local track record before they join the network, and we continue to review their work over time." },
  { q: "Is there a cost to speak with an Angel?", a: "Your first conversation is an introduction to understand your goals. Any later services are explained clearly, with costs agreed before work begins." },
  { q: "Can I speak with an Angel before I choose a destination?", a: "Yes. Many people start with questions rather than a decision. An Angel can help you compare destinations and understand what matters locally." },
  { q: "Do Angels provide legal or financial advice?", a: "Angels provide practical guidance and coordination. Where legal, tax or financial advice is needed, we connect you with qualified independent professionals." },
  { q: "How does 2Morrow ensure independence?", a: "We are clear about how we work, disclose how professionals are involved, and keep your interests at the centre of every recommendation." },
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
  imgClassName = "",
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-sky-900 via-slate-800 to-amber-900/60 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.opacity = "0";
        }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="text-center">
      <h2
        className={`text-[24px] font-bold tracking-[-0.03em] text-slate-900 sm:text-[28px] ${className}`}
      >
        {children}
      </h2>
      <span className="mx-auto mt-3 block h-[2px] w-9 rounded-full bg-emerald-400" />
    </div>
  );
}

function scrollToForm() {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#06294f]">
        <div className="absolute inset-0 -z-20">
          <Photo
            src={IMG.hero}
            alt=""
            className="absolute inset-y-0 right-0 w-full md:w-[68%]"
            imgClassName="ct-kenburns"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06294f] via-[#06294f]/90 to-[#06294f]/20 md:via-[#06294f]/80" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#06294f]/50 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 md:pb-24 md:pt-28">
          <p className="ct-rise text-[9.5px] font-bold uppercase tracking-[0.22em] text-sky-200" style={{ animationDelay: "0ms" }}>
            Contact 2Morrow
          </p>
          <h1
            className="ct-rise mt-4 max-w-[480px] text-[38px] font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-[48px] md:text-[54px]"
            style={{ animationDelay: "120ms" }}
          >
            The right conversation starts here.
          </h1>
          <p
            className="ct-rise mt-5 max-w-[500px] text-[13.5px] leading-[1.65] text-sky-100/90"
            style={{ animationDelay: "240ms" }}
          >
            Tell us where you are today, where you may want to go and what you
            are considering. We will connect your request with the right
            2Morrow specialist.
          </p>

          <div className="ct-rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-500 px-6 text-[12.5px] font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400"
            >
              Tell Us About Your Project
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 px-6 text-[12.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#06294f]"
            >
              Book a First Conversation
            </button>
          </div>
        </div>
      </section>

      {/* Process strip */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ol className="flex flex-col gap-5 border-b border-slate-200 py-6 md:flex-row md:items-center md:justify-between md:gap-0">
            {processStrip.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex flex-1 items-center md:justify-center">
                <Reveal delay={i * 120} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-semibold text-slate-800">{title}</span>
                    <span className="block text-[10px] text-slate-400">{text}</span>
                  </span>
                </Reveal>
                {i < processStrip.length - 1 ? (
                  <ChevronRight className="ml-auto hidden h-3.5 w-3.5 text-slate-300 md:ml-8 md:block" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Small icon-tile card (used twice)                                          */
/* -------------------------------------------------------------------------- */

function TileCard({
  icon: Icon,
  title,
  text,
  selected = false,
  onClick,
}: {
  icon: IconType;
  title: string;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      {...(onClick ? { type: "button" as const, onClick, "aria-pressed": selected } : {})}
      className={`group flex h-full w-full flex-col items-center rounded-xl border bg-white px-4 py-6 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(11,29,51,0.12)] ${
        selected ? "border-sky-500 shadow-[0_14px_34px_rgba(2,132,199,0.18)]" : "border-slate-200"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white ${
          selected ? "bg-sky-600 text-white" : "bg-sky-50 text-slate-700"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </span>
      <span className="mt-3 text-[11.5px] font-semibold leading-snug text-slate-900">{title}</span>
      <span className="mt-1.5 text-[10px] leading-[1.5] text-slate-400">{text}</span>
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* What can we help you with                                                  */
/* -------------------------------------------------------------------------- */

function HelpSection({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle>What can we help you with?</SectionTitle>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[960px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {helpCards.map((card, i) => (
            <Reveal key={card.value} delay={i * 80}>
              <TileCard
                icon={card.icon}
                title={card.title}
                text={card.text}
                selected={selected === card.value}
                onClick={() => {
                  onSelect(card.value);
                  scrollToForm();
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

type FormState = {
  homeCountry: string;
  destination: string;
  requestType: string;
  language: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  contactTime: string;
  message: string;
  consent: boolean;
};

const emptyForm: FormState = {
  homeCountry: "",
  destination: "",
  requestType: "",
  language: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "",
  contactTime: "",
  message: "",
  consent: false,
};

const labelCls = "block text-[10px] font-semibold text-slate-600";
const fieldCls =
  "mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[11.5px] text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100";

function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldCls} appearance-none pr-9 ${value ? "" : "text-slate-400"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}

function TextField({
  label,
  required,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {required ? <span className="text-rose-500"> *</span> : null}
      </span>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        className={`${fieldCls} ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""}`}
      />
      {error ? <span className="ct-fade mt-1 block text-[10px] text-rose-500">{error}</span> : null}
    </label>
  );
}

function FormSection({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.consent) next.consent = "Please accept the privacy policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const subject = encodeURIComponent(`Contact request from ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent([
      `Home country: ${form.homeCountry || "Not specified"}`,
      `Destination: ${form.destination || "Not specified"}`,
      `Request type: ${form.requestType || "Not specified"}`,
      `Language: ${form.language || "Not specified"}`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not specified"}`,
      `Preferred contact method: ${form.contactMethod || "Not specified"}`,
      `Preferred time: ${form.contactTime || "Not specified"}`,
      "",
      "Message:",
      form.message || "No message provided.",
    ].join("\n"));

    window.location.href = `mailto:info@2morrow-re.ch?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus("sent"), 600);
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact-form" className="scroll-mt-4 bg-sky-50 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.6fr] lg:gap-14">
        {/* Left */}
        <div>
          <Reveal>
            <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-[30px]">
              Tell us a little about your project
            </h2>
            <span className="mt-3 block h-[2px] w-9 rounded-full bg-emerald-400" />
          </Reveal>

          <ol className="mt-7 space-y-5">
            {formSteps.map((step, i) => (
              <Reveal key={step.title} delay={100 + i * 110}>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-slate-800">
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] leading-[1.55] text-slate-500">
                      {step.text}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={450}>
            <div className="mt-7 flex gap-3 border-t border-sky-100 pt-6">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>
                <span className="block text-[11px] font-semibold text-slate-800">Your privacy matters</span>
                <span className="mt-0.5 block text-[10.5px] leading-[1.55] text-slate-500">
                  Your information is only used to handle your request and
                  will never be shared with third parties.
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: form card */}
        <Reveal from="right">
          <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(11,29,51,0.1)] sm:p-8">
            {status === "sent" ? (
              <div className="ct-fade flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="ct-pop flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </span>
                <h3 className="mt-5 text-[22px] font-bold tracking-[-0.03em] text-slate-900">
                  Thank you, {form.firstName}.
                </h3>
                <p className="mt-2 max-w-sm text-[12.5px] leading-[1.7] text-slate-500">
                  Your request has been recorded and routed to the right
                  2Morrow specialist. You will usually hear from us within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 rounded-full border border-slate-200 px-5 py-2 text-[12px] font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField label="Current or home country" placeholder="Select a country" options={countries} value={form.homeCountry} onChange={(v) => set("homeCountry", v)} />
                  <SelectField label="Destination country or countries" placeholder="Select a country or countries" options={countries} value={form.destination} onChange={(v) => set("destination", v)} />
                  <SelectField label="Type of request" placeholder="Select an option" options={requestTypes} value={form.requestType} onChange={(v) => set("requestType", v)} />
                  <SelectField label="Preferred language" placeholder="Select a language" options={languages} value={form.language} onChange={(v) => set("language", v)} />
                  <TextField label="First name" required placeholder="John" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} autoComplete="given-name" />
                  <TextField label="Last name" required placeholder="Doe" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} autoComplete="family-name" />
                  <TextField label="Email" required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
                  <TextField label="Phone" type="tel" placeholder="+1 234 567 890" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
                  <SelectField label="Preferred contact method" placeholder="Select an option" options={contactMethods} value={form.contactMethod} onChange={(v) => set("contactMethod", v)} />
                  <SelectField label="Preferred time" placeholder="Select an option" options={contactTimes} value={form.contactTime} onChange={(v) => set("contactTime", v)} />
                </div>

                <label className="block">
                  <span className={labelCls}>Message</span>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us more about your plans, questions or specific requirements..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${fieldCls} h-auto resize-none py-2.5`}
                  />
                  <span className="mt-1 block text-right text-[9.5px] text-slate-300">
                    {form.message.length}/1000
                  </span>
                </label>

                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[10.5px] leading-[1.5] text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded border-slate-300 accent-sky-600"
                    />
                    <span>
                      I agree to the processing of my personal data as described
                      in the{" "}
                      <a href="#" className="font-semibold text-sky-600 underline-offset-2 hover:underline">
                        Privacy Policy
                      </a>
                      . <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  {errors.consent ? (
                    <span className="ct-fade mt-1 block text-[10px] text-rose-500">{errors.consent}</span>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-sky-600 text-[12.5px] font-semibold text-white shadow-[0_12px_28px_rgba(2,132,199,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-wait disabled:opacity-80"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Request
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[9.5px] text-slate-400">
                  <Lock className="h-3 w-3" />
                  Your request will be securely recorded and routed to the
                  right 2Morrow specialist.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Expertise                                                                  */
/* -------------------------------------------------------------------------- */

function ExpertiseSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Our expertise
          </p>
          <h2 className="mt-3 text-[26px] font-bold leading-[1.15] tracking-[-0.035em] text-slate-900 sm:text-[32px]">
            Whatever your real estate or life project abroad, we&rsquo;re here
            to guide you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[12.5px] leading-[1.7] text-slate-400">
            From finding the right property to planning your move, our team
            supports you at every step, with local knowledge and an
            international perspective.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[960px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {expertise.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <TileCard icon={item.icon} title={item.title} text={item.text} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* What happens next                                                          */
/* -------------------------------------------------------------------------- */

function NextSection() {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <Reveal from="left">
          <div className="group overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(11,29,51,0.15)]">
            <Photo
              src={IMG.town}
              alt="Hillside town overlooking mountains"
              className="aspect-[4/3.4] w-full lg:aspect-auto lg:h-[460px]"
              imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
              What happens next?
            </p>
            <h2
              className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.01em] text-slate-900 sm:text-[40px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              International expertise.
              <br />A personal approach.
            </h2>
            <p className="mt-4 max-w-[460px] text-[12.5px] leading-[1.7] text-slate-500">
              We take the time to understand your goals and connect you with
              the right 2Morrow specialist, combining local knowledge with a
              truly international perspective.
            </p>
          </Reveal>

          <ol className="mt-6 space-y-4">
            {nextSteps.map((step, i) => (
              <Reveal key={step.title} delay={100 + i * 110}>
                <li className="group flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white transition-transform duration-500 group-hover:scale-125">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-bold text-slate-800">{step.title}</span>
                    <span className="block text-[10.5px] text-slate-500">{step.text}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-7 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
            {trust.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={300 + i * 100}>
                <div className="flex gap-2.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={1.6} />
                  <span>
                    <span className="block text-[10.5px] font-bold text-slate-800">{title}</span>
                    <span className="mt-0.5 block text-[9.5px] leading-[1.5] text-slate-400">{text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Direct contact                                                             */
/* -------------------------------------------------------------------------- */

function DirectSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle>Prefer to get in touch directly?</SectionTitle>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[960px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {directContacts.map(({ icon: Icon, tint, title, text, cta, href }, i) => (
            <Reveal key={title} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_22px_44px_rgba(11,29,51,0.12)]">
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[360deg] ${tint}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[10.5px] font-bold text-sky-700">{title}</span>
                </div>
                <p className="mt-3 text-[10.5px] leading-[1.55] text-slate-500">{text}</p>
                <a
                  href={href}
                  onClick={(e) => {
                    if (href === "#contact-form") {
                      e.preventDefault();
                      scrollToForm();
                    }
                  }}
                  className="mt-auto flex h-8 items-center justify-center gap-1.5 rounded-md border border-sky-600 text-[10.5px] font-semibold text-sky-700 transition-all duration-300 hover:bg-sky-600 hover:text-white"
                >
                  {cta}
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className={`text-[11.5px] font-semibold transition-colors ${open ? "text-sky-700" : "text-slate-800 group-hover:text-sky-700"}`}>
          {q}
        </span>
        <Plus
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-[135deg] text-sky-600" : ""}`}
        />
      </button>
      {/* grid-rows trick animates height without measuring */}
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 pr-8 text-[11.5px] leading-[1.7] text-slate-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-[22px] font-bold tracking-[-0.03em] text-sky-600 sm:text-[24px]">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-4 grid gap-x-10 md:grid-cols-2">
            <div>
              {[faqs[0], faqs[2], faqs[4]].map((f) => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
            <div>
              {[faqs[1], faqs[3], faqs[5]].map((f) => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      <Photo
        src={IMG.cta}
        className="absolute inset-0 -z-20"
        imgClassName="ct-kenburns"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/20" />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-sky-300">
            Ready to take the next step?
          </p>
          <h2 className="mt-4 max-w-xl text-[32px] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[42px]">
            Let&rsquo;s talk about your project.
          </h2>
          <button
            type="button"
            onClick={scrollToForm}
            className="group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 text-[12.5px] font-semibold text-white shadow-[0_14px_34px_rgba(14,165,233,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400"
          >
            Book a first conversation
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-white text-slate-900 antialiased"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes ct-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ct-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ct-pop {
          0% { transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes ct-kenburns {
          from { transform: scale(1.02); }
          to { transform: scale(1.12) translate(-1.5%, -1%); }
        }
        .ct-rise { opacity: 0; animation: ct-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ct-fade { animation: ct-fade 0.35s ease both; }
        .ct-pop { animation: ct-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ct-kenburns { animation: ct-kenburns 22s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .ct-rise { opacity: 1; animation: none; }
          .ct-fade, .ct-pop, .ct-kenburns { animation: none; }
        }
      `}</style>

      <Hero />
      <HelpSection
        selected={form.requestType}
        onSelect={(value) => setForm((f) => ({ ...f, requestType: value }))}
      />
      <FormSection form={form} setForm={setForm} />
      <ExpertiseSection />
      <NextSection />
      <DirectSection />
      <FaqSection />
      <FinalCTA />
    </main>
  );
}