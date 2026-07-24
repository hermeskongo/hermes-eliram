import Reveal from './Reveal'

// Light section shell: a mono kicker with a colored underline (the B-style
// accent), then a large display heading. Children render below.
export default function Section({ id, kicker, lead, accent = '#ff7b72', children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-line py-20 sm:py-28 ${className}`}>
      <Reveal className="mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-faint">//</span> {kicker}
        </span>
        <span
          aria-hidden="true"
          className="mt-2 block h-[3px] w-10 rounded-full"
          style={{ background: accent }}
        />
        {lead && (
          <h2 className="font-display mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl md:text-[2.7rem]">
            {lead}
          </h2>
        )}
      </Reveal>
      {children}
    </section>
  )
}
