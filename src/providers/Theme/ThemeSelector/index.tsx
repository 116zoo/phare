'use client'
import { Laptop, Moon, Sun } from 'lucide-react'
import React, { useSyncExternalStore } from 'react'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

const subscribePreference = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

const readPreference = () => window.localStorage.getItem(themeLocalStorageKey) ?? 'auto'

const readPreferenceOnServer = () => 'auto'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const preference = useSyncExternalStore(
    subscribePreference,
    readPreference,
    readPreferenceOnServer,
  )

  const selectedTheme = preference === 'dark' || preference === 'light' ? preference : 'auto'

  return (
    <div
      aria-label="Choisir le thème"
      className="inline-flex items-center gap-0.5 rounded-full border border-white/45 p-1 text-white"
      role="group"
    >
      <button
        aria-label="Thème clair"
        aria-pressed={selectedTheme === 'light'}
        className={`rounded-full p-1.5 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8f24e] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${selectedTheme === 'light' ? 'bg-white text-black' : 'text-white'}`}
        onClick={() => setTheme('light')}
        title="Clair"
        type="button"
      >
        <Sun aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
      <button
        aria-label="Thème sombre"
        aria-pressed={selectedTheme === 'dark'}
        className={`rounded-full p-1.5 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8f24e] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${selectedTheme === 'dark' ? 'bg-white text-black' : 'text-white'}`}
        onClick={() => setTheme('dark')}
        title="Sombre"
        type="button"
      >
        <Moon aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
      <button
        aria-label="Thème automatique"
        aria-pressed={selectedTheme === 'auto'}
        className={`rounded-full p-1.5 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8f24e] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${selectedTheme === 'auto' ? 'bg-white text-black' : 'text-white'}`}
        onClick={() => setTheme(null)}
        title="Automatique"
        type="button"
      >
        <Laptop aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
