import { Fragment } from 'react'
import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import CodeWindow from '../components/CodeWindow'

const ACCENTS = {
  frontend: '#79c0ff',
  mobile: '#7ee787',
  backend: '#ffa657',
  tools: '#ff7b72',
}

function Logo({ item }) {
  return (
    <span className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-4 py-2.5 ring-1 ring-line transition-colors duration-300 hover:bg-white">
      <span className="relative h-5 w-5">
        {item.raster ? (
          // Raster brand logos (webp): desaturated at rest, full colour on hover.
          <img
            src={`/logos/${item.slug}.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={`/logos/${item.slug}.svg`}
              alt=""
              className="absolute inset-0 h-full w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-0"
              loading="lazy"
            />
            <img
              src={`/logos/${item.slug}-color.svg`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              loading="lazy"
            />
          </>
        )}
      </span>
      <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-ink">
        {item.name}
      </span>
    </span>
  )
}

export default function Expertise() {
  const { expertise } = content
  const g = expertise.groups
  const kw = Math.max(...g.map((x) => x.key.length))

  const lines = [
    <span className="text-code-comment">// stack &amp; expertise — de l'idée à la prod</span>,
    <>
      <span className="text-code-kw">export const</span> <span className="text-code-fn">hermes</span> = {'{'}
    </>,
    ...g.map((grp) => (
      <>
        {'  '}
        <span className="text-code-fn">{grp.key.padEnd(kw)}</span>: [
        {grp.items.map((it, idx) => (
          <Fragment key={it}>
            <span className="text-code-str">'{it}'</span>
            {idx < grp.items.length - 1 ? ', ' : ''}
          </Fragment>
        ))}
        ],
      </>
    )),
    <>
      {'}'} <span className="text-code-kw">satisfies</span> <span className="text-code-fn">Expertise</span>
    </>,
    ' ',
    <span className="text-code-comment">// web &amp; mobile · de bout en bout</span>,
  ]

  return (
    <Section id="expertise" kicker="Expertise" lead={expertise.lead} tone="cocoa" className="[--accent:#F08A4B]">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <Reveal soft>
          <CodeWindow filename={expertise.filename} badge="TypeScript" lines={lines} />
        </Reveal>

        <Reveal soft delay={0.1}>
          <div className="flex flex-col gap-7">
            {g.map((grp) => (
              <div key={grp.key}>
                <div className="inline-block">
                  <span className="font-display text-xl font-semibold text-sand">{grp.label}</span>
                  <span
                    className="mt-1 block h-[3px] w-full rounded-full"
                    style={{ background: ACCENTS[grp.key] }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs leading-relaxed text-sand/60">
                  {grp.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Deux bandes de logos qui defilent en sens inverse ; elles s'arretent
          au survol (pour lire) et restent immobiles sous « animations reduites ». */}
      <div className="marquee-mask mt-16 space-y-3 border-t border-sand/15 pt-10">
        {[false, true].map((reverse) => (
          <div key={String(reverse)} className="marquee group/m overflow-hidden">
            <div className={`marquee-track flex w-max gap-2.5 ${reverse ? 'marquee-reverse' : ''}`}>
              {[...expertise.logos, ...expertise.logos].map((l, i) => (
                <span key={i} aria-hidden={i >= expertise.logos.length || undefined}>
                  <Logo item={l} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
