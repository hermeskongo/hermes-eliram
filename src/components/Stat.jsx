import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts 0 → value once on reveal. tabular-nums keeps the layout from jittering.
export default function Stat({ value, prefix = '', suffix = '', label }) {
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
    <div ref={ref} className="border-t border-ink/15 pt-5">
      <span className="font-display tabular block text-[clamp(4rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-ember">
        {prefix}
        {n}
        {suffix}
      </span>
      <span className="mt-3 block max-w-[18ch] text-base font-light leading-snug text-graphite">{label}</span>
    </div>
  )
}
