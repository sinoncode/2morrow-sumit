import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const destinations: Record<string, { title: string; description: string }> = {
  "new-york": {
    title: "New York",
    description: "Explore apartments and penthouses across New York, with local guidance for your property search.",
  },
  "los-angeles": {
    title: "Los Angeles",
    description: "Discover modern homes and coastal living across Los Angeles with support from local experts.",
  },
  miami: {
    title: "Miami",
    description: "Explore waterfront property opportunities and the neighborhoods that make Miami distinctive.",
  },
  london: {
    title: "London",
    description: "Find historic and contemporary homes with thoughtful guidance through the London property market.",
  },
  dubai: {
    title: "Dubai",
    description: "Explore Dubai residences and get practical support as you consider an international property move.",
  },
};

type DestinationProps = {
  params: Promise<{ destination: string }>;
};

export function generateStaticParams() {
  return Object.keys(destinations).map((destination) => ({ destination }));
}

export async function generateMetadata({ params }: DestinationProps): Promise<Metadata> {
  const { destination } = await params;
  return { title: destinations[destination]?.title ?? "Destination not found" };
}

export default async function DestinationPage({ params }: DestinationProps) {
  const { destination } = await params;
  const page = destinations[destination];

  if (!page) notFound();

  return (
    <section className="container-custom py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2E86C1]">
          2morrow Real Estate
        </p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          {page.description}
        </p>
        <nav aria-label="Related pages" className="mt-8 flex flex-wrap gap-3">
          <Link href="/properties" className="inline-flex items-center rounded-lg bg-[#2E86C1] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#21618C]">
            Browse properties
          </Link>
          <Link href="/destinations" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
            All destinations
          </Link>
        </nav>
      </div>
    </section>
  );
}