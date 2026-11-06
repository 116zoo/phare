import type { Metadata } from 'next'

import { ContactForm } from '@/components/ContactForm'
import { localizedHref } from '@/i18n/path'
import type { Locale } from '@/i18n/config'

type ContactPageProps = {
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Contact' : 'Contact',
    description: locale === 'en' ? 'Let’s get in touch and talk about your project.' : 'Prenons contact et parlons de votre projet.',
    alternates: { canonical: localizedHref(locale, 'contact') },
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const isEnglish = locale === 'en'

  return (
    <article className="overflow-hidden bg-white px-4 py-16 text-[#171717] sm:px-6 lg:py-24">
      <div className="mx-auto max-w-[80rem]">
        <div className="mb-14 flex flex-col justify-between gap-7 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#171717]/60">
              {isEnglish ? 'Contact · let’s talk' : 'Contact · parlons-nous'}
            </p>
            <h1 className="max-w-[52rem] font-serif text-[clamp(3.4rem,9vw,8.4rem)] font-normal leading-[0.84] tracking-[-0.075em]">
              {isEnglish ? 'Hello,' : 'Bonjour,'}
              <br />
              <span className="underline decoration-[#d8f24e] decoration-[0.18em] underline-offset-[0.12em]">
                {isEnglish ? 'we’re listening.' : 'on vous écoute.'}
              </span>
            </h1>
          </div>
          <p className="max-w-[17rem] pb-1 text-sm leading-6 text-[#171717]/65 md:text-right">
            {isEnglish ? 'A question, an idea, a project to share? Write to us, simply.' : 'Une question, une idée, un projet à partager ? Écrivez-nous, simplement.'}
          </p>
        </div>

        <ContactForm locale={locale} />

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#171717]/15 pt-5 text-[0.7rem] uppercase tracking-[0.14em] text-[#171717]/55 sm:flex-row">
          <span>{isEnglish ? 'We answer every message' : 'Nous répondons à chaque message'}</span>
          <span>Paris · France</span>
        </div>
      </div>
    </article>
  )
}
