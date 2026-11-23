import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export default function QuoteBand() {
  return (
    <section className="section quoteband">
      <div className="container split">
{/* Local Image */}
        <Reveal className="reveal-r" delay={0.15}>
          <div className="group relative h-[300px] w-full overflow-hidden rounded-2xl sm:h-[360px] lg:h-[420px]">

            <img
              src="/images/angel/love.png"
              alt="Coastal terrace overlooking the sea"
              loading="lazy"
              className="
                absolute inset-0
                h-full w-full
                object-cover object-center
                transition-transform duration-700
                ease-out
                group-hover:scale-105
              "
            />

            {/* Subtle Image Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          </div>
        </Reveal>
        {/* Quote Content */}
        <Reveal className="reveal-l">
          <figure>
            <blockquote className="text-lg font-semibold text-[#0c2854] sm:text-xl lg:text-2xl">
              &ldquo;
              
              I love living here — but this may not be the right place for you.

            </blockquote>

            

            <p className="lead">
              Our angels give honest, balanced perspectives — including the
              challenges. Their goal is not to sell you a dream, but to help
              you find a place that truly fits your life.
            </p>

            <figcaption className="flex items-center gap-2 text-green-500">
              
              <ArrowRight className="text-green-500"/> Different perspectives. Brighter decisions.
            </figcaption>
          </figure>
        </Reveal>

        

      </div>
    </section>
  );
}
