import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import en from '@/content/coaching.en.json'
import sr from '@/content/coaching.sr.json'
export function useCoachingContent() {
  const { locale } = useI18n()
  return computed(() => (locale.value === 'sr' ? sr : en))
}
