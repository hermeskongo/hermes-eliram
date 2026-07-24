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
        muted: '#726c60',
        faint: '#a8a293',
        line: '#e0dbcd',
        // Code-editor (GitHub-dark-ish) palette for the signature panels.
        code: {
          bg: '#0f1117',
          bar: '#0a0c11',
          gutter: '#575d6b',
          text: '#e6edf3',
          comment: '#8b949e',
          kw: '#ff7b72',
          str: '#7ee787',
          num: '#ffa657',
          fn: '#79c0ff',
        },
        good: '#3fb950',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
