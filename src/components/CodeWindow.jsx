import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion'
import { useSectionProgress } from '../hooks/useScrub'

/*
  The signature dark code-editor window: title bar with traffic-lights + a
  filename, a line-number gutter, and syntax-highlighted lines.

  The lines no longer stagger in on a timer — they are *typed by the scroll*.
  Scroll down and the file writes itself line by line; scroll back up and it
  un-writes. It is the one animation on this page that could only belong to a
  portfolio about writing software.
*/
export default function CodeWindow({ filename = 'file.ts', badge, lines = [] }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // La frappe se joue pendant que la fenêtre traverse le haut du viewport :
  // elle démarre quand le haut entre et se termine quand il atteint le
  // milieu — le fichier est complet quand le terminal est centré.
  const progress = useSectionProgress(ref, ['start 0.9', 'start 0.45'])
  const typed = useTransform(progress, [0, 1], [0, lines.length])

  const [hint, setHint] = useState(true)
  const onScrollBody = (e) => {
    const el = e.currentTarget
    if (el.scrollLeft > 12 || el.scrollLeft + el.clientWidth >= el.scrollWidth - 12) setHint(false)
  }

  const [count, setCount] = useState(reduced ? lines.length : 0)
  useMotionValueEvent(typed, 'change', (v) => {
    if (reduced) return
    const n = Math.max(0, Math.min(lines.length, Math.round(v)))
    setCount((prev) => (prev === n ? prev : n))
  })

  return (
    <div
      ref={ref}
      className="w-full max-w-full overflow-hidden rounded-xl bg-code-bg font-mono text-[12.5px] leading-[1.9] shadow-[0_30px_80px_-30px_rgba(23,21,15,0.5)] ring-1 ring-ink/10 sm:text-[14px]"
    >
      {/* title bar — sur mobile, le nom tronque et le statut Ln/Col s'efface */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-code-bar px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        <span className="h-3 w-3 shrink-0 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 shrink-0 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 shrink-0 rounded-full bg-[#28c840]" />
        <span className="ml-2 min-w-0 flex-1 truncate text-[11px] text-code-comment sm:text-[12px]">{filename}</span>
        <span className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Ligne courante, comme la barre d'état d'un éditeur. Masquée sur mobile. */}
          <span className="hidden tabular text-[11px] text-code-gutter sm:inline">
            Ln {Math.max(1, count)}, Col 1
          </span>
          {badge && (
            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] text-code-gutter sm:text-[11px]">
              {badge}
            </span>
          )}
        </span>
      </div>

      {/* body — la hauteur est réservée d'avance : rien ne saute pendant la frappe */}
      <div className="relative">
        <div className="flex overflow-x-auto px-2 py-5 sm:px-4" onScroll={onScrollBody}>
          <div className="select-none pr-4 text-right sm:pr-6">
            {lines.map((_, i) => (
              <div
                key={i}
                className={`transition-colors duration-200 ${
                  i < count ? 'text-code-gutter' : 'text-code-gutter/25'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="min-w-0 text-code-text">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`relative whitespace-pre transition-opacity duration-200 ${
                  i < count ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {line || ' '}
                {/* Le curseur suit la dernière ligne écrite. */}
                {!reduced && i === count - 1 && (
                  <motion.span
                    layoutId="code-caret"
                    className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.16em] bg-code-text/80"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indice de scroll horizontal, mobile uniquement — s'efface au premier geste */}
        <AnimatePresence>
          {hint && !reduced && (
            <>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-code-bg to-transparent sm:hidden"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="absolute bottom-2 right-3 font-mono text-[10px] tracking-wide text-code-gutter sm:hidden"
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.4 }}
              >
                swipe →
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
