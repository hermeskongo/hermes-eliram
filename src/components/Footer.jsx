import { content } from '../content'

export default function Footer() {
  const { identity } = content
  return (
    <footer className="border-t border-line py-10">
      <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <span className="font-mono text-ink">
          {identity.family} {identity.given}
        </span>
        <span className="font-light">© {new Date().getFullYear()} · Conçu &amp; codé main</span>
        <a href="#top" className="-my-3 inline-flex min-h-[44px] items-center py-3 font-mono uppercase tracking-[0.14em] transition-colors duration-200 hover:text-ink">
          Haut ↑
        </a>
      </div>
    </footer>
  )
}
