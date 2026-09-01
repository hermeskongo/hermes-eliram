import { useEffect, useState } from 'react'
import { useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/*
  Scroll-driven motion helpers.

  The site already had motion *triggered* by scroll (Reveal fires once on
  entry). These hooks give motion *driven* by scroll position — the value
  tracks where the element sits in the viewport, so it scrubs both ways.

  Every helper collapses to a constant when the visitor asks for reduced
  motion, so callers never have to branch.
*/

const SPRING = { stiffness: 120, damping: 26, mass: 0.35 }

/**
 * Progress 0 → 1 as `ref` travels through the viewport.
 * `offset` follows framer-motion's syntax: [element edge, viewport edge].
 */
export function useSectionProgress(ref, offset = ['start end', 'end start']) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return scrollYProgress
}

/**
 * Maps a progress value onto a numeric range and smooths it.
 * Returns `restValue` (or the range midpoint) when motion is reduced.
 */
export function useScrub(progress, inputRange, outputRange, restValue) {
  const reduced = useReducedMotion()
  const raw = useTransform(progress, inputRange, outputRange)
  const smooth = useSpring(raw, SPRING)
  const still = useTransform(progress, () =>
    restValue !== undefined ? restValue : outputRange[Math.floor(outputRange.length / 2)]
  )
  return reduced ? still : smooth
}

/** Same, without the spring — for opacity, where lag reads as a bug. */
export function useScrubLinear(progress, inputRange, outputRange, restValue) {
  const reduced = useReducedMotion()
  const raw = useTransform(progress, inputRange, outputRange)
  const still = useTransform(progress, () => (restValue !== undefined ? restValue : 1))
  return reduced ? still : raw
}

/**
 * Vrai quand la media query correspond. Sert a n'activer le scrub que la ou il
 * a du sens : sur mobile, un hero plus haut que l'ecran rend toute derive
 * parasite — on la coupe plutot que de la doser.
 */
export function useMedia(query) {
  const get = () => (typeof window === 'undefined' ? false : window.matchMedia(query).matches)
  const [on, setOn] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setOn(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return on
}
