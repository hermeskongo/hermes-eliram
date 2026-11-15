/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm-paper light world. Color lives only inside the code panels.
        paper: '#f2f0ea',
        paper2: '#eae6dc',
        ink: '#17150f',
        graphite: '#3a372e',
        muted: '#726c60',   // 4.57:1 sur le papier — plancher du texte lisible
        faint: '#a8a293',   // 2.23:1 — reserve aux marques decoratives, jamais au texte
        line: '#e0dbcd',
        // Code-editor (GitHub-dark-ish) palette for the signature panels.
        code: {
          bg: '#0f1117',
          bar: '#0a0c11',
          gutter: '#7d8492',   // 5.20:1 sur le fond du panneau
          text: '#e6edf3',
          comment: '#8b949e',
          kw: '#ff7b72',
          str: '#7ee787',
          num: '#ffa657',
          fn: '#79c0ff',
        },
        good: '#3fb950',
        // Accent chaud : orange brûlé et brun cacao, pensés pour le papier clair.
        ember: '#C2410C',    // 5.0:1 sur le papier : texte d'accent et boutons
        ember2: '#9A3412',   // survol, ombres
        clay: '#F08A4B',     // orange clair, lisible sur le brun
        cocoa: '#24150D',    // sections sombres
        cocoa2: '#3A2417',
        sand: '#EDE3D3',     // texte sur le brun
        olive: '#2E3826',    // fond des temoignages (vert sous-bois, s'accorde au brun et a l'orange)
        dune: '#E7D8C0',     // fond sable des services
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
