import 'dotenv/config'

import type { RequiredDataFromCollectionSlug } from 'payload'

import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Demo content for the "Platform" (SaaS landing) design: a FR/EN page built only from
 * the Platform hero and blocks, and — with `--globals` — the Platform header and footer.
 *
 *   node --import=tsx/esm src/scripts/seed-platform-demo.ts            # page only
 *   node --import=tsx/esm src/scripts/seed-platform-demo.ts --globals  # + header/footer
 *
 * It writes to whatever POSTGRES_URL points at. `.env.local` targets PRODUCTION: run it
 * against a local database, or deliberately. The page is created as a draft unless
 * `--publish` is passed, and the header/footer are only touched with `--globals`.
 * All texts are placeholders to adapt in the admin.
 */

type Page = RequiredDataFromCollectionSlug<'pages'>
type Locale = 'fr' | 'en'

const SLUG = 'plateforme'
const args = new Set(process.argv.slice(2))

const text = (value: string) => ({
  type: 'text' as const,
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text: value,
  version: 1,
})

const heroText = (title: string, subtitle: string): Page['hero']['richText'] => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'heading',
        tag: 'h1',
        children: [text(title)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [text(subtitle)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        textFormat: 0,
      },
    ],
  },
})

const url = (label: string, href: string, appearance?: 'default' | 'outline') => ({
  type: 'custom' as const,
  url: href,
  label,
  ...(appearance ? { appearance } : {}),
})

