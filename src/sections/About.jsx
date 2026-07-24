import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Stat from '../components/Stat'

export default function About() {
  const { about } = content
  return (
    <Section id="about" kicker="À propos" lead={about.lead} accent="#7ee787">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="max-w-2xl text-pretty text-xl font-light leading-relaxed text-graphite sm:text-2xl">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="flex gap-12 border-t border-line pt-8 lg:flex-col lg:gap-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {about.metrics.map((m) => (
              <Stat key={m.label} {...m} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
