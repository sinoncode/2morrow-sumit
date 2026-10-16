import Reveal from "./Reveal";

export function BecomeAngel() {
  return (
    <section className="cta" id="angel">
      <div className="container">
        <Reveal><h2 className="h2">You know your region.</h2></Reveal>
        <Reveal delay={0.1}>
          <p>Your experience could help someone else feel at home. If you live in one of our destinations
          and enjoy sharing your local knowledge, we would love to hear from you.</p>
        </Reveal>
        <Reveal delay={0.18}>
          <a href="#start" className="btn btn-primary">Become a 2Morrow Angel →</a>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="cta cta--final" id="start">
      <div className="container">
        <Reveal><h2 className="h2">Ready to understand what life could really be like?</h2></Reveal>
        <Reveal delay={0.1}>
          <p>Take the first step. Get trusted insight and practical guidance for your next chapter.</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="hero__cta" style={{ justifyContent: "center" }}>
            <a href="#top" className="btn btn-primary">Start Your Life Project</a>
            <a href="#destinations" className="btn btn-outline">Explore Destinations</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
