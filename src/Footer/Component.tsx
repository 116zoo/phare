import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { localizedHref } from '@/i18n/path'
import styles from './Footer.module.css'

interface FooterProps {
  locale?: Locale
}

const englishFooterLabels: Record<string, string> = {
  Accueil: 'Home',
  Présentation: 'Presentation',
  'Un homme de radio': 'A man of radio',
  'Créateur d’images': 'Image creator',
  'Créateur d\'images': 'Image creator',
  'Créateur de publications': 'Publication creator',
  'Les projets artistiques': 'Art projects',
  'Un architecte avant-garde': 'An avant-garde architect',
  Contact: 'Contact',
  'Le cabinet': 'The studio',
  'Cabinet d’architecture': 'Architecture studio',
  "Cabinet d'architecture": 'Architecture studio',
  'Cabinet d’architecture et de design': 'Architecture and design studio',
  Réalisations: 'Projects',
  Prestations: 'Services',
  équipe: 'Team',
  Équipe: 'Team',
  'Projets en cours': 'Current projects',
  'Parlons projet': 'Start a project',
  Partenaires: 'Partners',
  Médias: 'Media',
  'Parlons-en': 'Let’s talk',
  'Parlons de votre projet': 'Start a project',
  'Contactez-nous': 'Contact us',
  Magazine: 'Magazine',
  Articles: 'Articles',
  Recherche: 'Search',
}

const getFooterLabel = (label: string | null | undefined, url: string | null | undefined, isEnglish: boolean) => {
  if (!isEnglish || !label) return label

  const pathLabel = url?.replace(/^\//, '').split('/')[0]
  const byPath: Record<string, string> = {
    presentation: 'Presentation',
    lequipe: 'Presentation',
    posts: 'Articles',
    contact: 'Contact',
    recherche: 'Search',
    search: 'Search',
  }

  return (pathLabel && byPath[pathLabel]) || englishFooterLabels[label] || label
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale, 1)()

  const navItems = footerData?.navItems || []
  const { a11y, footer } = await getDictionary(locale)
  const isEnglish = locale === 'en'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link className={styles.brandLink} href={localizedHref(locale)}>
            <Logo className="h-[132px]" descriptionClassName={styles.brandDescription} locale={locale} />
          </Link>
        </div>

        <div>
          <h2 className={styles.columnTitle}>{isEnglish ? 'Explore' : 'Explorer'}</h2>
          <nav aria-label={a11y.footerNavigation}>
            <ul className={styles.navList}>
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    className={styles.footerLink}
                    locale={locale}
                    {...link}
                    label={getFooterLabel(link.label, link.url, isEnglish)}
                  />
                </li>
              ))}
              <li>
                <Link className={styles.footerLink} href={localizedHref(locale, 'contact')}>
                  {isEnglish ? 'Contact' : 'Contact'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.contactCol}>
          <h2 className={styles.columnTitle}>{isEnglish ? 'The refuge' : 'Le refuge'}</h2>
          <p>
            8 passage des Abbesses
            <br />
            75018 Paris · France
          </p>
          <p>{isEnglish ? 'Jean-Paul Lubliner, art designer.' : 'Jean-Paul Lubliner, art concepteur.'}</p>
          <Link className={styles.contactLink} href={localizedHref(locale, 'contact')}>
            {isEnglish ? 'Start a conversation ↗' : 'Commencer une conversation ↗'}
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {footer.rights}</span>
        <span>Lubliner ART · Paris</span>
      </div>
    </footer>
  )
}
