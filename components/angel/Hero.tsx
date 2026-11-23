import Image from "next/image";
import Reveal from "./Reveal";

import HeroBackground from "@/public/images/angel/hero.png";

export default function Hero() {
  return (
    <section
      id="top"
      className="
        relative isolate flex min-h-[400px] w-full
        items-center overflow-hidden
        bg-[#002b46]
        py-20 sm:min-h-[400px] sm:py-24
        lg:min-h-[300px] lg:py-28
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Main Dark Blue Gradient */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[1]
          bg-[linear-gradient(90deg,#002b46_0%,rgba(0,43,70,0.98)_25%,rgba(0,43,70,0.88)_42%,rgba(0,43,70,0.58)_60%,rgba(0,43,70,0.18)_82%,rgba(0,43,70,0.08)_100%)]
        "
      />

      {/* Subtle Bottom and Top Overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[2]
          bg-gradient-to-t
          from-[#002b46]/30
          via-transparent
          to-[#002b46]/10
        "
      />

      {/* Content */}
      <div
        className="
          container relative z-10 mx-auto
          w-full px-5 sm:px-8 lg:px-10
        "
      >
        <div className="hero__content max-w-[720px] text-white">

          {/* Tag */}
          <Reveal>
            <p
              className="
                mb-7 text-[11px] font-semibold
                uppercase tracking-[0.16em]
                text-[#00d5a5]
                sm:text-xs
              "
            >
              2morrow angels
            </p>
          </Reveal>

          {/* Heading */}
          <Reveal delay={0.1}>
            <h1
              className="
                mb-6 max-w-[760px]
                text-[38px] font-semibold
                leading-[1.08] tracking-[-0.035em]
                text-white
                sm:text-[48px]
                md:text-[56px]
                lg:text-[60px]
              "
            >
              Local knowledge for the life you are considering.
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.2}>
            <p
              className="
                mb-8 max-w-[570px]
                text-[15px] font-normal
                leading-[1.8] text-white/90
                sm:text-base
              "
            >
              Trusted local insight. Real conversations. A smoother path to
              your new life.
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.3}>
            <div
              className="
                flex flex-col items-start gap-3
                sm:flex-row sm:items-center sm:gap-2
              "
            >
              <a
                href="#start"
                className="
                  inline-flex min-h-[58px]
                  w-full items-center justify-center
                  rounded-full bg-[#00c99a]
                  px-8 py-4
                  text-center text-[15px] font-semibold
                  text-white
                  shadow-lg shadow-[#00c99a]/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-[#00b78c]
                  hover:shadow-xl
                  sm:w-auto sm:min-w-[300px]
                "
              >
                Start your life project
              </a>

              <a
                href="#destinations"
                className="
                  inline-flex min-h-[58px]
                  w-full items-center justify-center
                  rounded-full border-2 border-white
                  bg-transparent px-7 py-4
                  text-center text-[15px] font-semibold
                  text-white
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white hover:text-[#002b46]
                  sm:w-auto
                "
              >
                Find support in your destination
              </a>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="
          pointer-events-none absolute
          bottom-0 left-0 z-10
          h-[45px] w-full
          sm:h-[60px] lg:h-[70px]
        "
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,100 480,20 720,55 C960,90 1200,30 1440,60 L1440,100 L0,100 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}