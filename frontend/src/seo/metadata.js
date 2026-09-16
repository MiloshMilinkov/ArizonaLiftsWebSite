export function normalizeOrigin(value) {
  const url = new URL(value)
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  )
    throw new Error('The site origin must be an HTTPS origin without a path, query or credentials.')
  return url.origin
}

export function pageMetadata(origin, locale, messages) {
  const language = locale === 'sr' ? 'sr' : 'en'
  return {
    title: messages.home,
    description: messages.description,
    canonical: origin + '/' + language,
    alternates: [
      { language: 'en', href: origin + '/en' },
      { language: 'sr', href: origin + '/sr' },
    ],
  }
}

export function applyMetadata(metadata, doc = document) {
  doc.title = metadata.title
  function upsert(selector, tag, attributes) {
    const matches = [...doc.head.querySelectorAll(selector)]
    const element = matches.shift() || doc.head.appendChild(doc.createElement(tag))
    matches.forEach((duplicate) => duplicate.remove())
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
  }
  upsert('meta[name="description"]', 'meta', { name: 'description', content: metadata.description })
  upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: metadata.canonical })
  for (const alternate of metadata.alternates)
    upsert('link[rel="alternate"][hreflang="' + alternate.language + '"]', 'link', {
      rel: 'alternate',
      hreflang: alternate.language,
      href: alternate.href,
    })
}

export function sitemapXml(origin) {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ['en', 'sr']
      .map((locale) => '  <url><loc>' + origin + '/' + locale + '</loc></url>')
      .join('\n') +
    '\n</urlset>\n'
  )
}
