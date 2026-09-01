import { forwardRef, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content } from '../content'
import { useMedia } from '../hooks/useScrub'

const ease = [0.16, 1, 0.3, 1]

/*
  Le menu mobile ne glisse pas depuis un cote comme un tiroir d'application :
  la page est editoriale, le menu l'est aussi. Il remplace la page par un
  sommaire — les sections numerotees, composees dans la meme graisse que les
  titres, puis les coordonnees en bas. Le bouton reste en place et se
  transforme, pour qu'on sache toujours ou fermer.
*/
const Burger = forwardRef(function Burger({ open, ...props }, ref) {
  const bar = 'absolute left-0 h-[1.5px] w-full origin-center bg-ink transition-transform duration-300 ease-out'
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="menu-mobile"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      ref={ref}
      className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
      {...props}
    >
      <span aria-hidden="true" className="relative block h-[9px] w-[22px]">
        <span className={`${bar} top-0 ${open ? 'translate-y-[3.75px] rotate-45' : ''}`} />
        <span className={`${bar} bottom-0 ${open ? '-translate-y-[3.75px] -rotate-45' : ''}`} />
      </span>
    </button>
  )
})

function MenuPanel({ nav, identity, onClose }) {
  const panelRef = useRef(null)
  const reduced = useReducedMotion()

  // A l'ouverture le focus entre dans le sommaire, sinon la tabulation
  // repartirait dans la page cachee derriere lui.
  useEffect(() => {
    panelRef.current?.querySelector('a[href]')?.focus({ preventScroll: true })
  }, [])

  // Piege a focus : tant que le sommaire est ouvert, la tabulation y reste.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const items = panelRef.current?.querySelectorAll('a[href], button')
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const step = reduced ? 0 : 0.055

  return (
    <motion.div
      id="menu-mobile"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.22, ease } }}
      transition={{ duration: 0.28, ease }}
      className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-6 pb-10 pt-24 md:hidden"
    >
      <nav aria-label="Sections" className="flex-1">
        <ul>
          {nav.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 + i * step, ease }}
              className="border-b border-line"
            >
              <a
                href={`#${n.id}`}
                onClick={onClose}
                className="flex items-baseline gap-4 py-4 text-ink"
              >
                <span aria-hidden="true" className="font-mono text-xs tabular text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl font-semibold tracking-[-0.02em]">{n.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.06 + nav.length * step, ease }}
        className="mt-10"
      >
        <a
          href={`mailto:${identity.email}`}
          onClick={onClose}
          className="inline-flex min-h-[44px] items-center font-mono text-sm text-graphite underline decoration-line underline-offset-4"
        >
          {identity.email}
        </a>
        <ul className="mt-2 flex flex-wrap gap-x-6">
          {identity.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="-my-2 inline-flex min-h-[44px] items-center py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function Header() {
  const { identity, nav } = content
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const wide = useMedia('(min-width: 768px)')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
    Repère de lecture : la section la plus haute qui coupe le tiers supérieur
    de l'écran est celle qu'on lit. Un IntersectionObserver suffit — pas de
    calcul de position à chaque frame de défilement.
  */
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean)
    if (!sections.length) return

    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
        // La *dernière* section qui coupe la bande, pas la première : deux
        // sections s'y chevauchent au moment du passage, et c'est celle où
        // l'on entre qui compte.
        const ids = nav.map((n) => n.id).filter((id) => seen.get(id))
        setActive(ids.length ? ids[ids.length - 1] : null)
      },
      { rootMargin: '-18% 0px -70% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [nav])

  // Le menu ouvert gele la page derriere lui, et rend le focus au bouton en
  // se fermant. Passer en format large le referme : sa place est prise par la
  // navigation en ligne.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      burgerRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (wide) setOpen(false)
  }, [wide])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled && !open ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="-my-2 inline-flex min-h-[44px] items-center py-2 font-mono text-lg font-bold tracking-tight text-ink"
            aria-label="Haut de page"
          >
            HK<span aria-hidden="true" className="text-faint">_</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {nav.map((n) => {
              const on = active === n.id
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`relative -my-3 inline-flex min-h-[44px] items-center py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-ink ${
                    on ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {n.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-2 left-0 h-px bg-ink transition-all duration-300 ease-out ${
                      on ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
              </span>
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:inline">
                {identity.status}
              </span>
            </span>
            <Burger ref={burgerRef} open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MenuPanel key="menu" nav={nav} identity={identity} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
