<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import HomeHero from '@/components/home/HomeHero.vue'
import { getTrainerProfile } from '@/services/siteService'
import { useLocalizedResource } from '@/composables/useLocalizedResource'
const { data: profile, error, reload: load } = useLocalizedResource(getTrainerProfile)
</script>
<template>
  <HomeHero />
  <div class="ticker" :aria-label="t('home.values')">
    <span>{{ t('home.stronger') }}</span
    ><b>✳</b><span>{{ t('home.progress') }}</span
    ><b>✳</b><span>{{ t('home.pace') }}</span
    >
  </div>
  <section class="intro">
    <div>
      <h2>
        {{ t('home.more') }}<br />{{ t('home.commitment') }} <em>{{ t('home.you') }}</em>
      </h2>
    </div>
    <div class="intro-copy">
      <template v-if="profile">
        <p>{{ profile.description }}</p>
        <blockquote>{{ profile.quote }}</blockquote>
        <span class="small">{{ profile.quoteAttribution }}</span>
      </template>
      <div v-else-if="error" role="alert">
        <p>{{ t('home.error') }}</p>
        <button class="text-button" @click="load">{{ t('common.retry') }} ↗</button>
      </div>
      <p v-else role="status">{{ t('home.loading') }}</p>
      <RouterLink class="text-link" :to="{ name: 'programs', params: { locale } }"
        >{{ t('home.explore') }} ↗</RouterLink
      >
    </div>
  </section>
</template>
