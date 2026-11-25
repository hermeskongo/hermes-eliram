import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'
import { useLenis } from '../motion/SmoothScroll'
import { useMedia } from '../hooks/useScrub'

const ease = [0.16, 1, 0.3, 1]

/** Assombrit une couleur hexadecimale d'un facteur donne. */
function darken(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v * (1 - amount)))
  return `#${ch.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function Badge({ p }) {
  if (!p.badge) return null
  const c = p.badgeColor || '#3fb950'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.68rem] normal-case tracking-normal"
      style={{ backgroundColor: `${c}1a`, color: darken(c, 0.42), boxShadow: `inset 0 0 0 1px ${c}33` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
      {p.badge}
    </span>
  )
}

/*
  Le visuel d'un projet. Sans image (Quackbox : pas de capture a montrer), une
  couverture typographique brune, avec le meme layoutId que l'image pour que
  l'ouverture de la fiche reste fluide.
*/
function Cover({ p, className, style, transition }) {
  if (p.image) {
    return (
      <motion.img layoutId={`img-${p.name}`} src={p.image} alt={`Aperçu — ${p.name}`} loading="lazy" style={style} transition={transition} className={className} />
    )
  }
  return (
    <motion.div
      layoutId={`img-${p.name}`}
      role="img"
      aria-label={`Aperçu — ${p.name}`}
      style={style}
      transition={transition}
      className={`${className} flex flex-col items-center justify-center gap-4 bg-cocoa text-center`}
    >
      <span className="font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-none tracking-[-0.04em] text-sand">{p.name}</span>
      {p.badge && <span className="font-mono text-xs uppercase tracking-[0.2em] text-clay">{p.badge}</span>}
    </motion.div>
  )
}

function Links({ p, dark = false }) {
  const links = p.links?.length ? p.links : p.url ? [{ label: 'Voir le projet', url: p.url }] : []
  if (!links.length) return null
  return (
    <div className="flex flex-wrap gap-2.5">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className={`group/l inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-mono text-xs uppercase tracking-[0.1em] ring-1 transition-colors duration-300 ${
            dark ? 'text-sand ring-sand/25 hover:bg-sand hover:text-cocoa' : 'text-ink ring-ink/15 hover:bg-ink hover:text-paper'
          }`}
        >
          {l.label}
          <span className="transition-transform duration-300 group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5">↗</span>
        </a>
      ))}
    </div>
  )
}

/*
  Une ligne de projet. L'image se devoile au defilement : le cadre s'ouvre
  (clip-path) pendant que l'image se rapproche (echelle 1,2 → 1). Un clic sur
  l'image ouvre la fiche : l'image grandit depuis sa place jusqu'au plein ecran.
*/
function Row({ p, i, onOpen, open }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const wide = useMedia('(min-width: 768px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.55'] })
  const inset = useTransform(scrollYProgress, [0, 1], [wide ? 14 : 6, 0])
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round 1.6rem)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1])
  const flip = i % 2 === 1

  return (
    <article ref={ref} className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <motion.button
          type="button"
          onClick={() => onOpen(i)}
          data-cursor="Ouvrir"
          aria-label={`Ouvrir la fiche — ${p.name}`}
          style={reduce ? undefined : { clipPath }}
          className="group relative block aspect-[3/2] w-full overflow-hidden rounded-[1.6rem] bg-paper2"
        >
          {!open && <Cover p={p} style={reduce ? undefined : { scale }} className="absolute inset-0 h-full w-full object-cover" />}
          <span className="absolute inset-0 bg-cocoa/0 transition-colors duration-500 group-hover:bg-cocoa/15" />
          <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-lg text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100 md:hidden">
            ↗
          </span>
        </motion.button>
      </div>

      <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgb(194,65,12)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs tabular text-muted">{p.year}</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {p.category}
            <Badge p={p} />
          </div>
          <h3 className="font-display mt-3 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">{p.name}</h3>
          <p className="mt-4 line-clamp-4 text-pretty font-light leading-relaxed text-graphite">{p.blurb}</p>
          {p.participation && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-ember">
              {[p.participation.role, p.participation.duration].filter(Boolean).join(' · ')}
            </p>
          )}
          {p.tags?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full bg-paper2 px-3 py-1 font-mono text-[0.7rem] text-graphite ring-1 ring-line">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onOpen(i)}
              className="group/d inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-5 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-ember"
            >
              Détails
              <span className="transition-transform duration-300 group-hover/d:translate-x-0.5">→</span>
            </button>
            <Links p={p} />
          </div>
        </motion.div>
      </div>
    </article>
  )
}

/* La fiche ouverte : fond brun, l'image en grand (meme layoutId que la vignette). */
function Detail({ p, onClose }) {
  const lenis = useLenis()
  const closeRef = useRef(null)

  useEffect(() => {
    lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [lenis, onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      className="fixed inset-0 z-[80] overflow-y-auto bg-cocoa text-sand"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-[1240px] px-6 pb-20 pt-6 sm:px-10">
        <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between bg-cocoa/85 px-6 py-4 backdrop-blur sm:-mx-10 sm:px-10">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-sand/60">{p.category}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-mono text-xs uppercase tracking-[0.14em] ring-1 ring-sand/30 transition-colors hover:bg-sand hover:text-cocoa"
          >
            Fermer ✕
          </button>
        </div>

        <Cover p={p} className="mt-4 aspect-[3/2] w-full rounded-[1.6rem] object-cover" transition={{ duration: 0.8, ease }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-sand/60">
              {p.year}
              <Badge p={p} />
            </div>
            <h3 className="font-display mt-3 text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">{p.name}</h3>
          </div>
          <div className="md:col-span-7">
            <p className="text-pretty text-lg font-light leading-relaxed text-sand/85 sm:text-xl">{p.blurb}</p>
            {p.participation && (
              <div className="mt-8 rounded-2xl bg-black/20 p-5 ring-1 ring-sand/10 sm:p-6">
                <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-clay">Ma participation</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[p.participation.role, p.participation.duration, p.participation.status].filter(Boolean).map((t) => (
                    <li key={t} className="rounded-full bg-sand/10 px-3 py-1 font-mono text-[0.7rem] text-sand ring-1 ring-sand/20">
                      {t}
                    </li>
                  ))}
                </ul>
                {p.participation.text && (
                  <p className="mt-4 text-pretty font-light leading-relaxed text-sand/85">{p.participation.text}</p>
                )}
              </div>
            )}
            {p.install && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs ring-1 ring-sand/10">
                <span className="select-none text-clay">$</span>
                <span className="select-all whitespace-pre">{p.install}</span>
              </div>
            )}
            {p.tags?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full px-3 py-1 font-mono text-[0.7rem] text-sand/80 ring-1 ring-sand/20">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8">
              <Links p={p} dark />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { work } = content
  const [open, setOpen] = useState(null)
  const close = useRef(() => setOpen(null)).current
  const projects = work.projects

  return (
    <Section id="work" kicker="Projets" lead={work.lead}>
      <div className="space-y-24 sm:space-y-36">
        {projects.map((p, i) => (
          <Row key={p.name} p={p} i={i} onOpen={setOpen} open={open === i} />
        ))}
      </div>
      <AnimatePresence>{open !== null && <Detail key="detail" p={projects[open]} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
