import { content } from '../content'

export default function Footer() {
  const { identity } = content
  return (
    <footer className="border-t border-line py-10">
      <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <span className="font-mono text-ink">
          {identity.family} {identity.given}
        </span>
        <span className="font-light">© 2025 · Conçu &amp; codé main</span>
        <a href="#top" className="font-mono uppercase tracking-[0.14em] transition-colors duration-200 hover:text-ink">
          Haut ↑
        </a>
      </div>
    </footer>
  )
}
