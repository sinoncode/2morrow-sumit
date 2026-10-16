"use client";
import { useEffect, useRef } from "react";

export default function Reveal({
  children, className = "", delay = 0, as: Tag = "div",
}: {
  children: React.ReactNode; className?: string; delay?: number; as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ["--d" as any]: `${delay}s` }}>
      {children}
    </Tag>
  );
}
