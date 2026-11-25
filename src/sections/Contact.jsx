import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content'
import Magnetic from '../motion/Magnetic'
import { parseAccent } from '../motion/RevealText'

const ease = [0.16, 1, 0.3, 1]

/*
  Le bloc orange du contact. En entrant a l'ecran il s'elargit jusqu'aux bords
  (echelle 0,9 → 1, coins qui s'adoucissent), comme une page qui se pose. Le
  titre monte mot par mot ; le grand bouton rond est aimante.
*/
export default function Contact() {
  const { contact, identity } = content
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [72, 28])
  const n = content.nav.findIndex((x) => x.id === 'contact') + 1
  const words = parseAccent(contact.lead).flatMap((p) => p.t.split(' ').filter(Boolean).map((w) => ({ w, em: p.em })))

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 overflow-x-clip px-3 py-16 sm:px-5 sm:py-24">
      <motion.div
        style={reduce ? { borderRadius: 28 } : { scale, borderRadius: radius }}
        className="relative mx-auto max-w-[1600px] overflow-hidden bg-ember px-6 py-20 text-paper sm:px-12 sm:py-28"
      >
        {/* grain + grand cercle decoratif */}
        <div className="tex-paper pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-paper/20" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full border border-paper/15" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-paper/75">
            <span className="tabular">{String(n).padStart(2, '0')}</span>
            <span className="h-px w-16 bg-paper/50" aria-hidden="true" />
            <span>Contact</span>
          </div>

          <div className="mt-8 grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <motion.h2
                className="font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
                aria-label={parseAccent(contact.lead).map((p) => p.t).join('')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              >
                {words.map(({ w, em }, i) => (
                  <span key={i} aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      className={`inline-block ${em ? 'font-serif font-normal italic tracking-normal text-cocoa' : ''}`}
                      variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease } } }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
              <p className="mt-8 max-w-lg text-pretty text-xl font-light text-paper/90">{contact.body}</p>
              <a
                href={`mailto:${identity.email}`}
                className="group mt-8 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.2rem,3.6vw,2.4rem)] font-semibold tracking-[-0.02em]"
              >
                <span className="relative truncate">
                  {identity.email}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-paper transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
                <li>
                  <a
                    href={identity.cv.url}
                    download={identity.cv.filename}
                    className="inline-flex min-h-[44px] items-center font-mono text-sm uppercase tracking-[0.14em] text-paper transition-colors hover:text-cocoa"
                  >
                    CV (PDF) ↓
                  </a>
                </li>
                {identity.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center font-mono text-sm uppercase tracking-[0.14em] text-paper/80 transition-colors hover:text-paper"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Magnetic strength={0.45} className="justify-self-start lg:justify-self-end">
              <a
                href={`mailto:${identity.email}`}
                data-cursor="Écrire"
                className="group grid h-40 w-40 place-items-center rounded-full bg-cocoa text-sand shadow-[0_30px_60px_-25px_rgba(36,21,13,0.8)] transition-transform duration-500 hover:scale-105 sm:h-48 sm:w-48"
              >
                <span className="flex flex-col items-center gap-1 font-mono text-sm uppercase tracking-[0.14em]">
                  <span className="text-2xl transition-transform duration-500 group-hover:rotate-45">↗</span>
                  Démarrer
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
