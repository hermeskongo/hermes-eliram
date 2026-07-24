// All copy / data lives here. Edit this, not the components.
// [À REMPLIR] marks a placeholder for Hermes to fill in.

export const content = {
  identity: {
    family: 'KONGO',
    given: 'Hermes Eliram',
    display: 'Hermes\nEliram', // hero name, \n = line break
    role: 'Fullstack Engineer',
    intro:
      "Je conçois et développe des produits web & mobile de bout en bout — du premier écran à l'API en production.",
    email: 'hermeskongo@gmail.com',
    status: 'Disponible',
    socials: [
      { label: 'GitHub', url: 'https://github.com/hermeskongo' },
      { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01da2964c90bee8c17' },
    ],
  },

  nav: [
    { id: 'about', label: 'À propos' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'work', label: 'Projets' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ],

  about: {
    lead: 'Ingénieur logiciel full-stack — web & mobile, de bout en bout.',
    paragraphs: [
      "Depuis plusieurs années, je construis des applications complètes : interfaces soignées, back-ends solides, et tout ce qu'il y a entre les deux.",
      "J'aime le travail bien fait — un code lisible, des produits rapides, des détails qui tiennent la route. De l'idée à la mise en production, je m'occupe de la chaîne entière.",
    ],
    metrics: [
      { value: 4, prefix: '+', label: 'services' },
      { value: 17, prefix: '+', label: 'projets menés à bien' },
    ],
  },

  // Rendered inside a dark code-editor window (the signature panel).
  expertise: {
    lead: 'Ce que je maîtrise, présenté comme je le vis : dans le code.',
    filename: 'expertise.ts',
    groups: [
      { key: 'frontend', label: 'Front-end', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { key: 'mobile', label: 'Mobile', items: ['Flutter', 'React Native'] },
      { key: 'backend', label: 'Back-end', items: ['Node.js', 'Express', 'PostgreSQL', 'REST API'] },
      { key: 'tools', label: 'Outils', items: ['Git', 'Docker', 'Figma', 'Vite'] },
    ],
    // The logo strip under the panel.
    logos: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Express', slug: 'express' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Figma', slug: 'figma' },
      { name: 'Claude Code', slug: 'claudecode', raster: true },
      { name: 'Codex', slug: 'codex', raster: true },
    ],
  },

  work: {
    lead: 'Une sélection parmi 17 projets menés à bien.',
    projects: [
      {
        name: 'Habitudes',
        year: '2026',
        category: 'Mobile',
        blurb:
          "Suivi d'habitudes 100 % hors-ligne : séries, heatmap sur six mois et statistiques par habitude.",
        tags: ['Flutter', 'Dart', 'Riverpod', 'SQLite'],
        url: 'https://github.com/hermeskongo/flutter-habit-tracker',
        image: '/projects/flutter-habit-tracker.webp',
      },
      {
        name: 'Fluently',
        year: '2026',
        category: 'Web · Fullstack',
        blurb:
          "Plateforme d'échange linguistique : matching par langues, messagerie temps réel et appels vidéo.",
        tags: ['React', 'Express', 'PostgreSQL', 'Stream SDK'],
        url: 'https://github.com/hermeskongo/fluently',
        image: '/projects/fluently-cover.webp',
      },
      {
        name: 'Seedly',
        year: '2026',
        category: 'Outil · CLI',
        badge: 'Open source · npm',
        blurb:
          'Projet open source, publié sur npm : génère des jeux de données PostgreSQL cohérents en lisant le schéma — clés étrangères, contraintes et données réalistes, sans fichiers de seed à maintenir.',
        tags: ['TypeScript', 'PostgreSQL', 'Node.js', 'CLI'],
        install: 'npm i @elirames/seedly',
        links: [
          { label: 'npm', url: 'https://www.npmjs.com/package/@elirames/seedly' },
          { label: 'Documentation', url: 'https://hermeskongo.github.io/seedly' },
          { label: 'GitHub', url: 'https://github.com/hermeskongo/seedly' },
        ],
        url: 'https://github.com/hermeskongo/seedly',
        image: '/projects/seedly-cover.webp',
      },
      {
        name: 'Station météo IoT',
        year: '2026',
        category: 'IoT · Embarqué',
        badge: '2ᵉ place · Smart-Elec 2026',
        badgeColor: '#ffa657',
        blurb:
          "Station météo connectée, primée au concours Smart-Elec 2026 : température, humidité, pression et luminosité en temps réel, avec pilotage automatique et manuel d'un ventilateur. Arduino et capteurs, backend Python, dashboard web live.",
        tags: ['Arduino', 'Python', 'Flask-SocketIO', 'IoT'],
        url: 'https://github.com/hermeskongo/IoT_weather_project',
        image: '/projects/iot-weather-cover.webp',
      },
    ],
  },

  services: {
    lead: 'Ce que je peux faire pour vous.',
    items: [
      { title: 'Développement Web', desc: "Applications web complètes et performantes, du front-end à l'API." },
      { title: 'Développement Mobile', desc: 'Apps iOS & Android natives et cross-platform (Flutter, React Native).' },
      { title: 'Back-end & API', desc: 'Architectures serveur robustes, bases de données, intégrations tierces.' },
      { title: 'Conseil & Architecture', desc: 'Cadrage technique, choix de stack, revue de code et mise en production.' },
    ],
  },

  contact: {
    lead: 'Un projet en tête ?',
    body: 'Écrivez-moi — je réponds vite.',
  },
}
