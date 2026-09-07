<script setup>
import { useRoute, useRouter } from 'vue-router'
import { activeSection } from '@/composables/useActiveSection'
import { useI18n } from 'vue-i18n'
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
function selectLanguage(language) {
  if (language === locale.value) return
  router.push({
    name: activeSection.value,
    params: { ...route.params, locale: language },
    query: route.query,
    hash: route.hash,
  })
}
</script>
<template>
  <div class="language-switch" role="group" :aria-label="t('nav.language')">
    <button
      type="button"
      lang="en"
      aria-label="English"
      :aria-pressed="locale === 'en'"
      @click="selectLanguage('en')"
    >
      EN
    </button>
    <button
      type="button"
      lang="sr-Latn"
      aria-label="Srpski"
      :aria-pressed="locale === 'sr'"
      @click="selectLanguage('sr')"
    >
      SR
    </button>
  </div>
</template>
<style scoped>
.language-switch {
  display: flex;
  border: 1px solid var(--control-border);
  border-radius: 5px;
  padding: 3px;
  gap: 2px;
  flex-shrink: 0;
}
button {
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: var(--ink);
  min-width: 40px;
  min-height: 38px;
  font-size: 0.875rem;
  font-weight: 700;
}
button[aria-pressed='true'] {
  background: var(--accent-text);
  color: var(--on-dark);
}
</style>
