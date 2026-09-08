<script setup>
import { Dumbbell, Target, Footprints } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const values = ['home.stronger', 'home.progress', 'home.pace']
</script>

<template>
  <section class="training-values" :aria-label="t('home.values')">
    <ul class="training-values__list">
      <li v-for="(value, index) in values" :key="value" class="training-values__item">
        <span
          class="training-values__icon"
          :class="'training-values__icon--' + index"
          aria-hidden="true"
          ><component
            :is="[Dumbbell, Target, Footprints][index]"
            class="value-icon"
            aria-hidden="true"
            focusable="false"
        /></span>
        <span class="training-values__text">{{ t(value) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.training-values {
  max-width: 1600px;
  margin: 0 auto;
  padding: 12px 6% 28px;
}
.training-values__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: 30px 16px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: linear-gradient(110deg, var(--sand), var(--rose));
}
.training-values__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 24px;
  min-width: 0;
}
.training-values__item + .training-values__item {
  border-left: 1px solid var(--control-border);
}
.training-values__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--surface);
  color: var(--accent-text);
  font-size: 1.75rem;
  line-height: 1;
}
.training-values__icon--1 {
  background: var(--accent);
  color: var(--ink);
}
.training-values__icon--2 {
  background: var(--ink);
  color: var(--rose);
}
.training-values__text {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  line-height: 1.45;
  letter-spacing: 0.035em;
  overflow-wrap: anywhere;
}
@media (max-width: 850px) {
  .training-values__list {
    grid-template-columns: 1fr;
    padding: 8px 24px;
  }
  .training-values__item {
    justify-content: flex-start;
    padding: 20px 0;
    gap: 18px;
  }
  .training-values__item + .training-values__item {
    border-left: 0;
    border-top: 1px solid var(--border);
  }
  .training-values__text {
    font-size: 1.15rem;
  }
}
</style>
