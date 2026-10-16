"use client";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";

type Status = "available" | "request" | "development";
const destinations: { name: string; desc: string; status: Status; img: string; pin?: [number, number] }[] = [
  { name: "Spain", desc: "Relaxed cities, coastal living and a relaxed lifestyle.", status: "available", img: "photo-1558642084-fd07fae5282e", pin: [46, 22] },
  { name: "Portugal", desc: "Authentic communities and exceptional quality of life.", status: "available", img: "photo-1555881400-74d7acaacd8b", pin: [44, 26] },
  { name: "Greece", desc: "Island culture and a unique way of life.", status: "request", img: "photo-1533105079780-92b9be482077", pin: [53, 30] },
  { name: "France", desc: "Iconic locations and diverse lifestyles.", status: "available", img: "photo-1502602898657-3e91760cbb34", pin: [47, 18] },
  { name: "Italy", desc: "History, culinary and a strong sense of belonging.", status: "request", img: "photo-1514890547357-a9ee288728e0", pin: [50, 24] },
  { name: "Other destinations", desc: "Our network is expanding across Europe. New destinations joining soon.", status: "development", img: "" },
];
const filters: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Local support available" },
  { key: "request", label: "Available by request" },
  { key: "development", label: "Network in development" },
];
const badge: Record<Status, [string, string]> = {
  available: ["badge--ok", "LOCAL SUPPORT AVAILABLE"],
  request: ["badge--req", "AVAILABLE BY REQUEST"],
  development: ["badge--dev", "NETWORK IN DEVELOPMENT"],
};

export default function DestinationGrid() {
  const [status, setStatus] = useState<Status | "all">("all");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => destinations.filter((d) =>
      (status === "all" || d.status === status) &&
      d.name.toLowerCase().includes(q.trim().toLowerCase())),
    [status, q]
  );
  return (
    <section className="section" id="destinations" style={{backgroundColor: "#f8f9fa", paddingTop: "4rem", paddingBottom: "4rem"}}>
      <div className="container">
        <Reveal><h2 className="h2">Find local support in your destination</h2></Reveal>
        <Reveal delay={0.08}>
          <p className="lead" style={{ marginTop: "0.5rem" }}>Explore our current locations. More destinations are joining soon.</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="filterbar" role="group" aria-label="Filter destinations">
            {filters.map((f) => (
              <button key={f.key} className={`chip ${status === f.key ? "active" : ""}`}
                onClick={() => setStatus(f.key)} aria-pressed={status === f.key}>
                {f.label}
              </button>
            ))}
            <input className="search" placeholder="Search a destination…" value={q}
              onChange={(e) => setQ(e.target.value)} aria-label="Search destinations" />
          </div>
        </Reveal>

        <div className="dest-grid">
          <Reveal className="dest dest__map" delay={0.1}>
            <Map pins={destinations.filter((d) => d.pin)} onPick={(n) => setQ(n === q ? "" : n)} active={q} />
          </Reveal>
          {list.map((d, i) => (
            <article className="card dest" key={d.name} style={{ animationDelay: `${i * 0.06}s` }}>
              {d.img && <div className="dest__img" style={{ backgroundImage: `url(https://images.unsplash.com/${d.img}?auto=format&fit=crop&w=700&q=60)` }} />}
              <div className="dest__body">
                <h4>{d.name}</h4>
                <p>{d.desc}</p>
                <span className={`badge ${badge[d.status][0]}`}>{badge[d.status][1]}</span>
              </div>
            </article>
          ))}
          {list.length === 0 && <div className="empty">No destinations match your filter. Try clearing the search.</div>}
        </div>
      </div>
    </section>
  );
}

function Map({ pins, onPick, active }: { pins: any[]; onPick: (n: string) => void; active: string }) {
  return (
    <svg className="map-svg" viewBox="0 0 400 300" role="img" aria-label="Map of destinations">
      <rect width="400" height="300" fill="#e8f1f7" />
      {/* simplified world */}
      <g fill="#cddfea">
        <path d="M20 60 Q70 30 130 55 Q150 90 120 120 Q90 150 60 130 Q20 110 20 60Z" />
        <path d="M40 150 Q80 140 100 175 Q115 220 90 260 Q60 270 45 230 Q30 185 40 150Z" />
        <path d="M180 40 Q250 20 300 45 Q330 70 300 95 Q250 110 205 95 Q170 75 180 40Z" />
        <path d="M195 110 Q250 100 275 140 Q290 190 255 240 Q215 260 195 215 Q180 160 195 110Z" />
        <path d="M300 150 Q360 140 385 180 Q395 225 350 245 Q305 235 300 195 Q295 170 300 150Z" />
      </g>
      <text x="200" y="285" textAnchor="middle" fontSize="10" fill="#7d95a8" letterSpacing="3">ATLANTIC OCEAN</text>
      {pins.map((d) => {
        const sel = active.toLowerCase() === d.name.toLowerCase();
        return (
          <g key={d.name} className="map-pin" onClick={() => onPick(d.name)} role="button" aria-label={d.name}>
            <circle className="pulse" cx={d.pin[0] * 4} cy={d.pin[1] * 3} r="9" fill={sel ? "#17b890" : "#5b8def"} />
            <circle className="core" cx={d.pin[0] * 4} cy={d.pin[1] * 3} r="5.5"
              fill={sel ? "#17b890" : "#0b2a4a"} stroke="#fff" strokeWidth="1.5">
              <title>{d.name}</title>
            </circle>
            <text x={d.pin[0] * 4} y={d.pin[1] * 3 - 11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0b2a4a">{d.name}</text>
          </g>
        );
      })}
    </svg>
  );
}
