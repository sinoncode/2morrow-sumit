import Reveal from "./Reveal";

export default function QuoteBand() {
  return (
    <section className="section quoteband">
      <div className="container split">
        <Reveal className="reveal-l">
          <figure>
            <blockquote>&ldquo;I love living here — but this may not be the right place for you.&rdquo;</blockquote>
            <figcaption>Different perspectives. Brighter decisions.</figcaption>
            <p className="lead">Our Angels give honest, balanced perspectives — including the challenges. Their
            goal is not to sell you a dream, but to help you find a place that truly fits your life.</p>
          </figure>
        </Reveal>
        <Reveal className="reveal-r" delay={0.15}>
          <div className="quoteband__img">
            <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=70" alt="Coastal terrace overlooking the sea" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
