import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

import styles from './EditorialCta.module.css'

type Props = {
  locale: Locale
  eyebrow: string
  label: string
  detail: string
}

export function EditorialCta({ locale, eyebrow, label, detail }: Props) {
  return (
    <section className={styles.section} aria-label={eyebrow}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <p className={styles.detail}>{detail}</p>
        <Link className={styles.link} href={localizedHref(locale, 'contact')}>
          <span>{label}</span>
        </Link>
      </div>
    </section>
  )
}
