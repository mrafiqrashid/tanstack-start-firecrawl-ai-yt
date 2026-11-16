export const APP_NAME = 'Recall'
export const APP_TAGLINE = 'Your AI Knowledge Base'
export const APP_DESCRIPTION =
  'Save any link and let Recall turn it into a clean, AI-generated summary you can search later.'

type SeoOptions = {
  /** Page name, e.g. "Saved items". Omit for the home page. */
  title?: string
  description?: string
  image?: string | null
}

/** Builds the full document title: "Page · Recall", or "Recall · tagline" on home. */
export function pageTitle(title?: string) {
  return title ? `${title} · ${APP_NAME}` : `${APP_NAME} · ${APP_TAGLINE}`
}

/** Consistent <title>, description, Open Graph and Twitter tags for a route's `head`. */
export function seo({ title, description = APP_DESCRIPTION, image }: SeoOptions = {}) {
  const fullTitle = pageTitle(title)

  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:site_name', content: APP_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    ...(image
      ? [
          { property: 'og:image', content: image },
          { name: 'twitter:image', content: image },
        ]
      : []),
  ]
}
