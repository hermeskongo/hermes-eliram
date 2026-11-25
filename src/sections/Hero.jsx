import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { content } from '../content'
import Orbit from '../components/Orbit'
import Magnetic from '../motion/Magnetic'
import RevealText from '../motion/RevealText'
import { useIntroDone } from '../motion/intro'
import { useScrub, useMedia } from '../hooks/useScrub'

const ease = [0.16, 1, 0.3, 1]

/*
  Premier ecran : a gauche, le nom en tres grand, qui s'ecrit lettre par lettre
  a la fin de l'ouverture, puis la phrase (mots d'accent en italique orange),
  puis les deux boutons. A droite, l'orbite : le portrait au centre, ses outils
  qui gravitent autour. Au defilement, texte et orbite s'ecartent legerement
  (profondeur), sur grand ecran seulement.
*/
function Name({ text, go, delay }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className="block">{text}</span>
  return (
    <motion.span
      className="block overflow-hidden pb-[0.06em]"
      aria-label={text}
      initial="hidden"
      animate={go ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { y: '110%', rotate: 8 },
            show: { y: '0%', rotate: 0, transition: { duration: 1, ease } },
          }}
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  )
}

const fade = (go, delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: go ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  transition: { duration: 0.9, delay, ease },
})

export default function Hero() {
  const { identity } = content
  const [line1, line2] = identity.display.split('\n')
  const go = useIntroDone()
  const wide = useMedia('(min-width: 1024px)')

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useScrub(scrollYProgress, [0, 1], [0, -90], 0)
  const deckY = useScrub(scrollYProgress, [0, 1], [0, 60], 0)
  const deckR = useScrub(scrollYProgress, [0, 1], [0, -4], 0)

  return (
    <section
      ref={ref}
      id="top"
      className="relative mx-auto grid min-h-[100dvh] max-w-[1240px] grid-cols-1 items-center gap-14 px-6 pb-20 pt-28 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
    >
      <motion.div style={{ y: wide ? textY : 0 }}>
        <motion.p {...fade(go, 0)} className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-8 bg-ember" aria-hidden="true" />
          {identity.role}
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,11vw,8.2rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-ink">
          <Name text={line1} go={go} delay={0.05} />
          <Name text={line2} go={go} delay={0.25} />
        </h1>

        <div className="mt-8 max-w-xl">
          {go && (
            <RevealText
              as="p"
              animateOnLoad
              delay={0.55}
              stagger={0.03}
              text={identity.tagline}
              className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-graphite"
            />
          )}
        </div>

        <motion.div {...fade(go, 0.9)} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-ink px-7 font-mono text-sm uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-cocoa"
            >
              Voir les projets
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-ember pl-6 pr-2 font-mono text-sm uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-ember2"
            >
              Démarrer un projet
              <span className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ember transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={identity.cv.url}
              download={identity.cv.filename}
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full px-6 font-mono text-sm uppercase tracking-[0.1em] text-ink ring-1 ring-ink/25 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {identity.cv.label}
              <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: wide ? deckY : 0, rotate: wide ? deckR : 0 }} className="w-full">
        <Orbit go={go} portrait={{ src: '/personal-brand.webp', alt: 'Portrait de Hermes' }} />
      </motion.div>
    </section>
  )
}
