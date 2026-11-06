import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    de: 'Fußbereich',
    es: 'Pie de página',
    fr: 'Pied de page',
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
      label: { en: 'Footer style', fr: 'Style du pied de page' },
      options: [
        { label: { en: 'Classic (Lubliner)', fr: 'Classique (Lubliner)' }, value: 'classic' },
        { label: { en: 'Platform (SaaS)', fr: 'Plateforme (SaaS)' }, value: 'saas' },
      ],
    },
    {
      type: 'collapsible',
      label: { en: 'Platform style', fr: 'Style Plateforme' },
      admin: { condition: (data) => data?.style === 'saas' },
      fields: [
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          label: { en: 'Tagline under the logo', fr: 'Accroche sous le logo' },
        },
        {
          name: 'badges',
          type: 'array',
          maxRows: 6,
          localized: true,
          label: { en: 'Badges (labels, commitments)', fr: 'Badges (labels, engagements)' },
          fields: [
            { name: 'label', type: 'text', required: true, label: { en: 'Text', fr: 'Texte' } },
          ],
        },
        {
          name: 'columns',
          type: 'array',
          maxRows: 6,
          localized: true,
          label: { en: 'Link columns', fr: 'Colonnes de liens' },
          admin: { initCollapsed: true },
          fields: [
            { name: 'title', type: 'text', required: true, label: { en: 'Title', fr: 'Titre' } },
            {
              name: 'links',
              type: 'array',
              label: { en: 'Links', fr: 'Liens' },
              admin: { initCollapsed: true },
              fields: [link({ appearances: false })],
            },
            {
              name: 'subTitle',
              type: 'text',
              label: { en: 'Sub-group title (optional)', fr: 'Titre du sous-groupe (optionnel)' },
            },
            {
              name: 'subLinks',
              type: 'array',
              label: { en: 'Sub-group links', fr: 'Liens du sous-groupe' },
              admin: { initCollapsed: true },
              fields: [link({ appearances: false })],
            },
          ],
        },
        {
          name: 'socials',
          type: 'array',
          maxRows: 8,
          label: { en: 'Social networks', fr: 'Réseaux sociaux' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, label: { en: 'Name', fr: 'Nom' } },
                { name: 'url', type: 'text', required: true, label: { en: 'URL', fr: 'URL' } },
              ],
            },
          ],
        },
        {
          name: 'copyright',
          type: 'text',
          localized: true,
          label: {
            en: 'Copyright line (the year is added automatically)',
            fr: 'Mention de copyright (l’année est ajoutée automatiquement)',
          },
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
      ],
      maxRows: 8,
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
