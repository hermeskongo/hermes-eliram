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
    // Phrase du hero. Les mots entre *asterisques* passent en italique orange.
    tagline: 'Je conçois des produits *complets*, du premier écran à la *production*.',
    // Repères de la section À propos : seulement des faits verifiables dans les projets ci-dessous.
    stats: [
      { value: 6, label: 'projets livrés' },
      { value: 3, label: 'apps publiées sur les stores' },
      { value: 2, suffix: 'ᵉ', label: 'place au concours Smart-Elec 2026' },
    ],
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
    lead: 'Neuf ou déjà en route, je livre un produit qui *tient* en production.',
    paragraphs: [
      "Depuis plusieurs années, je construis des applications complètes : interfaces soignées, back-ends solides, et tout ce qu'il y a entre les deux — web, mobile, API et infrastructure.",
      "Je reprends aussi l'existant : terminer un projet en cours, corriger des bugs, stabiliser, améliorer un segment puis mettre en production. J'aime le travail bien fait — un code lisible, des produits rapides, des détails qui tiennent la route.",
    ],
  },

  // Rendered inside a dark code-editor window (the signature panel).
  expertise: {
    lead: 'Ce que je maîtrise, présenté comme je le vis : dans le *code*.',
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
    lead: 'Une sélection de *projets*.',
    projects: [
      {
        name: 'Elgo',
        year: '2026',
        category: 'Mobile · Plateforme',
        badge: 'En production',
        blurb:
          "Plateforme de livraison multi-acteurs, conçue et développée de bout en bout : trois applications mobiles publiées sur l'App Store et Google Play — client, livreur, partenaire — deux back-offices web et une API centrale qui orchestre commandes, courses et paiements. Suivi des livraisons en temps réel, notifications push, files de tâches et commissions calculées à la course.",
        tags: ['Flutter', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Redis', 'Docker'],
        links: [
          { label: 'App Store', url: 'https://apps.apple.com/us/developer/elgo/id6790060298' },
          { label: 'Google Play', url: 'https://play.google.com/store/apps/developer?id=Elgo' },
        ],
        url: 'https://apps.apple.com/us/developer/elgo/id6790060298',
        image: '/projects/elgo-cover.webp',
      },
      {
        name: 'Apicore',
        year: '2026',
        category: 'E-commerce · Fullstack',
        badge: 'Démo en ligne',
        blurb:
          "Boutique e-commerce complète de matériel apicole pour l'Afrique de l'Ouest : catalogue filtré par catégorie, panier, checkout et suivi de commande. Le tout doublé d'un back-office admin complet — gestion des produits, commandes en temps réel et analytics (chiffre d'affaires, panier moyen, top produits). Next.js, PostgreSQL/Prisma et authentification NextAuth.",
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
        image: '/projects/iot-cover.webp',
      },
    ],
  },

  // Services : volontairement simple, sans prix ni options. Chaque ligne ouvre
  // un e-mail deja titre avec le service choisi.
  services: {
    lead: 'Ce que je *construis* pour vous.',
    items: [
      {
        title: 'Site vitrine',
        desc: 'Un site rapide et soigné qui présente votre activité et transforme les visiteurs en contacts.',
      },
      {
        title: 'SaaS',
        desc: 'Une application web complète : comptes, abonnements, tableau de bord et back-end solide.',
      },
      {
        title: 'Application e-commerce',
        desc: 'Catalogue, panier, commandes et paiement en ligne, avec un back-office pour tout gérer.',
      },
      {
        title: 'Application mobile',
        desc: 'iOS et Android, de la maquette à la publication sur les stores.',
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
    lead: 'Un projet en *tête* ?',
    body: 'Écrivez-moi — je réponds vite.',
  },
}
