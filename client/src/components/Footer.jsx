import { profile } from "../data/profile.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <div className="footer__links">
          {profile.socials.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              github
            </a>
          )}
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              linkedin
            </a>
          )}
          {profile.socials.twitter && (
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer">
              twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
