import { useState } from "react";
import { profile } from "../data/profile.js";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    {
      key: "email",
      label: profile.email,
      href: `mailto:${profile.email}`,
      colorClass: "icon--email",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
    {
      key: "phone",
      label: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      colorClass: "icon--phone",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
        </svg>
      ),
    },
    {
      key: "github",
      label: "GitHub Profile",
      href: profile.socials.github,
      colorClass: "icon--github",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      href: profile.socials.linkedin,
      colorClass: "icon--linkedin",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.4 20.4h-3.5v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6H9.5V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.1ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.5V9H7v11.4Z" />
        </svg>
      ),
    },
  ].filter((item) => item.href && !item.href.includes("your-username") && !item.href.includes("00000"));

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-label">// contact</p>
        <h2 className="section-title contact__heading">Let's Connect</h2>
        <p className="contact__subtitle">
          Ready to collaborate on the next big AI innovation? Let's build something amazing together.
        </p>

        <div className="contact-grid">
          <form className="contact-card" onSubmit={handleSubmit}>
            <div className="contact-card__header">
              <span className="contact-card__header-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3>Send a Message</h3>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" className="launch-btn" disabled={status === "sending"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 3 18 9-18 9 4.5-9L3 3Z" />
              </svg>
              {status === "sending" ? "sending…" : "Launch Message"}
            </button>

            {status === "sent" && (
              <p className="contact-form__status contact-form__status--ok">
                Message sent — thanks, I'll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="contact-form__status contact-form__status--err">
                Couldn't send that. Make sure the server and MongoDB are running.
              </p>
            )}
          </form>

          <div className="contact-side">
            <div className="contact-avatar">
              <span className="contact-avatar__ring" />
              <span className="contact-avatar__emoji" aria-hidden="true">🤖</span>
            </div>
            <p className="contact-side__quote">"Ready to process your ideas into reality!"</p>
            <h3 className="contact-side__title">Connect With Me</h3>

            <div className="contact-links">
              {contactLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span className={`contact-link__icon ${item.colorClass}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}