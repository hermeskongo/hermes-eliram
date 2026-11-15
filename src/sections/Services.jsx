import { motion } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'

const ease = [0.16, 1, 0.3, 1]

/*
  Les services, en quatre carres (2 × 2) sur fond sable. Chaque carre porte une
  icone dessinee au trait pour son service. Au survol, un aplat orange monte du
  bas, l'icone grossit legerement et la fleche tourne ; tout revient en place
  quand la souris s'en va. Chaque carre ouvre un e-mail deja titre avec le
  service choisi. Sur telephone, les carres s'empilent sur une colonne.
*/
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Une icone par service, dans l'ordre du contenu.
const ICONS = [
  // Site vitrine : une fenetre de navigateur avec un titre et une image
  <svg key="vitrine" viewBox="0 0 64 64" {...stroke}>
    <rect x="6" y="10" width="52" height="44" rx="5" />
    <path d="M6 20h52" />
    <circle cx="12" cy="15" r="1.2" />
    <circle cx="17" cy="15" r="1.2" />
    <circle cx="22" cy="15" r="1.2" />
    <path d="M14 30h16M14 36h11" />
    <rect x="36" y="27" width="15" height="13" rx="2" />
    <path d="M36 37l4-4 4 3 3-2 4 3" />
    <rect x="14" y="43" width="12" height="5" rx="2.5" />
  </svg>,
  // SaaS : un tableau de bord, une courbe et des barres
  <svg key="saas" viewBox="0 0 64 64" {...stroke}>
    <rect x="6" y="10" width="52" height="44" rx="5" />
    <path d="M18 10v44" />
    <path d="M10 18h4M10 24h4M10 30h4" />
    <path d="M24 34l7-7 6 5 9-11 6 4" />
    <path d="M26 48v-5M33 48v-9M40 48v-6M47 48v-11" />
  </svg>,
  // Application e-commerce : un sac de courses et une etiquette de prix
  <svg key="ecom" viewBox="0 0 64 64" {...stroke}>
    <path d="M14 22h32l-3 32H17z" />
    <path d="M23 22v-4a7 7 0 0 1 14 0v4" />
    <path d="M23 29a7 7 0 0 0 14 0" />
    <path d="M44 34l10-10h6v6L50 40z" />
    <circle cx="56" cy="28" r="1.2" />
  </svg>,
  // Application mobile : un telephone, des cartes et une notification
  <svg key="mobile" viewBox="0 0 64 64" {...stroke}>
    <rect x="18" y="6" width="28" height="52" rx="6" />
    <path d="M28 11h8" />
    <rect x="23" y="18" width="18" height="10" rx="2" />
    <path d="M23 34h18M23 40h12" />
    <circle cx="32" cy="51" r="2" />
    <circle cx="48" cy="12" r="5" />
    <path d="M48 10v2.5" />
  </svg>,
]

export default function Services() {
  const { services, identity } = content
  const mail = (title) =>
    `mailto:${identity.email}?subject=${encodeURIComponent(`Projet : ${title}`)}&body=${encodeURIComponent(
      `Bonjour Hermes,\n\nJe souhaite un projet de type « ${title} ».\n\nMon besoin : `
    )}`

  return (
    <Section id="services" kicker="Services" lead={services.lead} tone="dune">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {services.items.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.08, ease }}
          >
            <a
              href={mail(s.title)}
              data-cursor="Écrire"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] bg-paper p-7 ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(36,21,13,0.45)] sm:aspect-square sm:p-10"
            >
              {/* l'aplat orange qui monte au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />

              <div className="relative flex items-start justify-between">
                <span className="grid h-20 w-20 place-items-center rounded-2xl bg-dune text-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-paper sm:h-24 sm:w-24 lg:h-36 lg:w-36 lg:rounded-3xl">
                  <span className="block h-11 w-11 sm:h-14 sm:w-14 lg:h-20 lg:w-20">{ICONS[i]}</span>
                </span>
                <span className="font-mono text-sm tabular text-ember transition-colors duration-300 group-hover:text-paper">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative mt-10 sm:mt-0">
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-paper">
                  {s.title}
                </h3>
                <div className="mt-4 flex items-end justify-between gap-6">
                  <p className="max-w-sm text-pretty font-light leading-relaxed text-graphite transition-colors duration-300 group-hover:text-paper/90">
                    {s.desc}
                  </p>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-paper group-hover:text-ember group-hover:ring-paper sm:h-14 sm:w-14"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
