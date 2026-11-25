import { motion } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'

const ease = [0.16, 1, 0.3, 1]

/*
  Parcours : une frise verticale. A gauche la periode en mono, au milieu un
  trait avec un point par etape, a droite le titre, le texte et les outils.
  Chaque etape se devoile quand elle entre dans l'ecran. Sur telephone, la
  periode passe au-dessus du titre et le trait reste sur le bord gauche.
*/
export default function Parcours() {
  const { parcours } = content

  return (
    <Section id="parcours" kicker="Parcours" lead={parcours.lead}>
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[calc(11rem+5px)]" />
        {parcours.steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, delay: 0.04, ease }}
            className="relative grid grid-cols-1 gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0"
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[0.55rem] h-[11px] w-[11px] rounded-full ring-4 ring-paper md:left-[11rem] ${
                i === 0 ? 'bg-ember' : 'bg-ink'
              }`}
            />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted md:pt-2 md:pr-2 md:text-right">{s.period}</p>
            <div className="md:pl-10">
              <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="mt-3 max-w-2xl text-pretty font-light leading-relaxed text-graphite">{s.text}</p>
              {s.tags?.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full bg-paper2 px-3 py-1 font-mono text-[0.7rem] text-graphite ring-1 ring-line">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