const copy = {
  fr: {
    title: 'Plateforme',
    aeo: 'Lubliner ART est un atelier parisien d’art et d’architecture : images, publications, projets artistiques et architecture, de la première esquisse à la réalisation.',
    hero: {
      badge: 'Atelier parisien · Art & architecture',
      h1: 'Donnez forme à vos idées.',
      sub: 'Images, publications, projets artistiques et architecture : un même atelier pour concevoir, raconter et construire vos projets les plus singuliers.',
      cta1: 'Démarrer un projet',
      cta2: 'Découvrir l’atelier',
      note: 'Premier échange sans engagement',
    },
    logos: {
      eyebrow: 'Ils nous ont fait confiance',
      rating: '5,0 / 5 · avis Google',
      link: 'Voir nos partenaires',
    },
    stats: {
      heading: 'Cinq univers, un seul atelier',
      eyebrow: 'Repères · à personnaliser',
      items: [
        ['Radio', '1', 'Un homme de radio'],
        ['Image', '2', 'Créateur d’images'],
        ['Édition', '3', 'Créateur de publications'],
        ['Architecture', '4', 'Un architecte avant-garde'],
      ],
    },
    marquee: {
      lead: 'L’atelier accompagne ses clients pour',
      items: [
        'Identité visuelle',
        'Scénographie',
        'Architecture intérieure',
        'Édition d’art',
        'Installations',
        'Création sonore',
        'Direction artistique',
        'Projets patrimoniaux',
      ],
      cta: 'Explorer les réalisations',
    },
    testimonials: {
      heading: 'Ce qu’en disent nos clients',
      items: [
        [
          'Une écoute rare et une vraie vision : le projet a dépassé ce que nous imaginions.',
          'Prénom Nom',
          'Témoignage à remplacer',
        ],
        [
          'Un atelier qui sait passer de l’idée au chantier sans jamais perdre le fil.',
          'Prénom Nom',
          'Témoignage à remplacer',
        ],
        [
          'Chaque détail a été pensé, de la première esquisse à l’inauguration.',
          'Prénom Nom',
          'Témoignage à remplacer',
        ],
      ],
    },
    stories: {
      heading: 'Des projets, des histoires',
      more: 'Voir tous les projets',
      read: 'Lire le projet',
      items: [
        ['Tour Eiffel 2000 : le projet d’un cube pour le nouveau millénaire.', '/tour-eiffel-2000'],
        ['Les projets artistiques : installations et œuvres in situ.', '/les-projets-artistiques'],
        [
          'Créateur de publications : livres, revues et objets éditoriaux.',
          '/createur-de-publications',
        ],
        ['Un architecte avant-garde : espaces et lieux de vie.', '/un-architecte-avant-garde'],
      ],
    },
    trust: {
      heading: 'Un accompagnement de bout en bout',
      body: 'De la conception à la livraison, chaque projet bénéficie d’un suivi personnalisé, d’une documentation claire et d’un interlocuteur unique.',
      link: 'Découvrir la démarche',
      items: [
        ['Écoute', 'Un premier rendez-vous pour comprendre votre projet'],
        ['Conception', 'Esquisses, maquettes et rendus'],
        ['Réalisation', 'Coordination des artisans et du chantier'],
        ['Accessibilité', 'Site conforme RGAA'],
        ['Bilingue', 'Projets menés en français et en anglais'],
      ],
    },
    showcase: {
      eyebrow: 'Méthode',
      heading: 'Suivez chaque étape de votre projet, de l’esquisse à l’inauguration.',
      body: 'Remplacez ce visuel par une capture ou une photo de projet depuis l’admin.',
      stats: [
        ['Étapes', '4'],
        ['Interlocuteur', '1'],
        ['Langues', '2'],
        ['Atelier', 'Paris'],
      ],
    },
    cta: {
      heading: 'Menez votre prochain projet avec l’atelier.',
      body: 'Parlons de vos idées autour d’un café, passage des Abbesses.',
      primary: 'Prendre contact',
      secondary: 'Lire le magazine',
    },
  },
  en: {
    title: 'Platform',
    aeo: 'Lubliner ART is a Paris art and architecture studio: images, publications, art projects and architecture, from the first sketch to completion.',
    hero: {
      badge: 'Paris studio · Art & architecture',
      h1: 'Give shape to your ideas.',
      sub: 'Images, publications, art projects and architecture: one studio to design, tell and build your most singular projects.',
      cta1: 'Start a project',
      cta2: 'Discover the studio',
      note: 'First conversation, no commitment',
    },
    logos: {
      eyebrow: 'They trusted us',
      rating: '5.0 / 5 · Google reviews',
      link: 'See our partners',
    },
    stats: {
      heading: 'Five worlds, one studio',
      eyebrow: 'Highlights · to customise',
      items: [
        ['Radio', '1', 'A man of radio'],
        ['Image', '2', 'Image creator'],
        ['Publishing', '3', 'Publication creator'],
        ['Architecture', '4', 'An avant-garde architect'],
      ],
    },
    marquee: {
      lead: 'The studio helps its clients with',
      items: [
        'Visual identity',
        'Scenography',
        'Interior architecture',
        'Art publishing',
        'Installations',
        'Sound design',
        'Art direction',
        'Heritage projects',
      ],
      cta: 'Explore the projects',
    },
    testimonials: {
      heading: 'What our clients say',
      items: [
        [
          'Rare listening skills and a real vision: the project went beyond what we imagined.',
          'First Last',
          'Placeholder testimonial',
        ],
        [
          'A studio that goes from idea to build site without ever losing the thread.',
          'First Last',
          'Placeholder testimonial',
        ],
        [
          'Every detail was considered, from the first sketch to the opening.',
          'First Last',
          'Placeholder testimonial',
        ],
      ],
    },
    stories: {
      heading: 'Projects with a story',
      more: 'See all projects',
      read: 'Read the project',
      items: [
        ['Eiffel Tower 2000: a cube for the new millennium.', '/tour-eiffel-2000'],
        ['Art projects: installations and site-specific works.', '/les-projets-artistiques'],
        [
          'Publication creator: books, magazines and editorial objects.',
          '/createur-de-publications',
        ],
        ['An avant-garde architect: spaces and places to live.', '/un-architecte-avant-garde'],
      ],
    },
    trust: {
      heading: 'End-to-end guidance',
      body: 'From design to delivery, every project gets personal follow-up, clear documentation and a single point of contact.',
      link: 'Discover the approach',
      items: [
        ['Listening', 'A first meeting to understand your project'],
        ['Design', 'Sketches, models and renderings'],
        ['Delivery', 'Craftspeople and build-site coordination'],
        ['Accessibility', 'RGAA-compliant website'],
        ['Bilingual', 'Projects run in French and English'],
      ],
    },
    showcase: {
      eyebrow: 'Method',
      heading: 'Follow every step of your project, from sketch to opening.',
      body: 'Replace this visual with a screenshot or a project photo from the admin.',
      stats: [
        ['Steps', '4'],
        ['Contact', '1'],
        ['Languages', '2'],
        ['Studio', 'Paris'],
      ],
    },
    cta: {
      heading: 'Run your next project with the studio.',
      body: 'Let’s talk about your ideas over coffee, passage des Abbesses.',
      primary: 'Get in touch',
      secondary: 'Read the magazine',
    },
  },
}

