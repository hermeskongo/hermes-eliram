import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'

/*
  Parcours : une frise verticale pilotee par le defilement, dans les deux sens.
  Un trait suit la lecture : il se remplit en orange jusqu'a une ligne de
  reperage placee a 55 % de la hauteur de l'ecran. Chaque etape s'allume quand
  cette ligne la franchit (point orange qui grossit et prend un halo, texte qui
  passe de pale a plein) et s'eteint quand on remonte. Rien n'est declenche une
  fois pour toutes : tout est une fonction de la position dans la page.

  Le trait va du premier au dernier point (hauteur mesuree, recalculee au
  redimensionnement). Si le visiteur prefere moins de mouvement, tout est
  affiche allume, sans animation.
*/
const MARK = 0.55 // la ligne de repere, en fraction de la hauteur d'ecran
const DOT_TOP = '0.55rem' // le point est un peu sous le haut de l'etape
const LIT = '#C2410C'
const DIM = '#a8a293'

function Step({ s, reduce }) {
  const ref = useRef(null)
  // 0 quand le haut de l'etape est 10 % sous la ligne de repere, 1 quand il l'a franchie.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: [`start ${MARK + 0.06}`, `start ${MARK - 0.04}`] })

  const dotColor = useTransform(p, [0, 1], [DIM, LIT])
  const dotScale = useTransform(p, [0, 1], [1, 1.45])
  const halo = useTransform(
    p,
    [0, 1],
    [
      '0 0 0 4px rgba(242,240,234,1), 0 0 0 4px rgba(194,65,12,0)',
      '0 0 0 4px rgba(242,240,234,1), 0 0 0 10px rgba(194,65,12,0.22)',
    ]
  )
  const body = useTransform(p, [0, 1], [0.32, 1])
  const lift = useTransform(p, [0, 1], [14, 0])

  const lit = reduce
  return (
    <li
      ref={ref}
      className="relative grid grid-cols-1 gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0"
    >
      <motion.span
        aria-hidden="true"
        style={{
          top: DOT_TOP,
          backgroundColor: lit ? LIT : dotColor,
          scale: lit ? 1 : dotScale,
          boxShadow: lit ? '0 0 0 4px #f2f0ea' : halo,
        }}
        className="absolute left-0 z-10 h-[11px] w-[11px] rounded-full md:left-[11rem]"
      />
      <motion.p
        style={{ opacity: lit ? 1 : body }}
        className="font-mono text-xs uppercase tracking-[0.16em] text-muted md:pr-6 md:pt-2 md:text-right"
      >
        {s.period}
      </motion.p>
      <motion.div style={lit ? undefined : { opacity: body, y: lift }} className="md:pl-10">
        <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">{s.title}</h3>
        <p className="mt-3 max-w-2xl text-pretty font-light leading-relaxed text-graphite">{s.text}</p>
        {s.link && (
          <a
            href={s.link.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember"
          >
            {s.link.label} <span aria-hidden="true">↗</span>
          </a>
        )}
        {s.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <li key={t} className="rounded-full bg-paper2 px-3 py-1 font-mono text-[0.7rem] text-graphite ring-1 ring-line">
                {t}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </li>
  )
}

export default function Parcours() {
  const { parcours } = content
  const reduce = useReducedMotion()
  const olRef = useRef(null)
  const trackRef = useRef(null)
  const [trackH, setTrackH] = useState(0)

  // Le trait va du premier au dernier point : on mesure l'ecart entre les deux.
  useLayoutEffect(() => {
    const ol = olRef.current
    if (!ol) return
    const measure = () => {
      const items = ol.children
      if (items.length < 2) return setTrackH(0)
      setTrackH(items[items.length - 1].offsetTop - items[0].offsetTop)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ol)
    return () => ro.disconnect()
  }, [parcours.steps.length])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: [`start ${MARK}`, `end ${MARK}`] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="parcours" kicker="Parcours" lead={parcours.lead}>
      <div className="relative">
        <div
          ref={trackRef}
          aria-hidden="true"
          style={{ top: DOT_TOP, height: trackH }}
          className="absolute left-[5px] w-px bg-line md:left-[calc(11rem+5px)]"
        >
          <motion.div
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute inset-0 origin-top bg-ember"
          />
        </div>
        <ol ref={olRef} className="relative">
          {parcours.steps.map((s) => (
            <Step key={s.title} s={s} reduce={reduce} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
