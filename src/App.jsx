/*
  DIRECTION CONTRACT — "STUDIO / EDITOR"
  THESIS: a warm, black-&-white illustrated editorial portfolio whose only real
    color comes from embedded dark code-editor panels. Fuses F (light, illustrated,
    character-led) with B (project grid + code-editor expertise). Refuses the old
    dark-LED world, and refuses cream+serif+terracotta and SaaS blue/purple.
  OWN-WORLD: warm paper #F2F0EA, ink near-black, monochrome. Color lives only
    inside GitHub-dark code panels + the section-title underlines (code hues).
    Character = Notion-style line-art. Type: Bricolage Grotesque (display),
    Geist (body), JetBrains Mono (code/labels). Subtle paper grain.
  STORY: intro reveal → illustrated Hermes + big name → editorial scroll →
    a striking dark code-editor "expertise" panel → project grid → contact.
  FIRST VIEWPORT: paper ground; left = // role, huge name (Bricolage) with a
    hand-drawn underline, intro, dark CTA; right = the illustrated character
    rising in on load.
  FORM: illustrated editorial page punctuated by a real code-editor window.
*/
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Projects from './sections/Projects'
import Testimonials from './sections/Testimonials'
import Services from './sections/Services'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      {/* Le premier arret au clavier saute la navigation. */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:text-paper"
      >
        Aller au contenu
      </a>
      <div className="tex-paper pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <Header />
      <main className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Testimonials />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