const pageData = (locale: Locale): Partial<Page> => {
  const c = copy[locale]

  return {
    title: c.title,
    aeo: { aeoSummary: c.aeo },
    hero: {
      type: 'saas',
      badge: { label: c.hero.badge, url: '/presentation' },
      richText: heroText(c.hero.h1, c.hero.sub),
      links: [{ link: url(c.hero.cta1, '/contact') }, { link: url(c.hero.cta2, '/presentation') }],
      note: c.hero.note,
    },
    layout: [
      {
        blockType: 'logoCloud',
        eyebrow: c.logos.eyebrow,
        rating: c.logos.rating,
        logos: ['Partenaire A', 'Partenaire B', 'Partenaire C', 'Partenaire D', 'Partenaire E'].map(
          (name) => ({ name }),
        ),
        enableLink: true,
        link: url(c.logos.link, '/partenaires'),
      },
      {
        blockType: 'productShowcase',
        eyebrow: c.showcase.eyebrow,
        heading: c.showcase.heading,
        body: c.showcase.body,
        stats: c.showcase.stats.map(([label, value]) => ({ label, value })),
      },
      {
        blockType: 'statsCards',
        heading: c.stats.heading,
        eyebrow: c.stats.eyebrow,
        items: c.stats.items.map(([label, value, description]) => ({ label, value, description })),
      },
      {
        blockType: 'useCaseMarquee',
        lead: c.marquee.lead,
        items: c.marquee.items.map((label) => ({ label })),
        enableLink: true,
        link: url(c.marquee.cta, '/les-projets-artistiques'),
      },
      {
        blockType: 'testimonials',
        heading: c.testimonials.heading,
        items: c.testimonials.items.map(([quote, name, role]) => ({ quote, name, role })),
      },
      {
        blockType: 'storyCards',
        heading: c.stories.heading,
        enableLink: true,
        link: url(c.stories.more, '/presentation'),
        items: c.stories.items.map(([title, href]) => ({ title, link: url(c.stories.read, href) })),
      },
      {
        blockType: 'trustGrid',
        heading: c.trust.heading,
        body: c.trust.body,
        enableLink: true,
        link: url(c.trust.link, '/presentation'),
        items: c.trust.items.map(([title, description]) => ({ title, description })),
      },
      {
        blockType: 'ctaBand',
        heading: c.cta.heading,
        body: c.cta.body,
        links: [
          { link: url(c.cta.primary, '/contact', 'default') },
          { link: url(c.cta.secondary, '/magazine', 'outline') },
        ],
      },
    ] as Page['layout'],
  }
}

const headerData = (locale: Locale) => {
  const fr = locale === 'fr'
  const child = (label: string, href: string, description: string) => ({
    link: url(label, href),
    description,
  })

  return {
    style: 'saas' as const,
    announcement: {
      enabled: true,
      text: fr
        ? 'Nouveau : le magazine de l’atelier est en ligne.'
        : 'New: the studio magazine is online.',
      linkLabel: fr ? 'Lire le magazine' : 'Read the magazine',
      url: fr ? '/magazine' : '/en/magazine',
    },
    navItems: [
      {
        link: url(fr ? 'L’atelier' : 'The studio', '/presentation'),
        children: [
          child(
            fr ? 'Un homme de radio' : 'A man of radio',
            '/un-homme-de-radio',
            fr ? 'Les origines' : 'The origins',
          ),
          child(
            fr ? 'Créateur d’images' : 'Image creator',
            '/createur-d-images',
            fr ? 'Photographie et graphisme' : 'Photography and graphics',
          ),
          child(
            fr ? 'Créateur de publications' : 'Publication creator',
            '/createur-de-publications',
            fr ? 'Livres et revues' : 'Books and magazines',
          ),
          child(
            fr ? 'Un architecte avant-garde' : 'An avant-garde architect',
            '/un-architecte-avant-garde',
            fr ? 'Espaces et lieux' : 'Spaces and places',
          ),
        ],
      },
      { link: url(fr ? 'Projets artistiques' : 'Art projects', '/les-projets-artistiques') },
      { link: url('Tour Eiffel 2000', '/tour-eiffel-2000') },
      { link: url('Magazine', '/magazine') },
      { link: url(fr ? 'Partenaires' : 'Partners', '/partenaires') },
    ],
    ctas: [
      { link: url(fr ? 'Rechercher' : 'Search', '/search', 'outline') },
      { link: url(fr ? 'Prendre contact' : 'Get in touch', '/contact', 'default') },
    ],
  }
}

