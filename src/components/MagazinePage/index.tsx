import type { Locale } from '@/i18n/config'
import { CitableAEO } from '@/components/CitableAEO'

import styles from './MagazinePage.module.css'

type Props = {
  locale: Locale
}

const articlesFr = [
  {
    category: 'Architecture · Paris',
    date: '19.05.2026',
    title: 'Le Louvre se réinvente sans effacer son histoire',
    excerpt:
      'La transformation de la Grande Colonnade pose une question essentielle : comment agrandir l’expérience d’un monument sans dissoudre sa mémoire ? À Paris, l’architecture redevient un acte de transmission.',
    source: 'Le Monde',
    href: 'https://www.lemonde.fr/culture/article/2026/05/19/musee-du-louvre-studios-architecture-paris-et-selldorf-architects-deux-agences-retenues-pour-sa-transformation_6691500_3246.html',
  },
  {
    category: 'Patrimoine · Climat',
    date: '16.10.2026',
    title: 'Le patrimoine devient une infrastructure climatique',
    excerpt:
      'Face aux événements extrêmes, les lieux de culture ne sont plus seulement à préserver : ils doivent aussi apprendre à résister. L’UNESCO développe un nouvel outil pour inscrire l’adaptation climatique au cœur de la gestion des sites patrimoniaux.',
    source: 'UNESCO',
    href: 'https://www.unesco.org/en/articles/unesco-advances-development-tool-integrate-climate-action-world-heritage-management',
  },
  {
    category: 'Création · Matières',
    date: '31.10.2026',
    title: 'Construire avec plusieurs temps',
    excerpt:
      'À Paris, l’architecte Tsuyoshi Tane imagine des espaces où l’histoire, les savoir-faire et la matière contemporaine dialoguent. Une manière de bâtir qui préfère la continuité spectaculaire à la rupture immédiate.',
    source: 'Le Monde',
    href: 'https://www.lemonde.fr/en/culture/article/2026/10/31/japanese-architect-tsuyoshi-tane-celebrates-the-art-of-bringing-together-different-eras-in-paris_6768049_30.html',
  },
  {
    category: 'Regards · Architecture',
    date: '22.09.2026',
    title: 'La lumière comme matière première',
    excerpt:
      'Le Prix 10+1 rappelle que la qualité d’un projet se joue parfois dans des choix discrets : une lumière juste, une enveloppe précise, des usages réellement reliés. Une architecture qui ne cherche pas l’effet, mais l’évidence.',
    source: 'Le Monde',
    href: 'https://www.lemonde.fr/culture/article/2026/09/22/le-grand-prix-decerne-par-la-revue-specialisee-d-a-fixe-le-cap-de-la-bonne-architecture_6780278_30.html',
  },
]

const articlesEn = [
  { category: 'Architecture · Paris', date: '19.05.2026', title: 'The Louvre reinvents itself without erasing its history', excerpt: 'The transformation of the Grande Colonnade raises an essential question: how can a monument’s experience grow without dissolving its memory? In Paris, architecture becomes an act of transmission again.', source: 'Le Monde', href: articlesFr[0].href },
  { category: 'Heritage · Climate', date: '16.10.2026', title: 'Heritage becomes climate infrastructure', excerpt: 'As extreme events intensify, cultural places must not only be preserved: they must learn to resist. UNESCO is developing a new tool to place climate adaptation at the heart of heritage-site management.', source: 'UNESCO', href: articlesFr[1].href },
  { category: 'Creation · Materials', date: '31.10.2026', title: 'Building across several times', excerpt: 'In Paris, architect Tsuyoshi Tane imagines spaces where history, craft and contemporary materials converse. A way of building that favours continuity over immediate rupture.', source: 'Le Monde', href: articlesFr[2].href },
  { category: 'Perspectives · Architecture', date: '22.09.2026', title: 'Light as a raw material', excerpt: 'The 10+1 Prize reminds us that a project’s quality can lie in discreet choices: precise light, a careful envelope and genuinely connected uses. Architecture without effect, but with evidence.', source: 'Le Monde', href: articlesFr[3].href },
]

export function MagazinePage({ locale }: Props) {
  const isEnglish = locale === 'en'
  const articles = isEnglish ? articlesEn : articlesFr
  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Qu’est-ce que le Magazine Lubliner ART ?', en: 'What is the Lubliner ART Magazine?' },
            answer: {
              fr: 'Le Magazine Lubliner ART est une page d’actualités et de regards consacrée à l’architecture, l’art, la culture et les transformations contemporaines.',
              en: 'The Lubliner ART Magazine is a current-affairs and perspectives page dedicated to architecture, art, culture and contemporary change.',
            },
          },
          {
            question: { fr: 'Quels sujets sont traités ?', en: 'Which subjects does it cover?' },
            answer: {
              fr: 'Le magazine traite notamment de patrimoine, de climat, de matières, de lumière et des nouvelles manières d’habiter les espaces.',
              en: 'The magazine covers heritage, climate, materials, light and new ways of inhabiting spaces.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Le Magazine de Jean-Paul Lubliner propose une sélection de sujets sur l’architecture, l’art, la culture et les façons d’habiter notre époque, avec des sources identifiées.',
          en: 'Jean-Paul Lubliner’s Magazine selects stories about architecture, art, culture and the ways we inhabit our time, with identified sources.',
        }}
      />
      <header className={styles.hero}>
        <div className={styles.meta}>
          <span>Magazine</span>
          <span>{isEnglish ? 'Perspectives · ideas · current affairs' : 'Regards · idées · actualités'}</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>Jean-Paul Lubliner</p>
            <h1>
              {isEnglish ? 'The world' : 'Le monde'}
              <em>{isEnglish ? 'in motion.' : 'en mouvement.'}</em>
            </h1>
          </div>
          <p className={styles.intro}>
            {isEnglish ? 'A selection of stories about the changing forms of architecture, art and the ways we inhabit our time.' : 'Une sélection de sujets qui racontent les mutations de l’architecture, de l’art et des façons d’habiter notre époque.'}
          </p>
        </div>
      </header>

      <section className={styles.articles} aria-labelledby="magazine-articles-title">
        <div className={styles.sectionHead}>
          <span>01—04</span>
          <h2 id="magazine-articles-title">{isEnglish ? 'In focus' : 'À la une'}</h2>
          <span>{isEnglish ? 'November 2026' : 'Novembre 2026'}</span>
        </div>
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <article className={`${styles.card} ${index === 0 ? styles.featured : ''}`} key={article.title}>
              <div className={styles.cardTop}>
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <a href={article.href} rel="noreferrer" target="_blank">
                  {isEnglish ? 'Read the source' : 'Lire la source'}
                </a>
              </div>
              <div className={styles.source}>{article.source}</div>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
