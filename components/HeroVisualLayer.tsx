"use client";

import { useEffect, useState } from "react";

const nodes = [
  { top: "12%", left: "12%" },
  { top: "24%", left: "32%" },
  { top: "18%", left: "62%" },
  { top: "42%", left: "18%" },
  { top: "52%", left: "48%" },
  { top: "38%", left: "76%" },
  { top: "72%", left: "28%" },
  { top: "70%", left: "66%" },
];

const lines = [
  { top: "18%", left: "14%", width: "28%", rotate: "14deg", delay: "0s" },
  { top: "30%", left: "33%", width: "34%", rotate: "-10deg", delay: "0.4s" },
  { top: "46%", left: "20%", width: "32%", rotate: "18deg", delay: "0.8s" },
  { top: "56%", left: "50%", width: "30%", rotate: "-16deg", delay: "1.1s" },
  { top: "68%", left: "30%", width: "38%", rotate: "6deg", delay: "1.5s" },
];

const packets = [
  { top: "20%", left: "18%", delay: "0s" },
  { top: "42%", left: "28%", delay: "0.8s" },
  { top: "62%", left: "42%", delay: "1.4s" },
];

export function HeroVisualLayer() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="hero-visual-layer" aria-hidden="true">
      <div className="hero-visual-glow" />
      {lines.map((line) => (
        <span
          key={`${line.top}-${line.left}`}
          className="hero-visual-line"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            transform: `rotate(${line.rotate})`,
            animationDelay: line.delay,
          }}
        />
      ))}
      {nodes.map((node) => (
        <span
          key={`${node.top}-${node.left}`}
          className="hero-visual-node"
          style={{ top: node.top, left: node.left }}
        />
      ))}
      {packets.map((packet) => (
        <span
          key={`${packet.top}-${packet.left}`}
          className="hero-data-packet"
          style={{ top: packet.top, left: packet.left, animationDelay: packet.delay }}
        />
      ))}
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="hero-particle"
          style={{
            top: `${10 + ((index * 17) % 74)}%`,
            left: `${8 + ((index * 23) % 82)}%`,
            animationDelay: `${index * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}
