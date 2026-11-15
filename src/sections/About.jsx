import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'
import Stat from '../components/Stat'

/*
  A propos : a gauche, trois reperes en tres grands chiffres qui se comptent a
  l'arrivee ; a droite les paragraphes, dont chaque mot s'allume a mesure qu'on
  lit (opacite liee a la position dans l'ecran). On lit au rythme du defilement.
*/
function ScrollWords({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  if (reduce) return <p ref={ref}>{text}</p>
  return (
    <p ref={ref} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  )
}

export default function About() {
  const { about, identity } = content
  return (
    <Section id="about" kicker="À propos" lead={about.lead}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:self-start">
          {identity.stats.map((s) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
        <div className="space-y-8 text-pretty text-[clamp(1.25rem,2vw,1.65rem)] font-light leading-relaxed text-ink">
          {about.paragraphs.map((p, i) => (
            <ScrollWords key={i} text={p} />
          ))}
        </div>
      </div>
    </Section>
  )
}
