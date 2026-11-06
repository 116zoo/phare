import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { EditorialCta } from '@/components/EditorialCta'
import { CitableAEO } from '@/components/CitableAEO'

import styles from './TourEiffel2000Page.module.css'
import { InteractiveCube } from './InteractiveCube'

const images = [
  {
    src: '/media/lubliner/J-69-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel photographiée en noir et blanc, depuis sa structure',
    altEn: 'The Eiffel Tower photographed in black and white from within its structure',
    className: styles.cubeFaceFront,
  },
  {
    src: '/media/lubliner/J-103-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel et un motard, dans la série photographique de Jean-Paul Lubliner',
    altEn: 'The Eiffel Tower and a motorcyclist in Jean-Paul Lubliner’s photographic series',
    className: styles.cubeFaceRight,
  },
  {
    src: '/media/lubliner/J-176-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel et son ombre photographiées dans la collection',
    altEn: 'The Eiffel Tower and its shadow photographed in the collection',
    className: styles.cubeFaceBack,
  },
  {
    src: '/media/lubliner/J-153-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel reflétée dans une architecture contemporaine',
    altEn: 'The Eiffel Tower reflected in contemporary architecture',
    className: styles.cubeFaceLeft,
  },
  {
    src: '/media/lubliner/J-227-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel saisie dans un paysage en mouvement',
    altEn: 'The Eiffel Tower captured in a moving landscape',
    className: styles.cubeFaceTop,
  },
  {
    src: '/media/lubliner/J-160-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    altFr: 'La Tour Eiffel photographiée au cœur de la foule parisienne',
    altEn: 'The Eiffel Tower photographed among the Parisian crowd',
    className: styles.cubeFaceBottom,
  },
]

type Props = {
  locale: Locale
}

export function TourEiffel2000Page({ locale }: Props) {
  const isEnglish = locale === 'en'
  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Combien de photographies compte la collection ?', en: 'How many photographs are in the collection?' },
            answer: {
              fr: 'La collection Tour Eiffel 2000 compte 365 photographies réalisées par Jean-Paul Lubliner.',
              en: 'The Tour Eiffel 2000 collection contains 365 photographs made by Jean-Paul Lubliner.',
            },
          },
          {
            question: { fr: 'Où l’œuvre a-t-elle été exposée ?', en: 'Where was the work exhibited?' },
            answer: {
              fr: 'L’œuvre a été exposée en Chine à la Pearl Tower, à Pékin, sur la muraille de Chine et à Hong Kong.',
              en: 'The work was exhibited in China at the Pearl Tower, in Beijing, on the Great Wall and in Hong Kong.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Tour Eiffel — Un voyage immobile est une œuvre photographique de Jean-Paul Lubliner réalisée entre 1999 et 2000. La collection compte 365 images et a reçu le prix Fuji Awards 2000.',
          en: 'Tour Eiffel — Un voyage immobile is a photographic work by Jean-Paul Lubliner made between 1999 and 2000. The collection contains 365 images and received the Fuji Awards 2000.',
        }}
      />
      <section className={styles.intro} aria-labelledby="tour-eiffel-title">
        <div className={styles.introMeta}>
          <span>{isEnglish ? 'Image creator' : 'Créateur d’images'}</span>
          <span>1999 — 2000</span>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.kicker}>Jean-Paul Lubliner</p>
          <h1 id="tour-eiffel-title">
            {isEnglish ? 'Eiffel Tower' : 'Tour Eiffel'}
            <em>{isEnglish ? 'An immobile journey' : 'Un voyage immobile'}</em>
          </h1>
        </div>

          <p className={styles.lead}>
            {isEnglish ? 'A photographic work immortalising the passage into the third millennium.' : 'Une œuvre photographique qui immortalise le passage vers le troisième millénaire.'}
          </p>

        <div className={styles.award}>
          {isEnglish ? 'Fuji Awards 2000 awarded to Jean-Paul Lubliner' : 'Prix Fuji Awards 2000 décerné à Jean-Paul Lubliner'}
        </div>
      </section>

      <section className={styles.cubeSection} aria-label={isEnglish ? 'Photographs from the Eiffel Tower collection' : 'Photographies de la collection Tour Eiffel'}>
        <InteractiveCube
          images={images.map((image) => ({ ...image, alt: isEnglish ? image.altEn : image.altFr }))}
          locale={locale}
        />
      </section>

      <section className={styles.story} id="collection" aria-labelledby="collection-title">
        <div className={styles.storyLabel}>{isEnglish ? 'The work' : 'L’œuvre'}</div>
        <div className={styles.storyCopy}>
          <h2 id="collection-title">{isEnglish ? 'One tower, 365 views.' : 'Une tour, 365 regards.'}</h2>
          <div className={styles.storyText}>
            <p>
              {isEnglish
                ? 'This collection brings together 365 photographs, including monumental backlit prints measuring 4 by 3 metres. It was celebrated in China, where half of the Chinese government attended the opening of its exhibition of more than 5,000 m² at the foot of the Pearl Tower.'
                : 'Cette collection réunit 365 photographies, dont des tirages monumentaux rétro-éclairés de 4 mètres sur 3. Elle a été consacrée en Chine, où la moitié du gouvernement chinois est venue inaugurer son exposition de plus de 5 000 m² au pied de la Pearl Tower.'}
            </p>
            <p>
              {isEnglish
                ? 'The exhibition then travelled to Beijing, to China Millennium and the Great Wall, then to Hong Kong, on the Avenue of Stars and in Hong Kong Central Park. Further exhibitions are planned in the years to come.'
                : 'L’exposition s’est ensuite déplacée à Pékin, au China Millennium, sur la muraille de Chine, puis à Hong Kong, sur l’avenue des stars et dans Central Park de Hong Kong. D’autres expositions sont prévues dans les années qui viennent.'}
            </p>
          </div>

          <Link
            className={styles.cta}
            href="https://toureiffel2000.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{isEnglish ? 'Discover the Tour Eiffel 2000 collection' : 'Découvrir la collection Tour Eiffel 2000'}</span>
          </Link>
        </div>
      </section>
      <EditorialCta
        detail={isEnglish ? 'An image, an exhibition, a project to make visible.' : 'Une image, une exposition, un projet à rendre visible.'}
        eyebrow={isEnglish ? 'Beyond the collection' : 'Au-delà de la collection'}
        label={isEnglish ? 'Discuss your image project' : 'Parler de votre projet d’image'}
        locale={locale}
      />
    </article>
  )
}
