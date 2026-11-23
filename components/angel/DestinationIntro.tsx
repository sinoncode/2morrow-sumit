import Image from "next/image";
import Reveal from "./Reveal";

// Local Images
import DataProperty from "@/public/images/angel/world.jpg";
import LocalExperience from "@/public/images/angel/classroom.jpg";

export default function DestinationIntro() {
  return (
    <section className="section">
      <div className="container split">

        {/* Left Content */}
        <div>
          <Reveal>
            <p className="eyebrow">
              Local insight. A brighter tomorrow.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="h2"
              style={{ margin: "0.6rem 0 1.2rem" }}
            >
              A destination is more than a place on a map.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="lead">
              Data can show you properties. Our angels bring lived
              experience, local insight and a human perspective on what
              it&rsquo;s really like to live in a place.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="lead" style={{ marginTop: "1rem" }}>
              Because a better decision comes from both information
              and real life.
            </p>
          </Reveal>
        </div>

        {/* Right Image Cards */}
        <Reveal className="reveal-r" delay={0.15}>
          <div className="split-cards">

            {/* Data Card */}
            <div className="tile relative overflow-hidden">
              <Image
                src={DataProperty}
                alt="Beautiful residential property"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <span className="tile__plus relative z-10">
                +
              </span>

              <div className="tile__label relative z-10">
                <span>Data</span>
                shows options
              </div>
            </div>

            {/* Local Experience Card */}
            <div className="tile relative overflow-hidden">
              <Image
                src={LocalExperience}
                alt="Local destination and lifestyle"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <span className="tile__plus relative z-10">
                +
              </span>

              <div className="tile__label relative z-10">
                <span>Local experience</span>
                shows what&rsquo;s real
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}