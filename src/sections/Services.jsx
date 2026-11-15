import { motion } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'

const ease = [0.16, 1, 0.3, 1]

/*
  Les services, en quatre grandes lignes, sur fond sable. Au survol, un aplat
  orange monte du bas de la ligne, le titre glisse et la fleche tourne ; tout
  revient en place quand la souris s'en va. Chaque ligne ouvre un e-mail deja
  titre avec le service choisi.
*/
export default function Services() {
  const { services, identity } = content
  const mail = (title) =>
    `mailto:${identity.email}?subject=${encodeURIComponent(`Projet : ${title}`)}&body=${encodeURIComponent(
      `Bonjour Hermes,\n\nJe souhaite un projet de type « ${title} ».\n\nMon besoin : `
    )}`

  return (
    <Section id="services" kicker="Services" lead={services.lead} tone="dune">
      <ul className="border-t border-ink/15">
        {services.items.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            className="border-b border-ink/15"
          >
            <a
              href={mail(s.title)}
              data-cursor="Écrire"
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 overflow-hidden px-2 py-8 sm:gap-x-8 sm:px-6 sm:py-10 md:grid-cols-[4rem_1.1fr_1fr_auto]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative font-mono text-sm tabular text-ember transition-colors duration-300 group-hover:text-paper">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative font-display text-[clamp(1.7rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.03em] text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-paper">
                {s.title}
              </span>
              <span className="relative col-span-3 col-start-1 max-w-md text-pretty font-light leading-relaxed text-graphite transition-colors duration-300 group-hover:text-paper/90 md:col-span-1 md:col-start-3">
                {s.desc}
              </span>
              <span
                aria-hidden="true"
                className="relative row-start-1 col-start-3 grid h-12 w-12 place-items-center rounded-full ring-1 ring-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-paper group-hover:text-ember group-hover:ring-paper md:col-start-4 sm:h-14 sm:w-14"
              >
                ↗
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
