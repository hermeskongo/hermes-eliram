import { motion } from 'framer-motion'

/*
  Le portrait du hero. Deux versions vivent dans /public : la photo et
  l'illustration d'origine. Pour rebasculer, changer la ligne PORTRAIT —
  rien d'autre a toucher.
*/
const PORTRAITS = {
  photo: { src: '/personal-brand.webp', w: 747, h: 1120, alt: 'Portrait de Hermes Eliram' },
  dessin: { src: '/character.webp', w: 1024, h: 1536, alt: 'Illustration de Hermes' },
}
const PORTRAIT = PORTRAITS.dessin

// Il monte et se devoile de haut en bas au chargement, puis flotte doucement.
export default function Character({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* idle float */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="mx-auto w-[88%] overflow-hidden rounded-[2rem] ring-1 ring-ink/10 shadow-[0_45px_100px_-45px_rgba(23,21,15,0.65)]"
          initial={{ opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={PORTRAIT.src}
            alt={PORTRAIT.alt}
            width={PORTRAIT.w}
            height={PORTRAIT.h}
            className="block w-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
