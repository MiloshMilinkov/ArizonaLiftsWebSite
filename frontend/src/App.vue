<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <a class="skip" href="#main">{{ t('common.skip') }}</a>
  <SiteHeader />
  <main id="main" tabindex="-1"><RouterView /></main>
  <SiteFooter />
</template>
