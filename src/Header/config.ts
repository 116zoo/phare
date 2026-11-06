import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    de: 'Kopfbereich',
    es: 'Cabecera',
    fr: 'En-tête',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'classic',
      required: true,
      label: { en: 'Header style', fr: 'Style de l’en-tête' },
      options: [
        { label: { en: 'Classic (Lubliner)', fr: 'Classique (Lubliner)' }, value: 'classic' },
        { label: { en: 'Platform (SaaS)', fr: 'Plateforme (SaaS)' }, value: 'saas' },
      ],
      admin: {
        description: {
          en: 'The Platform style shows the announcement bar, the drop-down menus and the buttons below.',
          fr: 'Le style Plateforme affiche la barre d’annonce, les menus déroulants et les boutons ci-dessous.',
        },
      },
    },
    {
      name: 'announcement',
      type: 'group',
      label: { en: 'Announcement bar', fr: 'Barre d’annonce' },
      admin: { condition: (data) => data?.style === 'saas' },
      fields: [
        { name: 'enabled', type: 'checkbox', label: { en: 'Show', fr: 'Afficher' } },
        {
          type: 'row',
          fields: [
            { name: 'text', type: 'text', localized: true, label: { en: 'Text', fr: 'Texte' } },
            {
              name: 'linkLabel',
              type: 'text',
              localized: true,
              label: { en: 'Link text', fr: 'Texte du lien' },
            },
            { name: 'url', type: 'text', label: { en: 'Link URL', fr: 'URL du lien' } },
          ],
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          maxRows: 12,
          label: { en: 'Drop-down menu (Platform style)', fr: 'Menu déroulant (style Plateforme)' },
          admin: {
            initCollapsed: true,
            description: {
              en: 'When filled, the item opens a drop-down panel instead of linking directly.',
              fr: 'Si rempli, l’élément ouvre un panneau déroulant au lieu d’un lien direct.',
            },
          },
          fields: [
            link({ appearances: false }),
            {
              name: 'description',
              type: 'text',
              label: { en: 'Short description', fr: 'Description courte' },
            },
          ],
        },
      ],
      maxRows: 9,
      localized: true,
      label: {
        en: 'Navigation Items',
        de: 'Navigationselemente',
        es: 'Elementos de navegación',
        fr: 'Éléments de navigation',
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctas',
      type: 'array',
      maxRows: 2,
      localized: true,
      label: {
        en: 'Header buttons (Platform style)',
        fr: 'Boutons de l’en-tête (style Plateforme)',
      },
      admin: { condition: (data) => data?.style === 'saas', initCollapsed: true },
      fields: [link({ appearances: ['default', 'outline'] })],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
