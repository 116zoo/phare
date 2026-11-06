import Image from 'next/image'

import type { Locale } from '@/i18n/config'
import { EditorialCta } from '@/components/EditorialCta'
import { CitableAEO } from '@/components/CitableAEO'

import styles from './CreateurPublicationsPage.module.css'

type Props = {
  locale: Locale
}

export function CreateurPublicationsPage({ locale }: Props) {
  const isEnglish = locale === 'en'
  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Quelles publications Jean-Paul Lubliner a-t-il créées ?', en: 'Which publications did Jean-Paul Lubliner create?' },
            answer: {
              fr: 'Jean-Paul Lubliner a fondé les magazines Nouvelles Vagues, créé Sans Nom et participé à l’aventure éditoriale de Citizen K.',
              en: 'Jean-Paul Lubliner founded Nouvelles Vagues magazines, created Sans Nom and took part in the editorial adventure of Citizen K.',
            },
          },
          {
            question: { fr: 'Quand Citizen K a-t-il été créé ?', en: 'When was Citizen K created?' },
            answer: {
              fr: 'Citizen K est né en 1992 autour de l’équipe constituée par Jean-Paul Lubliner, Kappauf et Vincent Bergerat.',
              en: 'Citizen K emerged in 1992 from the team assembled by Jean-Paul Lubliner, Kappauf and Vincent Bergerat.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Jean-Paul Lubliner est un créateur de publications. De 1987 à 1995, il fonde Nouvelles Vagues, crée Sans Nom et contribue à l’histoire de Citizen K, entre photographie, littérature et société.',
          en: 'Jean-Paul Lubliner is a publisher and magazine creator. From 1987 to 1995, he founded Nouvelles Vagues, created Sans Nom and contributed to Citizen K’s history across photography, literature and society.',
        }}
      />
      <section className={styles.intro} aria-labelledby="publications-title">
        <div className={styles.meta}>
          <span>{isEnglish ? 'Publisher' : 'Créateur de publications'}</span>
          <span>1987 — 1995</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.titleWrap}>
            <p className={styles.kicker}>Jean-Paul Lubliner</p>
            <h1 id="publications-title">
              {isEnglish ? 'Creator' : 'Créateur'}
              <em>{isEnglish ? 'of publications' : 'de publications'}</em>
            </h1>
            <p className={styles.lead}>
              {isEnglish ? 'Free, curious and elegant magazines telling their time differently.' : 'Des revues libres, curieuses et élégantes pour raconter leur époque autrement.'}
            </p>
          </div>

          <figure className={styles.cover}>
            <Image
              alt={isEnglish ? 'Citizen K magazine cover' : 'Couverture du magazine Citizen K'}
              fill
              priority
              sizes="(max-width: 700px) 70vw, 24rem"
              src="/media/lubliner/citizen-k-cover.jpg"
            />
            <figcaption>{isEnglish ? 'Citizen K · a story of press and image' : 'Citizen K · une histoire de presse et d’image'}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.timeline} aria-label={isEnglish ? 'Jean-Paul Lubliner’s publishing journey' : 'Parcours éditorial de Jean-Paul Lubliner'}>
        <div className={styles.timelineLine} aria-hidden="true" />
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1987 — 1995</span>
          <strong>Nouvelles Vagues</strong>
          <p>{isEnglish ? 'Founder of the first Nouvelles Vagues magazines.' : 'Fondateur des premiers magazines Nouvelles Vagues.'}</p>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1992</span>
          <strong>Citizen K</strong>
          <p>{isEnglish ? 'An editorial adventure that would become the celebrated Citizen K magazine.' : 'Une aventure éditoriale qui deviendra le célèbre magazine Citizen K.'}</p>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1993 — 1995</span>
          <strong>Sans Nom</strong>
          <p>{isEnglish ? 'A free and irreverent review of society and literature.' : 'Une revue de mœurs et de littérature, libre et impertinente.'}</p>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="publication-story-title">
        <figure className={styles.storyVisual}>
          <Image
            alt={isEnglish ? 'Original cover of Sans Nom issue no. 1' : 'Couverture originale de Sans Nom numéro 1'}
            className={styles.sansNomImage}
            fill
            sizes="(max-width: 700px) 70vw, 18rem"
            src="/media/lubliner/sans-nom-numero-1.jpg"
          />
          <figcaption className={styles.coverCaption}>
            {isEnglish ? 'Sans Nom · issue no. 1' : 'Sans Nom · numéro 1'}
          </figcaption>
        </figure>
        <div className={styles.storyCopy}>
          <div className={styles.storyLabel}>{isEnglish ? 'Publishing' : 'L’édition'}</div>
          <h2 id="publication-story-title">{isEnglish ? 'Give ideas a form.' : 'Donner une forme aux idées.'}</h2>
          <p>
            {isEnglish
              ? 'Founder of the first Nouvelles Vagues magazines from 1987 to 1995, Jean-Paul Lubliner created Sans Nom with Kappauf and Vincent Bergerat, an editorial team that would go on to create the celebrated Citizen K in 1992. The following year, together with Frédérique Joignot, he relaunched the new review of society and literature, Sans Nom, appointing Frédéric Taddéï as editor-in-chief.'
              : 'Fondateur des premiers magazines Nouvelles Vagues de 1987 à 1995, Jean-Paul Lubliner crée la revue Sans Nom et s’entoure d’une équipe constituée de Kappauf et Vincent Bergerat, qui deviendra le célèbre magazine Citizen K en 1992. L’année suivante, en s’associant avec Frédérique Joignot, il relance la nouvelle revue de mœurs et de littérature, Sans Nom, qui défraye la chronique, et prend comme rédacteur en chef Frédéric Taddéï.'}
          </p>
        </div>
      </section>
      <EditorialCta
        detail={isEnglish ? 'Give your next editorial project a voice and a visual identity.' : 'Donner à votre prochain projet éditorial une voix et une identité visuelle.'}
        eyebrow={isEnglish ? 'The next issue' : 'Le prochain numéro'}
        label={isEnglish ? 'Discuss your publication' : 'Parler de votre publication'}
        locale={locale}
      />
    </article>
  )
}
