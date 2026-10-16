import Reveal from "./Reveal";

export default function DestinationIntro() {
  return (
    <section className="section">
      <div className="container split">
        <div>
          <Reveal><p className="eyebrow">Local insight. A brighter tomorrow.</p></Reveal>
          <Reveal delay={0.08}><h2 className="h2" style={{ margin: "0.6rem 0 1.2rem" }}>
            A destination is more than a place on a map.</h2></Reveal>
          <Reveal delay={0.16}>
            <p className="lead">Data can show you properties. Our Angels bring lived experience, local
            insight and a human perspective on what it&rsquo;s really like to live in a place.</p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="lead" style={{ marginTop: "1rem" }}>Because a better decision comes from both
            information and real life.</p>
          </Reveal>
        </div>
        <Reveal className="reveal-r" delay={0.15}>
          <div className="split-cards">
            <div className="tile" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=70)" }}>
              <span className="tile__plus">+</span>
              <div className="tile__label"><span>Data</span>Shows options</div>
            </div>
            <div className="tile" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=70)" }}>
              <span className="tile__plus">+</span>
              <div className="tile__label"><span>Local experience</span>Shows what&rsquo;s real</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
