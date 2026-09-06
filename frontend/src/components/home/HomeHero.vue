<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { socialLinks } from '@/config/site'
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
      <div class="hero-bottom">
        <span>{{ t('hero.purpose') }}</span
        ><span>{{ t('hero.start') }}</span>
      </div>
    </div>
    <figure class="hero-image">
      <img
        src="https://images.pexels.com/photos/136410/pexels-photo-136410.jpeg?auto=compress&amp;dpr=1&amp;h=750&amp;w=1260"
        :alt="t('hero.alt')"
        fetchpriority="high"
      />
      <div class="image-label">
        <span
          >{{ t('hero.show') }}<br /><b>{{ t('hero.yourself') }}</b></span
        ><span class="round-arrow">↗</span>
      </div>
      <figcaption>{{ t('hero.caption') }}</figcaption>
    </figure>
  </section>
</template>
