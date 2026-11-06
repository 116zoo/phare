import Image from 'next/image'

import type { Locale } from '@/i18n/config'
import { EditorialCta } from '@/components/EditorialCta'

import styles from './ArchitectePage.module.css'

type Props = {
  locale: Locale
}

const projects = [
  {
    src: '/media/lubliner/starway-aquarium-escalier.jpg',
    alt: 'Aquarium et escalier dans le projet Starway to Heaven',
    label: 'Starway to Heaven · aquarium',
    className: styles.projectOne,
  },
  {
    src: '/media/lubliner/starway-bedroom-night.webp',
    alt: 'Chambre contemporaine avec vue nocturne sur Paris',
    label: 'Starway to Heaven · nuit',
    className: styles.projectTwo,
  },
  {
    src: '/media/lubliner/atelier-abbesses-interior.jpg',
    alt: 'Atelier réhabilité avec charpente apparente et verrière',
    label: 'Atelier des Abbesses',
    className: styles.projectThree,
  },
  {
    src: '/media/lubliner/starway-page-0001.jpg',
    alt: 'Vue intérieure d’un espace architectural signé Lubliner ART',
    label: 'Lubliner ART · espace intérieur',
    className: styles.projectFour,
  },
]

export function ArchitectePage({ locale }: Props) {
  const isEnglish = locale === 'en'
  return (
    <article className={styles.page}>
      <section className={styles.intro} aria-labelledby="architecte-title">
        <div className={styles.meta}>
          <span>{isEnglish ? 'Architecture creator' : 'Créateur d’architecture'}</span>
          <span>Lubliner ART · Paris</span>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.kicker}>Jean-Paul Lubliner</p>
          <h1 id="architecte-title">
            {isEnglish ? 'Architect' : 'Architecte'}
            <em>{isEnglish ? 'of living spaces' : 'des espaces vivants'}</em>
          </h1>
        </div>

        <p className={styles.lead}>
          {isEnglish ? 'Designing places that connect use, light and imagination.' : 'Concevoir des lieux qui relient l’usage, la lumière et l’imaginaire.'}
        </p>
      </section>

      <section className={styles.gallery} aria-label={isEnglish ? 'Lubliner ART architecture projects' : 'Projets d’architecture Lubliner ART'}>
        {projects.map((project, index) => (
          <figure className={`${styles.project} ${project.className}`} key={project.src}>
            <Image
              alt={project.alt}
              className={styles.projectImage}
              fill
              priority={index < 2}
              sizes="(max-width: 700px) 100vw, 50vw"
              src={project.src}
            />
            <figcaption>{project.label}</figcaption>
          </figure>
        ))}
      </section>

      <section className={styles.story} aria-labelledby="architecture-story-title">
        <div className={styles.storyLabel}>{isEnglish ? 'The approach' : 'La démarche'}</div>
        <div className={styles.storyCopy}>
          <h2 id="architecture-story-title">{isEnglish ? 'Build with reality.' : 'Construire avec le réel.'}</h2>
          <p>
            {isEnglish
              ? 'Architecture is his passion and now his profession. Jean-Paul Lubliner founded his practice with Hery Ravelomananstoa, developing projects where space, art and experience meet. Each place becomes a material to inhabit, move through and feel.'
              : 'L’architecture est sa passion et aujourd’hui sa profession. Jean-Paul Lubliner crée son cabinet avec Hery Ravelomananstoa et développe des projets où l’espace, l’art et l’expérience se rencontrent. Chaque lieu devient une matière à habiter, à traverser et à ressentir.'}
          </p>
        </div>
      </section>
      <EditorialCta
        detail={isEnglish ? 'Let’s imagine the place your project is waiting for.' : 'Imaginons ensemble le lieu que votre projet attend.'}
        eyebrow={isEnglish ? 'Architecture in conversation' : 'Architecture en conversation'}
        label={isEnglish ? 'Talk about your project' : 'Parler de votre projet'}
        locale={locale}
      />
    </article>
  )
}