const footerData = (locale: Locale) => {
  const fr = locale === 'fr'

  return {
    style: 'saas' as const,
    tagline: fr
      ? 'Atelier d’art et d’architecture, passage des Abbesses, Paris 18e.'
      : 'Art and architecture studio, passage des Abbesses, Paris 18th.',
    badges: [{ label: 'RGAA' }, { label: fr ? 'Bilingue FR/EN' : 'Bilingual FR/EN' }],
    columns: [
      {
        title: fr ? 'L’atelier' : 'The studio',
        links: [
          { link: url(fr ? 'Présentation' : 'Presentation', '/presentation') },
          { link: url(fr ? 'Un homme de radio' : 'A man of radio', '/un-homme-de-radio') },
          { link: url(fr ? 'Créateur d’images' : 'Image creator', '/createur-d-images') },
        ],
      },
      {
        title: fr ? 'Projets' : 'Projects',
        links: [
          { link: url(fr ? 'Projets artistiques' : 'Art projects', '/les-projets-artistiques') },
          { link: url('Tour Eiffel 2000', '/tour-eiffel-2000') },
          { link: url(fr ? 'Architecture' : 'Architecture', '/un-architecte-avant-garde') },
        ],
      },
      {
        title: fr ? 'Ressources' : 'Resources',
        links: [
          { link: url('Magazine', '/magazine') },
          { link: url(fr ? 'Articles' : 'Articles', '/posts') },
          { link: url(fr ? 'Rechercher' : 'Search', '/search') },
        ],
        subTitle: fr ? 'Informations' : 'Information',
        subLinks: [
          {
            link: url(
              fr ? 'Déclaration d’accessibilité' : 'Accessibility statement',
              '/accessibilite',
            ),
          },
        ],
      },
      {
        title: 'Contact',
        links: [
          { link: url(fr ? 'Nous écrire' : 'Write to us', '/contact') },
          { link: url(fr ? 'Partenaires' : 'Partners', '/partenaires') },
        ],
      },
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/lublinerartarchitecture/' },
      { label: 'Facebook', url: 'https://www.facebook.com/lublinerart/about/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jean-paul-lubliner-54640230' },
    ],
    copyright: fr ? 'Lubliner ART · Tous droits réservés.' : 'Lubliner ART · All rights reserved.',
  }
}

const run = async () => {
  const payload = await getPayload({ config })
  const status = args.has('--publish') ? 'published' : 'draft'

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: SLUG } },
    limit: 1,
    draft: true,
  })

  let id = existing.docs[0]?.id

  for (const locale of ['fr', 'en'] as const) {
    const data = { ...pageData(locale), slug: SLUG, _status: status } as Page

    if (!id) {
      const created = await payload.create({
        collection: 'pages',
        data,
        locale,
        draft: status === 'draft',
      })
      id = created.id
    } else {
      await payload.update({ collection: 'pages', id, data, locale, draft: status === 'draft' })
    }
  }

  payload.logger.info(`Page "${SLUG}" ready (${status}), id ${id}.`)

  if (args.has('--globals')) {
    for (const locale of ['fr', 'en'] as const) {
      // Casts: the demo objects are plain literals checked against the generated types at runtime.
      await payload.updateGlobal({ slug: 'header', data: headerData(locale) as never, locale })
      await payload.updateGlobal({ slug: 'footer', data: footerData(locale) as never, locale })
    }
    payload.logger.info('Header and footer switched to the Platform style.')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
