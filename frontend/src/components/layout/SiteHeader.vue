<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteBrand from './SiteBrand.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { socialLinks } from '@/config/site'

const open = ref(false)
const route = useRoute()
watch(
  () => route.path,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="header">
    <SiteBrand /><button
      class="menu"
      :aria-expanded="open"
      aria-controls="navigation"
      @click="open = !open"
    >
      {{ open ? t('nav.close') + ' −' : t('nav.menu') + ' +' }}
    </button>
    <nav id="navigation" :class="{ open }" :aria-label="t('nav.label')">
      <RouterLink :to="{ name: 'home', params: { locale } }">{{ t('nav.home') }}</RouterLink
      ><RouterLink :to="{ name: 'programs', params: { locale } }">{{
        t('nav.programs')
      }}</RouterLink
      ><a class="nav-cta" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer"
        >{{ t('nav.talk') }} <span>↗</span></a
      >
    </nav>
    <LanguageSwitcher />
  </header>
</template>
