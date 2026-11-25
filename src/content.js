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
    // CV en PDF, servi depuis public/cv/. Pour le mettre a jour : remplacer le fichier.
    cv: { label: 'Télécharger mon CV', url: '/cv/CV-Hermes-KONGO.pdf', filename: 'CV-Hermes-KONGO.pdf' },
    status: 'Disponible',
    socials: [
      { label: 'GitHub', url: 'https://github.com/hermeskongo' },
      { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01da2964c90bee8c17' },
    ],
  },

  nav: [
    { id: 'about', label: 'À propos' },
    { id: 'parcours', label: 'Parcours' },
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

  // Parcours : seulement des faits verifiables, du plus ancien au plus recent
  // (la frise se remplit en descendant). La derniere etape est « en cours ».
  // `link` ajoute un lien a l'etape.
  parcours: {
    lead: 'Mon parcours dans la *tech*, côté développement web.',
    steps: [
      {
        period: 'Fin 2021',
        title: 'Les premiers pas, avec Grafikart',
        text: "Je commence le développement web en autodidacte avec les tutoriels de Grafikart : HTML, CSS, JavaScript et PHP, puis l’algorithmique et les bases de la programmation.",
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        link: { label: 'grafikart.fr', url: 'https://grafikart.fr' },
      },
      {
        period: '2022 — 2024',
        title: 'Des projets pour progresser',
        text: 'Je consolide mes compétences en construisant des projets personnels, de la classe de première au lycée jusqu’à ma première année d’université, en parallèle de mes études.',
      },
      {
        period: '2024',
        title: 'IGA Casablanca',
        text: 'J’intègre IGA Casablanca, où je suis aujourd’hui en 3ᵉ année.',
      },
      {
        period: '2026',
        title: 'Smart-Elec : 2ᵉ place',
        text: 'Station météo connectée : capteurs Arduino, backend Python et tableau de bord web en direct. Un projet primé au concours.',
        tags: ['Arduino', 'Python', 'Flask-SocketIO'],
      },
      {
        period: '2026',
        title: 'Open source : Seedly',
        text: 'Un outil en ligne de commande publié sur npm : il génère des jeux de données PostgreSQL cohérents en lisant le schéma.',
        tags: ['TypeScript', 'npm', 'PostgreSQL'],
      },
      {
        period: '2026',
        title: 'Elgo, une plateforme de livraison',
        text: 'Conçue et développée seul en environ 8 mois, et je continue d’en assurer le développement. Trois applications mobiles publiées sur l’App Store et Google Play, deux back-offices web et une API centrale testée (près de 1 800 tests d’intégration).',
        tags: ['Flutter', 'Node.js', 'PostgreSQL', 'Socket.IO'],
      },
      {
        period: 'Aujourd’hui',
        title: 'Freelance, ouvert à une collaboration',
        text: 'Freelance depuis 2024, à distance. C’est dans ce cadre que j’ai réalisé Apicore, Elgo et le serveur mail de QuakBox. Aujourd’hui, je travaille principalement sur des plateformes e-commerce, avec quelques sites vitrines et logiciels internes. Je suis ouvert à rejoindre une équipe, à distance.',
        tags: ['E-commerce', 'Sites vitrines', 'Logiciels internes', 'Remote'],
      },
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
        // « Ma participation » : role + duree s'affichent sur la ligne du
        // projet ; la fiche ouverte ajoute le statut et le texte.
        participation: {
          role: 'Développé seul, de bout en bout',
          duration: 'Environ 8 mois',
          status: 'Toujours en développement',
          text: "Conception, développement, publication et exploitation : trois applications mobiles, deux back-offices web, l'API et l'infrastructure. J'ai tout écrit seul en environ 8 mois, et j'en assure toujours le développement au quotidien.",
        },
        links: [
          { label: 'App Store', url: 'https://apps.apple.com/us/developer/elgo/id6790060298' },
          { label: 'Google Play', url: 'https://play.google.com/store/apps/developer?id=Elgo' },
        ],
        url: 'https://apps.apple.com/us/developer/elgo/id6790060298',
        image: '/projects/elgo-cover.webp',
      },
      {
        name: 'QuakBox',
        year: '2026',
        category: 'Infrastructure · Mission',
        badge: 'Travail en équipe',
        badgeColor: '#ffa657',
        blurb:
          "Serveur mail auto-hébergé pour QuakBox, mis en place sur le serveur du client, au sein de l'équipe de Gatien Georges. Mailcow (Postfix, Dovecot, Rspamd, webmail) branché derrière le nginx existant sans interrompre les six sites déjà en production ; TLS sur tous les ports, authentification complète du domaine (SPF, DKIM, DMARC, DNS inverse), 52 alias, et envoi et réception vérifiés avec Gmail et Outlook.",
        tags: ['Mailcow', 'Postfix', 'Dovecot', 'Nginx', 'Docker', 'DNS'],
        // `internal` : lien interne (ancre) ; il ferme la fiche ouverte puis fait defiler.
        links: [
          { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01da2964c90bee8c17' },
          { label: 'Voir l’avis', url: '#avis', internal: true },
        ],
        participation: {
          role: 'Serveur mail, au sein d’une équipe',
          status: 'Livré et documenté · août 2026',
          text: "Je suis intervenu aux côtés des autres développeurs de Gatien Georges, sur la partie messagerie : choix de l'architecture, installation, réglage de la délivrabilité, puis un guide de passation de neuf pages pour que l'équipe puisse exploiter, modifier ou reconstruire le serveur sans dépendre de moi.",
        },
      },
      {
        name: 'Apicore',
        year: '2026',
        category: 'E-commerce · Fullstack',
        badge: 'En production',
        blurb:
          "Boutique e-commerce complète de matériel apicole pour l'Afrique de l'Ouest : catalogue filtré par catégorie, panier, checkout et suivi de commande. Le tout doublé d'un back-office admin complet — gestion des produits, commandes en temps réel et analytics (chiffre d'affaires, panier moyen, top produits). Next.js, PostgreSQL/Prisma et authentification NextAuth.",
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth'],
        participation: { role: 'Développé seul', text: 'Boutique, back-office, base de données et authentification : tout est de moi.' },
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
        participation: { role: 'Développé seul', text: 'Conception, développement et stockage hors-ligne : tout est de moi.' },
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
        participation: { role: 'Développé seul', text: 'Front, API, base de données, messagerie et appels vidéo : tout est de moi.' },
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
        participation: { role: 'Développé seul', text: 'Conception, développement, documentation et publication sur npm : tout est de moi.' },
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
        participation: { role: 'Développé seul', text: 'Capteurs Arduino, backend Python et dashboard web : tout est de moi.' },
        url: 'https://github.com/hermeskongo/IoT_weather_project',
        image: '/projects/iot-cover.webp',
      },
    ],
  },

  // Services : volontairement simple, sans prix ni options. Chaque ligne ouvre
  // un e-mail deja titre avec le service choisi.
  // Deux onglets : chacun porte ses quatre services. `icon` designe le dessin
  // dans Services.jsx (vitrine, saas, ecom, mobile, api, reprise).
  services: {
    lead: 'Ce que je *conçois* pour vous.',
    audiences: [
      {
        id: 'particuliers',
        label: 'Particuliers',
        intro: 'Indépendant, artisan, créateur : un outil à votre mesure, que vous pouvez faire vivre seul.',
        items: [
          {
            icon: 'vitrine',
            title: 'Site vitrine',
            desc: 'Un site rapide et soigné qui présente votre activité et transforme les visiteurs en contacts.',
          },
          {
            icon: 'ecom',
            title: 'Boutique en ligne',
            desc: 'Catalogue, panier et paiement en ligne pour vendre sans intermédiaire, avec un espace pour tout gérer.',
          },
          {
            icon: 'mobile',
            title: 'Application mobile',
            desc: 'iOS et Android, de la maquette à la publication sur les stores.',
          },
          {
            icon: 'reprise',
            title: 'Reprise de projet',
            desc: 'Un site ou une application à terminer, un bug à corriger : je reprends, je stabilise et je mets en ligne.',
          },
        ],
      },
      {
        id: 'entreprises',
        label: 'En entreprise',
        intro: 'Un produit, un outil interne ou un développeur de plus dans votre équipe : un back-end solide, testé, et une vraie collaboration à distance.',
        items: [
          {
            icon: 'saas',
            title: 'SaaS et outils métier',
            desc: 'Comptes, rôles, tableau de bord et abonnements : le produit que vous vendez ou l’outil de vos équipes.',
          },
          {
            icon: 'api',
            title: 'API et intégrations',
            desc: 'Une API REST documentée et testée, avec paiement Mobile Money, notifications et temps réel.',
          },
          {
            icon: 'ecom',
            title: 'Application e-commerce',
            desc: 'Catalogue, commandes et paiement en ligne, avec un back-office pour piloter l’activité.',
          },
          {
            icon: 'mobile',
            title: 'Application mobile',
            desc: 'iOS et Android, de la maquette à la publication, reliées à votre back-end.',
          },
        ],
        // Bandeau sous les cartes : l'offre d'integrer l'equipe, a distance.
        join: {
          title: 'Intégrer votre équipe, à distance',
          desc: 'Je suis aussi ouvert à une collaboration plus durable : rejoindre votre entreprise comme développeur, en remote, et travailler avec vos équipes.',
          cta: 'Proposer une collaboration',
          subject: 'Collaboration à distance',
        },
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
        author: 'Gatien Georges (QuakBox)',
        meta: 'Client · Upwork · Août 2026',
        rating: 5,
        source: { label: 'Profil Upwork', url: 'https://www.upwork.com/freelancers/~01da2964c90bee8c17' },
      },
      {
        quote:
          "Hermes est très à l'écoute de mes demandes : chaque fonctionnalité a été implémentée avec un bon suivi. La plateforme est bien meilleure que ce que j'imaginais au départ. Il a dépassé mes attentes en fonctionnalités, en délais et en finition, même visuellement. Vraiment, c'est du propre.",
        lang: 'fr',
        author: 'Alice Traoré (Apicore)',
        meta: 'Cliente',
      },
    ],
  },

  contact: {
    lead: 'Un projet en *tête* ?',
    body: 'Écrivez-moi — je réponds vite.',
  },
}
