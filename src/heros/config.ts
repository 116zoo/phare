import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        de: 'Typ',
        es: 'Tipo',
        fr: 'Type',
      },
      options: [
        {
          label: {
            en: 'None',
            de: 'Keine',
            es: 'Ninguno',
            fr: 'Aucun',
          },
          value: 'none',
        },
        {
          label: {
            en: 'High Impact',
            de: 'Hohe Auswirkung',
            es: 'Alto Impacto',
            fr: 'Fort Impact',
          },
          value: 'highImpact',
        },
        {
          label: {
            en: 'Medium Impact',
            de: 'Mittlere Auswirkung',
            es: 'Impacto Medio',
            fr: 'Impact Moyen',
          },
          value: 'mediumImpact',
        },
        {
          label: {
            en: 'Low Impact',
            de: 'Geringe Auswirkung',
            es: 'Bajo Impacto',
            fr: 'Faible Impact',
          },
          value: 'lowImpact',
        },
        {
          label: {
            en: 'Platform (SaaS landing)',
            de: 'Plattform (SaaS-Landingpage)',
            es: 'Plataforma (landing SaaS)',
            fr: 'Plateforme (landing SaaS)',
          },
          value: 'saas',
        },
      ],
      required: true,
      localized: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    {
      name: 'badge',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'saas',
      },
      label: { en: 'Badge above the title', fr: 'Badge au-dessus du titre' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              label: { en: 'Text', fr: 'Texte' },
            },
            {
              name: 'url',
              type: 'text',
              label: { en: 'URL (optional)', fr: 'URL (optionnelle)' },
            },
          ],
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'note',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'saas',
      },
      label: { en: 'Small note under the buttons', fr: 'Mention sous les boutons' },
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'saas',
        description: {
          en: 'Optional image or video shown behind the hero, toned down for legibility.',
          fr: 'Image ou vidéo optionnelle derrière le héro, atténuée pour rester lisible.',
        },
      },
      label: { en: 'Background media', fr: 'Média de fond' },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
      label: {
        en: 'Media',
        de: 'Medien',
        es: 'Medio',
        fr: 'Média',
      },
    },
  ],
  label: false,
}
