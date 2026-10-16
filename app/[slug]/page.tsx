import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ModuleRoute = {
  title: string;
  description: string;
  links?: { label: string; href: string }[];
};

const moduleRoutes: Record<string, ModuleRoute> = {
  buy: {
    title: "Find your next home",
    description: "Explore verified properties and find a place that fits the life you want to build.",
    links: [{ label: "Browse properties", href: "/properties" }],
  },
  sell: {
    title: "Sell your property",
    description: "Understand your options and plan your next move with support from our real estate team.",
    links: [{ label: "Contact our team", href: "/contact" }],
  },
  properties: {
    title: "Find your next home",
    description: "Explore verified properties and find a place that fits the life you want to build.",
    links: [{ label: "Browse properties", href: "/properties" }],
  },
  destinations: {
    title: "Explore destinations",
    description: "Get to know the places and local markets that could shape your next chapter.",
    links: [
      { label: "New York", href: "/destinations/new-york" },
      { label: "Los Angeles", href: "/destinations/los-angeles" },
      { label: "Miami", href: "/destinations/miami" },
      { label: "London", href: "/destinations/london" },
      { label: "Dubai", href: "/destinations/dubai" },
    ],
  },
  "life-project": {
    title: "Your Life Project",
    description: "Bring your lifestyle, property, finances and family priorities together in one considered plan.",
    links: [{ label: "Start your project", href: "/start" }, { label: "Explore destinations", href: "/destinations" }],
  },
  invest: {
    title: "Invest with perspective",
    description: "Explore property opportunities with a clear view of location, ownership and long-term goals.",
    links: [{ label: "Browse properties", href: "/properties" }, { label: "Talk to our team", href: "/contact" }],
  },
  angels: {
    title: "Our trusted network",
    description: "Meet the people and local specialists who help make international property decisions clearer.",
    links: [{ label: "More than a network", href: "/network" }, { label: "Contact us", href: "/contact" }],
  },
  insights: {
    title: "Property insights",
    description: "Explore perspectives on property, destinations and the decisions that shape a move abroad.",
    links: [{ label: "Explore destinations", href: "/destinations" }, { label: "Browse properties", href: "/properties" }],
  },
  about: {
    title: "About 2morrow",
    description: "We bring property expertise and personal priorities together to help people plan what comes next.",
    links: [{ label: "Our network", href: "/network" }, { label: "Contact us", href: "/contact" }],
  },
  login: {
    title: "Client login",
    description: "The client portal is not available yet. Get in touch with our team for help with your project.",
    links: [{ label: "Contact our team", href: "/contact" }],
  },
  start: {
    title: "Start your Life Project",
    description: "Tell us what you are planning and our team will help you take the next step.",
    links: [{ label: "Contact our team", href: "/contact" }, { label: "Learn about the process", href: "/life-project" }],
  },
  projects: {
    title: "Projects",
    description: "Discover property projects selected for their potential, location and quality.",
    links: [{ label: "Browse properties", href: "/properties" }, { label: "Contact our team", href: "/contact" }],
  },
  network: {
    title: "More than a network",
    description: "Our trusted local professionals bring on-the-ground knowledge to every stage of your property journey.",
    links: [{ label: "Meet our Angels", href: "/angels" }, { label: "Contact us", href: "/contact" }],
  },
  services: {
    title: "Real estate services",
    description: "Get support with property search, selling, relocation and the decisions around international ownership.",
    links: [{ label: "Buy a property", href: "/buy" }, { label: "Sell a property", href: "/sell" }, { label: "Contact us", href: "/contact" }],
  },
  contact: {
    title: "Contact our team",
    description: "Talk with us about your property plans, destination questions or next steps.",
    links: [{ label: "Start your Life Project", href: "/start" }, { label: "Explore services", href: "/services" }],
  },
  privacy: {
    title: "Privacy policy",
    description: "Information about how 2morrow handles personal data will be published here.",
  },
  terms: {
    title: "Terms of service",
    description: "Our terms of service will be published here.",
  },
  imprint: {
    title: "Imprint",
    description: "Company and publication details will be published here.",
  },
};

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(moduleRoutes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: moduleRoutes[slug]?.title ?? "Page not found" };
}

export default async function ModulePage({ params }: RouteProps) {
  const { slug } = await params;
  const route = moduleRoutes[slug];

  if (!route) notFound();

  return (
    <section className="container-custom py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2E86C1]">
          2morrow Real Estate
        </p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{route.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          {route.description}
        </p>
        {route.links && (
          <nav aria-label="Related pages" className="mt-8 flex flex-wrap gap-3">
            {route.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-lg bg-[#2E86C1] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#21618C]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}