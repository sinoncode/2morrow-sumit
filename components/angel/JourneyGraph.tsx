"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stages = [
  { id: "dream", x: 60, y: 92, label: "DREAM", top: true, d: "Explore possibilities and refine the dream/wish." },
  { id: "discovery", x: 200, y: 205, label: "DISCOVERY", top: false, d: "Understand needs, priorities and local questions." },
  { id: "destination", x: 340, y: 80, label: "DESTINATION", top: true, d: "Share honest insight into housing and daily life." },
  { id: "property", x: 480, y: 200, label: "PROPERTY", top: false, d: "Add neighbourhood context and collaborate with the agency." },
  { id: "verification", x: 620, y: 88, label: "VERIFICATION", top: true, d: "Add practical points and connect qualified experts." },
  { id: "purchase", x: 760, y: 198, label: "PURCHASE", top: false, d: "Factor in communication with experts as the client manages the transaction." },
  { id: "relocation", x: 900, y: 82, label: "RELOCATION", top: true, d: "Holistic services and support the move and first steps." },
  { id: "newlife", x: 1010, y: 190, label: "NEW LIFE", top: false, d: "Remain the local connection and support your integration." },
];

export default function JourneyGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ s: (typeof stages)[0]; px: number; py: number } | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current!;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (s: (typeof stages)[0], e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    setTip({ s, px: e.clientX - r.left, py: e.clientY - r.top });
  };

  return (
    <section className="section journey" id="journey">
      <div className="container">
        <Reveal><h2 className="h2" style={{ textAlign: "center" }}>Where Angels support the 2Morrow Journey</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow" style={{ textAlign: "center", marginTop: "0.5rem", color: "#7d95a8" }}>
            Human local support across the journey</p>
        </Reveal>

        <div ref={wrapRef} className={`journey__wrap ${drawn ? "drawn" : ""}`}>
          <svg className="journey__svg" viewBox="0 0 1080 260" role="img" aria-label="Journey timeline graph">
            <defs>
              <linearGradient id="jg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5b8def" /><stop offset="1" stopColor="#17b890" />
              </linearGradient>
            </defs>
            {/* hills backdrop */}
            <path d="M0 235 Q180 165 360 215 Q540 260 720 210 Q900 165 1080 220 L1080 260 L0 260Z" fill="#cfe6ea" opacity="0.55" />
            {/* journey path */}
            <path className="j-path" d="M40 130 C120 40, 160 220, 240 135 C320 55, 360 225, 440 140 C520 60, 560 220, 640 130 C720 45, 760 225, 840 140 C920 60, 960 210, 1040 120"
              fill="none" stroke="url(#jg)" strokeWidth="3.5" strokeLinecap="round" />
            {stages.map((s) => (
              <g key={s.id} className="j-node"
                onMouseMove={(e) => show(s, e)} onMouseLeave={() => setTip(null)}
                onClick={(e) => show(s, e)}>
                <circle className="core" cx={s.x} cy={s.y} r="7" fill="#fff" stroke="#0b2a4a" strokeWidth="2.5" />
                <circle cx={s.x} cy={s.y} r="13" fill="transparent" />
                <text x={s.x} y={s.top ? s.y - 22 : s.y + 28}>{s.label}</text>
              </g>
            ))}
          </svg>
          <div className={`j-tip ${tip ? "show" : ""}`}
            style={{ left: tip?.px ?? 0, top: (tip ? (tip.s.top ? tip.py - 12 : tip.py + 12) : 0), transform: tip ? `translate(-50%, ${tip.s.top ? "calc(-100% - 10px)" : "10px"})` : undefined }}>
            {tip && (<><strong>{tip.s.label}</strong>{tip.s.d}</>)}
          </div>
        </div>

        <div className="j-legend">
          <span><i className="lg-dot" style={{ background: "#17b890" }} />Key Angel support</span>
          <span><i className="lg-dot" style={{ background: "#5b8def" }} />Angel support</span>
          <span><i className="lg-dot" style={{ background: "#0b2a4a" }} />Led by licensed professionals</span>
          <span><i className="lg-dot" style={{ background: "#fff", border: "2px dashed #7d95a8" }} />Collaboration hand-off</span>
        </div>
      </div>
    </section>
  );
}
