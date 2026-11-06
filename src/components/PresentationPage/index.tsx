import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

import styles from './PresentationPage.module.css'

type Props = {
  locale: Locale
}

const entries = [
  {
    number: '01',
    href: 'un-architecte-avant-garde',
    title: { fr: 'Créateur d’architecture', en: 'Architecture creator' },
    text: {
      fr: 'Imaginer des lieux vivants, entre exigence architecturale, usage et imagination.',
      en: 'Imagining living spaces where architectural rigour, use and imagination meet.',
    },
  },
  {
    number: '02',
    href: 'createur-d-images',
    title: { fr: 'Créateur d’images', en: 'Image creator' },
    text: {
      fr: 'Une œuvre photographique monumentale, de la Tour Eiffel au passage vers le troisième millénaire.',
      en: 'A monumental photographic work, from the Eiffel Tower to the turn of the millennium.',
    },
  },
  {
    number: '03',
    href: 'un-homme-de-radio',
    title: { fr: 'Un homme de radio', en: 'A man of radio' },
    text: {
      fr: 'Les premières radios libres, Radio Arlequin et l’aventure Radio Nova.',
      en: 'The first free radios, Radio Arlequin and the Radio Nova adventure.',
    },
  },
  {
    number: '04',
    href: 'createur-de-publications',
    title: { fr: 'Créateur de publications', en: 'Publication creator' },
    text: {
      fr: 'Nouvelles Vagues, Sans Nom et Citizen K : des revues pour faire circuler les idées.',
      en: 'Nouvelles Vagues, Sans Nom and Citizen K: magazines that made ideas travel.',
    },
  },
] as const

export function PresentationPage({ locale }: Props) {
  const language = locale === 'en' ? 'en' : 'fr'
  const isEnglish = language === 'en'

  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="presentation-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{isEnglish ? 'Jean-Paul Lubliner' : 'Jean-Paul Lubliner'}</p>
          <h1 id="presentation-title">
            {isEnglish ? 'A life in' : 'Une vie en'} <em>{isEnglish ? 'movement' : 'mouvement'}</em>
          </h1>
          <p className={styles.lead}>
            {isEnglish
              ? 'Architect, image maker, radio pioneer and publisher: four paths, one independent vision.'
              : 'Architecte, créateur d’images, homme de radio et éditeur : quatre chemins, une même vision libre.'}
          </p>
          <figure className={styles.signature}>
            <Image
              alt={isEnglish ? 'Jean-Paul Lubliner handwritten signature' : 'Signature manuscrite de Jean-Paul Lubliner'}
              height={501}
              src="/media/lubliner/jean-paul-signature.png"
              width={1200}
            />
            <figcaption>{isEnglish ? 'Jean-Paul Lubliner' : 'Jean-Paul Lubliner'}</figcaption>
          </figure>
        </div>
        <figure className={styles.portrait}>
          <Image
            alt={isEnglish ? 'Portrait of Jean-Paul Lubliner' : 'Portrait de Jean-Paul Lubliner'}
            fill
            priority
            sizes="(max-width: 760px) 70vw, 28rem"
            src="/media/lubliner/Jean-Paul-LUBLINER-lubliner.art_-e1740493132802-r212qhnfw111kl5aw23bzt0393s8dihj9kbemqilms-83a72c60.jpg"
          />
          <figcaption>{isEnglish ? 'Art conceiver' : 'Art concepteur'}</figcaption>
        </figure>
      </section>

      <section className={styles.entries} aria-labelledby="presentation-entries-title">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>{isEnglish ? 'Four directions' : 'Quatre directions'}</span>
          <h2 id="presentation-entries-title">
            {isEnglish ? 'The work takes' : 'Le travail prend'} <em>{isEnglish ? 'shape' : 'forme'}</em>
          </h2>
        </div>
        <div className={styles.cardGrid}>
          {entries.map((entry, index) => (
            <Link
              className={`${styles.card} ${styles[`card${index + 1}`]}`}
              href={localizedHref(locale, entry.href)}
              key={entry.href}
            >
              <span className={styles.cardNumber}>{entry.number}</span>
              <span className={styles.cardTitle}>{entry.title[language]}</span>
              <span className={styles.cardText}>{entry.text[language]}</span>
              <span className={styles.cardArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
