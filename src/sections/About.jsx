import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

export default function About() {
  const { about } = content
  return (
    <Section id="about" kicker="À propos" lead={about.lead} accent="#7ee787">
      <div className="max-w-3xl space-y-6">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-pretty text-xl font-light leading-relaxed text-graphite sm:text-2xl">
              {p}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
