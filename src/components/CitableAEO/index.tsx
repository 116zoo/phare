import React from 'react'

import type { Locale } from '@/i18n/config'
import { SpeakableMarkup } from '@/components/schema'

import styles from './CitableAEO.module.css'

type LocalizedText = {
  fr: string
  en: string
}

type LocalizedAnswer = {
  question: LocalizedText
  answer: LocalizedText
}

type Props = {
  locale: Locale
  summary: LocalizedText
  answers: LocalizedAnswer[]
}

export function CitableAEO({ locale, summary, answers }: Props) {
  const language = locale === 'en' ? 'en' : 'fr'
  const localizedAnswers = answers.map((answer) => ({
    question: answer.question[language],
    answer: answer.answer[language],
  }))

  return (
    <>
      <SpeakableMarkup cssSelector={['.citable-aeo-summary']} />
      <section className={`${styles.section} citable-aeo-section`} aria-labelledby="citable-aeo-title">
        <div className={styles.inner}>
          <div className={styles.summaryBlock}>
            <span className={styles.eyebrow}>
              {language === 'en' ? 'For clear answers' : 'Pour aller à l’essentiel'}
            </span>
            <h2 id="citable-aeo-title">{language === 'en' ? 'In brief' : 'En bref'}</h2>
            <p className={`${styles.summary} citable-aeo-summary`}>{summary[language]}</p>
          </div>
          <div className={styles.answers}>
            <span className={styles.eyebrow}>
              {language === 'en' ? 'Useful answers' : 'Réponses utiles'}
            </span>
            <dl>
              {localizedAnswers.map((answer) => (
                <div className={styles.answer} key={answer.question}>
                  <dt>{answer.question}</dt>
                  <dd>{answer.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
