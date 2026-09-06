export const supportedLocales = ['en', 'sr']
export const defaultLocale = 'en'
export const localeStorageKey = 'arizona-lifts.locale'
export const languageTags = { en: 'en', sr: 'sr-Latn' }

export function preferredLocale(storage, languages = []) {
  try {
    const saved = storage?.getItem(localeStorageKey)
    if (supportedLocales.includes(saved)) return saved
  } catch {
    /* Storage can be unavailable in private or restricted browsing. */
  }
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0]
    if (supportedLocales.includes(base)) return base
  }
  return defaultLocale
}

export function rememberLocale(locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale)
  } catch {
    /* Keep switching usable. */
  }
}

export function browserLocale() {
  let storage
  try {
    storage = window.localStorage
  } catch {
    /* Use browser language instead. */
  }
  return preferredLocale(storage, navigator.languages)
}
