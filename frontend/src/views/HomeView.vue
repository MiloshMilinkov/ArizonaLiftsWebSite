<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import HomeHero from '@/components/home/HomeHero.vue'
import TrainingValues from '@/components/home/TrainingValues.vue'
import { useSiteContent } from '@/composables/useSiteContent'
const { profile } = useSiteContent()
</script>
<template>
  <HomeHero />
  <TrainingValues />
  <section class="intro">
    <div>
      <h2>
        {{ t('home.more') }}<br />{{ t('home.commitment') }} <em>{{ t('home.you') }}</em>
      </h2>
    </div>
    <div class="intro-copy">
      <p>{{ profile.description }}</p>
      <blockquote>{{ profile.quote }}</blockquote>
      <span class="small">{{ profile.quoteAttribution }}</span>
      <RouterLink class="text-link" :to="{ name: 'programs', params: { locale } }"
        >{{ t('home.explore') }} ↗</RouterLink
      >
    </div>
  </section>
</template>
