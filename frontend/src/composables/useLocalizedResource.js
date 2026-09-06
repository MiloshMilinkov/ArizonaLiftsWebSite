import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// Invalidated requests cannot overwrite content after a language change or unmount.
export function useLocalizedResource(fetchResource, initialValue = null) {
  const { locale } = useI18n()
  const data = ref(initialValue)
  const loading = ref(true)
  const error = ref(false)
  const attempt = ref(0)
  watch(
    [locale, attempt],
    async ([language], previous, onCleanup) => {
      const controller = new AbortController()
      let active = true
      onCleanup(() => {
        active = false
        controller.abort()
      })
      data.value = initialValue
      loading.value = true
      error.value = false
      try {
        const result = await fetchResource(language, controller.signal)
        if (active) data.value = result
      } catch {
        if (active) error.value = true
      } finally {
        if (active) loading.value = false
      }
    },
    { immediate: true },
  )
  return {
    data,
    loading,
    error,
    reload: () => {
      attempt.value++
    },
  }
}
