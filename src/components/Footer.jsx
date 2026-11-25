import { motion, useReducedMotion } from 'framer-motion'
import { content } from '../content'
import Magnetic from '../motion/Magnetic'

const ease = [0.16, 1, 0.3, 1]

/*
  Pied de page brun : la navigation, les reseaux, l'adresse, puis le nom en
  tres grand qui monte lettre par lettre quand on arrive en bas de la page.
*/
export default function Footer() {
  const { identity, nav } = content
  const reduce = useReducedMotion()
  const name = identity.given

  return (
    <footer className="relative overflow-hidden bg-cocoa text-sand">
      <div className="tex-paper pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-6 pt-20 sm:px-10">
        <div className="grid grid-cols-2 gap-10 border-b border-sand/15 pb-14 md:grid-cols-4">
          <div className="col-span-2">
            <p className="max-w-sm font-display text-2xl font-medium leading-snug tracking-[-0.01em]">
              Du premier écran à la production, un seul interlocuteur.
            </p>
            <a href={`mailto:${identity.email}`} className="mt-6 inline-flex min-h-[44px] items-center font-mono text-sm text-clay underline decoration-clay/40 underline-offset-4 hover:decoration-clay">
              {identity.email}
            </a>
          </div>
          <nav aria-label="Pied de page">
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="inline-flex min-h-[40px] items-center text-sand/70 transition-colors hover:text-sand">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start justify-between gap-6">
            <ul className="space-y-1">
              {identity.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center text-sand/70 transition-colors hover:text-sand">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <Magnetic>
              <a
                href="#top"
                aria-label="Haut de page"
                className="grid h-14 w-14 place-items-center rounded-full ring-1 ring-sand/30 transition-colors hover:bg-sand hover:text-cocoa"
              >
                ↑
              </a>
            </Magnetic>
          </div>
        </div>

        {/*
          Le nom remplit la largeur de son conteneur, jamais plus : la taille se
          calcule en cqw (largeur du conteneur), pas en vw, pour que « Hermes
          Eliram » tienne en entier a toutes les tailles d'ecran. 15 cqw laisse de la
          marge : Bricolage Grotesque s'elargit a petite taille (axe optique), le
          texte n'est donc pas strictement proportionnel a la taille.
        */}
        <div className="[container-type:inline-size]">
          <motion.p
            aria-label={`${identity.family} ${name}`}
            className="flex select-none justify-center overflow-hidden whitespace-nowrap pt-6 font-display text-[15cqw] font-extrabold leading-[0.85] tracking-[-0.05em] text-sand"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          >
            {name.split('').map((c, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`inline-block ${c === ' ' ? 'w-[0.25em]' : ''}`}
                variants={reduce ? {} : { hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 1, ease } } }}
              >
                {c === ' ' ? ' ' : c}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <div className="border-t border-sand/15 py-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sand/55">
          <span>© {new Date().getFullYear()} {identity.family} {identity.given}</span>
        </div>
      </div>
    </footer>
  )
}
