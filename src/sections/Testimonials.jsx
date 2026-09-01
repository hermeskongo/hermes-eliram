import { content } from '../content'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

/*
  Les avis clients, traites comme des citations d'article : la phrase forte
  prend la place du titre de section, les avis se lisent dessous, separes par
  un filet. La liste grandit sans changer de forme — un avis se lit comme une
  colonne, cinq se lisent comme une page. Les etoiles restent a l'encre pour
  ne pas casser le monochrome (la couleur vit dans les panneaux de code).
*/

function Stars({ n }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`Note : ${n} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-ink">
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.7L12 17.7 6.1 20.9l1.2-6.7-4.8-4.7 6.6-.9z" />
        </svg>
      ))}
    </span>
  )
}

function Entry({ t, first }) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 ${
        first ? '' : 'mt-14 border-t border-line pt-14'
      }`}
    >
      <Reveal>
        <blockquote
          cite={t.source?.url}
          lang={t.lang}
          className="max-w-2xl text-pretty border-l-2 border-line pl-6 text-lg font-light leading-relaxed text-graphite sm:text-xl"
        >
          {t.quote}
        </blockquote>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex items-center gap-3">
            <Stars n={t.rating} />
            <span className="font-mono text-sm tabular text-muted">{t.rating.toFixed(1)} / 5</span>
          </div>
          <p className="font-display mt-5 text-2xl font-semibold tracking-tight text-ink">{t.author}</p>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{t.meta}</p>
          {t.source && (
            <a
              href={t.source.url}
              target="_blank"
              rel="noreferrer"
              className="group -my-3 mt-4 inline-flex min-h-[44px] items-center gap-1.5 py-3 font-mono text-sm text-graphite underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
            >
              {t.source.label}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </Reveal>
    </div>
  )
}

export default function Testimonials() {
  const { testimonials: t } = content
  if (!t?.items?.length) return null
  return (
    <Section id="avis" kicker={t.kicker} lead={`« ${t.pull} »`} accent="#d2a8ff">
      {t.items.map((item, i) => (
        <Entry key={`${item.author}-${i}`} t={item} first={i === 0} />
      ))}
    </Section>
  )
}
