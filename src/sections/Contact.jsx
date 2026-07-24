import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

const isPlaceholder = (s) => typeof s === 'string' && s.includes('[À REMPLIR]')

export default function Contact() {
  const { contact, identity } = content
  return (
    <Section id="contact" kicker="Contact" lead={contact.lead} accent="#7ee787">
      <Reveal>
        <p className="mb-8 max-w-lg text-pretty text-xl font-light text-graphite">{contact.body}</p>
        <a href={`mailto:${identity.email}`} className="group inline-flex max-w-full items-center gap-2.5 text-ink sm:gap-4">
          <span className="font-display whitespace-nowrap text-[clamp(1.25rem,5.2vw,3.6rem)] font-semibold leading-none tracking-[-0.02em] underline decoration-line decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-ink">
            {identity.email}
          </span>
          <span aria-hidden="true" className="shrink-0 text-xl text-muted transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
            →
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          {identity.socials.map((s) => {
            const dead = isPlaceholder(s.url)
            return (
              <li key={s.label}>
                {dead ? (
                  <span className="cursor-default font-mono text-sm uppercase tracking-[0.14em] text-faint">
                    {s.label} <span className="text-faint/60">— à venir</span>
                  </span>
                ) : (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {s.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
