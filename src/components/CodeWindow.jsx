import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion'
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

  // Typing runs across the window's own travel through the viewport: it
  // starts as the top edge rises past 85% and finishes well before it leaves.
  const progress = useSectionProgress(ref, ['start 0.9', 'end 0.55'])
  const typed = useTransform(progress, [0, 1], [0, lines.length])

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
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-code-bar px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[12px] text-code-comment">{filename}</span>
        <span className="ml-auto flex items-center gap-3">
          {/* Ligne courante, comme la barre d'état d'un éditeur. */}
          <span className="tabular text-[11px] text-code-gutter">
            Ln {Math.max(1, count)}, Col 1
          </span>
          {badge && (
            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] text-code-gutter">
              {badge}
            </span>
          )}
        </span>
      </div>

      {/* body — la hauteur est réservée d'avance : rien ne saute pendant la frappe */}
      <div className="flex overflow-x-auto px-2 py-5 sm:px-4">
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
    </div>
  )
}
