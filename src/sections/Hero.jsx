import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { content } from '../content'
import Character from '../components/Character'
import { useScrub, useMedia } from '../hooks/useScrub'

const ease = [0.16, 1, 0.3, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})
// Variante mobile : le texte est sous l'image, donc l'entrée se joue à
// l'apparition à l'écran plutôt qu'au chargement (déjà passé quand on scrolle).
const view = (delay) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.7, delay, ease },
})

// Signature hero : le nom arrive lettre par lettre, léger voile qui se
// dissipe — puis l'intro et les CTA suivent en fondu propre.
const nameWrap = (delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
})
const letter = {
  hidden: { opacity: 0, y: '0.55em', filter: 'blur(6px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 0.7, ease } },
}

function Name({ text, delay, timed }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className="block">{text}</span>
  return (
    <motion.span
      className="block overflow-hidden pb-2"
      variants={nameWrap(delay)}
      initial="hidden"
      {...(timed
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.6 } })}
      aria-label={text}
    >
      {text.split('').map((c, i) => (
        <motion.span key={i} variants={letter} className="inline-block will-change-transform" aria-hidden="true">
          {c}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const { identity } = content
  const [line1, line2] = identity.display.split('\n')

  const ref = useRef(null)
  /*
    Le hero ne s'efface plus au defilement : l'ancienne version tombait a zero
    alors qu'un quart de la section etait encore a l'ecran — pire sur mobile,
    ou le hero depasse la hauteur de l'ecran et disparaissait avant d'avoir ete
    lu. Il reste donc entierement opaque ; seule une legere derive verticale
    distingue le texte de l'illustration, et uniquement sur grand ecran, la ou
    la section tient exactement dans la fenetre.
  */
  const wide = useMedia('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useScrub(scrollYProgress, [0, 1], [0, -56], 0)
  const charY = useScrub(scrollYProgress, [0, 1], [0, -18], 0)

  return (
    <section
      ref={ref}
      id="top"
      className="grid min-h-[100dvh] grid-cols-1 items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
    >
      {/* Left — identity */}
      <motion.div style={{ y: wide ? textY : 0 }} className="order-2 lg:order-1">
        <motion.p
          {...(wide ? rise(1.95) : view(0))}
          className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-muted"
        >
          <span aria-hidden="true" className="text-faint">//</span> {identity.role}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,10vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-ink">
          <Name text={line1} delay={wide ? 2.0 : 0.1} timed={wide} />
          <span className="relative block">
            <Name text={line2} delay={wide ? 2.2 : 0.3} timed={wide} />
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-1 h-4 w-[62%] text-ink"
              initial={{ opacity: 0, pathLength: 0 }}
              {...(wide
                ? { animate: { opacity: 1, pathLength: 1 } }
                : { whileInView: { opacity: 1, pathLength: 1 }, viewport: { once: true, amount: 0.6 } })}
              transition={{ duration: 0.9, delay: wide ? 2.9 : 0.7, ease }}
            >
              <motion.path
                d="M4 12 C 70 4, 150 4, 214 10 C 250 13, 275 12, 296 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        </h1>

        <motion.p
          {...(wide ? rise(2.7) : view(0.35))}
          className="mt-9 max-w-md text-pretty text-lg font-light leading-relaxed text-graphite sm:text-xl"
        >
          {identity.intro}
        </motion.p>

        <motion.div {...(wide ? rise(2.85) : view(0.5))} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group inline-flex min-h-[48px] items-center gap-3 rounded-full bg-ink px-6 font-mono text-sm uppercase tracking-[0.1em] text-paper transition-transform duration-150 active:scale-[0.97]"
          >
            Voir les projets
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </a>
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex min-h-[48px] items-center font-mono text-sm tracking-tight text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
          >
            {identity.email}
          </a>
        </motion.div>
      </motion.div>

      {/* Right — illustrated character */}
      <motion.div
        style={{ y: wide ? charY : 0 }}
        className="order-1 mx-auto w-full max-w-[440px] lg:order-2"
      >
        <Character />
      </motion.div>
    </section>
  )
}
