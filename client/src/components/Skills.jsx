import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile.js";

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// skills</p>
        <h2 className="section-title">Tech stack — what I use to build intelligent systems.</h2>

        <div className="stack-grid">
          {profile.skillGroups.map((group) => (
            <div key={group.label} className="stack-card">
              <h3 className="stack-card__label">{group.label}</h3>
              <div className="stack-card__items">
                {group.items.map((item) => (
                  <div key={item.name} className="stack-item">
                    <div className="stack-item__row">
                      <span className="stack-item__name">
                        <span className="stack-item__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        {item.name}
                      </span>
                      <span className="stack-item__level">{item.level}%</span>
                    </div>
                    <div className="stack-item__track">
                      <div
                        className="stack-item__fill"
                        style={{ width: visible ? `${item.level}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}