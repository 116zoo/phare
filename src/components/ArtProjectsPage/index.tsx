import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'
import { CitableAEO } from '@/components/CitableAEO'
import { EditorialCta } from '@/components/EditorialCta'

import styles from './ArtProjectsPage.module.css'

type Props = {
  locale: Locale
}

const projects = [
  {
    number: '01',
    title: { fr: 'Tour Eiffel 2000', en: 'Tour Eiffel 2000' },
    text: {
      fr: 'Une œuvre photographique de 365 images, conçue comme un voyage immobile vers le troisième millénaire.',
      en: 'A photographic work of 365 images, conceived as an immobile journey into the third millennium.',
    },
    href: 'createur-d-images',
  },
  {
    number: '02',
    title: { fr: 'Starway to Heaven', en: 'Starway to Heaven' },
    text: {
      fr: 'Un habitat manifeste où architecture, design, lumière et art composent une expérience totale.',
      en: 'A manifesto habitat where architecture, design, light and art form one complete experience.',
    },
    href: 'un-architecte-avant-garde',
  },
  {
    number: '03',
    title: { fr: 'Expositions contemporaines', en: 'Contemporary exhibitions' },
    text: {
      fr: 'Des œuvres et des lieux pensés ensemble pour provoquer la rencontre entre les regards.',
      en: 'Works and places conceived together to create encounters between perspectives.',
    },
    href: 'contact',
  },
]

export function ArtProjectsPage({ locale }: Props) {
  const language = locale === 'en' ? 'en' : 'fr'
  const isEnglish = language === 'en'

  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Quels projets artistiques présente Lubliner ART ?', en: 'Which art projects does Lubliner ART present?' },
            answer: {
              fr: 'Lubliner ART présente des projets qui associent photographie, architecture, design, exposition et expérience du lieu.',
              en: 'Lubliner ART presents projects combining photography, architecture, design, exhibitions and the experience of place.',
            },
          },
          {
            question: { fr: 'Quel est le projet photographique majeur ?', en: 'What is the major photographic project?' },
            answer: {
              fr: 'Tour Eiffel 2000 — Un voyage immobile est une œuvre de Jean-Paul Lubliner composée de 365 photographies.',
              en: 'Tour Eiffel 2000 — An Immobile Journey is a work by Jean-Paul Lubliner made up of 365 photographs.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Les projets artistiques de Lubliner ART réunissent photographie, architecture, design et exposition. Ils sont conçus par Jean-Paul Lubliner pour faire dialoguer les œuvres et les lieux.',
          en: 'Lubliner ART’s art projects bring together photography, architecture, design and exhibitions. Jean-Paul Lubliner creates them to make works and places converse.',
        }}
      />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{isEnglish ? 'Jean-Paul Lubliner · art projects' : 'Jean-Paul Lubliner · projets artistiques'}</p>
        <h1>
          <span className={styles.titleLead}>{isEnglish ? 'Art in' : 'L’art en'}</span>
          <em className={styles.titleAccent}>{isEnglish ? 'motion.' : 'mouvement.'}</em>
        </h1>
        <p className={styles.lead}>
          {isEnglish
            ? 'Projects where images, places and ideas become experiences.'
            : 'Des projets où les images, les lieux et les idées deviennent des expériences.'}
        </p>
      </header>
      <section className={styles.grid} aria-label={isEnglish ? 'Art projects' : 'Projets artistiques'}>
        {projects.map((project) => (
          <Link className={styles.card} href={localizedHref(locale, project.href)} key={project.number}>
            <span className={styles.number}>{project.number}</span>
            <h2>{project.title[language]}</h2>
            <p>{project.text[language]}</p>
          </Link>
        ))}
      </section>
      <EditorialCta
        detail={isEnglish ? 'Have an artistic idea that needs a place to exist?' : 'Vous avez une idée artistique qui cherche un lieu où exister ?'}
        eyebrow={isEnglish ? 'A project to invent' : 'Un projet à inventer'}
        label={isEnglish ? 'Talk about your project' : 'Parler de votre projet'}
        locale={locale}
      />
    </article>
  )
}
