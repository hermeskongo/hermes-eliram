import { useRef } from 'react'
import { motion } from 'framer-motion'
import { content } from '../content'
import RevealText from '../motion/RevealText'
import { useSectionProgress, useScrub } from '../hooks/useScrub'

/*
  Enveloppe des sections claires : un numero et une etiquette en mono, un trait
  orange qui se trace a mesure que le titre monte dans l'ecran, puis le titre,
  revele mot par mot. Le numero suit l'ordre de la navigation. `tone` choisit le
  fond pour rythmer la page : paper (clair), dune (sable), cocoa (brun), olive.
  `dark` reste un raccourci pour cocoa.
*/
const TONES = {
  paper: '',
  dune: 'bg-dune text-ink',
  cocoa: 'bg-cocoa text-sand',
  olive: 'bg-olive text-sand',
}

export default function Section({ id, kicker, lead, children, className = '', wide = false, dark: darkProp = false, tone }) {
  const t = tone || (darkProp ? 'cocoa' : 'paper')
  const dark = t === 'cocoa' || t === 'olive'
  const headRef = useRef(null)
  const progress = useSectionProgress(headRef, ['start 0.95', 'start 0.4'])
  const width = useScrub(progress, [0, 1], [0, 64], 64)
  const n = content.nav.findIndex((x) => x.id === id) + 1

  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${TONES[t]} ${className}`}>
      <div className={`mx-auto px-6 sm:px-10 ${wide ? 'max-w-[1400px]' : 'max-w-[1240px]'}`}>
        <div ref={headRef} className="mb-12 sm:mb-16">
          <div className={`flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] ${dark ? 'text-sand/60' : 'text-muted'}`}>
            {n > 0 && <span className={`tabular ${dark ? 'text-clay' : 'text-ember'}`}>{String(n).padStart(2, '0')}</span>}
            <motion.span aria-hidden="true" className={`block h-px ${dark ? 'bg-clay' : 'bg-ember'}`} style={{ width }} />
            <span>{kicker}</span>
          </div>
          {lead && (
            <RevealText
              text={lead}
              className={`font-display mt-6 max-w-4xl text-balance text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] ${dark ? 'text-sand' : 'text-ink'}`}
            />
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
