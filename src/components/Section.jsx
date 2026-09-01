import { useRef } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { useSectionProgress, useScrub } from '../hooks/useScrub'

// Light section shell: a mono kicker with a colored underline (the B-style
// accent), then a large display heading. Children render below.
//
// L'accent ne se contente plus d'apparaître : il se dessine à mesure que le
// titre traverse le haut de l'écran, comme un trait tiré à la règle.
export default function Section({ id, kicker, lead, accent = '#ff7b72', children, className = '' }) {
  const headRef = useRef(null)
  const progress = useSectionProgress(headRef, ['start 0.92', 'start 0.45'])
  const width = useScrub(progress, [0, 1], [0, 40], 40)

  return (
    <section id={id} className={`scroll-mt-24 border-t border-line py-20 sm:py-28 ${className}`}>
      <Reveal className="mb-12 sm:mb-16">
        <div ref={headRef}>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="text-faint">//</span> {kicker}
          </span>
          <motion.span
            aria-hidden="true"
            className="mt-2 block h-[3px] rounded-full"
            style={{ background: accent, width }}
          />
        </div>
        {lead && (
          <h2 className="font-display mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl md:text-[2.7rem]">
            {lead}
          </h2>
        )}
      </Reveal>
      {children}
    </section>
  )
}
