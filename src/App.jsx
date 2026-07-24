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
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <Loader />
      <div className="tex-paper pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <Header />
      <main className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
