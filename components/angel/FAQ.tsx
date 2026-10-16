"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  { q: "Who can become a 2Morrow Angel?", a: "Residents with genuine local experience in one of our destinations, verified identity and a willingness to share honest, balanced insight." },
  { q: "How are Angels selected and verified?", a: "Every Angel passes identity verification and a local-knowledge validation review. Profiles are quality reviewed on an ongoing basis." },
  { q: "Is there a cost to speak with an Angel?", a: "The initial connection process is free. Details of any continued support are always disclosed transparently before you commit." },
  { q: "Can I speak with an Angel before I choose a destination?", a: "Yes. Conversations can help you compare regions and narrow down what truly fits your life." },
  { q: "Do Angels provide legal or financial advice?", a: "No. Angels never replace licensed professionals. For legal, tax or financial matters we connect you with qualified independent experts." },
  { q: "How does 2Morrow ensure independence?", a: "Conflicts of interest are disclosed, Angels are trained in confidentiality, and they are never rewarded for steering you toward a specific outcome." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal><h2 className="h2">Frequently asked questions</h2></Reveal>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={0.05 + i * 0.05}>
              <div className={`faq__item ${open === i ? "open" : ""}`}>
                <button className="faq__q" aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}<span className="x">+</span>
                </button>
                <div className="faq__a" style={{ maxHeight: open === i ? "220px" : 0 }}>
                  <p>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <a href="#faq" className="faq__link">View all FAQs →</a>
      </div>
    </section>
  );
}
