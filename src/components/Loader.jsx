import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { finishIntro } from '../motion/intro'
import { useLenis } from '../motion/SmoothScroll'

const ease = [0.76, 0, 0.24, 1]

/*
  Ouverture : « HK_ » s'ecrit lettre par lettre, un compteur file de 0 a 100,
  puis deux rideaux (orange, puis brun) remontent et devoilent la page. Une fois
  par chargement ; un clic la passe ; rien sous « animations reduites ».
*/
export default function Loader() {
  const [phase, setPhase] = useState('boot') // boot → exit → gone
  const [pct, setPct] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone')
      finishIntro()
      return
    }
    let raf = 0
    let start = null
    const dur = 1300
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / dur, 1)
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    const t1 = setTimeout(() => setPhase((p) => (p === 'boot' ? 'exit' : p)), 1550)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
    }
  }, [])

  // La page ne defile pas tant que le rideau est la.
  useEffect(() => {
    const locked = phase !== 'gone'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    if (lenis) locked ? lenis.stop() : lenis.start()
  }, [phase, lenis])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => finishIntro(), 450)
    const t2 = setTimeout(() => setPhase('gone'), 1150)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [phase])

  const leaving = phase === 'exit'
  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <div className="fixed inset-0 z-[100]" onClick={() => phase === 'boot' && setPhase('exit')} aria-hidden="true">
          {/* rideau orange, sous le brun : il part en second et laisse une trace */}
          <motion.div
            className="absolute inset-0 bg-ember"
            initial={{ y: 0 }}
            animate={{ y: leaving ? '-100%' : 0 }}
            transition={{ duration: 0.9, ease, delay: leaving ? 0.12 : 0 }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col justify-between bg-cocoa p-6 text-sand sm:p-10"
            initial={{ y: 0 }}
            animate={{ y: leaving ? '-100%' : 0 }}
            transition={{ duration: 0.85, ease }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sand/60">Fullstack Engineer</span>
            <div className="flex items-end justify-between gap-6">
              <div className="flex font-mono text-[clamp(3.5rem,14vw,10rem)] font-bold leading-none tracking-tight">
                {'HK_'.split('').map((c, i) => (
                  <motion.span
                    key={i}
                    className={c === '_' ? 'text-clay' : ''}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: leaving ? '-40%' : '0%', opacity: leaving ? 0 : 1 }}
                    transition={{ duration: 0.7, delay: leaving ? 0 : 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
              <span className="font-display text-[clamp(2.5rem,8vw,6rem)] font-light tabular leading-none text-sand/80">
                {String(pct).padStart(3, '0')}
              </span>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-clay"
              style={{ width: `${pct}%` }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
