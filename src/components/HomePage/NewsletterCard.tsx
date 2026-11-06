'use client'

import React, { useState } from 'react'
import type { Locale } from '@/i18n/config'

import styles from './HomePage.module.css'

type Props = {
  locale: Locale
}

export function NewsletterCard({ locale }: Props) {
  const isEnglish = locale === 'en'
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className={`${styles.projectCard} ${styles.newsletter}`}
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <span className={styles.cardIndex}>04</span>
      <label htmlFor="home-newsletter">{isEnglish ? 'Stay informed' : 'Rester au courant'}</label>
      <p>
        {isEnglish
          ? 'New ideas, openings and upcoming encounters, delivered straight to your inbox.'
          : 'Les nouvelles idées, les ouvertures et les prochaines rencontres directement dans votre boîte mail.'}
      </p>
      {submitted ? (
        <p className={styles.newsletterThanks}>
          {isEnglish ? 'Thank you. The form is ready to be connected to the newsletter.' : 'Merci. Le formulaire est prêt à être relié à la newsletter.'}
        </p>
      ) : (
        <div className={styles.newsletterField}>
          <input
            id="home-newsletter"
            name="email"
            placeholder={isEnglish ? 'Your email address' : 'Votre adresse e-mail'}
            required
            type="email"
          />
          <button aria-label={isEnglish ? 'Subscribe to the newsletter' : 'S’inscrire à la newsletter'} type="submit">
            →
          </button>
        </div>
      )}
    </form>
  )
}
