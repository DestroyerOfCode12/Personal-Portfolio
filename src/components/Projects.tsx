import Reveal from './Reveal'
import { projects, type ProjectEntry } from '../data/content'

const STATUS_LABEL: Record<ProjectEntry['status'], string> = {
  live: 'LIVE',
  'in-progress': 'IN PROGRESS',
  complete: 'COMPLETE',
}

const STATUS_CLASS: Record<ProjectEntry['status'], string> = {
  live: 'text-ice border-ice/30 bg-ice/10',
  'in-progress': 'text-amber border-amber/30 bg-amber/10',
  complete: 'text-text-muted border-border bg-surface-raised',
}

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ice">
            03 — Projects
          </p>
          <h2 className="mb-10 font-display text-2xl font-semibold text-text md:text-3xl">
            Selected builds and integrations.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delayMs={i * 60}>
              <article className="flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-hover">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {project.name}
                  </h3>
                  <span
                    className={`shrink-0 border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                      STATUS_CLASS[project.status]
                    }`}
                  >
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                {project.context && (
                  <p className="mb-2 font-mono text-xs text-text-faint">{project.context}</p>
                )}

                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto font-mono text-xs text-ice underline-offset-4 hover:underline focus-visible:underline"
                  >
                    View repository →
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
