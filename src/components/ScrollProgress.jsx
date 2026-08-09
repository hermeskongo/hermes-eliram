import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/*
  Reading progress, drawn as a hairline above the header.

  Two pixels of ink — it belongs to the monochrome world, and it is the one
  piece of chrome that tells you how much of the page is left.
*/
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-ink"
      style={{ scaleX: width }}
    />
  )
}
