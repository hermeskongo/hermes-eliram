import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useMedia } from '../hooks/useScrub'

/*
  Curseur maison, uniquement sur ordinateur (pointeur fin) et hors « animations
  reduites ». Un point suit la souris exactement ; un anneau le suit avec un
  leger retard. Survoler un element marque data-cursor="Voir" fait grossir
  l'anneau en pastille orange portant ce mot. Le curseur systeme reste visible
  sur les champs de saisie.
*/
export default function Cursor() {
  const fine = useMedia('(pointer: fine)')
  const calm = useMedia('(prefers-reduced-motion: reduce)')
  const on = fine && !calm

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })
  const [label, setLabel] = useState(null)
  const [link, setLink] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!on) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const t = e.target.closest?.('[data-cursor], a, button, label, [role="button"]')
      setLabel(t?.dataset?.cursor || null)
      setLink(!!t && !t.dataset?.cursor)
    }
    const leave = () => setHidden(true)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [on, x, y])

  if (!on) return null

  const size = label ? 88 : link ? 44 : 30
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: rx, y: ry, opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? 'rgba(194,65,12,0.95)' : 'rgba(194,65,12,0)',
            borderColor: label ? 'rgba(194,65,12,0)' : 'rgba(23,21,15,0.35)',
          }}
          style={{ borderWidth: 1.5, borderStyle: 'solid' }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
        style={{ x, y, opacity: hidden || label ? 0 : 1 }}
      />
    </div>
  )
}
