import Reveal from "./Reveal";

const steps = [
  { n: "01", t: "Tell us about your project", d: "Share your dreams, timeline and the kind of help you are looking for." },
  { n: "02", t: "We identify the right local support", d: "We connect you with an Angel in your chosen destination." },
  { n: "03", t: "Have a practical local conversation", d: "Ask your questions and receive honest, first-hand insight." },
  { n: "04", t: "Move forward with the right people", d: "Continue with trusted local professionals when you are ready." },
];
const stdIcons = [
  <svg key="i1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>,
  <svg key="i2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>,
  <svg key="i3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>,
  <svg key="i4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>,
  <svg key="i5" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>,
];
const standards = ["Identity verified", "Local knowledge validated", "Confidentiality trained", "Conflicts disclosed", "Quality reviewed"];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal><p className="eyebrow" style={{ textAlign: "center" }}>How the Angel connection works</p></Reveal>
        <Reveal delay={0.08}>
          <p className="lead" style={{ textAlign: "center", maxWidth: 640, margin: "0.5rem auto 0" }}>
            The Journey shows when Angels support you. These four steps show how the connection begins.</p>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.1 + i * 0.08}>
              <div className="card step">
                <div className="step__num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <h3 className="h3" style={{ textAlign: "center", marginTop: "3.2rem" }}>Every connection is protected by clear standards</h3>
        </Reveal>
        <div className="standards">
          {standards.map((s, i) => (
            <Reveal key={s} delay={0.1 + i * 0.06}>
              <div className="std">{stdIcons[i]}<p>{s}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
