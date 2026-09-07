<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { socialLinks } from '@/config/site'
import HeroSlideshow from './HeroSlideshow.vue'
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <div class="eyebrow"><span class="dot"></span> {{ t('hero.eyebrow') }}</div>
      <h1>
        {{ t('hero.line1') }}<br />{{ t('hero.line2') }}<br /><em>{{ t('hero.line3') }}</em>
      </h1>
      <p class="hero-description">
        {{ t('hero.description') }}
      </p>
      <RouterLink class="button primary" :to="{ name: 'programs', params: { locale } }"
        >{{ t('hero.program') }} <span>↗</span></RouterLink
      ><a class="text-link" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer"
        >{{ t('hero.about') }} ↗</a
      >

    </div>
    <HeroSlideshow />
  </section>
</template>
