import Image from 'next/image'

import type { Locale } from '@/i18n/config'
import { EditorialCta } from '@/components/EditorialCta'
import { CitableAEO } from '@/components/CitableAEO'

import styles from './CreateurRadioPage.module.css'

type Props = {
  locale: Locale
}

export function CreateurRadioPage({ locale }: Props) {
  const isEnglish = locale === 'en'
  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Quand Jean-Paul Lubliner a-t-il créé Radio Arlequin ?', en: 'When did Jean-Paul Lubliner create Radio Arlequin?' },
            answer: {
              fr: 'Jean-Paul Lubliner a créé Radio Arlequin entre 1980 et 1986, pendant les premières années des radios libres en France.',
              en: 'Jean-Paul Lubliner created Radio Arlequin between 1980 and 1986, during the early years of free radio in France.',
            },
          },
          {
            question: { fr: 'Quel est son lien avec Radio Nova ?', en: 'What is his connection to Radio Nova?' },
            answer: {
              fr: 'Jean-Paul Lubliner a participé à la création de Radio Nova avec Jean-François Bizot avant de revendre ses parts à Europe 2.',
              en: 'Jean-Paul Lubliner helped create Radio Nova with Jean-François Bizot before selling his shares to Europe 2.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Entre 1980 et 1986, Jean-Paul Lubliner est l’un des premiers fondateurs de Radio Libre. Il crée Radio Arlequin puis participe à la création de Radio Nova avec Jean-François Bizot.',
          en: 'Between 1980 and 1986, Jean-Paul Lubliner was one of the first founders of Free Radio. He created Radio Arlequin and helped launch Radio Nova with Jean-François Bizot.',
        }}
      />
      <section className={styles.intro} aria-labelledby="radio-title">
        <div className={styles.meta}>
          <span>{isEnglish ? 'A man of radio' : 'Un homme de radio'}</span>
          <span>1980 — 1986</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.titleWrap}>
            <p className={styles.kicker}>Jean-Paul Lubliner</p>
            <h1 id="radio-title">
              <span className={isEnglish ? styles.titleLeadEnglish : undefined}>
                {isEnglish ? 'A man' : 'Un homme'}
              </span>
              <em>{isEnglish ? 'of radio' : 'de radio'}</em>
            </h1>
            <p className={styles.lead}>
              {isEnglish ? 'A free voice, new airwaves and a radio adventure at the heart of the 1980s.' : 'Une voix libre, des ondes nouvelles et une aventure radiophonique au cœur des années 80.'}
            </p>
          </div>
          <figure className={styles.microphone}>
            <Image
              alt={isEnglish ? 'Cut-out vintage radio microphone' : 'Microphone de radio vintage détouré'}
              fill
              priority
              sizes="(max-width: 700px) 70vw, 24rem"
              src="/media/lubliner/radio-vintage-microphone.png"
            />
            <figcaption>{isEnglish ? 'The voice as raw material' : 'La voix comme matière première'}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.timeline} aria-label={isEnglish ? 'Jean-Paul Lubliner’s radio journey' : 'Parcours radiophonique de Jean-Paul Lubliner'}>
        <div className={styles.timelineLine} aria-hidden="true" />
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1980</span>
          <strong>Radio Libre</strong>
          <p>{isEnglish ? 'One of the very first founders of Free Radio.' : 'L’un des tout premiers fondateurs de Radio Libre.'}</p>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1980 — 1986</span>
          <strong>Radio Arlequin</strong>
          <p>{isEnglish ? 'He creates Radio Arlequin, a space for freedom and sound experimentation.' : 'Il crée Radio Arlequin, espace de liberté et d’expérimentation sonore.'}</p>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineYear}>1986</span>
          <strong>Radio Nova</strong>
          <p>{isEnglish ? 'He helps create Radio Nova in partnership with Jean-François Bizot.' : 'Il participe à la création de Radio Nova en s’associant avec Jean-François Bizot.'}</p>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="radio-story-title">
        <div className={styles.noteVisual}>
          <Image
            alt={isEnglish ? 'Cut-out vintage eighth note' : 'Croche musicale vintage détourée'}
            className={styles.noteImage}
            height={1402}
            src="/media/lubliner/radio-eighth-note.png"
            width={1122}
          />
          <span>{isEnglish ? 'One frequency, one rhythm, one voice' : 'Une fréquence, un rythme, une voix'}</span>
        </div>
        <div className={styles.storyCopy}>
          <div className={styles.storyLabel}>{isEnglish ? 'Transmission' : 'Transmission'}</div>
          <h2 id="radio-story-title">{isEnglish ? 'Make an era heard.' : 'Faire entendre une époque.'}</h2>
          <p>
            {isEnglish
              ? 'From 1980 to 1986, one of the very first founders of Free Radio. He creates Radio Arlequin, then helps create Radio Nova with Jean-François Bizot. He sells his shares to Europe 2 to create a magazine.'
              : '1980–1986, l’un des tout premiers fondateurs de Radio Libre. Il crée Radio Arlequin puis participe à la création de Radio Nova en s’associant avec Jean-François Bizot. Il revend ses parts à Europe 2 pour créer un magazine.'}
          </p>
        </div>
      </section>
      <EditorialCta
        detail={isEnglish ? 'A voice, a frequency, an idea to bring into the world.' : 'Une voix, une fréquence, une idée à faire entendre.'}
        eyebrow={isEnglish ? 'Open the microphone' : 'Ouvrir le micro'}
        label={isEnglish ? 'Start a conversation' : 'Commencer la conversation'}
        locale={locale}
      />
    </article>
  )
}
