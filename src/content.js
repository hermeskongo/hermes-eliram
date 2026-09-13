// All copy / data lives here. Edit this, not the components.
// [À REMPLIR] marks a placeholder for Hermes to fill in.

export const content = {
  identity: {
    family: 'KONGO',
    given: 'Hermes Eliram',
    display: 'Hermes\nEliram', // hero name, \n = line break
    role: 'Fullstack Engineer',
    intro:
      'Ingénieur logiciel. Je conçois et livre des produits complets, du premier écran à la production.',
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
    { id: 'avis', label: 'Avis' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ],

  about: {
    lead: 'Neuf ou déjà en route, je livre un produit qui tient en production.',
    paragraphs: [
      "Depuis plusieurs années, je construis des applications complètes : interfaces soignées, back-ends solides, et tout ce qu'il y a entre les deux — web, mobile, API et infrastructure.",
      "Je reprends aussi l'existant : terminer un projet en cours, corriger des bugs, stabiliser, améliorer un segment puis mettre en production. J'aime le travail bien fait — un code lisible, des produits rapides, des détails qui tiennent la route.",
    ],
    metrics: [
      { value: 4, prefix: '+', label: 'services' },
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
    lead: 'Une sélection de projets.',
    projects: [
      {
        name: 'Apicore',
        year: '2026',
        category: 'E-commerce · Fullstack',
        badge: 'Démo en ligne',
        blurb:
          "Boutique e-commerce complète de matériel apicole pour l'Afrique de l'Ouest : catalogue de 500+ produits filtré par catégorie, panier, checkout et suivi de commande. Le tout doublé d'un back-office admin complet — gestion des produits, commandes en temps réel et analytics (chiffre d'affaires, panier moyen, top produits). Next.js, PostgreSQL/Prisma et authentification NextAuth.",
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth'],
        links: [{ label: 'Voir le site', url: 'https://apicore-eta.vercel.app/' }],
        url: 'https://apicore-eta.vercel.app/',
        image: '/projects/apicore-cover.webp',
      },
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
        image: '',
      },
    ],
  },

  services: {
    lead: 'Composez votre estimation — prix de départ bas, total en direct.',
    note: 'Estimation indicative. Devis ferme après diagnostic 30 min. Acompte 50 %.',
    items: [
      {
        title: 'Site & application web',
        desc: 'Vitrine rapide, puis on ajoute par segment.',
        base: 97,
        options: [
          { label: 'Page supplémentaire', price: 30 },
          { label: 'Blog / CMS', price: 120 },
          { label: 'Espace client / auth', price: 180 },
          { label: 'Catalogue + panier', price: 250 },
          { label: 'Paiement en ligne', price: 180 },
        ],
      },
      {
        title: 'Application mobile',
        desc: 'iOS + Android, 2–3 écrans pour démarrer.',
        base: 290,
        options: [
          { label: 'Fonctionnement hors-ligne', price: 150 },
          { label: 'Notifications push', price: 90 },
          { label: 'Back-end dédié', price: 180 },
          { label: 'Publication store', price: 120 },
          { label: 'Mobile money (option)', price: 150 },
        ],
      },
      {
        title: 'Back-end & API',
        desc: 'Une ressource + CRUD + PostgreSQL pour démarrer.',
        base: 149,
        options: [
          { label: 'Auth / rôles', price: 120 },
          { label: 'Webhooks & filets', price: 90 },
          { label: 'Intégration tierce', price: 120 },
          { label: 'Docs + tests', price: 80 },
        ],
      },
      {
        title: 'Mise en production & infra',
        desc: 'Déploiement + HTTPS pour démarrer.',
        base: 79,
        options: [
          { label: 'Domaine / DNS', price: 60 },
          { label: 'CI / CD', price: 90 },
          { label: 'Backups', price: 70 },
          { label: 'Mails qui arrivent', price: 120 },
        ],
      },
    ],
  },

  /*
    Avis clients verifies. La section grandit toute seule : ajouter un objet
    dans `items` suffit. `pull` est la phrase mise en titre — on la choisit a
    la main, ce n'est pas forcement dans le premier avis.
    Un temoignage se cite dans sa langue d'origine : `lang` sert au navigateur
    (cesure, synthese vocale), on ne traduit pas.
  */
  testimonials: {
    kicker: 'Témoignages',
    pull: 'Five stars are simply not enough.',
    items: [
      {
        quote:
          'Hermes is truly one of the top all-around professionals in the industry. His extensive full-stack experience shows in every interaction, and his commitment to honesty sets him apart. He consistently goes above and beyond to ensure his clients are fully satisfied in every circumstance. Five stars are simply not enough to describe how professional, reliable, and genuinely honest he is. Thank you, Hermes, for everything you do, your dedication speaks for itself.',
        lang: 'en',
        author: 'Gatien Georges',
        meta: 'Client · Upwork · Août 2026',
        rating: 5,
        source: { label: 'Profil Upwork', url: 'https://www.upwork.com/freelancers/~01da2964c90bee8c17' },
      },
    ],
  },

  contact: {
    lead: 'Un projet en tête ?',
    body: 'Écrivez-moi — je réponds vite.',
  },
}
