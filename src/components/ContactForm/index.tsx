'use client'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { FormEvent, useState } from 'react'
import type { Locale } from '@/i18n/config'

import styles from './ContactForm.module.css'

type FormValues = {
  email: string
  name: string
  phone: string
  message: string
}

type Props = {
  locale?: Locale
}

const initialValues: FormValues = { email: '', name: '', phone: '', message: '' }

export function ContactForm({ locale = 'fr' }: Props) {
  const isEnglish = locale === 'en'
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const next = async (event: FormEvent) => {
    event.preventDefault()
    if (step === 0 && !/^\S+@\S+\.\S+$/.test(values.email)) {
      setError(isEnglish ? 'Please enter a valid email address.' : 'Veuillez renseigner une adresse email valide.')
      return
    }
    if (step === 1 && !values.name.trim()) {
      setError(isEnglish ? 'What should we call you?' : 'Comment pouvons-nous vous appeler ?')
      return
    }
    if (step === 2 && !values.message.trim()) {
      setError(isEnglish ? 'A few words will help us reply.' : 'Quelques mots nous aideront à vous répondre.')
      return
    }
    if (step < 2) {
      setStep((current) => current + 1)
      return
    }
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      })

      if (!response.ok) throw new Error('Contact form submission failed')

      setSubmitted(true)
    } catch {
      setError(
        isEnglish
          ? 'The message could not be sent. Please try again or contact us directly.'
          : 'Le message n’a pas pu être envoyé. Réessayez ou contactez-nous directement.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    setError('')
    setStep((current) => Math.max(0, current - 1))
  }

  return (
    <section className={styles.shell} aria-label={isEnglish ? 'Contact form' : 'Formulaire de contact'}>
      <div className={styles.content}>
        <div className={styles.side}>
          <div>
            <p className={styles.eyebrow}>{isEnglish ? 'Get in touch · 01—03' : 'Prendre contact · 01—03'}</p>
            <h2 className={styles.sideTitle}>{isEnglish ? 'A conversation starts here.' : 'Une conversation commence ici.'}</h2>
          </div>
          <p className={styles.sideNote}>
            {isEnglish ? 'Three small steps, just enough to understand your message and reply with care.' : 'Trois petites étapes, juste ce qu’il faut pour comprendre votre message et vous répondre avec attention.'}
          </p>
        </div>

        <div className={styles.formArea}>
          {submitted ? (
            <div className={styles.success} role="status">
              <div className={styles.progress} aria-label={isEnglish ? 'Step 4 of 4' : 'Étape 4 sur 4'}>
                <span>04</span>
                <span className={styles.progressLine} aria-hidden="true">
                  <span className={styles.progressFill} style={{ width: '100%' }} />
                </span>
                <span>04</span>
              </div>
              <div className={styles.successMark} aria-hidden="true">
                <Check size={26} strokeWidth={2.5} />
              </div>
              <p className={styles.eyebrow}>{isEnglish ? 'Message sent' : 'Message envoyé'}</p>
              <h3 className={styles.question}>{isEnglish ? 'Thank you for your message.' : 'Merci pour votre message.'}</h3>
              <p className="max-w-[28rem] text-sm leading-6 text-black/65">
                {isEnglish ? 'We have received your details and will get back to you shortly.' : 'Nous avons bien reçu vos coordonnées et reviendrons vers vous très prochainement.'}
              </p>
              <div className={styles.privateInvite}>
                <p className={styles.privateQuestion}>
                  {isEnglish
                    ? 'Looking for a place to host your ideas? Contact Paris Private, an event agency at L’Atelier des Abbesses.'
                    : 'Vous cherchez un lieu pour accueillir vos idées ? Contactez Paris Private, agence événementielle à L’Atelier des Abbesses.'}
                </p>
                <a
                  className={styles.next}
                  href="https://parisprivate.fr"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {isEnglish ? 'Discover Paris Private' : 'Découvrir Paris Private'}
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={next} noValidate>
              <div className={styles.progress} aria-label={isEnglish ? `Step ${step + 1} of 3` : `Étape ${step + 1} sur 3`}>
                <span>0{step + 1}</span>
                <span className={styles.progressLine} aria-hidden="true">
                  <span
                    className={styles.progressFill}
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </span>
                <span>03</span>
              </div>

              {step === 0 && (
                <div className={styles.step} key="email">
                  <h3 className={styles.question}>{isEnglish ? 'Let’s stay in touch.' : 'Restons en contact.'}</h3>
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    autoFocus
                    className={styles.input}
                    id="contact-email"
                    name="email"
                    onChange={(event) => update('email', event.target.value)}
                    placeholder="test@test.com"
                    type="email"
                    value={values.email}
                  />
                </div>
              )}

              {step === 1 && (
                <div className={styles.step} key="identity">
                  <h3 className={styles.question}>{isEnglish ? 'Leave us your details.' : 'Laissez-nous vos coordonnées.'}</h3>
                  <div className="space-y-6">
                    <div>
                      <label className={styles.fieldLabel} htmlFor="contact-name">
                        {isEnglish ? 'First and last name' : 'Nom et prénom'}
                      </label>
                      <input
                        autoFocus
                        className={styles.input}
                        id="contact-name"
                        name="name"
                        onChange={(event) => update('name', event.target.value)}
                        placeholder={isEnglish ? 'John Smith' : 'Jean Dupont'}
                        type="text"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label className={styles.fieldLabel} htmlFor="contact-phone">
                        {isEnglish ? 'Phone' : 'Téléphone'} <span className="text-white/40">({isEnglish ? 'optional' : 'facultatif'})</span>
                      </label>
                      <input
                        className={styles.input}
                        id="contact-phone"
                        name="phone"
                        onChange={(event) => update('phone', event.target.value)}
                        placeholder={isEnglish ? '+1 555 000 0000' : '06 00 00 00 00'}
                        type="tel"
                        value={values.phone}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={styles.step} key="message">
                  <h3 className={styles.question}>{isEnglish ? 'Tell us about your message.' : 'Laissez l’objet de votre message.'}</h3>
                  <label className={styles.fieldLabel} htmlFor="contact-message">
                    {isEnglish ? 'Your message' : 'Votre message'}
                  </label>
                  <textarea
                    autoFocus
                    className={styles.textarea}
                    id="contact-message"
                    name="message"
                    onChange={(event) => update('message', event.target.value)}
                    placeholder={isEnglish ? 'Tell us what brings you here...' : 'Dites-nous ce qui vous amène...'}
                    rows={3}
                    value={values.message}
                  />
                </div>
              )}

              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.back}
                  disabled={step === 0}
                  onClick={goBack}
                  type="button"
                >
                  {step > 0 && <ArrowLeft aria-hidden="true" className="mr-2 inline" size={15} />}
                  {step > 0 ? (isEnglish ? 'Back' : 'Retour') : ''}
                </button>
                <button className={styles.next} disabled={isSubmitting} type="submit">
                  {step === 2
                    ? isSubmitting
                      ? isEnglish
                        ? 'Sending…'
                        : 'Envoi…'
                      : isEnglish
                        ? 'Send'
                        : 'Envoyer'
                    : isEnglish
                      ? 'Continue'
                      : 'Continuer'}
                  {step < 2 && <ArrowRight aria-hidden="true" size={16} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
