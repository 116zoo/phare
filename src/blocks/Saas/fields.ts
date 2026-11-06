import type { Field } from 'payload'

import { link } from '@/fields/link'

/** Admin label in the two admin languages (`i18n.supportedLanguages`). */
export const L = (en: string, fr: string) => ({ en, fr })

/**
 * An optional link: a checkbox that reveals a regular `link` group. Fields hidden by
 * `admin.condition` are not validated, so the link's required sub-fields only apply
 * once the editor ticks the box.
 */
export const optionalLink = (
  name = 'link',
  label = L('Add a link', 'Ajouter un lien'),
): Field[] => {
  const enable = `enable${name.charAt(0).toUpperCase()}${name.slice(1)}`

  return [
    { name: enable, type: 'checkbox', label },
    link({
      appearances: false,
      overrides: {
        name,
        admin: { condition: (_, siblingData) => Boolean(siblingData?.[enable]) },
      },
    }),
  ]
}

export const eyebrowField: Field = {
  name: 'eyebrow',
  type: 'text',
  localized: true,
  label: L('Eyebrow (small text above the title)', 'Surtitre (petit texte au-dessus du titre)'),
}

export const headingField = (required = false): Field => ({
  name: 'heading',
  type: 'text',
  localized: true,
  required,
  label: L('Heading', 'Titre'),
})

export const bodyField: Field = {
  name: 'body',
  type: 'textarea',
  localized: true,
  label: L('Text', 'Texte'),
}

export const mediaField = (name: string, label: ReturnType<typeof L>): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label,
})
