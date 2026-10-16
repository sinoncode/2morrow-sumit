"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const nodes = [
  { id: "client", label: "CLIENT", sub: "Explores possibilities", x: 50, y: 2, tip: "The client explores possibilities for a new life abroad." },
  { id: "transition", label: "TRANSITION", sub: "Take the next step", x: 88, y: 18, tip: "With honest insight, the client takes the next step." },
  { id: "resident", label: "NEW RESIDENT", sub: "Makes it a home", x: 96, y: 55, tip: "A new resident settles in and makes it a home." },
  { id: "community", label: "COMMUNITY", sub: "Shared local places", x: 72, y: 88, tip: "They become part of a shared local community." },
  { id: "angel", label: "ANGEL", sub: "Shares local experience", x: 28, y: 88, tip: "Happy residents often become tomorrow's Angels." },
  { id: "client2", label: "HELPING THE NEXT CLIENT", sub: "Honest local knowledge", x: 4, y: 55, tip: "The cycle repeats — helping the next client decide." },
];

export default function Cycle() {
  const [active, setActive] = useState(nodes[0]);
  return (
    <section className="section" style={{ background: "var(--soft)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal><h2 className="h2">A positive cycle for people and places.</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="lead" style={{ maxWidth: 620, margin: "0.8rem auto 0" }}>
            Happy residents often become tomorrow's Angels, sharing their experience and helping others
            feel at home. A community built on real stories, not sales targets.</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="cycle">
            <svg className="ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c8dcea" strokeWidth="1"
                strokeDasharray="4 4" />
            </svg>
            <div className="cycle__center"><p>A brighter tomorrow, together.</p></div>
            {nodes.map((n, i) => (
              <button key={n.id} className={`cycle__node ${active.id === n.id ? "active" : ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, translate: "-50% -50%", animationDelay: `${i * 0.4}s` }}
                onMouseEnter={() => setActive(n)} onFocus={() => setActive(n)} onClick={() => setActive(n)}>
                {n.label}
              </button>
            ))}
          </div>
          <p className="cycle__tip" aria-live="polite"><strong>{active.label}</strong> — {active.tip}</p>
        </Reveal>
      </div>
    </section>
  );
}
