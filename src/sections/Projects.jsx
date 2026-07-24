import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

const isPlaceholder = (s) => typeof s === 'string' && s.includes('[À REMPLIR]')

function Card({ p }) {
  const named = !isPlaceholder(p.name)
  const hasLinks = Array.isArray(p.links) && p.links.length > 0
  // The whole card is a link only when there's a single destination.
  const wholeCardLink = named && !isPlaceholder(p.url) && !hasLinks

  const Inner = (
    <div className="group flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-paper2 ring-1 ring-line">
        <img
          src={p.image}
          alt={named ? `Aperçu — ${p.name}` : 'Aperçu du projet'}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {wholeCardLink && (
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            ↗
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {p.category}
          {p.badge &&
            (() => {
              const c = p.badgeColor || '#3fb950' // default: good green
              return (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] normal-case tracking-normal"
                  style={{ backgroundColor: `${c}1a`, color: c, boxShadow: `inset 0 0 0 1px ${c}33` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
                  {p.badge}
                </span>
              )
            })()}
        </span>
        <span className="font-mono text-xs tabular text-faint">{p.year}</span>
      </div>
      <h3
        className={`font-display mt-1.5 text-2xl font-semibold tracking-tight sm:text-[1.7rem] ${
          named ? 'text-ink' : 'text-faint'
        }`}
      >
        {named ? p.name : 'Projet à ajouter'}
      </h3>
      <p className="mt-2 max-w-md text-pretty font-light leading-relaxed text-muted">{p.blurb}</p>

      {p.install && (
        <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-code-bg px-3 py-2 font-mono text-xs text-code-text ring-1 ring-ink/10">
          <span className="select-none text-code-str">$</span>
          <span className="whitespace-pre">{p.install}</span>
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-md bg-paper2 px-2.5 py-1 font-mono text-[0.7rem] text-muted ring-1 ring-line">
            {t}
          </li>
        ))}
      </ul>

      {p.demo && (
        <div className="mt-4 w-fit rounded-xl bg-paper2 p-3.5 ring-1 ring-line">
          <div className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Démo admin — testez le dashboard
          </div>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-xs">
            <dt className="text-faint">email</dt>
            <dd className="select-all text-graphite">{p.demo.email}</dd>
            <dt className="text-faint">pass</dt>
            <dd className="select-all text-graphite">{p.demo.password}</dd>
          </dl>
        </div>
      )}

      {hasLinks && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 font-mono text-xs text-graphite transition-colors hover:text-ink"
            >
              {l.label}
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )

  if (wholeCardLink) {
    return (
      <a href={p.url} target="_blank" rel="noreferrer" className="block">
        {Inner}
      </a>
    )
  }
  return Inner
}

export default function Projects() {
  const { work } = content
  return (
    <Section id="work" kicker="Projets" lead={work.lead} accent="#ffa657">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
        {work.projects.map((p, i) => (
          <Reveal key={i} delay={(i % 2) * 0.08}>
            <Card p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
