import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/*
  Un titre qui se revele mot par mot : chaque mot monte depuis sous sa propre
  ligne (masque), en cascade, quand le titre entre a l'ecran.

  Les mots entoures d'asterisques (*croissance*) sont composes en italique serif
  orange : c'est la seule fantaisie typographique du site, et elle porte le sens.
*/
export function parseAccent(text) {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part) =>
    part.startsWith('*') ? { t: part.slice(1, -1), em: true } : { t: part, em: false }
  )
}

export function Accent({ children }) {
  return <em className="font-serif font-normal italic tracking-normal text-[var(--accent,#C2410C)]">{children}</em>
}

/** Texte avec accents, sans animation (paragraphes). */
export function Rich({ text }) {
  return parseAccent(text).map((p, i) => (p.em ? <Accent key={i}>{p.t}</Accent> : <span key={i}>{p.t}</span>))
}

export default function RevealText({ text, as = 'h2', className = '', delay = 0, stagger = 0.045, animateOnLoad = false }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.h2
  const words = parseAccent(text).flatMap((p) =>
    p.t.split(/(\s+)/).filter((w) => w.length).map((w) => ({ w, em: p.em }))
  )
  const plain = parseAccent(text).map((p) => p.t).join('')

  if (reduce) {
    return (
      <Tag className={className}>
        <Rich text={text} />
      </Tag>
    )
  }

  const trigger = animateOnLoad
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.5 } }

  return (
    <Tag
      className={className}
      aria-label={plain}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ w, em }, i) =>
        /^\s+$/.test(w) ? (
          <span key={i} aria-hidden="true">
            {w}
          </span>
        ) : (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '105%', rotate: 3 },
                show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {em ? <Accent>{w}</Accent> : w}
            </motion.span>
          </span>
        )
      )}
    </Tag>
  )
}
