import Image from 'next/image'

import type { Locale } from '@/i18n/config'
import { CitableAEO } from '@/components/CitableAEO'
import { EditorialCta } from '@/components/EditorialCta'

import styles from './PartnersPage.module.css'

type Props = {
  locale: Locale
}

type Partner = {
  name: string
  image: string
  href: string
}

const partners: Partner[] = [
  {
    name: 'Samsung',
    image: 'https://lubliner.art/wp-content/uploads/2019/06/Samsung_Logo_Partenaire.png',
    href: 'https://www.samsung.com/fr/',
  },
  {
    name: 'Ozonex',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Ozonex_Logo_Partenaire.jpg',
    href: 'http://www.ozonex.fr/',
  },
  {
    name: 'Viladeco',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Viladeco_Logo_Partenaire.png',
    href: 'https://viladeco.com/',
  },
  {
    name: 'Terrainconnue',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Terrainconnue_Logo_Partenaire.png',
    href: 'https://terrainconnue.wixsite.com/terrainconnue/',
  },
  {
    name: 'Luminoso',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Luminoso_Logo_Partenaire.jpeg',
    href: 'https://www.luminoso.com/',
  },
  {
    name: 'Idoine Conseil',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Idoine_Logo_Partenaire.png',
    href: 'https://www.idoineconseil.com/',
  },
  {
    name: 'Osram',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Osram_Logo_Partenaire.jpg',
    href: 'https://www.osram.fr/cb/',
  },
  {
    name: 'Miele',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Miele_Logo_Partenaire-e1722246992773.png',
    href: 'https://www.miele.fr/',
  },
  {
    name: 'DuPont',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Dupont_Logo_Partenaire.png',
    href: 'https://www.dupontdenemours.fr/',
  },
  {
    name: 'Divatech',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Divatech_Logo_Partenaire.jpg',
    href: 'http://www.divatech.fr/',
  },
  {
    name: 'EIZO',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Eizo_Logo_Partenaire.png',
    href: 'https://www.eizo.fr/fr/',
  },
  {
    name: 'Frisquet',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Frisquet_Logo_Partenaire.jpg',
    href: 'https://www.frisquet.com',
  },
  {
    name: 'Schott',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Schott_Logo_Partenaire.png',
    href: 'https://www.schott.com/france/french/index.html',
  },
  {
    name: 'Plus and More',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Plus-And-More_Logo_Partenaire.png',
    href: 'https://www.plusandmore.fr/',
  },
  {
    name: 'Wago',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Wago_Logo_Partenaire.jpg',
    href: 'https://www.wago.com/fr/',
  },
  {
    name: 'Nobili',
    image: 'https://lubliner.art/wp-content/uploads/2021/04/logo_nobili.png',
    href: 'https://www.nobili.it/fr/',
  },
  {
    name: 'Hyaloide',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Hyaloide_Logo_Partenaire.jpg',
    href: 'https://hyaloide.fr/',
  },
  {
    name: 'Dekra',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Dekra_Logo_Partenaire.png',
    href: 'https://www.dekra.fr/',
  },
  {
    name: 'Artech Architecture',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Artech_Logo_Partenaire.png',
    href: 'https://www.artech-archi.fr/',
  },
  {
    name: 'Haguenier',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Haguenier_Logo_Partenaire.png',
    href: 'https://www.haguenier.com/',
  },
  {
    name: 'Peintures Chagneau',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Peintures-Chagneau_Logo_Partenaire.png',
    href: 'https://www.peintures-chagneau.com/',
  },
  {
    name: 'Worldstyle',
    image: 'https://lubliner.art/wp-content/uploads/elementor/thumbs/Worldstyle_Logo_Partenaire-r1c6lpnxmf22sm5lpvlw6e5oirb3fxu5ph1tahf04c.jpg',
    href: 'https://www.worldstyle.com/',
  },
  {
    name: 'Eggersmann',
    image: 'https://lubliner.art/wp-content/uploads/elementor/thumbs/Eggersmann_Logo_Partenaire-qreg6r44e66ducde6awng15szpv4jytosvltv7sti4.jpg',
    href: 'https://www.eggersmann.fr/',
  },
  {
    name: 'Templiers Sécurité',
    image: 'https://lubliner.art/wp-content/uploads/2019/05/Templiers_Logo_Partenaire.png',
    href: 'https://www.pagesjaunes.fr/pros/55015425',
  },
]

export function PartnersPage({ locale }: Props) {
  const isEnglish = locale === 'en'

  return (
    <article className={styles.page}>
      <CitableAEO
        answers={[
          {
            question: { fr: 'Avec qui Lubliner ART travaille-t-il ?', en: 'Who does Lubliner ART work with?' },
            answer: {
              fr: 'Lubliner ART collabore avec des marques et experts de l’architecture, du design, de la lumière, des matériaux et de l’aménagement intérieur.',
              en: 'Lubliner ART works with brands and experts in architecture, design, lighting, materials and interior fit-out.',
            },
          },
        ]}
        locale={locale}
        summary={{
          fr: 'Lubliner ART s’entoure de partenaires reconnus pour imaginer des projets architecturaux et des intérieurs exigeants, créatifs et personnalisés.',
          en: 'Lubliner ART works with recognised partners to create demanding, creative and highly personal architectural projects and interiors.',
        }}
      />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>{isEnglish ? 'Lubliner ART · network' : 'Lubliner ART · réseau'}</p>
        <h1>
          {isEnglish ? 'The right' : 'Les bons'}
          <em className={styles.titleAccent}>{isEnglish ? 'connections.' : 'partenaires.'}</em>
        </h1>
        <p className={styles.lead}>
          {isEnglish
            ? 'A circle of trusted brands, makers and specialists for ambitious places.'
            : 'Un cercle de marques, de fabricants et de spécialistes de confiance pour des lieux ambitieux.'}
        </p>
      </header>

      <section className={styles.partners} aria-labelledby="partners-title">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{isEnglish ? 'Selected partners' : 'Partenaires sélectionnés'}</span>
          <h2 id="partners-title">{isEnglish ? 'A shared standard of excellence.' : 'Une même exigence d’excellence.'}</h2>
        </div>
        <div className={styles.grid}>
          {partners.map((partner) => (
            <a
              aria-label={`${partner.name} — ${isEnglish ? 'open partner link' : 'ouvrir le lien du partenaire'}`}
              className={styles.card}
              href={partner.href}
              key={partner.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image alt={partner.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" src={partner.image} />
              <span className={styles.cardLabel}>{partner.name}</span>
            </a>
          ))}
        </div>
      </section>

      <EditorialCta
        detail={
          isEnglish
            ? 'Would you like to become a Lubliner ART partner? Let’s start a conversation.'
            : 'Vous souhaitez devenir partenaire de Lubliner ART ? Nous contacter !'
        }
        eyebrow={isEnglish ? 'A partnership to imagine' : 'Un partenariat à imaginer'}
        label={isEnglish ? 'Contact us' : 'Nous contacter'}
        locale={locale}
      />
    </article>
  )
}
