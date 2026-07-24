import { motion } from 'framer-motion'
import { content } from '../content'
import Character from '../components/Character'

const ease = [0.16, 1, 0.3, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

export default function Hero() {
  const { identity } = content
  const [line1, line2] = identity.display.split('\n')

  return (
    <section
      id="top"
      className="grid min-h-[100dvh] grid-cols-1 items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
    >
      {/* Left — identity */}
      <div className="order-2 lg:order-1">
        <motion.p
          {...rise(0.55)}
          className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-muted"
        >
          <span className="text-faint">//</span> {identity.role}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,10vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-ink">
          <motion.span className="block" {...rise(0.62)}>
            {line1}
          </motion.span>
          <motion.span className="relative block" {...rise(0.72)}>
            {line2}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-1 h-4 w-[62%] text-ink"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.15, ease }}
            >
              <motion.path
                d="M4 12 C 70 4, 150 4, 214 10 C 250 13, 275 12, 296 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.9)}
          className="mt-9 max-w-md text-pretty text-lg font-light leading-relaxed text-graphite sm:text-xl"
        >
          {identity.intro}
        </motion.p>

        <motion.div {...rise(1.02)} className="mt-9 flex flex-wrap items-center gap-4">
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
      </div>

      {/* Right — illustrated character */}
      <div className="order-1 mx-auto w-full max-w-[440px] lg:order-2">
        <Character />
      </div>
    </section>
  )
}
