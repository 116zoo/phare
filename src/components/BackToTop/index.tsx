'use client'

import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
  locale: 'en' | 'fr'
}

export const BackToTop: React.FC<Props> = ({ locale }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      aria-label={locale === 'fr' ? 'Retour en haut' : 'Back to top'}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#d8f24e] px-4 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#171717] shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8f24e] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
      <span className="hidden sm:inline">{locale === 'fr' ? 'Retour en haut' : 'Back to top'}</span>
    </button>
  )
}
