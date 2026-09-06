<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import SiteBrand from './SiteBrand.vue'
import { socialLinks } from '@/config/site'
</script>

<template>
  <footer>
    <div class="footer-top">
      <SiteBrand />
      <p>{{ t('footer.tagline') }}</p>
      <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
    </div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Arizona Lifts. {{ t('footer.rights') }}</span
      ><span>{{ t('footer.motto') }}</span>
    </div>
  </footer>
</template>
