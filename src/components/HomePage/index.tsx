import type { Locale } from '@/i18n/config'

import { NewsletterCard } from './NewsletterCard'
import styles from './HomePage.module.css'

type Props = {
  locale: Locale
}

const projectsFr = [
  {
    index: '01',
    title: 'Une nouvelle Radio Libre',
    text: 'Une fréquence indépendante pour faire entendre les voix, les idées et les curiosités qui déplacent les lignes.',
  },
  {
    index: '02',
    title: 'Un salon de thé / café à l’Atelier des Abbesses',
    text: 'Un lieu vivant à Montmartre, entre architecture, conversations et pauses choisies.',
  },
  {
    index: '03',
    title: 'Des expositions d’art contemporain',
    text: 'Des rencontres entre œuvres, espaces et regards pour faire circuler l’art autrement.',
  },
]

const pitchesFr = [
  {
    label: 'Architecte avant-garde',
    title: 'Habiter autrement.',
    text: 'Des lieux qui relient la lumière, l’usage et l’imaginaire, avec une attention particulière aux matières et aux modes de vie de demain.',
  },
  {
    label: 'Créateur d’images',
    title: 'Rendre le temps visible.',
    text: 'De la Tour Eiffel à l’horizon urbain, une photographie monumentale qui transforme un lieu en expérience et un instant en mémoire.',
  },
  {
    label: 'Homme de radio',
    title: 'Faire entendre une époque.',
    text: 'De Radio Arlequin à Radio Nova, une aventure de liberté éditoriale portée par la curiosité, le rythme et la rencontre.',
  },
  {
    label: 'Créateur de publications',
    title: 'Donner une forme aux idées.',
    text: 'Des magazines qui mêlent photographie, littérature et société pour regarder leur époque avec élégance et impertinence.',
  },
  {
    label: 'Magazine',
    title: 'Le monde en mouvement.',
    text: 'Un espace de regards sur l’architecture, l’art, la culture et les transformations contemporaines.',
  },
]

const projectsEn = [
  { index: '01', title: 'A new Free Radio', text: 'An independent frequency for voices, ideas and curiosities that move the lines.' },
  { index: '02', title: 'A tea room / café at the Abbesses Atelier', text: 'A living place in Montmartre, between architecture, conversation and chosen pauses.' },
  { index: '03', title: 'Contemporary art exhibitions', text: 'Encounters between works, spaces and perspectives, allowing art to circulate differently.' },
]

const pitchesEn = [
  { label: 'Avant-garde architect', title: 'Live differently.', text: 'Places connecting light, use and imagination, with close attention to materials and tomorrow’s ways of living.' },
  { label: 'Image maker', title: 'Make time visible.', text: 'From the Eiffel Tower to the urban horizon, monumental photography turning a place into an experience and an instant into memory.' },
  { label: 'Man of radio', title: 'Make an era heard.', text: 'From Radio Arlequin to Radio Nova, an adventure in editorial freedom shaped by curiosity, rhythm and encounters.' },
  { label: 'Publisher', title: 'Give ideas a form.', text: 'Magazines bringing together photography, literature and society to look at their time with elegance and irreverence.' },
  { label: 'Magazine', title: 'A world in motion.', text: 'A space for perspectives on architecture, art, culture and contemporary transformations.' },
]

export function HomePage({ locale }: Props) {
  const isEnglish = locale === 'en'
  const projects = isEnglish ? projectsEn : projectsFr
  const pitches = isEnglish ? pitchesEn : pitchesFr

  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroMeta}>
          <span>Lubliner ART</span>
          <span>Paris · Montmartre</span>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{isEnglish ? 'Jean-Paul Lubliner · Art designer' : 'Jean-Paul Lubliner · Art concepteur'}</p>
          <h1 id="home-title">
            {isEnglish ? 'A refuge' : 'Un refuge'}
            <em>{isEnglish ? 'for ideas.' : 'pour les idées.'}</em>
          </h1>
          <p className={styles.heroLead}>
            {isEnglish
              ? 'Architecture, images, media and publishing: one shared desire to create open, sensitive spaces in motion.'
              : 'Architecture, images, médias et publications : une même envie de créer des espaces ouverts, sensibles et en mouvement.'}
          </p>
        </div>
      </section>

      <section className={styles.projects} aria-labelledby="projects-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionIndex}>01—03</span>
          <h2 id="projects-title">{isEnglish ? 'Projects underway' : 'Projets en route'}</h2>
          <p>{isEnglish ? 'Ideas taking shape between a place, a voice and an audience.' : 'Des idées qui prennent forme, entre un lieu, une voix et un public.'}</p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.index}>
              <span className={styles.cardIndex}>{project.index}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <span className={styles.cardMark} aria-hidden="true">↗</span>
            </article>
          ))}
          <NewsletterCard locale={locale} />
        </div>
      </section>

      <section className={styles.pitches} aria-labelledby="pitches-title">
        <div className={styles.pitchesHeader}>
          <span className={styles.sectionIndex}>02—05</span>
          <h2 id="pitches-title">{isEnglish ? 'A few lines to begin.' : 'Quelques lignes pour commencer.'}</h2>
        </div>
        <div className={styles.pitchList}>
          {pitches.map((pitch, index) => (
            <article className={styles.pitch} key={pitch.label}>
              <span className={styles.pitchNumber}>0{index + 1}</span>
              <div>
                <span className={styles.pitchLabel}>{pitch.label}</span>
                <h3>{pitch.title}</h3>
                <p>{pitch.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
