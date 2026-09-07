import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getSiteContent } from '@/content'

export function useSiteContent() {
  const { locale } = useI18n()
  const content = computed(() => getSiteContent(locale.value))
  return {
    profile: computed(() => content.value.profile),
    programs: computed(() => content.value.programs),
  }
}
