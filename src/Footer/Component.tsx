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

const presentationSubmenuPaths = new Set([
  'un-homme-de-radio',
  'createur-d-images',
  'createur-de-publications',
  'les-projets-artistiques',
  'un-architecte-avant-garde',
])

const isPresentationSubmenuItem = (url: string | null | undefined) => {
  const path = url?.replace(/^\//, '').replace(/\/$/, '').split('/')[0]
  return Boolean(path && presentationSubmenuPaths.has(path))
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale, 1)()

  const navItems = footerData?.navItems || []
  const { a11y, footer } = await getDictionary(locale)
  const isEnglish = locale === 'en'
  const hasFooterPath = (path: string) =>
    navItems.some(({ link }) => link?.url?.replace(/\/$/, '') === `/${path}`)

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
                    className={`${styles.footerLink} ${isPresentationSubmenuItem(link.url) ? styles.submenuFooterLink : ''}`}
                    locale={locale}
                    {...link}
                    label={getFooterLabel(link.label, link.url, isEnglish)}
                  />
                </li>
              ))}
              {!hasFooterPath('partenaires') && (
                <li>
                  <Link className={styles.footerLink} href={localizedHref(locale, 'partenaires')}>
                    {isEnglish ? 'Partners' : 'Partenaires'}
                  </Link>
                </li>
              )}
              {!hasFooterPath('magazine') && (
                <li>
                  <Link className={styles.footerLink} href={localizedHref(locale, 'magazine')}>
                    Magazine
                  </Link>
                </li>
              )}
              <li>
                <Link className={styles.footerLink} href={localizedHref(locale, 'contact')}>
                  {isEnglish ? 'Contact' : 'Contact'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.contactCol}>
          <h2 className={`${styles.columnTitle} ${styles.refugeTitle}`}>
            {isEnglish ? 'The refuge' : 'Le refuge'}
          </h2>
          <p>
            8 passage des Abbesses
            <br />
            75018 Paris · France
          </p>
          <p>{isEnglish ? 'Jean-Paul Lubliner, art designer.' : 'Jean-Paul Lubliner, art concepteur.'}</p>
          <Link className={styles.contactLink} href={localizedHref(locale, 'contact')}>
            {isEnglish ? 'Start a conversation' : 'Commencer une conversation'}
          </Link>
          <nav aria-label={isEnglish ? 'Social media' : 'Réseaux sociaux'}>
            <ul className={styles.socialList}>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://www.instagram.com/lublinerartarchitecture/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://www.facebook.com/lublinerart/about/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://www.linkedin.com/in/jean-paul-lubliner-54640230"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <a
              className={styles.reviewLink}
              href="https://share.google/th48czB2mDTMlYHwn"
              rel="noopener noreferrer"
              target="_blank"
            >
              {isEnglish ? 'Leave a review' : 'Laisser un avis'}
            </a>
          </nav>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {footer.rights}</span>
        <span>Lubliner ART · Paris</span>
      </div>
    </footer>
  )
}
