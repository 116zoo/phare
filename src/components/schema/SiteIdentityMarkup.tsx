import React from 'react'

interface SiteIdentityMarkupProps {
  brandName: string
  locale: string
  siteUrl: string
}

/** Site-level entity markup shared by each localized public route. */
export const SiteIdentityMarkup: React.FC<SiteIdentityMarkupProps> = ({
  brandName,
  locale,
  siteUrl,
}) => {
  const organizationId = `${siteUrl}/#organization`
  const serviceId = `${siteUrl}/#professional-service`
  const personId = `${siteUrl}/#jean-paul-lubliner`
  const websiteId = `${siteUrl}/#website`

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: brandName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
      address: {
        '@id': `${siteUrl}/#address`,
        '@type': 'PostalAddress',
        streetAddress: '8 passage des Abbesses',
        postalCode: '75018',
        addressLocality: 'Paris',
        addressCountry: 'FR',
      },
      founder: { '@id': personId },
      mainEntityOfPage: { '@id': websiteId },
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: brandName,
      url: siteUrl,
      description:
        locale === 'en'
          ? 'Paris-based creative studio founded by Jean-Paul Lubliner, working across architecture, images, radio, publishing and artistic projects.'
          : 'Studio créatif parisien fondé par Jean-Paul Lubliner, entre architecture, images, radio, publications et projets artistiques.',
      provider: { '@id': organizationId },
      founder: { '@id': personId },
      address: { '@id': `${siteUrl}/#address` },
      areaServed: {
        '@type': 'City',
        name: 'Paris',
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Jean-Paul Lubliner',
      jobTitle: locale === 'en' ? 'Art designer' : 'Art concepteur',
      worksFor: { '@id': organizationId },
      url: siteUrl,
      address: { '@id': `${siteUrl}/#address` },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: brandName,
      publisher: { '@id': organizationId },
      inLanguage: locale,
      about: [{ '@id': organizationId }, { '@id': personId }, { '@id': serviceId }],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }).replace(/</g, '\\u003c'),
      }}
    />
  )
}
