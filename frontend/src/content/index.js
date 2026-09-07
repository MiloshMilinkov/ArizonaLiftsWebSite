import en from './en.json' with { type: 'json' }
import sr from './sr.json' with { type: 'json' }

const contentByLocale = { en, sr }

// Content is bundled by Vite, so rendering never depends on an API request.
export function getSiteContent(locale = 'en') {
  return Object.hasOwn(contentByLocale, locale) ? contentByLocale[locale] : en
}
