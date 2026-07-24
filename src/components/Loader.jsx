import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Page-load intro: a short terminal "boot" over a paper panel that wipes up to
// reveal the site. Once per load; skipped under reduced-motion; click to skip.
export default function Loader() {
  const [phase, setPhase] = useState('boot')
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone')
      return
    }
    document.body.style.overflow = 'hidden'
    let raf = 0
    let start = null
    const dur = 1050
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / dur, 1)
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    const t1 = setTimeout(() => setPhase('exit'), 1350)
    const t2 = setTimeout(() => setPhase('gone'), 1900)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (phase === 'gone') document.body.style.overflow = ''
  }, [phase])

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
          onClick={() => phase === 'boot' && setPhase('exit')}
          initial={{ y: 0 }}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="tex-paper pointer-events-none absolute inset-0" />
          <motion.div
            className="relative flex flex-col items-center gap-5"
            animate={phase === 'exit' ? { opacity: 0, y: -12 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="caret font-mono text-2xl font-bold text-ink">~/hermes</span>
            <div className="flex w-56 items-center gap-3">
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-9 text-right font-mono text-xs tabular text-muted">{pct}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
