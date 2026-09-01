import { useEffect, useState } from 'react'
import { content } from '../content'

export default function Header() {
  const { identity, nav } = content
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="-my-2 inline-flex min-h-[44px] items-center py-2 font-mono text-lg font-bold tracking-tight text-ink" aria-label="Haut de page">
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

        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:inline">
            {identity.status}
          </span>
        </div>
      </div>
    </header>
  )
}
