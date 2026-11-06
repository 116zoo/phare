import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

import { L, bodyField, eyebrowField, headingField, mediaField, optionalLink } from './fields'

/**
 * "Platform" (SaaS landing page) blocks: a page structure modelled on modern SaaS
 * marketing sites (trust strip, key figures, use-case marquee, testimonials, customer
 * stories, security grid, product showcase, closing CTA band). Every text is localized.
 */

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: {
    singular: L('Trust strip (logos)', 'Bandeau de confiance (logos)'),
    plural: L('Trust strips', 'Bandeaux de confiance'),
  },
  fields: [
    eyebrowField,
    {
      name: 'rating',
      type: 'text',
      localized: true,
      label: L('Rating (e.g. 4.9 / 5)', 'Note (ex. 4,9 / 5)'),
    },
    {
      name: 'logos',
      type: 'array',
      label: L('Logos', 'Logos'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: L('Name (shown as text when no logo)', 'Nom (affiché en texte sans logo)'),
        },
        mediaField('logo', L('Logo', 'Logo')),
      ],
    },
    ...optionalLink(),
  ],
}

export const StatsCards: Block = {
  slug: 'statsCards',
  interfaceName: 'StatsCardsBlock',
  labels: {
    singular: L('Key figures', 'Chiffres clés'),
    plural: L('Key figures', 'Chiffres clés'),
  },
  fields: [
    headingField(),
    eyebrowField,
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      label: L('Cards', 'Cartes'),
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', localized: true, required: true, label: L('Name', 'Nom') },
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
          label: L('Figure (e.g. 40 years)', 'Chiffre (ex. 40 ans)'),
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: L('Description', 'Description'),
        },
        mediaField('logo', L('Logo (optional)', 'Logo (optionnel)')),
      ],
    },
  ],
}

export const UseCaseMarquee: Block = {
  slug: 'useCaseMarquee',
  interfaceName: 'UseCaseMarqueeBlock',
  labels: {
    singular: L('Scrolling tags', 'Bandeau défilant (cas d’usage)'),
    plural: L('Scrolling tags', 'Bandeaux défilants'),
  },
  fields: [
    {
      name: 'lead',
      type: 'text',
      localized: true,
      label: L('Lead-in sentence', 'Phrase d’introduction'),
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: L('Tags', 'Étiquettes'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: L('Tag', 'Étiquette'),
        },
      ],
    },
    ...optionalLink('link', L('Add a button', 'Ajouter un bouton')),
  ],
}

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: L('Testimonials', 'Témoignages'),
    plural: L('Testimonials', 'Témoignages'),
  },
  fields: [
    headingField(),
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 6,
      label: L('Testimonials', 'Témoignages'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
          required: true,
          label: L('Quote', 'Citation'),
        },
        { name: 'name', type: 'text', required: true, label: L('Name', 'Nom') },
        {
          name: 'role',
          type: 'text',
          localized: true,
          label: L('Role, organisation', 'Fonction, structure'),
        },
        mediaField('avatar', L('Portrait', 'Portrait')),
        ...optionalLink(),
      ],
    },
  ],
}

export const StoryCards: Block = {
  slug: 'storyCards',
  interfaceName: 'StoryCardsBlock',
  labels: {
    singular: L('Stories / case studies', 'Histoires / études de cas'),
    plural: L('Stories / case studies', 'Histoires / études de cas'),
  },
  fields: [
    headingField(true),
    ...optionalLink('link', L('Add a “see more” link', 'Ajouter un lien « voir plus »')),
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      label: L('Stories', 'Histoires'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'textarea',
          localized: true,
          required: true,
          label: L('Title', 'Titre'),
        },
        mediaField('image', L('Image', 'Image')),
        link({ appearances: false, overrides: { name: 'link' } }),
      ],
    },
  ],
}

export const TrustGrid: Block = {
  slug: 'trustGrid',
  interfaceName: 'TrustGridBlock',
  labels: {
    singular: L('Commitments / certifications grid', 'Grille engagements / certifications'),
    plural: L('Commitments grids', 'Grilles engagements'),
  },
  fields: [
    headingField(true),
    bodyField,
    ...optionalLink(),
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      label: L('Cards', 'Cartes'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          label: L('Title', 'Titre'),
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: L('Description', 'Description'),
        },
        mediaField('icon', L('Icon / badge', 'Icône / badge')),
      ],
    },
  ],
}

export const ProductShowcase: Block = {
  slug: 'productShowcase',
  interfaceName: 'ProductShowcaseBlock',
  labels: {
    singular: L('Product showcase', 'Vitrine produit'),
    plural: L('Product showcases', 'Vitrines produit'),
  },
  fields: [
    eyebrowField,
    headingField(),
    bodyField,
    mediaField('media', L('Screenshot / visual', 'Capture / visuel')),
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      label: L('Figures shown on the visual', 'Chiffres affichés sur le visuel'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
          label: L('Figure', 'Chiffre'),
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: L('Label', 'Libellé'),
        },
      ],
    },
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  labels: {
    singular: L('Closing call to action', 'Bandeau d’appel à l’action'),
    plural: L('Closing calls to action', 'Bandeaux d’appel à l’action'),
  },
  fields: [
    headingField(true),
    bodyField,
    linkGroup({ appearances: ['default', 'outline'], overrides: { maxRows: 2 } }),
  ],
}

export const saasBlocks = [
  LogoCloud,
  StatsCards,
  UseCaseMarquee,
  Testimonials,
  StoryCards,
  TrustGrid,
  ProductShowcase,
  CtaBand,
]

/** Block types that draw their own full-width section (no outer margin wrapper). */
export const saasBlockSlugs = saasBlocks.map(({ slug }) => slug)
