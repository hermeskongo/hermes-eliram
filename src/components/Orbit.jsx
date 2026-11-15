import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/*
  Le visuel du hero : le portrait au centre, et autour de lui les outils avec
  lesquels il construit, poses sur trois orbites qui tournent a des vitesses
  differentes (les logos restent droits). Un anneau de texte tourne a
  l'exterieur. Tout le systeme s'incline vers la souris. A l'ouverture, les
  orbites se deploient depuis le centre, puis les logos s'allument un a un.
*/
const RINGS = [
  { r: 28, dur: 34, slugs: ['react', 'nextdotjs', 'typescript'] },
  { r: 37, dur: 48, slugs: ['flutter', 'nodedotjs', 'postgresql', 'docker'], reverse: true },
  { r: 45, dur: 64, slugs: ['tailwindcss', 'figma', 'git', 'vite', 'express'] },
]

// Logos dont la version « couleur » est blanche (faite pour un fond sombre) : on prend la version encre.
const MONO = new Set(['nextdotjs', 'express'])

function Logo({ slug, angle, r, dur, reverse, delay, go }) {
  // le logo est place sur l'orbite (rotation + translation), puis contre-tourne
  // a la meme vitesse pour rester droit
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg) translateX(${r}cqw) rotate(${-angle}deg)` }}
    >
      <div className={`orbit-counter ${reverse ? 'orbit-counter-rev' : ''}`} style={{ animationDuration: `${dur}s` }}>
        {/* le centrage vit sur son propre element : l'animation d'echelle ecrase la transformation */}
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.span
            className="grid h-11 w-11 place-items-center rounded-full bg-paper shadow-[0_10px_25px_-12px_rgba(36,21,13,0.55)] ring-1 ring-ink/10 sm:h-14 sm:w-14"
            initial={{ scale: 0, opacity: 0 }}
            animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay, ease }}
          >
            <img src={`/logos/${MONO.has(slug) ? slug : `${slug}-color`}.svg`} alt="" className="h-5 w-5 sm:h-6 sm:w-6" draggable={false} />
          </motion.span>
        </div>
      </div>
    </div>
  )
}

export default function Orbit({ go = true, portrait }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  let k = 0
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px] [perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="orbit-stage absolute inset-0" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {/* anneau de texte */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
        >
        <svg viewBox="0 0 400 400" className="orbit-spin absolute inset-0 h-full w-full text-ember" style={{ animationDuration: '40s' }}>
          <defs>
            <path id="orbit-txt" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
          </defs>
          <text className="font-mono" fontSize="11" letterSpacing="5" fill="currentColor">
            <textPath href="#orbit-txt" textLength="1158" lengthAdjust="spacing">
              FULLSTACK ✦ WEB ✦ MOBILE ✦ API ✦ PRODUCTION ✦ FULLSTACK ✦ WEB ✦ MOBILE ✦ API ✦ PRODUCTION ✦
            </textPath>
          </text>
        </svg>
        </motion.div>

        {/* orbites */}
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-ink/15"
            style={{ width: `${ring.r * 2}%`, height: `${ring.r * 2}%`, x: '-50%', y: '-50%' }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={go ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
          />
        ))}

        {/* les logos, sur des plateaux qui tournent */}
        <div className="absolute inset-0 [container-type:inline-size]">
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className={`orbit-spin absolute inset-0 ${ring.reverse ? 'orbit-spin-rev' : ''}`}
              style={{ animationDuration: `${ring.dur}s` }}
            >
              {ring.slugs.map((slug, j) => (
                <Logo
                  key={slug}
                  slug={slug}
                  angle={(360 / ring.slugs.length) * j + i * 25}
                  r={ring.r}
                  dur={ring.dur}
                  reverse={ring.reverse}
                  go={go}
                  delay={0.6 + k++ * 0.07}
                />
              ))}
            </div>
          ))}
        </div>

        {/* le portrait */}
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[40%] overflow-hidden rounded-full bg-sand shadow-[0_40px_80px_-30px_rgba(36,21,13,0.6)] ring-[6px] ring-paper"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={{ duration: 1, delay: 0.05, ease }}
          style={{ x: '-50%', y: '-50%', translateZ: 40 }}
        >
          <img src={portrait.src} alt={portrait.alt} className="h-full w-full object-cover object-top" draggable={false} />
        </motion.div>

        {/* pastille « disponible » */}
        <motion.span
          className="absolute bottom-[14%] right-[6%] flex items-center gap-2 rounded-full bg-cocoa px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-sand shadow-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 1.3, ease }}
          style={{ translateZ: 60 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
          </span>
          Disponible
        </motion.span>
      </motion.div>
    </div>
  )
}
