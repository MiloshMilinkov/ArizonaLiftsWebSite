<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { activeSection } from '@/composables/useActiveSection'
import { languageTags, supportedLocales } from '@/i18n/locale'

const route = useRoute()
const { t, locale } = useI18n()
const languageNames = { en: 'English', sr: 'Srpski' }

function languageRoute(language) {
  return {
    name: activeSection.value,
    params: { ...route.params, locale: language },
    query: route.query,
    hash: route.hash,
  }
}

function navigateLanguage(event, language, navigate) {
  // Keep the current language from scrolling the page; preserve open-in-new-tab clicks.
  if (
    language === locale.value &&
    event.button === 0 &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    !event.altKey
  ) {
    event.preventDefault()
    return
  }
  navigate(event)
}
</script>

<template>
  <div class="language-switch" role="group" :aria-label="t('nav.language')">
    <RouterLink
      v-for="language in supportedLocales"
      :key="language"
      :to="languageRoute(language)"
      custom
      v-slot="{ href, navigate }"
    >
      <a
        :href="href"
        :lang="languageTags[language]"
        :hreflang="languageTags[language]"
        :aria-label="languageNames[language]"
        :aria-current="locale === language ? 'true' : undefined"
        @click="navigateLanguage($event, language, navigate)"
      >
        {{ language.toUpperCase() }}
      </a>
    </RouterLink>
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
a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: var(--ink);
  min-width: 40px;
  min-height: 38px;
  font-size: 0.875rem;
  font-weight: 700;
}
a[aria-current='true'] {
  background: var(--accent-text);
  color: var(--on-dark);
}
</style>
