import { useEffect, useState } from "react";
import { profile } from "../data/profile.js";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo">
          {profile.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </a>
        <nav className="navbar__links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost navbar__resume"
        >
          Resume
        </a>
      </div>
    </header>
  );
}


