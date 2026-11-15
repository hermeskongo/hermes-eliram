import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

/*
  Defilement doux (Lenis). Lenis lisse le defilement natif de la fenetre : les
  useScroll de Framer Motion continuent de lire window.scrollY et restent
  synchronises. Coupe sous « animations reduites » : la page defile alors
  normalement.

  Les ancres internes (#work, #contact…) passent par Lenis, pour que le saut
  d'une section a l'autre soit lui aussi un glissement, et non une coupure.
*/
const LenisContext = createContext(null)

export const useLenis = () => useContext(LenisContext)

// Hauteur de l'en-tete fixe : une ancre s'arrete juste dessous.
const HEADER_OFFSET = -76

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    })
    setLenis(instance)
    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      const target = hash.length > 1 && document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      const offset = hash === '#top' ? 0 : HEADER_OFFSET
      if (lenis) lenis.scrollTo(hash === '#top' ? 0 : target, { offset, duration: 1.4 })
      else target.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
