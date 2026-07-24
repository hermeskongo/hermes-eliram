import { useEffect, useState } from 'react'
import { content } from '../content'

export default function Header() {
  const { identity, nav } = content
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="font-mono text-lg font-bold tracking-tight text-ink" aria-label="Haut de page">
          HK<span className="text-faint">_</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
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
