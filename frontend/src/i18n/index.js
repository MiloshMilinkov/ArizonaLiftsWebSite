import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import sr from '@/locales/sr.json'
import { defaultLocale } from './locale'

export default createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: { en, sr },
})
