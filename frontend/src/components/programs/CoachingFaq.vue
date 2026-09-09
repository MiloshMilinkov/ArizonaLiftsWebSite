<script setup>
import NutritionDisclaimer from '@/components/common/NutritionDisclaimer.vue'
import { useCoachingContent } from '@/composables/useCoachingContent'
const content = useCoachingContent()
</script>
<template>
  <section class="coaching-faq" aria-labelledby="faq-title">
    <h2 id="faq-title">{{ content.faqTitle }}</h2>
    <details v-for="item in content.faq" :key="item.q">
      <summary>{{ item.q }}</summary>
      <p>{{ item.a }}</p>
      <NutritionDisclaimer v-if="item.nutrition" />
    </details>
  </section>
</template>
<style scoped>
.coaching-faq {
  max-width: 1000px;
  margin: auto;
  padding: 64px 6%;
}
h2 {
  margin-bottom: 32px;
  font-size: clamp(2rem, 4vw, 3.4rem);
}
details {
  border-bottom: 1px solid var(--border);
}
summary {
  padding: 24px 4px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.6;
}
summary:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 4px;
}
p {
  color: var(--muted);
  line-height: 1.8;
  padding: 0 4px 24px;
}
</style>
