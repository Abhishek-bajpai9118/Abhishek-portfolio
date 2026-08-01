import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">// projects</p>
        <h2 className="section-title">Things I've built, from web apps to ML experiments.</h2>

        {status === "loading" && (
          <p className="projects__hint">Loading projects…</p>
        )}

        {status === "error" && (
          <p className="projects__hint">
            Couldn't reach the API. Run the server and MongoDB, then seed
            sample data with <code>npm run seed</code> inside{" "}
            <code>/server</code>.
          </p>
        )}

        {status === "ready" && projects.length === 0 && (
          <p className="projects__hint">
            No projects yet — add one from <code>POST /api/projects</code> or
            run the seed script.
          </p>
        )}

        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p._id} className="project-card">
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.description}</p>
              <div className="project-card__tags">
                {p.tags?.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-card__links">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer">
                    code →
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer">
                    live →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
