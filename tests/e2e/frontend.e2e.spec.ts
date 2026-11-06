import { test, expect, Page } from '@playwright/test'

const locales = ['fr', 'en'] as const

/** French (the default locale) is served unprefixed, English gets a `/en` prefix. */
const path = (locale: string, rest = '') => {
  const prefix = locale === 'fr' ? '' : `/${locale}`
  return `http://localhost:3000${prefix}${rest}`
}

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto(path('fr'))
    // The title carries the brand name of the `site-settings` global, which
    // defaults to "Lubliner ART" and is editable from the admin panel.
    await expect(page).toHaveTitle(/Lubliner ART/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test.describe('locale routing', () => {
    test('serves the default locale unprefixed and keeps others prefixed', async ({ page }) => {
      for (const locale of locales) {
        const response = await page.goto(path(locale, '/posts'))

        expect(response?.status(), `${locale} /posts should render`).toBe(200)
      }
    })

    test('redirects the prefixed default locale to its canonical form', async ({ page }) => {
      await page.goto('http://localhost:3000/fr/posts')

      await expect(page).toHaveURL('http://localhost:3000/posts')
    })

    test('does not leak one locale prefix into another', async ({ page }) => {
      await page.goto(path('en', '/posts'))

      // Internal links must keep the English prefix.
      const firstPostLink = page.locator('a[href*="/posts/"]').first()
      if (await firstPostLink.count()) {
        await expect(firstPostLink).toHaveAttribute('href', /^\/en\/posts\//)
      }
    })
  })

  test.describe('translated chrome', () => {
    // The skip link was hardcoded to French, which leaked into every locale.
    test('renders a translated skip link on every locale', async ({ page }) => {
      const expected: Record<string, string> = {
        fr: 'Aller au contenu principal',
        en: 'Skip to main content',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        const skipLink = page.locator('a[href="#main-content"]')
        await expect(skipLink, `${locale} skip link`).toHaveText(expected[locale])
      }
    })

    test('renders a translated navigation landmark label', async ({ page }) => {
      const expected: Record<string, string> = {
        fr: 'Navigation principale',
        en: 'Main navigation',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        await expect(
          page.getByRole('navigation', { name: expected[locale], exact: true }).first(),
          `${locale} nav label`,
        ).toBeVisible()
      }
    })

    test('translates the posts list heading', async ({ page }) => {
      const expected: Record<string, string> = {
        fr: 'Articles',
        en: 'Posts',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/posts'))

        await expect(page.locator('h1').first(), `${locale} heading`).toHaveText(expected[locale])
      }
    })
  })

  test.describe('accessibility statement', () => {
    // Inline per-locale maps once rendered `undefined` for a missing locale.
    test('never renders an undefined label', async ({ page }) => {
      for (const locale of locales) {
        await page.goto(path(locale, '/accessibilite'))

        await expect(page.locator('body'), `${locale} body`).not.toContainText('undefined')
      }
    })

    test('renders the localized heading in every locale', async ({ page }) => {
      const expected: Record<string, string> = {
        fr: "Déclaration d'accessibilité",
        en: 'Accessibility Statement',
      }

      for (const locale of locales) {
        await page.goto(path(locale, '/accessibilite'))

        await expect(page.locator('h1').first(), `${locale} accessibility heading`).toHaveText(
          expected[locale],
        )
      }
    })
  })

  test.describe('structured data', () => {
    // The four JSON-LD components were never imported, so no page emitted any.
    // FAQPage is deliberately not emitted (restricted for commercial sites, see
    // src/blocks/AEO): the answer summary is exposed as SpeakableSpecification.
    test('emits Article, SpeakableSpecification and BreadcrumbList on a post', async ({ page }) => {
      await page.goto(path('en', '/posts/digital-horizons'))

      const types = await page.evaluate(() =>
        Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(
          (node) => {
            try {
              const parsed = JSON.parse(node.textContent ?? '{}')
              const raw = parsed['@type']
              return Array.isArray(raw) ? raw : [raw]
            } catch {
              return []
            }
          },
        ),
      )

      expect(types, `emitted: ${types.join(', ')}`).toContain('Article')
      expect(types).toContain('SpeakableSpecification')
      expect(types).toContain('BreadcrumbList')
    })

    test('emits WebPage on the accessibility statement', async ({ page }) => {
      await page.goto(path('fr', '/accessibilite'))

      const types = await page.evaluate(() =>
        Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(
          (node) => {
            try {
              const parsed = JSON.parse(node.textContent ?? '{}')
              const raw = parsed['@type']
              return Array.isArray(raw) ? raw : [raw]
            } catch {
              return []
            }
          },
        ),
      )

      expect(types).toContain('WebPage')
    })
  })

  test.describe('hreflang', () => {
    test('links every locale plus x-default on a post', async ({ page }) => {
      await page.goto(path('fr', '/posts/digital-horizons'))

      for (const lang of [...locales, 'x-default']) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1)
      }
    })
  })

  test('serves llms.txt with a Main Content section', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/llms.txt')

    expect(response?.status()).toBe(200)
    expect(await page.textContent('body')).toContain('## Main Content')
  })
})
