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
      <div class="footer-socials">
        <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a :href="socialLinks.tiktok" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Arizona Lifts. {{ t('footer.rights') }}</span
      ><span>{{ t('footer.motto') }}</span>
    </div>
  </footer>
</template>
