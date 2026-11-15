import { useEffect, useState } from 'react'

/*
  Petit signal partage : l'ouverture annonce sa fin, le hero attend ce signal
  pour jouer son entree (sinon elle se jouerait cachee sous le rideau).
*/
let done = false
const listeners = new Set()

export function finishIntro() {
  if (done) return
  done = true
  listeners.forEach((fn) => fn())
}

export function useIntroDone() {
  const [ok, setOk] = useState(done)
  useEffect(() => {
    if (done) return setOk(true)
    const fn = () => setOk(true)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [])
  return ok
}
