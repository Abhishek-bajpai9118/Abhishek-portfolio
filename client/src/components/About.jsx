import { profile } from "../data/profile.js";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div>
          <p className="section-label">// about</p>
          <h2 className="section-title">From shipping software to shipping models.</h2>
        </div>
        <div className="about__body">
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
