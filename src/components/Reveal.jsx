import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Deux lignes éditoriales :
// - défaut : voile + flou qui se dissipe, lent, déclenché tard.
// - soft : simple montée en opacité, sans flou — pour les gros blocs
//   (images projets, panneau code) où le blur dérange.
export default function Reveal({ children, delay = 0, y = 32, blur = 10, soft = false, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  const reduce = useReducedMotion()
  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>
  }
  if (soft) {
    return (
      <MotionTag
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay, ease }}
        className={className}
      >
        {children}
      </MotionTag>
    )
  }
  return (
    <MotionTag
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
