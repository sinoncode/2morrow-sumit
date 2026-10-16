import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__content">
          <Reveal><p className="hero__tag">2Morrow Angels</p></Reveal>
          <Reveal delay={0.1}><h1 className="h1">Local knowledge for the life you are considering.</h1></Reveal>
          <Reveal delay={0.2}>
            <p>Trusted local insight. Real conversations. A smoother path to your new life.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero__cta">
              <a href="#start" className="btn btn-primary">Start Your Life Project</a>
              <a href="#destinations" className="btn btn-outline">Find Support in Your Destination</a>
            </div>
          </Reveal>
        </div>
      </div>
      <svg className="hero__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 C240,100 480,20 720,55 C960,90 1200,30 1440,60 L1440,100 L0,100 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
