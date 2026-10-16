import Reveal from "./Reveal";

const icons = {
  pin: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  people: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.7c2.8.3 4.9 2 5.5 4.8"/></svg>,
  connect: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7.2 10.8 16.8 6.2M7.2 13.2l9.6 4.6"/></svg>,
  leaf: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z"/><path d="M4 20c4-6 8-10 13-13"/></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#17b890" strokeWidth="3"><path d="M4 12.5 9.5 18 20 6"/></svg>,
  cross: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e0556b" strokeWidth="3"><path d="M5 5l14 14M19 5 5 19"/></svg>,
};

const pillars = [
  { icon: icons.pin, t: "Local perspective", d: "Honest insight on neighbourhoods, lifestyle, culture and everyday life." },
  { icon: icons.people, t: "Human orientation", d: "Real conversations, tailored to your situation and what matters to you." },
  { icon: icons.connect, t: "Useful connections", d: "Introductions to trusted local professionals and services." },
  { icon: icons.leaf, t: "Continuity", d: "Support beyond the first conversation, as you take your next steps." },
];

const yes = [
  "Share first-hand local insight on life in the region",
  "Answer practical questions about everyday living",
  "Introduce you to trusted local contacts",
  "Offer a balanced view, including potential challenges",
  "Stay in touch as your plans evolve",
];
const no = [
  "Replace a licensed real estate agent",
  "Provide legal, tax or financial advice",
  "Replace qualified independent professionals",
  "Make decisions on the client’s behalf",
  "Guarantee a specific outcome",
];

export default function ValueSection() {
  return (
    <section className="section" style={{ background: "var(--soft)" }}>
      <div className="container">
        <Reveal><p className="eyebrow">The value of a local Angel</p></Reveal>
        <Reveal delay={0.08}><h2 className="h2">More than information. A human perspective.</h2></Reveal>
        <div className="pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={0.1 + i * 0.08}>
              <div className="card pillar">
                <div className="pillar__icon">{p.icon}</div>
                <h3 className="h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="cando">
          <Reveal className="reveal-l" delay={0.1}>
            <div className="cando__col cando__col--yes">
              <div className="cando__title"><span className="dot dot--yes">✓</span>What an Angel can do</div>
              <ul>{yes.map((t) => <li key={t}>{icons.check}{t}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal className="reveal-r" delay={0.18}>
            <div className="cando__col cando__col--no">
              <div className="cando__title"><span className="dot dot--no">✕</span>What an Angel does not do</div>
              <ul>{no.map((t) => <li key={t}>{icons.cross}{t}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
