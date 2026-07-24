import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts 0 → value once on reveal. tabular-nums keeps the layout from jittering.
export default function Stat({ value, prefix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }
    let raf = 0
    let start = null
    const dur = 1000
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / dur, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref} className="flex items-baseline gap-3">
      <span className="font-display tabular text-5xl font-semibold leading-none text-ink sm:text-6xl">
        {prefix}
        {n}
      </span>
      <span className="max-w-[9ch] text-sm font-light leading-tight text-muted">{label}</span>
    </div>
  )
}
