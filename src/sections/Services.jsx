import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ServiceIcon from '../components/ServiceIcon'

const ease = [0.16, 1, 0.3, 1]

export default function Services() {
  const { services } = content
  const [active, setActive] = useState(0)
  const current = services.items[active]

  return (
    <Section id="services" kicker="Services" lead={services.lead} accent="#ff7b72">
      {/* Desktop: selectable list ←→ animated detail card */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ul className="dimlist">
            {services.items.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group flex w-full items-center gap-6 border-b border-line py-7 text-left"
                >
                  <span className={`font-mono text-lg tabular ${active === i ? 'text-ink' : 'text-faint'}`}>
                    {i + 1}
                  </span>
                  <span
                    className={`font-display flex-1 text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                      active === i ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {s.title}
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
          <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-paper2 p-10 ring-1 ring-line">
            <span className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[11rem] font-bold leading-none text-ink/[0.05]">
              {active + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="relative flex h-full flex-col"
              >
                <ServiceIcon index={active} className="h-16 w-16 text-ink" />
                <h3 className="font-display mt-8 text-3xl font-semibold text-ink">{current.title}</h3>
                <p className="mt-4 max-w-md text-pretty text-lg font-light leading-relaxed text-graphite">
                  {current.desc}
                </p>
                <span className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.3em] text-faint">
                  Service {active + 1} / {services.items.length}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {services.items.map((s, i) => (
          <Reveal as="div" key={s.title} delay={i * 0.05}>
            <div className="relative overflow-hidden rounded-2xl bg-paper2 p-6 ring-1 ring-line">
              <span className="font-display pointer-events-none absolute -right-1 -top-4 text-7xl font-bold leading-none text-ink/[0.06]">
                {i + 1}
              </span>
              <ServiceIcon index={i} className="h-11 w-11 text-ink" />
              <h3 className="font-display relative mt-5 text-2xl font-semibold text-ink">{s.title}</h3>
              <p className="relative mt-2 text-pretty font-light leading-relaxed text-graphite">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
