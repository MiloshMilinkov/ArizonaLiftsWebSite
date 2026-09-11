<script setup>
import { Dumbbell, UserRound } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import HeroSlideshow from './HeroSlideshow.vue'
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <div class="eyebrow"><span class="dot"></span> {{ t('hero.eyebrow') }}</div>
      <h1 class="hero-heading">
        {{ t('hero.line1') }}<br />{{ t('hero.line2') }}<br /><em>{{ t('hero.line3') }}</em>
      </h1>
      <p class="hero-description">
        {{ t('hero.description') }}
      </p>
      <RouterLink
        class="button primary hero-program-cta"
        :to="{ name: 'programs', params: { locale } }"
        >{{ t('hero.program') }}
        <Dumbbell class="ui-icon" aria-hidden="true" focusable="false" /></RouterLink
      ><RouterLink
        class="text-link"
        :to="{ name: 'home', params: { locale }, hash: '#about-kristina' }"
        >{{ t('hero.about') }} <UserRound class="ui-icon" aria-hidden="true" focusable="false"
      /></RouterLink>
    </div>
    <HeroSlideshow />
  </section>
</template>

<style scoped>
.hero-copy {
  container-type: inline-size;
}
.hero-heading {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(5.25rem, 10cqw, 6.25rem);
  line-height: 1.14;
  letter-spacing: 0;
  overflow-wrap: normal;
  word-break: normal;
}

@media (max-width: 700px) {
  .hero-program-cta {
    display: flex;
    width: 100%;
    min-height: 60px;
    padding: 18px 22px;
    font-size: 1.125rem;
    line-height: 1.4;
    background: var(--ink);
    color: var(--on-dark);
    box-shadow: 0 6px 0 var(--accent);
    margin-bottom: 28px;
  }
  .hero-program-cta:hover {
    background: var(--accent-text);
  }
  .hero-program-cta > span {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
}
</style>
