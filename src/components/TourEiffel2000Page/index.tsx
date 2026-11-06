import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { EditorialCta } from '@/components/EditorialCta'

import styles from './TourEiffel2000Page.module.css'
import { InteractiveCube } from './InteractiveCube'

const images = [
  {
    src: '/media/lubliner/J-69-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel photographiée en noir et blanc, depuis sa structure',
    className: styles.cubeFaceFront,
  },
  {
    src: '/media/lubliner/J-103-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel et un motard, dans la série photographique de Jean-Paul Lubliner',
    className: styles.cubeFaceRight,
  },
  {
    src: '/media/lubliner/J-176-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel et son ombre photographiées dans la collection',
    className: styles.cubeFaceBack,
  },
  {
    src: '/media/lubliner/J-153-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel reflétée dans une architecture contemporaine',
    className: styles.cubeFaceLeft,
  },
  {
    src: '/media/lubliner/J-227-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel saisie dans un paysage en mouvement',
    className: styles.cubeFaceTop,
  },
  {
    src: '/media/lubliner/J-160-Tour-Eiffel-Jean-Paul-Lubliner-Photographie-Art.jpg',
    alt: 'La Tour Eiffel photographiée au cœur de la foule parisienne',
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
      <section className={styles.intro} aria-labelledby="tour-eiffel-title">
        <div className={styles.introMeta}>
          <span>{isEnglish ? 'Image creator' : 'Créateur d’images'}</span>
          <span>1999 — 2000</span>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.kicker}>Jean-Paul Lubliner</p>
          <h1 id="tour-eiffel-title">
            Tour Eiffel
            <em>Un voyage immobile</em>
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
        <InteractiveCube images={images} />
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
            <span aria-hidden="true">↗</span>
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
