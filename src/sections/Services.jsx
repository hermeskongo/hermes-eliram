import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ServiceIcon from '../components/ServiceIcon'

const ease = [0.16, 1, 0.3, 1]
const email = content.identity.email

function totalFor(service, sel) {
  return service.base + service.options.reduce((sum, o, i) => (sel.has(i) ? sum + o.price : sum), 0)
}

function mailtoFor(service, sel) {
  const chosen = service.options.filter((_, i) => sel.has(i))
  const total = totalFor(service, sel)
  const subject = `Projet ${service.title} — estimation ~${total} €`
  const lines = chosen.map((o) => (o.price === 0 ? `- ${o.label} (offert)` : `- ${o.label} (+${o.price} €)`))
  const body = [
    'Bonjour Hermes,',
    '',
    `Service : ${service.title} (base ${service.base} €)`,
    ...lines,
    `Total indicatif : ~${total} €`,
    '',
    'Mon besoin : ',
  ].join('\n')
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Estimator({ service, sel, onToggle }) {
  const total = totalFor(service, sel)
  return (
    <div>
      {/* Options — lignes tactiles, pas de checkbox */}
      <ul className="mt-6 flex flex-col gap-2">
        {service.options.map((o, i) => {
          const on = sel.has(i)
          return (
            <li key={o.label}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(i)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left ring-1 transition-all duration-300 active:scale-[0.99] ${
                  on
                    ? 'bg-ink text-paper ring-ink shadow-[0_10px_24px_-12px_rgba(23,21,15,0.65)]'
                    : 'bg-paper/70 ring-line hover:translate-x-[2px] hover:ring-ink/40'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-base leading-none ring-1 transition-all duration-300 ${
                    on ? 'rotate-45 ring-paper/40' : 'ring-line text-muted group-hover:ring-ink/40 group-hover:text-ink'
                  }`}
                >
                  +
                </span>
                <span className="flex-1 text-[0.95rem] font-normal leading-snug">{o.label}</span>
                {o.price === 0 ? (
                  <span className="font-mono text-xs tabular">
                    {o.was && <s className={`mr-1.5 ${on ? 'text-paper/50' : 'text-muted/60'}`}>{o.was} €</s>}
                    <span className={on ? 'text-paper/90' : 'text-ink'}>offert</span>
                  </span>
                ) : (
                  <span className={`font-mono text-xs tabular ${on ? 'text-paper/80' : 'text-muted'}`}>+{o.price} €</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Total + CTA */}
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">Estimation</p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={total}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="font-display tabular text-3xl font-semibold text-ink"
            >
              ≈ {total} €
            </motion.p>
          </AnimatePresence>
        </div>
        <a
          href={mailtoFor(service, sel)}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-ink px-5 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-transform duration-150 active:scale-[0.97]"
        >
          Écrivez-moi <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const { services } = content
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState({})
  const current = services.items[active]
  const selFor = (idx) => picked[idx] || new Set()

  const toggle = (sIdx, oIdx) => {
    setPicked((prev) => {
      const next = new Set(prev[sIdx] || [])
      if (next.has(oIdx)) next.delete(oIdx)
      else next.add(oIdx)
      return { ...prev, [sIdx]: next }
    })
  }

  return (
    <Section id="services" kicker="Services" lead={services.lead} accent="#ff7b72">
      <p className="mb-10 max-w-xl font-mono text-xs leading-relaxed text-muted">{services.note}</p>

      {/* Desktop: liste ←→ carte estimateur */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ul className="dimlist">
            {services.items.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group flex w-full items-center gap-6 border-b border-line py-6 text-left"
                >
                  <span className={`font-mono text-lg tabular ${active === i ? 'text-ink' : 'text-muted'}`}>
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`font-display block text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                        active === i ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted">dès {s.base} €</span>
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="text-xl text-ink"
                    animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    →
                  </motion.span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-paper2 p-8 ring-1 ring-line">
            <span aria-hidden="true" className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[11rem] font-bold leading-none text-ink/[0.05]">
              {active + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <ServiceIcon index={active} className="h-12 w-12 text-ink" />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink">{current.title}</h3>
                    <p className="mt-0.5 text-sm font-light text-graphite">
                      {current.desc} <span className="font-mono text-xs text-muted">— dès {current.base} €</span>
                    </p>
                  </div>
                </div>
                <Estimator service={current} sel={selFor(active)} onToggle={(o) => toggle(active, o)} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Mobile: cartes empilées, chacune son estimateur */}
      <div className="flex flex-col gap-4 lg:hidden">
        {services.items.map((s, i) => (
          <Reveal as="div" key={s.title} delay={i * 0.05}>
            <div className="relative overflow-hidden rounded-2xl bg-paper2 p-6 ring-1 ring-line">
              <div className="flex items-center gap-3">
                <ServiceIcon index={i} className="h-10 w-10 shrink-0 text-ink" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-0.5 text-sm font-light text-graphite">
                    {s.desc} <span className="font-mono text-xs text-muted">— dès {s.base} €</span>
                  </p>
                </div>
              </div>
              <Estimator service={s} sel={selFor(i)} onToggle={(o) => toggle(i, o)} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
