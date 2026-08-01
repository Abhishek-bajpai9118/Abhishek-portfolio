import { useRef } from "react";
import { profile } from "../data/profile.js";
import NeuralGraph from "./NeuralGraph.jsx";

export default function Hero() {
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${x * 6}deg`);
    el.style.setProperty("--tilt-y", `${y * -6}deg`);
  };

  return (
    <section
      id="top"
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <div className="hero__graph" aria-hidden="true">
        <NeuralGraph />
      </div>
      <div className="container hero__inner">
        <p className="section-label">// {profile.role.toLowerCase()} training as {profile.targetRole.toLowerCase()}</p>
        <h1 className="hero__title">
          {profile.name}
        </h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn-primary">
            view projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
